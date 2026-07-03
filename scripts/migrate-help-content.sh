#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  migrate-help-content.sh  (Help Tab Implementation — Phase 1, §4)
#
#  Moves existing troubleshooting/FAQ content into src/content/docs/suite/help/
#  using `git mv` (preserves blame/history). Run from the repo root in a
#  feature branch, then review `git diff --stat` before committing.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="src/content/docs/suite"
HELP="$ROOT/help"

mkdir -p "$HELP"/{agent-setup,web-testing,mobile-testing,steps-elements,copilot-terminal,execution-apis,desktop-windows,general-howtos}

mv_all() {
  local dest="$1"; shift
  for src in "$@"; do
    if [ -e "$src" ]; then
      git mv "$src" "$dest/"
    else
      echo "WARN: missing $src" >&2
    fi
  done
}

# ── agent-setup ──
mv_all "$HELP/agent-setup" \
  "$ROOT"/troubleshooting/agent/*.md \
  "$ROOT"/troubleshooting/on-prem/*.md \
  "$ROOT"/troubleshooting/setup/server-docker-deployment-errors.md \
  "$ROOT"/troubleshooting/setup/troubleshooting-restricted-access.md \
  "$ROOT"/agent/troubleshooting/*.md

# Three files would otherwise collide / be ambiguously named in agent-setup:
# both agent/faqs.md and on-premise-setup/post-installation/faqs.md are named
# faqs.md. Rename on move to disambiguate (the on-prem pair gets a prefix).
git mv "$ROOT"/agent/faqs.md "$HELP/agent-setup/agent-faqs.md"
git mv "$ROOT"/on-premise-setup/post-installation/faqs.md "$HELP/agent-setup/on-premise-post-installation-faqs.md"
git mv "$ROOT"/on-premise-setup/post-installation/troubleshooting.md "$HELP/agent-setup/on-premise-post-installation-troubleshooting.md"

# ── web-testing ──
mv_all "$HELP/web-testing" \
  "$ROOT"/troubleshooting/web-apps/*.md \
  "$ROOT"/faqs/web-apps/*.md

# move the one agent-related FAQ back out to agent-setup
git mv "$HELP/web-testing/why-am-i-getting-an-error-while-registering-the-agent.md" \
       "$HELP/agent-setup/" 2>/dev/null || true

# ── mobile-testing ──
mv_all "$HELP/mobile-testing" \
  "$ROOT"/troubleshooting/mobile-apps/*.md \
  "$ROOT"/faqs/mobile-apps/*.md

# ── steps-elements ──
mv_all "$HELP/steps-elements" \
  "$ROOT"/troubleshooting/nlps/*.md

# ── copilot-terminal ──
mv_all "$HELP/copilot-terminal" \
  "$ROOT"/copilot/faqs-on-copilot.md \
  "$ROOT"/copilot/troubleshooting-for-copilot/*.md

# ── execution-apis ──
mv_all "$HELP/execution-apis" \
  "$ROOT"/troubleshooting/rest-api/*.md \
  "$ROOT"/troubleshooting/salesforce-testing/*.md \
  "$ROOT"/troubleshooting/general/jenkins-xml-to-html.md \
  "$ROOT"/troubleshooting/general/view-test-execution-video.md \
  "$ROOT"/faqs/general/why-does-test-execution-fail-with-the-error-no-route-to-host.md \
  "$ROOT"/faqs/general/why-am-i-unable-to-download-the-xls-file-from-the-edge-browser.md \
  "$ROOT"/faqs/general/why-do-errors-occur-when-i-try-to-download-files-from-the-exports-page.md \
  "$ROOT"/faqs/general/what-causes-longer-automation-test-execution-times-in-a-test-plan.md

# ── desktop-windows ──
mv_all "$HELP/desktop-windows" \
  "$ROOT"/troubleshooting/desktop-windows/*.md \
  "$ROOT"/troubleshooting/setup/secured-business-application-support.md

# ── general-howtos ──
mv_all "$HELP/general-howtos" \
  "$ROOT"/troubleshooting/general/verify-file-download.md \
  "$ROOT"/troubleshooting/general/enable-disable-elements.md \
  "$ROOT"/troubleshooting/general/automating-chrome-extension.md \
  "$ROOT"/troubleshooting/general/ui-elements-for-ios-apps.md \
  "$ROOT"/faqs/general/*.md \
  "$ROOT"/addons/faqs/connect-mongodb-and-postgresql-via-addon.md

# ── cleanup: remove now-empty source directories ──
find "$ROOT" -type d -empty -not -path "*/help/*" -delete

echo "Done. Verify counts:"
for d in "$HELP"/*/; do echo "  $(basename "$d"): $(find "$d" -name '*.md' | wc -l)"; done

# ── Arcus skeleton (no content to move) ──
mkdir -p src/content/docs/arcus/help
touch src/content/docs/arcus/help/.gitkeep
