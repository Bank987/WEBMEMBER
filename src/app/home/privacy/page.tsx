import Link from "next/link";
import { Command, ChevronLeft, ShieldCheck } from "lucide-react";
import { BackgroundEffects } from "@/components/BackgroundEffects";

export const metadata = {
  title: "นโยบายความเป็นส่วนตัว (Privacy Policy) | GANGLIST",
  description: "นโยบายความเป็นส่วนตัวของแพลตฟอร์ม GANGLIST",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-[#f5f7fa] selection:bg-[#0084ff] selection:text-white font-sans">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#000000]" />
        <BackgroundEffects type="snow" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-[100%] bg-[#0084ff]/10 blur-[120px] mix-blend-screen" />
      </div>

      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[900px] items-center px-6 py-8 md:px-10">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors">
            <ChevronLeft className="size-4" /> กลับสู่หน้าหลัก
          </Link>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20 px-6 md:px-10 mx-auto max-w-[900px]">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0084ff]/30 bg-black/50 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <ShieldCheck className="size-3 text-[#0084ff]" />
            <span className="text-[10px] font-bold tracking-[0.1em] text-[#0084ff] uppercase">Privacy Policy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-[900] text-white tracking-tight mb-4">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-white/40 text-sm">อัปเดตล่าสุด: กันยายน 2026</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed font-light">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. ข้อมูลที่เรารวบรวม</h2>
            <p className="mb-4">
              เรารวบรวมข้อมูลที่คุณให้ไว้โดยตรงเมื่อคุณสมัครใช้บริการ GANGLIST ได้แก่ ชื่อแก๊ง ข้อมูลสมาชิก ไอพีแอดเดรส (IP Address) 
              และข้อมูลการเข้าใช้งานระบบหลังบ้าน เพื่อให้เราสามารถให้บริการและปรับปรุงประสบการณ์ของคุณได้อย่างต่อเนื่อง
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. การใช้ข้อมูลของคุณ</h2>
            <p className="mb-4">
              ข้อมูลที่เราเก็บรวบรวมจะถูกนำไปใช้ในกรณีต่อไปนี้:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>เพื่อสร้างและจัดการหน้าเว็บไซต์รายชื่อแก๊งของคุณ</li>
              <li>เพื่อยืนยันตัวตนในการเข้าสู่ระบบหลังบ้าน (Admin Panel)</li>
              <li>เพื่อตรวจสอบการละเมิดกฎหรือป้องกันการโจมตีทางไซเบอร์ (Security & WAF)</li>
              <li>เพื่อพัฒนาและปรับปรุงฟีเจอร์ใหม่ๆ บนแพลตฟอร์ม</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. การรักษาความปลอดภัยของข้อมูล</h2>
            <p className="mb-4">
              เรารักษาความปลอดภัยของข้อมูลคุณโดยใช้การเข้ารหัส (Encryption) ในข้อมูลที่ละเอียดอ่อน เช่น รหัสผ่าน หรือ PIN ที่ใช้ในการเข้าสู่ระบบ
              ระบบของเรามีการป้องกันการโจมตีแบบ Brute Force และมีการจำกัดการเข้าถึงหลังบ้านเฉพาะผู้ที่ได้รับอนุญาตเท่านั้น
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. การแบ่งปันข้อมูล</h2>
            <p className="mb-4">
              เราจะไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม ข้อมูลรายชื่อสมาชิกและแก๊งจะถูกเปิดเผยต่อสาธารณะบนซับโดเมนของคุณเอง 
              ตามที่คุณได้ทำการตั้งค่าไว้ในระบบหลังบ้าน
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. ติดต่อเรา</h2>
            <p className="mb-4">
              หากคุณมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ สามารถติดต่อทีมงานของเราได้ที่ช่องทาง Discord Support ของ GANGLIST
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#020202] py-12 text-center relative z-10 flex flex-col items-center gap-6 mt-20">
        <Link href="/" className="flex items-center gap-2 text-[14px] font-[900] tracking-[2px] text-white/30 uppercase hover:text-[#0084ff] transition-colors">
          <Command className="size-4" /> GANGLIST
        </Link>
        <p className="text-[10px] font-[900] tracking-[2px] text-[#555] uppercase mt-2">
          © 2026 LASTNAME.SITE
        </p>
      </footer>
    </div>
  );
}