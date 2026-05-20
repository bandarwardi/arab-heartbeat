import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { FileText, CheckCircle, Ban, HelpCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServicePage,
  head: () => ({ meta: [{ title: "شروط الخدمة والأحكام — EN TEC" }] }),
});

function TermsOfServicePage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">شروط الخدمة والأحكام</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            اتفاقية ترخيص الخدمة والاتفاق القانوني المنظم لاستخدام منصة EN TEC لخدمات وحلول البث والربط الرقمي.
          </p>
        </div>

        {/* Quick summary grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-card/20 p-6 space-y-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h3 className="font-bold text-sm">التزامات الترخيص الفني</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              يُمنح المشترك رخصة استخدام فنية مؤقتة ومحددة بعدد خطوط الاتصال الرقمية المتزامنة المشتراة وضمن النطاق الجغرافي للاستخدام الفردي.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/20 p-6 space-y-3">
            <Ban className="h-5 w-5 text-rose-400" />
            <h3 className="font-bold text-sm">الممارسات المحظورة</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              يُمنع منعاً باتاً بيع أو إعادة توزيع أو مشاركة بيانات الترخيص وحساب الاتصال الرقمي مع أطراف أخرى، أو محاولة قرصنة خوادمنا.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/20 p-6 space-y-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-sm">الدعم التقني والتشغيل</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              نلتزم بتقديم الدعم وحل مشكلات الخوادم. لا تغطي التزاماتنا مشاكل الإنترنت أو بطء استجابة شبكة العميل الخارجية.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 rounded-2xl border border-white/5 bg-card/20 p-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" />
              1. قبول واستمرار الاتفاقية
            </h2>
            <p>
              باستخدامك لمنصة **EN TEC** أو تسجيل حساب رقمي أو دفع ثمن الاشتراك، فإنك تقر وتوافق صراحة ودون أي تحفظ على بنود هذه الاتفاقية بكامل تفاصيلها، بالإضافة لسياسة الخصوصية وسياسة الاسترداد. تحتفظ المنصة بالحق في تحديث وتعديل هذه الشروط في أي وقت، ويعتبر استمرارك في استخدام الخدمة موافقة ضمنية على التعديلات.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" />
              2. شروط إنشاء الحساب والأمن
            </h2>
            <p>
              للوصول إلى خدماتنا وحلول البث والربط التقني المخصصة، يجب إنشاء حساب باستخدام بريد إلكتروني صحيح ومعتمد. تلتزم بالآتي:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4 text-xs">
              <li>
                تقديم معلومات دقيقة وصحيحة وتحديثها باستمرار لضمان وصول التنبيهات وإيصالات الدفع.
              </li>
              <li>
                تحمل المسؤولية القانونية الكاملة عن سرية كلمة المرور والوصول للحساب، وعن كافة العمليات والأنشطة التقنية الصادرة منه.
              </li>
              <li>
                إخطار فريق الدعم فوراً عند الاشتباه في اختراق حسابك الرقمي أو استخدام خطوط اتصالك من جهة غير مصرح لها.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" />
              3. ترخيص وحرية الاستخدام (خطوط الاتصال المتزامنة)
            </h2>
            <p>
              تمنحك منصة **EN TEC** ترخيصاً برمجياً مؤقتاً، محدوداً، وغير قابل للتنازل أو البيع، لاستخدام خوادم البث والربط الرقمي وفق الشروط الفنية التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4 text-xs">
              <li>
                **حدود الاتصال المسموح بها**: يلتزم المشترك بعدد أجهزة الاتصال المتزامنة المخصصة في باقته (مثال: اتصال واحد، اتصالان، ثلاثة، أو خمسة اتصالات متزامنة في نفس الوقت). يقوم خادمنا برصد ومراقبة عدد الاتصالات تلقائياً لضمان الالتزام.
              </li>
              <li>
                **حظر الاستهلاك المفرط وسوء الاستخدام**: يُحظر استخدام الباقة الرقمية لإعادة البث التجاري، أو استغلالها في مشاريع برمجية خارجية، أو استخدام الحساب لتغذية خوادم اتصالات أخرى دون اتفاق تجاري خطي مسبق.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" />
              4. سياسة الإلغاء وتعليق الحساب
            </h2>
            <p>
              تحتفظ إدارة **EN TEC** بالحق المطلق في تعليق أو إنهاء حسابك الرقمي فوراً ودون إشعار مسبق أو تعويض مالي في الحالات التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4 text-xs">
              <li>
                محاولة تجاوز أو التلاعب بالحد الأقصى لعدد الاتصالات الرقمية المسموح بها للباقة المشتراة.
              </li>
              <li>
                محاولة القيام بهجمات إلكترونية، فحص خوادم الربط للثغرات، أو استخدام أدوات قرصنة وتزييف البيانات المتبادلة بين التطبيق والمزود.
              </li>
              <li>
                مشاركة وتوزيع تفاصيل ترخيص الاتصال الفني مع أطراف أو مستخدمين آخرين خارج نطاق الاشتراك الشخصي.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" />
              5. شروط الفوترة ومعالجة الدفع
            </h2>
            <p>
              تتم معالجة وإدارة كافة الاشتراكات والدفع التلقائي بالتعاون الوثيق مع شريكنا **Paddle**، بوابتنا الرسمية المعتمدة لاستلام ومعالجة الرسوم.
            </p>
            <p>
              يتم فوترة حسابك تلقائياً وبشكل دوري في بداية كل فترة فوترة (شهرية، ربع سنوية، نصف سنوية، أو سنوية) بحسب اختيارك للباقة. يمكنك إيقاف وتعديل حالة الاشتراك وإلغاء التجديد التلقائي في أي وقت تريده من خلال لوحة التحكم الخاصة بك.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" />
              6. حدود المسؤولية وإخلاء الضمانات
            </h2>
            <p>
              يتم تقديم الخدمات البرمجية وحلول الربط الرقمي "كما هي متوفرة" وبكامل خصائصها التقنية الحالية دون ضمانات صريحة أو ضمنية تتعلق بالاستقرار المطلق لجميع مزودي البيانات الخارجيين. ولا تتحمل منصة **EN TEC** أي مسؤولية عن انقطاع مؤقت للخدمة ناتج عن ظروف الصيانة الطارئة للخوادم، أو مشاكل في شبكة الإنترنت لدى العميل، أو الكوارث الطبيعية والأعطال العامة للشبكة العنكبوتية الدولية.
            </p>
          </section>

        </div>

      </div>
      <Footer />
    </AppShell>
  );
}
