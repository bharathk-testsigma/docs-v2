# ─────────────────────────────────────────────────────────────────────────────
#  docs v2 — static Astro/Starlight output behind httpd.
#
#  Deliberately NOT modelled on the blog image (ubuntu + the whole PHP stack) or
#  the dev httpd image (centos:7, which is EOL and needs its mirrors rewritten to
#  vault.centos.org to install anything). A static site needs an http server and
#  nothing else, so this uses the official httpd image: smaller, supported, and
#  no package installs at build time.
#
#  Expects `dist/` to already exist — the deploy workflow runs `npm ci` and
#  `npm run build` before `docker build`. Building inside the image instead would
#  mean shipping node_modules and a toolchain to production for no gain.
# ─────────────────────────────────────────────────────────────────────────────
FROM httpd:2.4-alpine

# rewrite/headers/deflate are compiled in but commented out in the stock config.
RUN sed -i \
    -e 's|^#\(LoadModule rewrite_module .*\)|\1|' \
    -e 's|^#\(LoadModule headers_module .*\)|\1|' \
    -e 's|^#\(LoadModule deflate_module .*\)|\1|' \
    conf/httpd.conf \
 && echo "Include conf/extra/docs-new.conf" >> conf/httpd.conf

COPY apache2/docs-new.conf conf/extra/docs-new.conf

# The site is served from /docs-new/, so it lives in a matching subdirectory of
# the document root — the request path and the filesystem path line up, and no
# alias or prefix rewriting is needed.
COPY dist/ htdocs/docs-new/

# The ALB health check has no healthcheck-path annotation on the website ingress,
# so it defaults to "/" — which this service does not otherwise serve. The base
# image's stock "It works!" page happens to answer 200 there, which would make
# target health depend on a leftover file from upstream. Replaced with an
# explicit health response so the behaviour is intentional and survives a base
# image change.
RUN printf '%s' 'ok' > htdocs/index.html

# The Ask AI retrieval index (~9MB of the 57MB build) is read from the FILESYSTEM
# by api/ask.ts on Vercel — vercel.json bundles it into the function. Nothing in
# the browser ever fetches it. Astro copies it out of public/ into dist/ all the
# same, so without this it rides along in the image and is publicly downloadable
# at /docs-new/ask-index.bin. Removed rather than blocked in httpd config: the
# bytes should not be in the layer at all.
#
# If /api/ask is ever served from this pod (see deploy/README.md), the index has
# to come back — but as a file the API reads, not as a document-root asset.
RUN rm -f htdocs/docs-new/ask-index.bin htdocs/docs-new/ask-index.meta.json

# Fail the build rather than ship an image that 404s everywhere: an empty or
# stale dist/ is otherwise indistinguishable from a good one until it is live.
RUN test -f htdocs/docs-new/index.html \
 && test -d htdocs/docs-new/pagefind \
 && grep -q '"/docs-new/' htdocs/docs-new/index.html \
 || (echo "dist/ is missing, empty, or was not built with base=/docs-new" && exit 1)

EXPOSE 80
