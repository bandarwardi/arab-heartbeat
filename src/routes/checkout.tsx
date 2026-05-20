import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/app/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { getPaddle, PADDLE_PRICES } from "@/lib/paddle";
import { getDb } from "@/lib/firebase";
import { CheckCircle2, Loader2, Sparkles, Check, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      planId: (search.planId as string) || "",
      connections: Number(search.connections) || 1,
    };
  },
  head: () => ({ meta: [{ title: "مراجعة الطلب وإتمام الدفع — EN TEC" }] }),
});

function CheckoutPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <Inner />
      </AppShell>
    </ProtectedRoute>
  );
}

interface DBPlan {
  id: string;
  title: string;
  durationLabel: string;
  basePrice: number;
  badge?: string;
  highlight?: boolean;
  perks: string[];
  connections?: number;
  paddlePriceId?: string;
}

function Inner() {
  const { planId, connections } = Route.useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<DBPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!planId) {
      toast.error("لم يتم تحديد أي باقة");
      navigate({ to: "/" });
      return;
    }

    (async () => {
      try {
        const db = getDb();
        const docSnap = await getDoc(doc(db, "plans", planId));
        if (docSnap.exists()) {
          setPlan({ id: docSnap.id, ...docSnap.data() } as DBPlan);
        } else {
          toast.error("الباقة المحددة غير موجودة");
          navigate({ to: "/" });
        }
      } catch (e) {
        console.error("Failed to load plan for checkout:", e);
        toast.error("فشل تحميل تفاصيل الباقة");
      } finally {
        setLoading(false);
      }
    })();
  }, [planId]);

  useEffect(() => {
    if (!user) return;
    getPaddle(async (event: any) => {
      const name = event?.name as string | undefined;
      if (!name) return;
      if (name === "checkout.completed") {
        try {
          const db = getDb();
          const totalPrice = plan ? plan.basePrice * connections : 0;
          await updateDoc(doc(db, "users", user.uid), {
            subscriptionStatus: "active",
            subscriptionUpdatedAt: serverTimestamp(),
            paddleTransactionId: event?.data?.transaction_id ?? null,
            paddleCustomerId: event?.data?.customer?.id ?? null,
            planId: plan?.id ?? null,
            planTitle: plan?.title ?? null,
            planDuration: plan?.durationLabel ?? null,
            connections: connections,
            price: totalPrice,
          });
          toast.success("تم تفعيل اشتراكك بنجاح 🎉");
          navigate({ to: "/dashboard" });
        } catch (e) {
          console.error("Failed to update user profile on checkout success:", e);
        }
      } else if (name === "checkout.closed") {
        setBusy(false);
      }
    });
  }, [user, plan, connections]);

  async function handleCheckout() {
    if (!user || !plan) return;

    // Use specific plan paddlePriceId if available, or fallback to connection-based
    const connectionsStr = connections.toString();
    const priceId = plan.paddlePriceId || PADDLE_PRICES[connectionsStr];

    if (!priceId) {
      toast.error("هذه الخطة غير مهيّأة بعد. يلزم إضافة Price ID في Paddle.");
      return;
    }

    setBusy(true);
    const paddle = await getPaddle();
    if (!paddle) {
      toast.error("تعذّر تحميل بوابة دفع Paddle");
      setBusy(false);
      return;
    }

    const totalPrice = plan.basePrice * connections;

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email: user.email ?? "" },
      customData: {
        uid: user.uid,
        planId: plan.id,
        planTitle: plan.title,
        planDuration: plan.durationLabel,
        connections: connections,
        price: totalPrice,
      },
      settings: {
        displayMode: "overlay",
        theme: "dark",
        locale: "ar",
        successUrl: `${window.location.origin}/dashboard`,
      },
    });
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">جارٍ تحميل تفاصيل الطلب...</p>
      </div>
    );
  }

  if (!plan) return null;

  const totalPrice = plan.basePrice * connections;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate({ to: "/" })}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer -ms-3"
      >
        <ArrowRight className="h-4 w-4" />
        الرجوع للرئيسية
      </Button>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">مراجعة الطلب</h1>
        <p className="text-sm text-muted-foreground">
          يرجى مراجعة تفاصيل اشتراكك وباقة الدفع قبل الانتقال لبوابة الدفع الآمنة.
        </p>
      </div>

      {/* Main Order Card */}
      <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md overflow-hidden">
        {/* Header */}
        <div className="bg-white/5 border-b border-white/10 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">{plan.title}</h3>
              <p className="text-xs text-muted-foreground">{plan.durationLabel}</p>
            </div>
          </div>
          {plan.badge && (
            <span className="rounded-full bg-primary/20 border border-primary/30 text-primary px-3 py-0.5 text-xs font-semibold">
              {plan.badge}
            </span>
          )}
        </div>

        {/* Details List */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">نوع الاشتراك</span>
              <span className="font-medium">{plan.title}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">عدد الأجهزة المتزامنة</span>
              <span className="font-medium">{connections} {connections === 1 ? "جهاز" : "أجهزة"}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">تكلفة الجهاز الواحد</span>
              <span className="font-medium">${plan.basePrice} / للجهاز</span>
            </div>
            
            <div className="border-t border-white/5 pt-4 flex justify-between items-baseline">
              <span className="font-semibold text-base">المبلغ الإجمالي</span>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-primary">${totalPrice}</span>
                <span className="text-xs text-muted-foreground mr-1">/ {plan.durationLabel}</span>
              </div>
            </div>
          </div>

          {/* Perks */}
          <div className="border-t border-white/5 pt-6 space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              مميزات باقتك المشتركة
            </h4>
            <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 text-sm text-muted-foreground">
              {plan.perks.map((perk, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Safety Notice and Checkout button */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-foreground">دفع آمن ومحمي بالكامل</p>
            <p>
              يتم معالجة كافة المدفوعات والاشتراكات بشكل آمن ومشفّر عبر نظام **Paddle**، شريك معالجة المدفوعات المعتمد لدينا.
            </p>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={busy}
          className="w-full h-12 text-base font-bold flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
        >
          {busy ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CreditCard className="h-5 w-5" />
          )}
          {busy ? "يرجى الانتظار..." : `الانتقال للدفع الآمن بقيمة $${totalPrice}`}
        </Button>
      </div>
    </div>
  );
}
