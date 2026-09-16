# Multi-template portfolio design

Approved direction: Next.js is the runtime and router. Preserve the reference project's organization: src/templates for contracts/configuration/loading, root templates/<name> for layouts/pages/components/styles, src/composables for shared React hooks, src/stores for client state, src/services for data, src/i18n for English and Traditional Chinese.

## Configuration

A versioned, validated, compact `site-config` cookie selects `name` (default/studio), `theme` (ocean/plum/forest), `mode` (light/dark), accent hex color, default language (zh-TW/en-US), ordered home sections (featured/collection/about), ordered navigation entries (home/catalog/favorites with enabled flag), and navigation position (top/sidebar). SameOrigin Server Actions validate before writing an HttpOnly SameSite=Lax path=/ cookie for one year. Reads normalize corrupt/unknown/old configuration to safe defaults. Cookie size stays below 3800 encoded bytes. There is no arbitrary URL, CSS, HTML or module import in configuration.

The dedicated /[lng]/settings page edits a local draft with an accessible preview, explicit save, and reset. Saving refreshes server-rendered configuration and follows the chosen default language. All routes can still be reached when hidden in navigation; settings and language controls remain available. Explicit URL language wins; a bare URL uses saved default language, then Accept-Language, then zh-TW. Legacy zh-HK/zh-CN paths redirect to zh-TW, preserving the rest of the URL. Invalid locale segments are rejected.

## Rendering and state

Next file routes are shared. Explicit loader maps return a typed template with Layout, Home and Catalog slots. Server reads are request-scoped; no process-wide user state. Server-rendered body attributes (data-template, data-theme, data-mode) and CSS variables produce the first paint. The chosen layout owns the page frame. Home sections render in configured order. Search/category live in URL parameters. A per-provider Zustand favorites store hydrates browser persistence after mount, never leaking between server requests. Client code does not import server loaders.

## Styling and content

Tailwind 4 uses @tailwindcss/postcss, a single @import, @theme inline semantic colors, template-scoped token files and CSS Modules. No v3 generated config. Default: blue-gray #edf1f5 background, #172c46 text, #2764d6 accent, white surface. Studio: same configurable colors with a compact sidebar composition. System sans-serif UI with Georgia display for editorial work. Original locally generated geometric project illustrations; no company assets, services or identifiers.

## Scope and acceptance

Two visual templates; home/catalog/favorites/settings; localized responsive UI; configurable colors/mode/section order/default language/navigation order/visibility/position; preserved favorites and query filters; valid cookies visible in initial HTML; validation and no redirect loops; loading/error/not-found states; README and extension guide. Fix existing dropped redirects, forced dark cookie and broken Tailwind token mapping. Upgrade unsupported Next 14 to stable Next 16 and compatible React tooling. Node.js 24 is the supported development and CI runtime. Preserve pre-existing staged changes (including qs); no staging, commits, pushes or publication.

Tests: configuration corruption, schema validation, order preservation, invalid colors/routes/versions, locale precedence/legacy boundaries, actual proxy redirects, and browser flows that save cookies, navigate/reload, switch templates, filter and persist favorites. Run lint, typecheck, unit tests, production build, browser desktop/mobile checks. GitHub hosting must support a Next server; no static export for request cookies.
