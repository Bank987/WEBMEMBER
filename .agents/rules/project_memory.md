# Project Context: WEBMEMBER (Multi-tenant SaaS)

## 1. Project Overview & Architecture
- **Tech Stack:** Next.js 16 (Turbopack), Tailwind CSS, Framer Motion, MongoDB (Mongoose), Lucide React.
- **Architecture:** Multi-tenant SaaS with Subdomain routing (`/[domain]`).
- **Core Entities:** Gang (Tenant/Website) and Member.
- **Roles:** Super Admin (`/adminsite`), Owner/Admin (`/admin`), Public Site (`/[domain]`).
- **Security Standard (Zero Trust):** 
  - Strictly use `process.env` for ALL secrets (MongoDB, Super Admin credentials, Turnstile, Session Secrets, Discord Webhooks). NEVER hardcode.
  - HMAC signed sessions for authentication.
  - `assertTrustedMutationOrigin()` and `checkRateLimit()` must be applied to sensitive API routes to prevent CSRF, SSRF, and Bruteforce attacks.

## 2. Design Philosophy & UX/UI (CRITICAL)
- **NO "AI Slop":** Do not generate generic, overly corporate, or bloated UI components.
- **Premium & Hacker Aesthetic:** The user prefers "Clean", "Glassmorphism", dark mode by default, glowing effects (e.g., `shadow-[0_0_20px_rgba(255,255,255,0.15)]`), and subtle animations using Framer Motion.
- **Vercel-Style UX:** When building admin dashboards, mimic Vercel's clean layout (expandable rows, minimal borders, subtle hover states, direct inline editing where appropriate).
- **Copywriting:** Use concise, modern Thai. 
  - "INITIALIZE FACTION" -> "สมัครรับเว็บ"
  - "AUTHENTICATE" -> "เข้าสู่ระบบหลังบ้าน"
  - "Pricing" -> "แพ็คเก็จ"
- **Image Uploading:** Always guide users to use direct links (e.g., from `postimages.org`) instead of Discord URLs to avoid timestamp expiry issues.

## 3. Specific Components & Systems Built So Far
- **Super Admin (`/adminsite`):** Can search by PIN, delete gangs, reset master keys, and change subdomains inline (Vercel-style).
- **Activity Log:** A clean, icon-based activity feed tracking `member_add`, `member_edit`, `member_delete`, `settings_update`, and `announcement_update`.
- **Discord Webhooks:** Sends an embed when a new gang registers or a new member is added. Uses `process.env.DISCORD_WEBHOOK_URL`.

## 4. Developer Quirks & Rules
- **PowerShell Escaping:** When running terminal commands in Windows PowerShell, wrap paths containing brackets `[]` or parentheses `()` in quotes (e.g., `cd "src/app/[domain]"`).
- **File Edits:** If modifying complex React files with backticks (template literals), DO NOT use `cat` or PowerShell string manipulation. Use Node.js `fs.writeFileSync` or the native file editing tool to avoid breaking syntax.
