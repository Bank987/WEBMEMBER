const fs = require('fs');

let content = fs.readFileSync('src/app/admin/settings/page.tsx', 'utf-8');

const volumeInputStr = `
                {/* Volume Level */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-[18px]">
                  <div>
                    <div className="flex items-center gap-2 mb-[3px]">
                      <p className="text-[12px] font-[700] text-text-inverse">ระดับเสียงเพลงเริ่มต้น (Default Volume)</p>
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#0084ff]/20 text-[#0084ff] border border-[#0084ff]/30">NEW</span>
                    </div>
                    <p className="text-[10.5px] text-[#888888]">ปรับความดังของเสียงเพลงเริ่มต้นตอนโหลดหน้าเว็บ (0-100)</p>
                  </div>
                  <div className="flex items-center gap-4 w-[400px] max-w-full">
                    <input 
                      type="range" 
                      name="defaultVolume"
                      min="0"
                      max="100"
                      defaultValue={settings.defaultVolume ?? 100} 
                      className="w-full accent-[#0084ff]"
                    />
                    <span className="text-[12px] font-bold text-white min-w-[40px] text-right bg-white/5 px-2 py-1 rounded border border-white/10" id="volumeDisplay">
                      {settings.defaultVolume ?? 100}%
                    </span>
                    <script dangerouslySetInnerHTML={{__html: \`
                      document.addEventListener('DOMContentLoaded', () => {
                        const input = document.querySelector('input[name="defaultVolume"]');
                        const display = document.getElementById('volumeDisplay');
                        if (input && display) {
                          input.addEventListener('input', (e) => {
                            display.textContent = e.target.value + '%';
                          });
                        }
                      });
                    \`}} />
                  </div>
                </div>
`;

content = content.replace(
  '                  />\n                </div>\n  \n                  <div className="flex flex-col gap-[20px] pt-4 border-t border-white/5">',
  '                  />\n                </div>\n' + volumeInputStr + '\n                  <div className="flex flex-col gap-[20px] pt-4 border-t border-white/5">'
);

fs.writeFileSync('src/app/admin/settings/page.tsx', content);
console.log('Added volume input to settings page');
