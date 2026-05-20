import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Zap,
  Tv,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero-v2.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[10%] h-[520px] w-[520px] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-100px] left-[5%] h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8">
        {/* Right side (RTL = visual right) — copy */}
        <div className="relative text-center lg:text-start">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Sparkles className="h-3.5 w-3.5" />
            <span>الإصدار الجديد — تجربة أكثر فخامة وسلاسة</span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            بث رقمي بلا حدود،
            <span className="mt-2 block bg-gradient-to-l from-primary via-emerald-300 to-primary bg-clip-text text-transparent">
              بجودة سينمائية حقيقية.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            <span className="font-semibold text-foreground">EN TEC</span> منصة
            اشتراك واحدة تنقل أجهزتك إلى مستوى جديد من الترفيه — تفعيل فوري،
            خصوصية كاملة، ودعم لا يتوقّف.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button size="lg" className="font-semibold shadow-lg shadow-primary/25">
              ابدأ اشتراكك الآن
              <ArrowLeft className="ms-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 bg-white/5 backdrop-blur"
            >
              <PlayCircle className="me-2 h-5 w-5" />
              شاهد العرض
            </Button>
          </div>

          {/* mini stats row */}
          <div className="mt-10 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-card/40 p-4 backdrop-blur sm:gap-6 sm:p-5">
            <Stat value="+12k" label="مشترك نشط" />
            <div className="border-x border-white/10">
              <Stat value="99.9%" label="جاهزية الخدمة" />
            </div>
            <Stat value="4.9★" label="تقييم العملاء" />
          </div>
        </div>

        {/* Left side — hero visual */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/30 via-emerald-400/10 to-transparent blur-3xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-card shadow-2xl shadow-primary/20">
            <img
              src={heroImg}
              alt="منصة EN TEC للبث الرقمي متعددة الأجهزة"
              width={1600}
              height={1100}
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* floating badges */}
            <div className="absolute bottom-5 start-5 flex items-center gap-2 rounded-full border border-white/15 bg-background/70 px-3 py-1.5 text-xs backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4 text-primary" />
              دفع آمن ومضمون
            </div>
            <div className="absolute top-5 end-5 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-xl">
              <Zap className="h-4 w-4" />
              تفعيل فوري
            </div>
          </div>

          {/* side glass cards */}
          <div className="absolute -start-4 top-10 hidden rounded-2xl border border-white/10 bg-card/80 p-3 shadow-xl shadow-black/40 backdrop-blur-xl sm:flex sm:items-center sm:gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Tv className="h-5 w-5" />
            </div>
            <div className="text-end">
              <p className="text-[11px] text-muted-foreground">يعمل على</p>
              <p className="text-sm font-bold">حتى 5 أجهزة</p>
            </div>
          </div>

          <div className="absolute -end-3 bottom-16 hidden rounded-2xl border border-white/10 bg-card/80 p-3 shadow-xl shadow-black/40 backdrop-blur-xl sm:flex sm:items-center sm:gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">تقييم</p>
              <p className="text-sm font-bold">4.9 / 5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-xl font-extrabold text-foreground sm:text-2xl">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">
        {label}
      </p>
    </div>
  );
}