# Project Status & Architecture (Webmember)

## 📌 Current Project State (As of Phase 1 - SaaS Transition)
The project has pivoted from a single-gang website to a **Multi-tenant SaaS Platform** for gang directories (GANGLIST).

## 🏗️ Architecture & Routing
- **Framework:** Next.js 16 (App Router)
- **Middleware (`src/middleware.ts`):** 
  - Handles Wildcard Subdomain Routing.
  - `localhost:3000` (Root Domain) -> Rewrites to `src/app/home` (Landing Page).
  - `[subdomain].localhost:3000` (Tenant Domain) -> Rewrites to `src/app/[domain]` (Gang Template).
  - `/admin` routes pass through normally.

## 🗄️ Database Structure (MongoDB)
- Database: `webmember`
- **Collections:**
  - `gangs`: Stores tenant configurations (`subdomain`, `faviconUrl`, `youtubeMusicUrl`, `pageTitle`, etc.).
  - `members`: Stores gang members, linked to gangs via `gangId`. Roles: `FOUNDER`, `LEADER`, `MEMBER`.
  - `global_settings`: Stores platform-wide settings (e.g., MVP Admin PIN).

## 🎨 UI / UX Design Principles
- **GANGLIST Landing Page (`src/app/home`):** 
  - Designed using Anthropic's "Marketing Design Principles" (Dark & Moody, Cinematic, High-contrast).
  - Features: Glowing VFX, strong typography (Chakra Petch), dramatic negative space.
- **Gang Template (`src/app/[domain]`):**
  - Preserved 100% of the original "Webmember" UI (Gate entry, 3D music wrapper, Founders centered).
  - Dynamically fetches `pageTitle`, `faviconUrl`, and `youtubeMusicUrl` based on the subdomain.

## 🚧 Known Defaults / Next Steps
- **MVP Default Gang:** For testing, a default gang named `thunder` is seeded. `thunder.localhost:3000` works out of the box.
- **Admin Panel:** Gang owners now authenticate with a per-gang admin secret token stored as a hash. Admin pages and member/settings actions are scoped to the authenticated gang.
- **Next Feature Pipeline:** 
  1. Add token rotation/recovery through a verified account or owner workflow.
  2. Add a proper account recovery and rate-limiting policy before production launch.

## 💡 Notes for Future Agents
- When making URL rewrites for Next.js App router, remember that dynamic routes like `[domain]` require rewriting to the literal variable (e.g., `/${subdomain}`) NOT the bracketed folder name `/[domain]`.
- Always wrap PowerShell paths with parentheses in quotes (e.g., `"src/app/(home)"`).
- The project relies heavily on `lucide-react` for icons and standard Tailwind for styling.
- Legacy gangs created before token authentication need to be re-registered or migrated with an admin token before their admin panel can be accessed.
