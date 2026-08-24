
$content = Get-Content -LiteralPath "src\lib\db.ts" -Raw
$content = $content -replace "backgroundImageUrl\?: string;", "backgroundImageUrl?: string;`r`n  membersBackgroundImageUrl?: string;"
$content = $content -replace "backgroundImageUrl: \{ type: String, default: `"`" \},", "backgroundImageUrl: { type: String, default: `"`" },`r`n  membersBackgroundImageUrl: { type: String, default: `"`" },"
$content = $content -replace "backgroundImageUrl: \{ type: String, default: `"`" \}, ", "backgroundImageUrl: { type: String, default: `"`" }, membersBackgroundImageUrl: { type: String, default: `"`" }, "
$content = $content -replace "backgroundImageUrl: doc.backgroundImageUrl \|\| `"`",", "backgroundImageUrl: doc.backgroundImageUrl || `"`",`r`n    membersBackgroundImageUrl: doc.membersBackgroundImageUrl || `"`","
$content = $content -replace "`"backgroundImageUrl`"\)\) \{", "`"backgroundImageUrl`")) {`r`n  if (!GangModel.schema.path(`"membersBackgroundImageUrl`")) { GangModel.schema.add({ membersBackgroundImageUrl: { type: String, default: `"`" } }); }"
Set-Content -LiteralPath "src\lib\db.ts" -Value $content -Encoding UTF8

