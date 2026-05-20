import { Star } from "lucide-react";

const items = [
  {
    name: "أحمد المصري",
    role: "مشترك سنوي",
    text: "تجربة رائعة وسلسة، التفعيل تم خلال دقائق وجودة البث ممتازة على كل أجهزتي.",
  },
  {
    name: "سارة عبدالله",
    role: "مشتركة منذ 6 أشهر",
    text: "خدمة الدعم سريعة جداً ومتعاونة، ولوحة التحكم بسيطة وواضحة.",
  },
  {
    name: "خالد القحطاني",
    role: "مشترك ربع سنوي",
    text: "أفضل ما يميز EN TEC هو الاستقرار والأمان، أنصح بها بشدة.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            آراء العملاء
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            يثق بنا الآلاف
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur"
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                «{t.text}»
              </p>
              <div className="mt-6">
                <p className="font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}