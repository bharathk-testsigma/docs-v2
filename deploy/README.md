# Deploying docs v2

`/docs-new/` on the website is this repo, served by its own httpd pod. It is
**not** proxied through the website's Apache — the website ingress sends the path
straight here. That single fact explains most of the setup below.

## The path a request takes

```
browser
  └─ ALB  (testsigma-website-<env>-us, TLS terminates here)
       └─ ingress rule  host: <websiteHostName>  path: /docs-new  (Prefix)
            └─ httpd-docs-new-<env>-service :80
                 └─ this image: httpd serving htdocs/docs-new/  (static Astro output)
```

Defined in `devops-helm` on the **`prod`** branch:

| Piece | Location |
|---|---|
| Ingress rule | `website/templates/ingress.yml` — guarded by `Deployments.docsNewEnabled` |
| Service | `website/templates/httpd-docs-new-service.yaml`, values under `Services.docsNew` |
| Deployment | `website/templates/httpd-docs-new-deployment.yaml`, values under `Deployments.docsNew` |
| Image tag | `Deployments.docsNew.containers.version` in `production-values.yaml` / `staging-values.yaml` |

**Each environment deploys to the devops-helm branch its ArgoCD app tracks** —
staging to **`staging`**, production to **`prod`**. Same convention as blog and
website. Verify before changing either:

```
kubectl -n argocd get app website-staging \
  -o jsonpath='{.spec.source.targetRevision}'      # -> staging
```

This is the single most important fact on this page, because getting it wrong
fails **silently**. Commit `c6d2cfe` set staging's `HELM_BRANCH` to `prod`, and
from then on every staging deploy committed its image tag to
`prod/website/staging-values.yaml` — a file `website-staging` never reads. The
workflow went green, ArgoCD showed no docs-new resources, and
`https://website.testsigma.com/docs-new/` served the website's own 404 page,
because with no `/docs-new` rule on the ALB the request falls through the
catch-all `/` rule to the website. Nothing anywhere reported an error.

A quick way to tell which branch an app really reads, without cluster access:
compare how fresh the *other* services' image tags are in the same values file.
In `prod/website/staging-values.yaml` the last blog bump was 2025-06-13; on
`staging` blog is bumped daily. The running blog pod has the recent tag.

**Never sync `website-staging` with `revision: prod`.** It renders
`prod/staging-values.yaml`, whose blog and website tags are 14 months stale, and
silently rolls those two workloads back. It will appear to fix the docs — the
docs-new resources do get created — which is what makes it tempting.

## Deploying

Run **Actions → Docs - Manual** and pick the environment. The workflow
(`.github/workflows/manual.yml`) does:

1. `npm ci` && `npm run build` → `dist/` (plus `dist/pagefind` for search)
2. sanity-checks `dist/` — index page, pagefind index, and that emitted links
   carry the `/docs-new/` prefix
3. builds the image from `Dockerfile` and pushes `:latest` and `:tag-<sha>` to
   ECR (`docs-v2-staging` / `docs-v2-production`)
4. bumps `Deployments.docsNew.containers.version` in devops-helm
5. invalidates `/docs-new/*` on the ELB CloudFront distribution

ArgoCD picks up the devops-helm commit and rolls out. The workflow does not wait
for it — check ArgoCD or the pods for rollout status.

Prerequisite: the `docsNew` block must already exist in devops-helm. Step 4 fails
loudly if it does not, rather than creating a Deployment nobody configured.

## Why there is no `sed` step for hostnames

The website repo's workflows rewrite `devwebsite.testsigma.com` out of
`conf/apache2/*/rules.conf` at build time, because those conf files are dev proxy
rules that get baked into the website/blog images and have to be re-pointed per
environment.

Nothing equivalent is needed here:

- `apache2/docs-new.conf` is the only conf in the image, and it names no
  hostname. It serves files from disk; there is no upstream to re-point.
- `httpd-conf/docs-new/rules.conf` **is** hostname-bound
  (`devwebsite.testsigma.com` → `host.docker.internal:4321`), but it is a local
  development file mounted into the shared dev httpd container. It is never
  copied into the image.
- The one genuinely per-environment behaviour — `X-Robots-Tag: noindex` on
  staging — is a host-conditional `expr=` in `apache2/docs-new.conf`, so both
  environments ship byte-identical config and the rule cannot be lost to a
  missed substitution.

## Things this service must do for itself

Because the website's Apache is not in the path, none of the website repo's
`conf/apache2/common/common.conf` or `conf/apache2/docs/rules.conf` applies.
`apache2/docs-new.conf` therefore carries its own:

- security headers (CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`,
  `X-Content-Type-Options`, `X-Xss-Protection`)
- `X-Forwarded-Proto` handling — TLS ends at the ALB, so without it Apache builds
  redirects with an `http://` scheme
- staging `noindex`
- compression, cache-control, and the `.pf_*` MIME types Pagefind needs

If a header changes in the website repo, it has to be changed here too. There is
no shared source.

## Known gap: Ask AI has no backend in this deployment

The Ask AI drawer POSTs to `/api/ask` and `/api/ask-feedback`. Those are Vercel
serverless functions (`api/ask.ts`, `api/ask-feedback.ts`, wired up in
`vercel.json`) — **this deployment has nothing serving them.**

The paths are at the domain root, not under the docs base, and deliberately so:
`src/scripts/ask-shared.ts` does not run them through `withBase()` because Vercel
maps the functions to `/api/ask`. Under the ALB that means:

```
POST https://testsigma.com/api/ask
  → no ingress rule matches /api
  → falls through to  path: /  → httpd-website service → 404
```

So on staging and production, every Ask question fails. It fails *gracefully* —
`Search.astro` catches it and shows an inline error with a retry and a "back to
keyword search" link, and Pagefind search is unaffected — but the feature does
not work. Nothing in this repo can fix it alone; it needs an infrastructure
decision. Roughly, the options are:

1. **Leave it.** Ask AI is Vercel-only; the EKS copy is search-only. Cheapest,
   but the button is visibly broken to anyone who clicks it — worth hiding the
   Ask tab behind a build flag if this is the answer.
2. **Run the API in the cluster.** A small Node service plus an ingress rule for
   `/api/ask`, with `VOYAGE_API_KEY` and `ANTHROPIC_API_KEY` as secrets. Note
   that `/api` at the domain root is shared namespace — the path would want to
   be something like `/docs-new/api/ask`, which also means changing
   `ASK_API_URL` and re-checking the `withBase()` comment above.
3. **Point the browser at the Vercel deployment.** Make `ASK_API_URL` an absolute
   URL to the Vercel host. Least infrastructure, but adds a cross-origin
   dependency and a CORS surface, and the CSP `connect-src` here would need it.

Until one of those happens, the ~9MB retrieval index is dead weight in the image
and the Dockerfile deletes it (it is server-side input for `api/ask.ts`, never
fetched by the browser).

## The 2026-08-20 silent failure: green deploys, nothing served

A staging deploy went **fully green** while serving no docs at all. Worth reading
before trusting a green run.

What the workflow did, correctly: built 143 pages, pushed
`docs-v2-staging:tag-a137ce3`, bumped `staging-values.yaml` (devops-helm commit
`7939144`), invalidated CloudFront. Every step it checked had genuinely
succeeded.

What was actually being served at `https://website.testsigma.com/docs-new/`:

```
HTTP/2 200
server: AmazonS3
content-length: 28703
cache-control: max-age=2592000
```

That is the website's Next.js marketing homepage (`data-next-head` in the body,
zero occurrences of `docs-new/_astro`). Every path under `/docs-new/` returned
the identical 28,703 bytes — `/home/`, `/suite/get-started/overview/`, all of it.

Two things prove the docs pod was never in the request path:

- The response headers are the **website's**, not this image's.
  `apache2/docs-new.conf` sets `Cache-Control: max-age=0, must-revalidate` and
  `X-Robots-Tag: noindex` on staging; neither was present, and the CSP that came
  back whitelists mux, hubilo, vwo, freshchat and storylane — none of which are
  in the CSP in this repo.
- `/docs-new/index.html` answered with `server: Apache` and a 301 to
  `http://…/docs-new/index`. So an extension-based CloudFront behaviour *does*
  reach the ALB — and the **website's** Apache answered it, not
  `httpd-docs-new-staging-service`. There is no `.html`-stripping rule in
  `docs-new.conf`.

So `/docs-new/*` directory URLs never leave CloudFront's S3 website origin, which
answers 200-with-homepage for any key it does not hold. The ingress rule and the
pod are irrelevant until that is fixed — and both were configured correctly the
whole time (`docsNewEnabled: true`, `docsNew.enabled: true`,
`version: tag-a137ce3`).

Production fails differently: `https://testsigma.com/docs-new/` returns
**503 from `awselb/2.0`** — the ALB rule exists but the target group has no
healthy targets, because `production-values.yaml` still pins
`docsNew.containers.version: latest` and no production deploy has ever run (every
devops-helm commit reads "to staging"), so there is no such tag in
`docs-v2-production` to pull.

### Verified cluster state, 2026-08-20

Both environments run in **one** cluster and namespace:
`testsigma-website-cluster`, namespace `website` (there is a single kubeconfig
context; staging is not a separate cluster). The two environments are two
Ingresses in that namespace.

**Production — resources exist, image does not.**

```
kubectl -n website describe ingress testsigma-website-production-ingress
  /docs-new   httpd-docs-new-production-service:80 ()          <- no endpoints
  /docs       httpd-website-production-service:80 (80.0.7.143:80,80.0.8.211:80)
```

The ingress rule is there; the empty `()` is the failure. The Deployment is
`0/2` in `ImagePullBackOff`:

```
Failed to pull image ".../docs-v2-production:latest": … not found
```

`production-values.yaml` pins `docsNew.containers.version: latest` and **no
production deploy has ever run** (every devops-helm commit reads "to staging"), so
that tag was never pushed. Fix: run the workflow once against `production` — it
pushes a real image and rewrites `version` off the floating tag.

Production needs **no CloudFront change**: `https://testsigma.com/docs-new/`
returns `503` from `awselb`, which proves CloudFront already forwards `/docs-new`
to the ALB.

**Staging — the resources do not exist.**

```
kubectl -n website get deploy | grep -iE 'staging|docs-new'
  httpd-blog-wp-staging-deployment       1/1
  httpd-website-staging-deployment       1/1
  vertex-staging-deployment              1/1
  httpd-docs-new-production-deployment   0/2     <- only production
```

No `httpd-docs-new-staging-deployment`, no `-service`, and no `/docs-new` rule on
`testsigma-website-staging-ingress`. This is **not** a chart problem — the chart
provably renders all three from `prod`, which is worth re-checking with one
command before blaming anything else:

```
git clone --depth 1 -b prod git@github.com:TestsigmaInc/devops-helm.git
cd devops-helm/website && helm template website . -f staging-values.yaml \
  | grep -E 'httpd-docs-new|path: /docs-new'
```

That emits the Service, the Deployment and the ingress rule, into the same
namespace and with the same scheduling constraints as the blog and website
workloads that do work. So the desired state is correct and the cluster has simply
never been made to match it: the staging ArgoCD Application has not applied them.
Check its source, since it must be `prod`:

```
kubectl -n argocd get applications \
  -o custom-columns='NAME:.metadata.name,REV:.spec.source.targetRevision,PATH:.spec.source.path'
```

Then sync. Note that production's docs resources appeared ~2026-08-10, right after
docs-new landed on `prod` (`63932d9`, 08-07) — so the production Application does
track `prod` and did sync. The staging one did not.

Also live in this cluster, affecting **every** service and not just docs:

```
Warning FailedNetworkReconcile targetgroupbinding/k8s-website-httpdweb-…
  expected exactly one securityGroup tagged with
  kubernetes.io/cluster/ts-website-cluster for eni eni-…, got: []
```

The AWS Load Balancer Controller cannot register pod IPs into target groups while
that tag is missing. Expect targets to stay unregistered — and a `503` to persist —
even once a pod is Ready. Devops-side: tag the security group on those ENIs.

**CloudFront needs no change — this was a wrong turn worth recording.** While the
docs were unreachable, every `/docs-new/*` path came back `server: AmazonS3` with
`cache-control: max-age=2592000`, which looks exactly like CloudFront serving those
paths from an S3 origin and never forwarding to the ALB. It is not. The moment the
ingress rule existed, `/docs-new/` answered with `server: Apache` and this repo's
own `x-robots-tag: noindex, nofollow` and `max-age=0, must-revalidate` headers, with
no CloudFront change at all.

What was really happening: with no `/docs-new` rule on the ALB, the request fell
through the catch-all `/` rule to the website, and the website's static origin
answers 200 with its own Next.js 404 document for any path it does not hold. The
`server:` header of a *fallback* response tells you nothing about where the path
was *supposed* to go — so do not infer routing from it. Confirm the ALB rule first:

```
kubectl -n website get ingress testsigma-website-staging-ingress -o yaml | grep -c docs-new
```

What CloudFront *does* need is an invalidation, because those fallback 404s were
cached with a 30-day TTL. The deploy workflow's last step already invalidates
`/docs-new/*`; a page that still 404s after a good deploy is usually that cache,
or a URL the deployed build genuinely does not contain.

### How to tell whether a deploy is actually live

Nothing in CI checks this. The deploy workflow ends at "devops-helm commit
pushed"; ArgoCD is what turns that into running pods, and it is not driven by this
workflow — so there is nothing in the job worth waiting on. Checking is a manual
step after the rollout.

`npm run build` stamps the commit into `dist/build-id.txt`, so the running site
can be asked which build it is:

```
curl -s https://website.testsigma.com/docs-new/build-id.txt   # expect the short SHA
```

Two traps when reading that:

- **A 200 does not mean the file exists.** The S3 website origin returns 200 with
  its homepage for any missing key, so `curl -f` never trips and a
  status-code-only check passes while nothing is served. Compare the body.
- **Some failures a sync cannot fix.** If `/docs-new/` comes back
  `server: AmazonS3` with the website's homepage, the request never reached the
  cluster — syncing ArgoCD or rolling the pod changes nothing, only change 1 above
  does. A genuine sync-or-rollout problem looks different: a 503 from `awselb`, or
  an older build-id served by `server: Apache`.

(Run `32340803053` shows a red 10-minute `Verify the deploy is live` step. That
was a short-lived attempt to gate the deploy on this check; it was removed because
rollout is not this workflow's to wait for.)

## Health checks

The Kubernetes probes target `/docs-new/`. The ALB target group has no
`healthcheck-path` annotation on the website ingress, so it falls back to `/` —
which this service does not otherwise serve. The Dockerfile writes a small
`htdocs/index.html` for exactly that reason.

## Local development

Serve the docs at `devwebsite.testsigma.com/docs-new/` by proxying to the Astro
dev server:

```
npm run dev          # listens on 4321
```

with `httpd-conf/docs-new/rules.conf` mounted into the dev httpd container. A 503
at `/docs-new/` means the dev server is not running, not that the rule is broken.
