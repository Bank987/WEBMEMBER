import { Sliders, Music, Crown } from "lucide-react";
import { getAuthenticatedGang } from "@/lib/auth";
import { saveSettings } from "@/actions/settings";
import { redirect } from "next/navigation";
import { gangThemes } from "@/lib/themes";
import { DeleteGangButton } from "@/components/DeleteGangButton";
import { ButtonSettings } from "@/components/ButtonSettings";
import { SettingsFormWrapper } from "@/components/SettingsFormWrapper";

export default async function SettingsPage() {
  const settings = await getAuthenticatedGang();
  if (!settings) redirect("/#auth");

  return (
    <div className="max-w-4xl">
      <div className="border-b border-[#111111] pb-[18px] mb-[36px]">
        <h2 className="text-[28px] font-[900] tracking-[-0.5625px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-[#888888]">
          ตั้งค่าเว็บไซต์
        </h2>
        <p className="text-[10.5px] text-[#999999] tracking-[3px] uppercase mt-[6px]">
          จัดการรูปแบบเว็บไซต์และความปลอดภัย
        </p>
      </div>
      
      <div className="mb-[27px] rounded-2xl bg-[#0084ff]/10 border border-[#0084ff]/30 p-4 relative z-10">
        <p className="text-[#4db0ff] text-[13px] font-bold mb-2">💡 แนะนำสำหรับการฝากรูปภาพ</p>
        <p className="text-white/80 text-[12px] leading-relaxed">
          เว็บฝากรูป : <a href="https://postimages.org/" target="_blank" rel="noreferrer" className="text-white hover:underline font-bold">https://postimages.org/</a> สำหรับใครที่รูปไม่ขึ้นโชว์ (ไม่แนะนำให้ก็อปลิงก์จาก Discord เพราะมี Timestamp)
          <br/>
          <span className="text-[#888888] mt-1 block">1. กด Uploads เลือกรูป &nbsp; 2. ก็อปปี้ลิงก์อันที่ 2 <strong>Direct link (ลิงก์ตรง)</strong> แล้วนำมาใส่ในช่อง</span>
        </p>
      </div>

      <SettingsFormWrapper action={saveSettings}>
        {/* Music Settings */}
        <div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#0084ff] blur-[150px] opacity-10 pointer-events-none" />
          <div className="bg-[#0a0a0a] p-[18px] border-b border-[#111111] flex items-center justify-between relative z-10">
            <div className="flex items-center gap-[12px]">
              <Music className="w-[18px] h-[18px] text-[#0084ff]" />
              <h3 className="text-[14px] font-[900] tracking-[1.8px] text-text-inverse">ตั้งค่าเสียงพื้นหลัง</h3>
            </div>
          </div>
          <div className="p-[27px] space-y-[24px] relative z-10">
            <div className="flex items-center justify-between gap-[24px]">
              <div className="flex-1">
                <p className="text-[12px] font-[700] text-text-inverse mb-[3px]">เพลงพื้นหลัง (ลิงก์ YouTube)</p>
                <p className="text-[10.5px] text-[#888888]">เพลงนี้จะเล่นเมื่อผู้เข้าชมเปิดไดเรกทอรี</p>
              </div>
              <input 
                type="url" 
                name="youtubeMusicUrl"
                defaultValue={settings.youtubeMusicUrl} 
                placeholder="https://www.youtube.com/watch?v=..."
                className="bg-black/50 border border-white/10 rounded-[12px] px-[18px] py-[12px] text-[12px] text-white focus:border-[#0084ff] outline-none w-[400px] max-w-full"
              />
            </div>
          </div>
        </div>
            
        <div id="theme" className="scroll-mt-8 bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden">
          <div className="bg-[#0a0a0a] p-[18px] border-b border-[#111111] flex items-center justify-between"><div><h3 className="text-[14px] font-[900] text-text-inverse">ธีมเว็บไซต์</h3><p className="mt-1 text-[10px] text-[#777]">เลือกสไตล์หลักสำหรับหน้า Gate และรายชื่อสมาชิก</p></div></div>
          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(gangThemes).map(([key, theme]) => {
              const isVipLocked = key === "mono" && !settings.isVip;
              const isCurrentTheme = settings.theme === key || (!settings.theme && key === "default");
              const disabled = isVipLocked && !isCurrentTheme;

              return (
                <label key={key} className={`group ${disabled ? "cursor-not-allowed opacity-90" : "cursor-pointer"}`}>
                  <input type="radio" name="theme" value={key} defaultChecked={isCurrentTheme} className="peer sr-only" disabled={disabled} />
                  <span className={`block rounded-2xl border bg-[#0a0a0a] p-3 transition ${
                    disabled 
                      ? "border-yellow-500/40 bg-yellow-500/5 shadow-[0_0_15px_rgba(234,179,8,0.1)]" 
                      : "border-white/10 group-hover:border-white/25 peer-checked:border-[#0084ff] peer-checked:bg-[#0084ff]/10"
                  }`}>
                    <span className="relative flex h-20 items-center justify-center overflow-hidden rounded-xl" style={{ background: theme.preview }}>
                      {disabled && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]">
                          <Crown className="size-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
                        </div>
                      )}
                    </span>
                    <span className="mt-3 flex items-center gap-1.5 text-[11px] font-[900] text-white">
                      {theme.name}
                      {key === "mono" && <Crown className="size-3 text-yellow-500" />}
                    </span>
                    <span className="mt-1 block text-[10px] text-[#777]">
                      {isVipLocked ? (isCurrentTheme ? "เฉพาะ VIP (คุณได้รับสิทธิ์ใช้งานต่อ)" : "ล็อคเฉพาะ VIP เท่านั้น") : theme.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Platform Configuration */}
        <div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden">
          <div className="bg-[#0a0a0a] p-[18px] border-b border-[#111111] flex items-center gap-[12px]">
            <Sliders className="w-[18px] h-[18px] text-[#0084ff]" />
            <h3 className="text-[14px] font-[900] tracking-[1.8px] text-text-inverse">ตั้งค่าหน้าเว็บไซต์</h3>
          </div>
          <div className="p-[27px] space-y-[18px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
              <ButtonSettings 
                initialText={settings.buttonText} 
                initialImage={settings.buttonImage} 
                initialShape={settings.buttonShape} 
              />
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">ชื่อหน้าเว็บไซต์</p>
                <input type="text" name="pageTitle" defaultValue={settings.pageTitle} className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
              </div>
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">คำโปรยใต้ชื่อเว็บไซต์</p>
                <input type="text" name="pageSubtitle" defaultValue={settings.pageSubtitle} className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">ลิงก์ไอคอนเว็บไซต์ (Favicon)</p>
                <input type="text" name="faviconUrl" defaultValue={settings.faviconUrl} placeholder="https://example.com/icon.png" className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
                <p className="text-[10px] text-[#666666] mt-[6px]">รองรับ PNG, JPG, WEBP หรือ ICO หลังบันทึกให้รีเฟรชหน้าเว็บไซต์หนึ่งครั้งเพื่อดูไอคอนใหม่บนแท็บ</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">รูปภาพ หรือ วิดีโอพื้นหลัง (หน้า Gate)</p>
                <input type="text" name="backgroundImageUrl" defaultValue={settings.backgroundImageUrl} placeholder="https://example.com/bg.jpg หรือ https://youtu.be/..." className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">รูปภาพ หรือ วิดีโอพื้นหลัง (หน้า Members)</p>
                <input type="text" name="membersBackgroundImageUrl" defaultValue={settings.membersBackgroundImageUrl} placeholder="https://example.com/bg2.jpg หรือ https://youtu.be/..." className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
                <p className="text-[10px] text-[#666666] mt-[6px]">รองรับลิงก์ YouTube และ GIF หากเว้นว่างไว้จะใช้พื้นหลังสีเทาเริ่มต้น</p>
              </div>
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">สีข้อความ (Hex, rgba หรือเว้นว่างไว้)</p>
                <input type="text" name="textColor" defaultValue={settings.textColor} placeholder="#ffffff" className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
              </div>
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">รูปแบบฟอนต์</p>
                <select name="fontFamily" defaultValue={settings.fontFamily || "sans"} className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none">
                  <option value="sans">Sans-serif (Modern)</option>
                  <option value="serif">Serif (Classic)</option>
                  <option value="mono">Monospace (Code)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Effects */}
        <div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden">
          <div className="bg-[#0a0a0a] p-[18px] border-b border-[#111111] flex items-center gap-[12px]">
            <Sliders className="w-[18px] h-[18px] text-[#0084ff]" />
            <h3 className="text-[14px] font-[900] tracking-[1.8px] text-text-inverse">เอฟเฟกต์หน้า Gate (Visual Effects)</h3>
          </div>
          <div className="p-[27px] space-y-[18px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">เอฟเฟกต์พื้นหลัง</p>
                <select name="particleEffect" defaultValue={settings.particleEffect || "none"} className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none">
                  <option value="none">ไม่มี (None)</option>
                  <option value="matrix">เดอะเมทริกซ์ (Matrix Rain)</option>
                  <option value="snow">หิมะ/เถ้าถ่าน (Snow/Ash)</option>
                  <option value="orbs">หิ่งห้อยลอย (Glowing Orbs)</option>
                  <option value="scanlines">เส้นสแกนทีวี (Retro Scanlines)</option>
                </select>
              </div>
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">แอนิเมชันเปิดตัวอักษร</p>
                <select name="entryAnimation" defaultValue={settings.entryAnimation || "fade"} className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none">
                  <option value="fade">ค่อยๆ ลอยขึ้น (Fade Up)</option>
                  <option value="typewriter">พิมพ์ดีด (Typewriter)</option>
                  <option value="glitch">จอกระตุก (Cyberpunk Glitch)</option>
                </select>
              </div>
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">สีเรืองแสง (Hex) ทับสีธีม</p>
                <input type="text" name="customAccentColor" defaultValue={settings.customAccentColor} placeholder="#00ff00" className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
              </div>
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">รูปแบบเมาส์ (Cursor)</p>
                <select name="customCursor" defaultValue={settings.customCursor || "default"} className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none">
                  <option value="default">ปกติ (Default)</option>
                  <option value="crosshair">เป้าเล็ง (Crosshair)</option>
                  <option value="glow">ไฟส่อง (Glow Trail)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Socials & Logo */}
        <div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden">
          <div className="bg-[#0a0a0a] p-[18px] border-b border-[#111111] flex items-center gap-[12px]">
            <Sliders className="w-[18px] h-[18px] text-[#0084ff]" />
            <h3 className="text-[14px] font-[900] tracking-[1.8px] text-text-inverse">โลโก้และโซเชียลมีเดีย</h3>
          </div>
          <div className="p-[27px] space-y-[18px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
              <div className="sm:col-span-2">
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">รูปลิงก์โลโก้แก๊ง (จะโชว์กลางหน้าจอ)</p>
                <input type="text" name="logoUrl" defaultValue={settings.logoUrl} placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
              </div>
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">Discord URL</p>
                <input type="url" name="discordUrl" defaultValue={settings.discordUrl} placeholder="https://discord.gg/..." className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
              </div>
              <div>
                <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">Facebook URL</p>
                <input type="url" name="facebookUrl" defaultValue={settings.facebookUrl} placeholder="https://facebook.com/..." className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
              </div>
            </div>
          </div>
        </div>

        </SettingsFormWrapper>
        
        {/* Danger Zone */}
        <div className="bg-[#0a0000] border border-[#ff0000]/30 rounded-[18px] overflow-hidden mt-[36px]">
          <div className="bg-[#1a0000] p-[18px] border-b border-[#ff0000]/30 flex items-center gap-[12px]">
            <h3 className="text-[14px] font-[900] tracking-[1.8px] text-[#ff4444]">พื้นที่อันตราย (Danger Zone)</h3>
          </div>
          <div className="p-[27px]">
            <p className="text-[12px] text-[#ff8888] mb-[18px]">
              การยุบแก๊งจะลบข้อมูลหน้าเว็บไซต์และสมาชิกทั้งหมดอย่างถาวร 
              โดเมน (ชื่อเว็บ) นี้จะถูกปล่อยว่างเพื่อให้คนอื่นสามารถใช้งานได้ 
              <strong> ต้องสร้างแก๊งมาแล้วอย่างน้อย 3 วันจึงจะสามารถยุบได้</strong>
            </p>
            <DeleteGangButton gangName={settings.pageTitle} deleteAction={async () => {
              "use server";
              const { deleteGangAction } = await import("@/actions/settings");
              await deleteGangAction();
              const { redirect } = await import("next/navigation");
              redirect("/");
            }} />
          </div>
        </div>
    </div>
  );
}


