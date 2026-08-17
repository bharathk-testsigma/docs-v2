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

Both environments read from the `prod` branch — staging from
`staging-values.yaml`, production from `production-values.yaml`. This differs
from the blog and website workflows in the website repo, which push staging to a
`staging` branch. The `docsNew` keys exist **only on `prod`**, so a deploy
pointed at the `staging` branch would fail the "not found in values" guard in the
workflow rather than deploy anything.

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
