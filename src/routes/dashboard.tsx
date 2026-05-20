import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/app/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, CreditCard, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { toast } from "sonner";

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
  const { profile, user, reloadProfile } = useAuth();
  const [canceling, setCanceling] = useState(false);
  const active =
    profile?.subscriptionStatus === "active" ||
    profile?.subscriptionStatus === "trialing";

  async function handleCancelSubscription() {
    if (!user) return;
    if (!confirm("هل تريد فعلاً إلغاء اشتراكك؟")) return;
    setCanceling(true);
    try {
      const db = getDb();
      await updateDoc(doc(db, "users", user.uid), {
        subscriptionStatus: "canceled",
        subscriptionUpdatedAt: serverTimestamp(),
      });
      toast.success("تم إلغاء الاشتراك بنجاح");
      if (reloadProfile) {
        await reloadProfile();
      }
    } catch (e) {
      toast.error("فشل إلغاء الاشتراك");
      console.error("Cancellation error:", e);
    } finally {
      setCanceling(false);
    }
  }

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

        <div className="rounded-2xl border border-white/10 bg-card/40 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-primary">
              <CreditCard className="h-5 w-5" />
              <h2 className="font-semibold">حالة الاشتراك</h2>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              {active ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="font-semibold text-emerald-400">
                    مفعّل ({profile?.subscriptionStatus === "active" ? "نشط" : profile?.subscriptionStatus})
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

            {active && (
              <dl className="mt-6 space-y-3 text-sm border-t border-white/5 pt-4">
                {profile?.planTitle && (
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <dt className="text-muted-foreground font-medium">الباقة الحالية</dt>
                    <dd className="font-semibold text-white">{profile.planTitle}</dd>
                  </div>
                )}
                {profile?.connections && (
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <dt className="text-muted-foreground font-medium">عدد الأجهزة</dt>
                    <dd className="font-semibold text-white">
                      {profile.connections} {profile.connections === 1 ? "جهاز" : "أجهزة"}
                    </dd>
                  </div>
                )}
                {profile?.price && (
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <dt className="text-muted-foreground font-medium">قيمة الاشتراك</dt>
                    <dd className="font-semibold text-primary">${profile.price}</dd>
                  </div>
                )}
                {profile?.paddleTransactionId && (
                  <div className="flex justify-between pb-2 last:border-0">
                    <dt className="text-muted-foreground font-medium">معرف المعاملة</dt>
                    <dd className="font-mono text-xs text-muted-foreground max-w-[150px] truncate" title={profile.paddleTransactionId}>
                      {profile.paddleTransactionId}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </div>
          
          <div className="mt-6">
            {active ? (
              <Button
                variant="destructive"
                onClick={handleCancelSubscription}
                disabled={canceling}
                className="cursor-pointer"
              >
                {canceling && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                إلغاء الاشتراك
              </Button>
            ) : (
              <a href="/#pricing">
                <Button className="cursor-pointer">اشترك الآن</Button>
              </a>
            )}
          </div>
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