import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { Sparkles, Users, Award, ShieldCheck, HeartHandshake, Eye } from "lucide-react";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/about-us")({
  component: AboutUsPage,
  head: () => ({ meta: [{ title: "من نحن — EN TEC" }] }),
});

function AboutUsPage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            من نحن — <span className="text-primary">EN TEC</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            منصة رائدة متخصصة في ابتكار وتطوير برمجيات وحلول الربط الرقمي والبث عالي الأداء. نلتزم بتمكين عملائنا حول العالم من الوصول إلى بنية تحتية رقمية سريعة ومستقرة تلبي طموحاتهم.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-card/20 p-8 space-y-4 relative overflow-hidden group hover:border-primary/40 transition">
            <div className="absolute -end-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition" />
            <div className="flex items-center gap-3 text-primary">
              <Eye className="h-6 w-6" />
              <h2 className="text-xl font-bold">رؤيتنا</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              أن نكون الخيار الأول والوجهة العالمية الموثوقة لخدمات الربط والبث الرقمي والشبكات الذكية، من خلال وضع معايير جديدة للسرعة والأمان وسهولة الاستخدام للعميل العصري.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/20 p-8 space-y-4 relative overflow-hidden group hover:border-primary/40 transition">
            <div className="absolute -end-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition" />
            <div className="flex items-center gap-3 text-primary">
              <Users className="h-6 w-6" />
              <h2 className="text-xl font-bold">رسالتنا</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              توفير تجربة اتصال وتصفح برمجية استثنائية، خالية من التعقيدات الفنية وبواجهة مستخدم عصرية ومبهرة. نحن هنا لنقربك من محتواك الرقمي بأكبر قدر من السلاسة والخصوصية.
            </p>
          </div>
        </div>

        {/* Why Us / Values */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">القيم الجوهرية لمنصتنا</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-3 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base">الأمان والخصوصية</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                نستخدم أفضل بروتوكولات التشفير والتحقق الإلكتروني بالتعاون مع بوابة الدفع Paddle لحماية حقوقك وبياناتك الشخصية.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-3 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base">الجودة والابتكار</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                تحديث برمجيات الربط والاتصال للخادم بانتظام لضمان استقرار البث بنسبة 99.9%، وتجنب أي انقطاعات فنية أثناء العمل.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-3 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base">دعم لا يتوقف</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                فريق دعم فني متمرس ومستعد لمساعدتك والإجابة على استفساراتك التقنية طوال اليوم وعلى مدار الأسبوع بلا انقطاع.
              </p>
            </div>
          </div>
        </div>

        {/* Brief Story / Philosophy */}
        <div className="rounded-2xl border border-white/5 bg-card/10 p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <h3 className="text-lg font-bold text-foreground">فلسفة عملنا</h3>
          <p>
            بدأنا في **EN TEC** برؤية واضحة للتغلب على عشوائية الخدمات الرقمية في السوق وبطء التفعيل اليدوي التقليدي. قمنا ببناء شبكة ذكية ونظام أتمتة متطور يقوم بتهيئة وترخيص خطوط الاتصال الرقمية للعميل فورياً بمجرد إتمام الدفع.
          </p>
          <p>
            نحن نؤمن بأن التكنولوجيا الفاخرة يجب أن تتسم بالأناقة في التصميم والاستجابة الفائقة، ولذلك تستثمر منصتنا باستمرار في تطوير الواجهات البرمجية وتحديث البنية التحتية للخوادم.
          </p>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
