import { SideNav } from '@/components/dashboard/side-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideNav />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}