import { Tv, Laptop, Smartphone, Tablet } from "lucide-react";

const devices = [
  { icon: Tv, name: "التلفاز الذكي" },
  { icon: Laptop, name: "الحاسوب" },
  { icon: Tablet, name: "اللوحي" },
  { icon: Smartphone, name: "الهاتف" },
];

export function Devices() {
  return (
    <section id="devices" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              متعدد الأجهزة
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              شاهد على كل أجهزتك،
              <span className="text-primary"> في أي وقت</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              مع EN TEC يمكنك تشغيل اشتراكك على عدة أجهزة في نفس الوقت بحسب الخطة
              المختارة، بتجربة سلسة وجودة عالية على كل شاشة.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li>• إدارة الأجهزة من لوحة التحكم بسهولة.</li>
              <li>• تبديل الأجهزة في أي وقت دون انقطاع.</li>
              <li>• إشعارات فورية عند أي نشاط جديد.</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {devices.map((d) => (
              <div
                key={d.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-8 text-center backdrop-blur transition hover:border-primary/40"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <d.icon className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 font-bold">{d.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}