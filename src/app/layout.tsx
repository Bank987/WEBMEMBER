import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  subsets: ["latin", "thai"],
  weight: ["400", "700"],
  variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
  title: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1",
  description: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1 สร้างเว็บไซต์แก๊งพร้อมระบบจัดการสมาชิกและหลังบ้านส่วนตัว",
  openGraph: {
    title: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1",
    description: "สร้างเว็บรายชื่อแก๊ง พร้อมระบบจัดการสมาชิกและหลังบ้านส่วนตัว",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${chakraPetch.variable}`}>
      <body className="antialiased bg-[#0a0a0a] text-[#ededed] font-sans">
        {children}
      </body>
    </html>
  );
}
