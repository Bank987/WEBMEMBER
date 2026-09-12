const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/page.tsx', 'utf8');

if (!code.includes('import { SettingsTabs }')) {
  code = code.replace('import { SettingsFormWrapper } from "@/components/SettingsFormWrapper";', 'import { SettingsFormWrapper } from "@/components/SettingsFormWrapper";\nimport { SettingsTabs } from "@/components/SettingsTabs";');
}

function extractBlock(startStr, endStr) {
  const start = code.indexOf(startStr);
  if (start === -1) throw new Error("Could not find start: " + startStr);
  const end = code.indexOf(endStr, start);
  if (end === -1) throw new Error("Could not find end: " + endStr);
  const block = code.substring(start, end);
  code = code.substring(0, start) + code.substring(end);
  return block;
}

const music = extractBlock('{/* Music Settings */}', '{/* Gate Layout */}');
const gate = extractBlock('{/* Gate Layout */}', '<div id="theme"');
const theme = extractBlock('<div id="theme"', '{/* Platform Configuration */}');
const platform = extractBlock('{/* Platform Configuration */}', '{/* Custom Effects */}');
const effects = extractBlock('{/* Custom Effects */}', '{/* Socials & Logo */}');
const socials = extractBlock('{/* Socials & Logo */}', '</SettingsFormWrapper>');
const danger = extractBlock('{/* Danger Zone */}', '</div>\n  );\n}');

const newWrapper = `
      <SettingsFormWrapper action={saveSettings}>
        <SettingsTabs 
          general={
            <>
              ${platform}
              ${socials}
            </>
          }
          visuals={
            <>
              ${gate}
              ${theme}
              ${effects}
            </>
          }
          music={
            <>
              ${music}
            </>
          }
          danger={
            <>
              ${danger}
            </>
          }
        />
      </SettingsFormWrapper>
`;

code = code.replace(/<SettingsFormWrapper action=\{saveSettings\}>[\s\S]*?<\/SettingsFormWrapper>/, newWrapper);

fs.writeFileSync('src/app/admin/settings/page.tsx', code);
