const fs = require('fs');
let c = fs.readFileSync('src/app/admin/settings/page.tsx', 'utf8');
const insertStr = `
        {/* Gate Layout */}
        <div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden">
          <div className="bg-[#0a0a0a] p-[18px] border-b border-[#111111] flex items-center justify-between"><div><h3 className="text-[14px] font-[900] text-text-inverse">รูปแบบหน้าเข้าเว็บ (Gate Layout)</h3><p className="mt-1 text-[10px] text-[#777]">เลือกการจัดวางองค์ประกอบบนหน้า Gate</p></div></div>
          <div className="p-[27px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Centered */}
              <label className="relative block cursor-pointer group">
                <input type="radio" name="gateLayout" value="centered" defaultChecked={settings.gateLayout === 'centered'} className="peer sr-only" />
                <div className="peer-checked:border-[#0084ff] peer-checked:bg-[#0084ff]/10 rounded-[12px] border border-white/10 p-4 transition-all hover:border-white/30 h-full flex flex-col items-center bg-white/5">
                  <div className="w-[200px] h-[120px] bg-black/60 rounded-[8px] mb-3 border border-white/10 flex flex-col items-center justify-center p-2 gap-2">
                    <div className="w-[30px] h-[30px] rounded-full bg-white/20" />
                    <div className="w-[80px] h-[6px] rounded bg-white/40" />
                    <div className="w-[60px] h-[12px] rounded bg-[#0084ff]" />
                  </div>
                  <p className="text-center text-[12px] font-[600] text-white">แบบเดิม (Centered)</p>
                </div>
              </label>
              {/* Split */}
              <label className="relative block cursor-pointer group">
                <input type="radio" name="gateLayout" value="split" defaultChecked={settings.gateLayout === 'split' || !settings.gateLayout} className="peer sr-only" />
                <div className="peer-checked:border-[#0084ff] peer-checked:bg-[#0084ff]/10 rounded-[12px] border border-white/10 p-4 transition-all hover:border-white/30 h-full flex flex-col items-center bg-white/5">
                  <div className="w-[200px] h-[120px] bg-black/60 rounded-[8px] mb-3 border border-white/10 flex flex-row items-center justify-between px-4">
                    <div className="flex flex-col items-start gap-2">
                      <div className="w-[60px] h-[6px] rounded bg-white/40" />
                      <div className="w-[40px] h-[12px] rounded bg-[#0084ff]" />
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full border-[2px] border-white/30 flex items-center justify-center">
                      <div className="w-[20px] h-[20px] rounded-full bg-white/20" />
                    </div>
                  </div>
                  <p className="text-center text-[12px] font-[600] text-white">แบบใหม่ (Split / Premium)</p>
                </div>
              </label>
            </div>
          </div>
        </div>
`;
c = c.replace('<div id="theme"', insertStr + '\n        <div id="theme"');
fs.writeFileSync('src/app/admin/settings/page.tsx', c);
