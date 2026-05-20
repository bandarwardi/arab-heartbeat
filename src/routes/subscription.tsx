import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { doc, updateDoc, serverTimestamp, collection, getDocs, addDoc } from "firebase/firestore";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/app/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { getPaddle, PADDLE_PRICES } from "@/lib/paddle";
import { getDb } from "@/lib/firebase";
import { CheckCircle2, Loader2, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/subscription")({
  component: SubscriptionPage,
  head: () => ({ meta: [{ title: "اشتراكي — EN TEC" }] }),
});

function SubscriptionPage() {
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

const DEFAULT_PLANS = [
  {
    title: "الشهرية",
    durationLabel: "شهر واحد",
    basePrice: 12,
    badge: "",
    highlight: false,
    connections: 1,
    perks: [
      "جودة بث فائقة الوضوح",
      "تفعيل فوري بعد الدفع",
      "تجديد سهل من لوحة التحكم",
      "دعم فني على مدار الساعة",
      "إشعارات لحظية بحالة الاشتراك",
    ],
  },
  {
    title: "الربع سنوية",
    durationLabel: "3 أشهر",
    basePrice: 30,
    badge: "وفّر 17%",
    highlight: false,
    connections: 1,
    perks: [
      "جودة بث فائقة الوضوح",
      "تفعيل فوري بعد الدفع",
      "تجديد سهل من لوحة التحكم",
      "دعم فني على مدار الساعة",
      "إشعارات لحظية بحالة الاشتراك",
    ],
  },
  {
    title: "النصف سنوية",
    durationLabel: "6 أشهر",
    basePrice: 55,
    badge: "وفّر 24%",
    highlight: true,
    connections: 1,
    perks: [
      "جودة بث فائقة الوضوح",
      "تفعيل فوري بعد الدفع",
      "تجديد سهل من لوحة التحكم",
      "دعم فني على مدار الساعة",
      "إشعارات لحظية بحالة الاشتراك",
    ],
  },
  {
    title: "السنوية",
    durationLabel: "12 شهر",
    basePrice: 99,
    badge: "الأفضل قيمة",
    highlight: false,
    connections: 1,
    perks: [
      "جودة بث فائقة الوضوح",
      "تفعيل فوري بعد الدفع",
      "تجديد سهل من لوحة التحكم",
      "دعم فني على مدار الساعة",
      "إشعارات لحظية بحالة الاشتراك",
    ],
  },
];

function Inner() {
  const { user, profile } = useAuth();
  const [plans, setPlans] = useState<DBPlan[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const active =
    profile?.subscriptionStatus === "active" ||
    profile?.subscriptionStatus === "trialing";

  useEffect(() => {
    (async () => {
      try {
        const db = getDb();
        let snap = await getDocs(collection(db, "plans"));

        // Seed if empty
        if (snap.empty) {
          for (const plan of DEFAULT_PLANS) {
            await addDoc(collection(db, "plans"), {
              ...plan,
              createdAt: serverTimestamp(),
            });
          }
          snap = await getDocs(collection(db, "plans"));
        }

        setPlans(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as DBPlan[]
        );
      } catch (e) {
        console.error("Failed to fetch plans on subscription page:", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    getPaddle(async (event: any) => {
      const name = event?.name as string | undefined;
      if (!name) return;
      if (name === "checkout.completed") {
        try {
          const db = getDb();
          await updateDoc(doc(db, "users", user.uid), {
            subscriptionStatus: "active",
            subscriptionUpdatedAt: serverTimestamp(),
            paddleTransactionId: event?.data?.transaction_id ?? null,
            paddleCustomerId: event?.data?.customer?.id ?? null,
          });
          toast.success("تم تفعيل اشتراكك بنجاح 🎉");
        } catch (e) {
          console.error(e);
        }
      } else if (name === "checkout.closed") {
        setBusy(null);
      }
    });
  }, [user]);

  async function checkout(plan: DBPlan) {
    if (!user) return;

    // Use specific plan paddlePriceId if available, or fallback to connection-based
    const connectionsStr = (plan.connections || 1).toString();
    const priceId = plan.paddlePriceId || PADDLE_PRICES[connectionsStr];

    if (!priceId) {
      toast.error("هذه الخطة غير مهيّأة بعد. يلزم إضافة Price ID في Paddle.");
      return;
    }

    setBusy(plan.id);
    const paddle = await getPaddle();
    if (!paddle) {
      toast.error("تعذّر تحميل Paddle");
      setBusy(null);
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email: user.email ?? "" },
      customData: { uid: user.uid },
      settings: {
        displayMode: "overlay",
        theme: "dark",
        locale: "ar",
        successUrl: `${window.location.origin}/dashboard`,
      },
    });
  }

  async function cancel() {
    if (!user) return;
    if (!confirm("هل تريد فعلاً إلغاء اشتراكك؟")) return;
    try {
      const db = getDb();
      await updateDoc(doc(db, "users", user.uid), {
        subscriptionStatus: "canceled",
        subscriptionUpdatedAt: serverTimestamp(),
      });
      toast.success("تم تسجيل إلغاء الاشتراك");
    } catch (e) {
      toast.error("فشل الإلغاء");
      console.error(e);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">إدارة الاشتراك</h1>
        <p className="mt-2 text-muted-foreground">
          {active
            ? "اشتراكك مفعّل. يمكنك الترقية أو الإلغاء في أي وقت."
            : "اختر الباقة والاشتراك الأنسب لك وادفع بأمان عبر Paddle."}
        </p>
      </div>

      {active && (
        <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <div>
              <p className="font-semibold">الاشتراك الحالي نشط</p>
              <p className="text-sm text-muted-foreground">
                الحالة: {profile?.subscriptionStatus === "active" ? "نشط" : profile?.subscriptionStatus}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={cancel} className="cursor-pointer">
            إلغاء الاشتراك
          </Button>
        </div>
      )}

      {plans === null ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => {
            const connectionsStr = (p.connections || 1).toString();
            const priceId = p.paddlePriceId || PADDLE_PRICES[connectionsStr];
            const configured = !!priceId;

            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl border bg-card/40 p-6 transition ${
                  p.highlight ? "border-primary bg-card/60 shadow-lg shadow-primary/5" : "border-white/10"
                }`}
              >
                {p.badge && (
                  <span
                    className={`absolute -top-3 start-6 rounded-full px-3 py-0.5 text-[10px] font-bold ${
                      p.highlight ? "bg-primary text-primary-foreground" : "bg-white/15 text-foreground"
                    }`}
                  >
                    {p.badge}
                  </span>
                )}

                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <h3 className="font-semibold">{p.title}</h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.durationLabel}</p>

                <div className="mt-4">
                  <span className="text-3xl font-bold">${p.basePrice}</span>
                  <span className="mr-1 text-xs text-muted-foreground">/ الفترة</span>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">
                  عدد الاتصالات: {p.connections || 1}
                </div>

                <ul className="mt-6 flex-1 space-y-2 text-xs text-muted-foreground border-t border-white/5 pt-4">
                  {p.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-6 w-full cursor-pointer"
                  disabled={!configured || busy === p.id}
                  onClick={() => checkout(p)}
                >
                  {busy === p.id ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {active ? "ترقية" : configured ? "اشترك الآن" : "قريباً"}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        💡 لاحقاً سنضيف webhook على الخادم للتحقق الفعلي من Paddle وتحديث Firestore
        بشكل آمن (تجديد، فشل دفع، إلغاء فعلي).
      </p>
    </div>
  );
}