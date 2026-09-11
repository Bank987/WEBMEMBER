const fs = require('fs');

let content = fs.readFileSync('src/app/admin/settings/page.tsx', 'utf-8');

const anchor = '<input type="text" name="seoImageUrl"';

const insertion = `
                <div className="sm:col-span-2 pt-4 border-t border-white/5 mt-2 mb-4">
                  <p className="text-[12px] font-[700] text-text-inverse mb-[3px]">รูปแบบหน้าสมาชิก (Members Layout)</p>
                  <p className="text-[10.5px] text-[#888888] mb-4">เลือกว่าจะใช้รูปแบบเก่าหรือรูปแบบใหม่ที่เพิ่งอัปเกรด</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="relative block cursor-pointer group">
                      <input type="radio" name="membersLayout" value="classic" defaultChecked={settings.membersLayout !== "premium"} className="peer sr-only" />
                      <div className="border border-white/10 rounded-[12px] p-4 bg-black/50 peer-checked:border-[#0084ff] peer-checked:bg-[#0084ff]/10 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[13px] font-bold text-white group-hover:text-[#0084ff] transition-colors">Classic Layout (เดิม)</span>
                          <div className="w-4 h-4 rounded-full border border-white/20 peer-checked:border-[#0084ff] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#0084ff] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <p className="text-[10.5px] text-[#888888]">รูปแบบหน้าสมาชิกแบบเดิม</p>
                      </div>
                    </label>
                    <label className="relative block cursor-pointer group">
                      <input type="radio" name="membersLayout" value="premium" defaultChecked={settings.membersLayout === "premium"} className="peer sr-only" />
                      <div className="border border-white/10 rounded-[12px] p-4 bg-black/50 peer-checked:border-[#0084ff] peer-checked:bg-[#0084ff]/10 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[13px] font-bold text-white group-hover:text-[#0084ff] transition-colors">Premium Glass (ใหม่)</span>
                          <div className="w-4 h-4 rounded-full border border-white/20 peer-checked:border-[#0084ff] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#0084ff] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <p className="text-[10.5px] text-[#888888]">กล่อง Popup สไตล์กระจกเงา Ultra Premium</p>
                      </div>
                    </label>
                  </div>
                </div>
`;

if (!content.includes('name="membersLayout"')) {
  // We want to insert BEFORE the seoImageUrl's parent div.
  // We'll just find `<div className="sm:col-span-2">` that contains `seoImageUrl`
  const regex = /(<div className="sm:col-span-2">\s*<p className="text-\[10\.5px\].*seoImageUrl)/;
  content = content.replace(regex, insertion + '\n                $1');
  
  fs.writeFileSync('src/app/admin/settings/page.tsx', content);
  console.log('Admin settings updated successfully');
} else {
  console.log('Already added.');
}
