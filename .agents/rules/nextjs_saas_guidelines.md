---
name: nextjs-saas-guidelines
description: Critical routing and file system constraints for the Next.js Multi-tenant SaaS project on Windows.
trigger: always_on
---

# Next.js SaaS & PowerShell Rules

## 1. Middleware Rewrites for Route Groups
Never rewrite to a route group folder path (e.g., `/(home)`) in `src/middleware.ts`. Next.js routing ignores parenthesis folders, so this will result in a 404. If you need to rewrite to a specific landing page folder, name it without parentheses (e.g., `/home`) and rewrite to that.

## 2. Middleware Rewrites for Dynamic Segments
When rewriting to a dynamic tenant folder like `src/app/[domain]`, **DO NOT** rewrite to the literal string `/[domain]`. Next.js file-system routing requires you to pass the actual dynamic value. 
**Incorrect:** `NextResponse.rewrite(new URL('/[domain]', req.url))`
**Correct:** `NextResponse.rewrite(new URL('/' + subdomain, req.url))`

## 3. PowerShell Path Escaping
When running terminal commands via PowerShell, paths containing brackets `[]` or parentheses `()` must ALWAYS be enclosed in quotes to prevent expression evaluation errors.
**Incorrect:** `mkdir src\app\[domain]` or `cd src\app\(home)`
**Correct:** `mkdir "src\app\[domain]"` or `cd "src\app\(home)"`
