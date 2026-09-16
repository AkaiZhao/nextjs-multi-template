# Multi-template Implementation Plan

> Execute inline with the executing-plans workflow; preserve this existing checkout and index. User approved implementation and supplied configuration and localization changes.

**Goal:** A cookie-configured, server-rendered two-template portfolio using the reference project's architectural boundaries.
**Architecture:** Next file routes select explicit template loaders. Shared hooks/services/store feed template-owned presentation. One validated config contract drives server attributes and settings.
**Tech Stack:** Next.js 16, React 19, Tailwind 4, TypeScript, Zustand, i18next, Vitest, Playwright.
**Spec:** docs/superpowers/specs/2026-09-11-multi-template-design.md

## Global constraints
- English and Traditional Chinese only; preserve old localized entry links through redirects.
- No company code/assets/credentials, git staging/commits/pushes or publication.
- Keep the user's staged qs addition and existing deletion of tailwind.theme.config.ts.
- Configuration is an untrusted cookie; static allowlists and bounded values only.

## Task 1: Config contract and locale request boundary
Files: src/templates/{types,configs,config}.ts; src/i18n/{settings,routing}.ts; proxy.ts; tests/config.test.ts; tests/proxy.test.ts.
- [x] Add test tooling; first assert corrupt cookies fall back, valid order survives, malicious CSS/URLs are rejected, and URL locale takes precedence.
- [x] Run `npm test` and observe missing behavior.
- [x] Implement `parseConfigCookie(value?: string): SiteConfig`, `validateSiteConfig(input: unknown): SiteConfig | null`, and `resolveLocaleRedirect(pathname, config, acceptLanguage): string | null` with literal allowlists and 3800-byte limit.
- [x] Wire Next Proxy to returned redirect responses. Test `/catalog?q=paper`, legacy `/zh-HK/catalog`, exact segment boundaries and static-file exclusions.
- [x] Run tests and verify expected redirects and configuration normalization.

## Task 2: Runtime and template rendering
Files: package.json, postcss.config.mjs, app/[lng]/{layout,page}.tsx, src/templates/{index,server,view-types}.tsx, templates/{default,studio}/{layouts,pages,styles}, src/{components,composables,stores,services,i18n}.
- [x] Upgrade Next/React and Tailwind 4; use async request APIs, flat ESLint config, explicit aliases for src and templates.
- [x] Replace old style generator/config files with single Tailwind entry plus `@theme inline` and scoped template variables.
- [x] Build per-request config reader, explicit template loader registry, shared data services and local project artwork.
- [x] Add home/catalog/favorites pages, shared filtering and persisted favorites hook/store, template-specific layouts and page composition.
- [x] Add complete en-US/zh-TW dictionaries and server/client boundaries, loading/error/not-found pages; retain old demo paths as redirects.

## Task 3: Settings and end-to-end persistence
Files: app/[lng]/settings/{page,actions}.tsx; src/components/settings/{SettingsForm,ConfigPreview}.tsx; tests/site.spec.ts; playwright.config.ts.
- [x] First write browser acceptance tests for saved cookie config reflected in initial HTML, reload, template switching, sections/nav order, locale and shared favorites.
- [x] Build accessible settings controls for all config fields, draft preview, save/reset action and success/error states.
- [x] Validate writes server-side, set HttpOnly SameSite=Lax cookie, revalidate layouts and redirect to selected locale.
- [x] Run production build and browser tests, fix failures and inspect desktop/mobile screenshots.

## Task 4: Documentation and final review
Files: README.md, docs/architecture.md, .github/workflows/ci.yml.
- [x] Document setup, configuration precedence, adding templates, rendering/state boundaries, acceptance commands and Node-host requirement.
- [x] Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`, `git diff --check`.
- [x] Review diff against spec, verify user's index unchanged, report results and material limits with local preview link.

## Verification record

- 2026-09-11: Next.js production build, ESLint and TypeScript passed.
- 32 Vitest tests passed: configuration validation/corruption and locale/Proxy boundaries.
- 6 Playwright Chromium scenarios passed: configuration save/reset/SSR, persistent favorites across templates, locale/search/mobile, both templates with both navigation positions at desktop/mobile sizes, and invalid server action writes.
- npm audit reported zero known vulnerabilities after compatible dependency updates.
- Desktop gallery/studio/settings and mobile studio screenshots inspected; README contains preview images.
- Existing staged package.json and lockfile changes remain unchanged. No commit, push or deployment performed.

## Independent review resolution

A read-only gpt-5.6-sol review found no critical issues and identified two important boundaries plus a locale normalization inconsistency. All three were reproduced before fixing: arbitrary accents no longer define focus rings/control borders; an empty project adapter response preserves the homepage with localized empty content; locale tags normalize case-insensitively. Regression checks passed with 32 unit tests and 6 Chromium E2E scenarios. Final lint, typecheck, production build and diff whitespace checks passed.
