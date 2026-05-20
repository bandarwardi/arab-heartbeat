import {
  Zap,
  ShieldCheck,
  Smartphone,
  Headphones,
  Sparkles,
  RefreshCcw,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "تفعيل فوري",
    desc: "بمجرد إتمام الدفع يتم تفعيل اشتراكك خلال دقائق دون انتظار.",
  },
  {
    icon: ShieldCheck,
    title: "أمان وخصوصية",
    desc: "دفع آمن عبر بوابة Paddle العالمية وحماية كاملة لبياناتك.",
  },
  {
    icon: Smartphone,
    title: "متعدد الأجهزة",
    desc: "اختر من 1 إلى 5 اتصالات تعمل بنفس الوقت على أجهزتك المختلفة.",
  },
  {
    icon: Headphones,
    title: "دعم على مدار الساعة",
    desc: "فريق دعم احترافي جاهز لمساعدتك في أي وقت وعبر قنوات متعددة.",
  },
  {
    icon: Sparkles,
    title: "تجربة فاخرة",
    desc: "واجهة عصرية وسلسة مع إشعارات لحظية ولوحة تحكم متكاملة.",
  },
  {
    icon: RefreshCcw,
    title: "تجديد ذكي",
    desc: "عند التجديد المبكر تُضاف الأيام المتبقية تلقائياً إلى اشتراكك الجديد.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            المميزات
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            لماذا EN TEC؟
          </h2>
          <p className="mt-4 text-muted-foreground">
            صُممت EN TEC لتقدّم لك تجربة بث رقمي متكاملة، آمنة، ومرنة تناسب احتياجاتك.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur transition hover:border-primary/40 hover:bg-card"
            >
              <div className="absolute -end-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}