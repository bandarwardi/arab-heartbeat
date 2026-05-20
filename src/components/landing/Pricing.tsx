import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

type DBPlan = {
  id: string;
  title: string;
  durationLabel: string;
  basePrice: number;
  badge?: string;
  highlight?: boolean;
  perks: string[];
};

const DEFAULT_PLANS = [
  {
    title: "الشهرية",
    durationLabel: "شهر واحد",
    basePrice: 12,
    badge: "",
    highlight: false,
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
    perks: [
      "جودة بث فائقة الوضوح",
      "تفعيل فوري بعد الدفع",
      "تجديد سهل من لوحة التحكم",
      "دعم فني على مدار الساعة",
      "إشعارات لحظية بحالة الاشتراك",
    ],
  },
];

const connectionOptions = [1, 2, 3, 5];

export function Pricing() {
  const [connections, setConnections] = useState(1);
  const [plans, setPlans] = useState<DBPlan[] | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const db = getDb();
        let snap = await getDocs(collection(db, "plans"));

        // Seed default plans if collection is empty
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
        console.error("Failed to load plans from Firestore:", e);
      }
    })();
  }, []);

  const handleSubscribe = (planId: string) => {
    const checkoutUrl = `/checkout?planId=${planId}&connections=${connections}`;
    if (user) {
      navigate({
        to: "/checkout",
        search: { planId, connections },
      });
    } else {
      navigate({
        to: "/login",
        search: { redirect: checkoutUrl },
      });
    }
  };

  const items = useMemo(() => {
    if (!plans) return [];
    return plans.map((p) => ({ ...p, total: p.basePrice * connections }));
  }, [plans, connections]);

  return (
    <section id="pricing" className="relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[400px] max-w-3xl -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            الأسعار
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            خطط مرنة تناسب الجميع
          </h2>
          <p className="mt-4 text-muted-foreground">
            اختر عدد الأجهزة المتزامنة، وسيتم احتساب السعر تلقائياً.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <span className="text-sm text-muted-foreground">عدد الأجهزة</span>
          <div className="inline-flex rounded-full border border-white/10 bg-card/60 p-1 backdrop-blur">
            {connectionOptions.map((n) => (
              <button
                key={n}
                onClick={() => setConnections(n)}
                className={cn(
                  "min-w-14 rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer",
                  connections === n
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 justify-center">
          {plans === null ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            items.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-card/60 p-6 backdrop-blur transition",
                  p.highlight
                    ? "border-primary/60 bg-card shadow-xl shadow-primary/10 lg:-translate-y-2"
                    : "border-white/10 hover:border-white/20",
                )}
              >
                {p.badge && (
                  <span
                    className={cn(
                      "absolute -top-3 start-6 rounded-full px-3 py-1 text-[11px] font-bold",
                      p.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 text-foreground",
                    )}
                  >
                    {p.badge}
                  </span>
                )}

                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.durationLabel}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">${p.total}</span>
                  <span className="text-sm text-muted-foreground">/ الفترة</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  ${p.basePrice} × {connections}{" "}
                  {connections === 1 ? "جهاز" : "أجهزة"}
                </p>

                <ul className="mt-6 space-y-3 text-sm flex-1">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{perk}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "mt-8 w-full font-semibold cursor-pointer",
                    !p.highlight && "bg-white/10 text-foreground hover:bg-white/15",
                  )}
                  variant={p.highlight ? "default" : "secondary"}
                  onClick={() => handleSubscribe(p.id)}
                >
                  اشترك الآن
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}