import { createFileRoute, Link } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/app/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, CreditCard, User } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "لوحتي — EN TEC" }] }),
});

function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <Inner />
      </AppShell>
    </ProtectedRoute>
  );
}

function Inner() {
  const { profile, user } = useAuth();
  const active =
    profile?.subscriptionStatus === "active" ||
    profile?.subscriptionStatus === "trialing";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          مرحباً، {profile?.displayName ?? user?.email}
        </h1>
        <p className="mt-2 text-muted-foreground">
          نظرة سريعة على حسابك واشتراكك في EN TEC.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-card/40 p-6">
          <div className="flex items-center gap-3 text-primary">
            <User className="h-5 w-5" />
            <h2 className="font-semibold">معلومات الحساب</h2>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="البريد" value={profile?.email ?? "-"} />
            <Row label="الاسم" value={profile?.displayName ?? "-"} />
            <Row label="الدور" value={profile?.role ?? "user"} />
          </dl>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card/40 p-6">
          <div className="flex items-center gap-3 text-primary">
            <CreditCard className="h-5 w-5" />
            <h2 className="font-semibold">حالة الاشتراك</h2>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            {active ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="font-semibold text-emerald-400">
                  مفعّل ({profile?.subscriptionStatus})
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-amber-400" />
                <span className="font-semibold text-amber-400">
                  لا يوجد اشتراك نشط
                </span>
              </>
            )}
          </div>
          <Link to="/subscription" className="mt-6 inline-block">
            <Button>{active ? "إدارة الاشتراك" : "اشترك الآن"}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}