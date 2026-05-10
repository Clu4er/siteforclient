import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Админка CMS",
  description: "Серверная админка для управления контентом сайта и входящими заявками.",
  path: "/admin",
});

export default function AdminPage() {
  return (
    <main className="admin-page">
      <div className="shell">
        <AdminDashboard />
      </div>
    </main>
  );
}
