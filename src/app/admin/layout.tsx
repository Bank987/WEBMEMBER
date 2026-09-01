import { getAuthenticatedGang } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ForcePinSetup } from "@/components/ForcePinSetup";
import { setupRecoveryPin } from "@/actions/setup-pin";
import { AdminSidebar } from "@/components/AdminSidebar";
import { RenewalBanner } from "@/components/RenewalBanner";
import { RenewalAnnouncementModal } from "@/components/RenewalAnnouncementModal";
import { getRentalStatus } from "@/lib/rental";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");

  // Calculate rental status
  const rental = getRentalStatus(gang);

  // Formatting date for Thai display
  const expiresAtStr = rental.expiresAt.toLocaleDateString('th-TH', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Show banner only in grace period AND not yet notified (dismiss = once only)
  const showRenewalBanner = rental.status === "grace" && !gang.renewalNotifiedAt;

  // Show announcement modal only if they haven't seen it yet
  const showAnnouncement = !gang.renewalAnnouncementSeen;

  // Pass necessary gang data to Client Component
  const gangData = {
    pageTitle: gang.pageTitle,
    subdomain: gang.subdomain,
    isVip: gang.isVip
  };

  return (
    <div className="min-h-screen bg-[#080a0e] text-text-primary flex font-sans">
      <ForcePinSetup requirePin={!gang.recoveryPin} setupAction={setupRecoveryPin} />
      {showAnnouncement && <RenewalAnnouncementModal expiresAtStr={expiresAtStr} isVip={!!gang.isVip} />}
      
      <AdminSidebar gang={gangData} />

      {/* Main Content */}
      <main className="relative flex-1 overflow-x-hidden overflow-y-auto bg-[#080a0e] p-5 md:p-10 pt-20 lg:pt-10">
        <div className="mx-auto max-w-6xl">
          {showRenewalBanner && (
            <RenewalBanner daysRemaining={rental.daysRemaining} />
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
