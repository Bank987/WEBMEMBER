import { getAuthenticatedGang } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ForcePinSetup } from "@/components/ForcePinSetup";
import { setupRecoveryPin } from "@/actions/setup-pin";
import { AdminSidebar } from "@/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");

  // Pass necessary gang data to Client Component
  const gangData = {
    pageTitle: gang.pageTitle,
    subdomain: gang.subdomain,
    isVip: gang.isVip
  };

  return (
    <div className="min-h-screen bg-[#080a0e] text-text-primary flex font-sans">
      <ForcePinSetup requirePin={!gang.recoveryPin} setupAction={setupRecoveryPin} />
      
      <AdminSidebar gang={gangData} />

      {/* Main Content */}
      <main className="relative flex-1 overflow-x-hidden overflow-y-auto bg-[#080a0e] p-5 md:p-10 pt-20 lg:pt-10">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
