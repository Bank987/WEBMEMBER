import Link from "next/link";
import { Command, ChevronLeft, Lock } from "lucide-react";
import { BackgroundEffects } from "@/components/BackgroundEffects";

export const metadata = {
  title: "ความปลอดภัย (Security) | GANGLIST",
  description: "ระบบความปลอดภัยของแพลตฟอร์ม GANGLIST",
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-[#f5f7fa] selection:bg-[#0084ff] selection:text-white font-sans">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#000000]" />
        <BackgroundEffects type="snow" />
        <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-[100%] bg-[#0084ff]/10 blur-[150px] mix-blend-screen" />
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
            <Lock className="size-3 text-[#0084ff]" />
            <span className="text-[10px] font-bold tracking-[0.1em] text-[#0084ff] uppercase">Security</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-[900] text-white tracking-tight mb-4">
            ความปลอดภัยของเรา
          </h1>
          <p className="text-white/40 text-sm">แพลตฟอร์มที่ออกแบบมาเพื่อให้คุณมั่นใจในทุกการใช้งาน</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed font-light">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">โครงสร้างความปลอดภัย (Infrastructure Security)</h2>
            <p className="mb-4">
              ระบบ GANGLIST ถูกโฮสต์บนเซิร์ฟเวอร์คลาวด์ที่มีมาตรฐานระดับสากล พร้อมระบบป้องกันการโจมตีแบบ DDoS 
              (Distributed Denial of Service) ในระดับเครือข่าย เรามีการตรวจสอบและปิดกั้น IP Address ที่มีพฤติกรรมผิดปกติโดยอัตโนมัติ 
              รวมถึงการจำกัดคำขอเข้าใช้งาน (Rate Limiting) เพื่อป้องกันการโจมตีระบบและ API
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">การเข้ารหัสและป้องกันข้อมูล (Data Protection & Encryption)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>การเชื่อมต่อทั้งหมดไปยังแพลตฟอร์มใช้เทคโนโลยี HTTPS (SSL/TLS) แบบเข้ารหัส เพื่อป้องกันการดักจับข้อมูล</li>
              <li>ข้อมูลที่มีความละเอียดอ่อน เช่น รหัสผ่าน หรือ Recovery PIN จะถูกแฮช (Hashed) ด้วยอัลกอริทึมที่ปลอดภัย และไม่มีการเก็บเป็นข้อความธรรมดา (Plain text) ในฐานข้อมูล</li>
              <li>การตรวจสอบการเข้าถึงด้วยระบบ Token-based Authentication ควบคู่กับการทำ Server-side validation เพื่อให้แน่ใจว่าคุณมีสิทธิในการแก้ไขข้อมูล</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">การป้องกันการปลอมแปลง (CSRF & XSS Protection)</h2>
            <p className="mb-4">
              คำขอปรับเปลี่ยนข้อมูลจากฝั่งผู้ดูแลระบบ (Admin) หรือจากสมาชิกทั้งหมด จะต้องผ่านระบบตรวจสอบ Origin เสมอ 
              (CSRF Protection) เรามีมาตรการคัดกรองข้อมูลนำเข้าที่เข้มงวด (Sanitization) เพื่อป้องกันการโจมตีแบบ Cross-Site Scripting (XSS)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">ความเป็นส่วนตัวของหลังบ้าน (Private Admin Panel)</h2>
            <p className="mb-4">
              หน้าระบบหลังบ้านถูกป้องกันอย่างแน่นหนา ข้อมูล Session ของการล็อกอินถูกตั้งค่าอายุการใช้งานจำกัด และถูกตรวจสอบ 
              IP Address ของผู้ใช้งาน เพื่อลดโอกาสในการถูกขโมยบัญชี และมีการใช้ระบบยืนยันตัวตนที่ปลอดภัย
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