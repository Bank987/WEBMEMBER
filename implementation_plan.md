# 👑 VIP System Implementation Plan

## User Review Required
The proposed changes will add VIP Keys functionality. Let me know if the plan looks good!

## Proposed Changes

### Database Schema Updates
#### [MODIFY] src/lib/db.ts
- Add isVip: { type: Boolean, default: false } to gangSchema.
- Add VipKeyModel schema:
  - key (String, unique, index)
  - isUsed (Boolean, default: false)
  - usedByGangId (ObjectId, ref: 'Gang')
  - usedAt (Date)
- Add database functions:
  - createVipKey(key: string)
  - getAllVipKeys()
  - checkVipKey(key: string)
  - edeemVipKey(key: string, gangId: string)

### API Routes
#### [NEW] src/app/api/super-admin/vip-keys/route.ts
- GET: Returns list of all VIP keys.
- POST: Generates a new VIP key.

#### [NEW] src/app/api/vip/check/route.ts
- POST: Validates if a VIP key exists and is unused.

#### [NEW] src/app/api/vip/redeem/route.ts
- POST: Redeems the VIP key and sets isVip = true for the requesting Gang.

### Super Admin UI
#### [MODIFY] src/app/adminsite/page.tsx
- Add a new "VIP Keys" section/tab in the Super Admin dashboard.
- Button to "Generate VIP Key".
- Table to display generated keys, status (Used/Unused), and which gang used it.

### Gang Admin UI
#### [MODIFY] src/components/AdminSidebar.tsx
- Add "VIP" menu item with a Crown icon (Lucide Crown).

#### [NEW] src/app/admin/vip/page.tsx
- UI for redeeming VIP Key.
- Card with text input for the key.
- Two buttons: Check (Verify if valid) and Confirm (Redeem).
- Confirm is disabled until Check returns success.

## Verification Plan
1. Go to Super Admin /adminsite, generate a VIP Key.
2. Go to Gang Admin /admin/vip.
3. Enter invalid key, click check -> shows error.
4. Enter valid key, click check -> shows "Valid Key", unlocks Confirm.
5. Click Confirm -> Upgrades gang to VIP, key becomes used.
6. Super Admin /adminsite reflects key as used by the gang.
