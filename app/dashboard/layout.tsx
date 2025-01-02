import { DashboardSidebar } from "@/components/dashboard/layout/sidebar";
import { DashboardHeader } from "@/components/dashboard/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}