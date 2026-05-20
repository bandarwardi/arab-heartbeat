import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-1/2 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>تجربة بث رقمي فاخرة — متعددة الأجهزة</span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            استمتع بترفيهك الرقمي
            <span className="block bg-gradient-to-l from-primary via-emerald-300 to-primary bg-clip-text text-transparent">
              بجودة بلا حدود
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            EN TEC هي منصة اشتراك بث رقمي متعددة الأجهزة، تمنحك تجربة مشاهدة سلسة
            وآمنة، مع تفعيل فوري ودعم متواصل على مدار الساعة.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="font-semibold">
              ابدأ اشتراكك الآن
              <ArrowLeft className="ms-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/15 bg-white/5">
              <PlayCircle className="me-2 h-5 w-5" />
              شاهد العرض
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" /> دفع آمن عبر Paddle
            </span>
            <span>•</span>
            <span>تفعيل فوري بعد الدفع</span>
            <span>•</span>
            <span>سياسة استرداد خلال 7 أيام</span>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/20 blur-3xl" />
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl shadow-primary/10">
            <img
              src={heroImg}
              alt="منصة EN TEC للبث الرقمي متعددة الأجهزة"
              width={1920}
              height={1080}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}