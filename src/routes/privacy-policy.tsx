import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { Shield, Eye, Lock, Globe, FileText, Database, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () => ({ meta: [{ title: "سياسة الخصوصية وسرية المعلومات — EN TEC" }] }),
});

function PrivacyPolicyPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">سياسة الخصوصية وسرية المعلومات</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            نلتزم في منصة EN TEC بحماية خصوصية بياناتك الشخصية وتأمين معلوماتك التقنية بأقصى درجات السرية والأمان.
          </p>
        </div>

        {/* Quick summary grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-card/20 p-6 space-y-3">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-sm">جمع البيانات التقنية فقط</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              نقتصر على جمع البيانات الضرورية لإدارة الحساب والتحقق الفني من استقرار خطوط الاتصال وجودة الخدمة.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/20 p-6 space-y-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h3 className="font-bold text-sm">أمان مشفر بالكامل</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              تتم معالجة كافة المدفوعات والمعلومات الحساسة عبر بوابات مشفرة بالكامل ومعتمدة بموجب بروتوكولات الحماية العالمية.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/20 p-6 space-y-3">
            <Lock className="h-5 w-5 text-blue-400" />
            <h3 className="font-bold text-sm">حظر مشاركة البيانات</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              لا نقوم بمشاركة أي من بياناتك الشخصية أو الفنية مع أي طرف ثالث لأهداف تسويقية أو تجارية خارج إطار تشغيل الخدمة.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 rounded-2xl border border-white/5 bg-card/20 p-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              1. البيانات التي نقوم بجمعها
            </h2>
            <p>
              من أجل تقديم خدمة ربط وبث رقمي مستقرة ومخصصة، قد نقوم بجمع المعلومات التالية عند تفاعلك مع المنصة:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4 text-xs">
              <li>
                **معلومات الحساب والتسجيل**: تشمل الاسم الكامل، عنوان البريد الإلكتروني، وتاريخ إنشاء الحساب وبيانات الاعتماد المشفرة.
              </li>
              <li>
                **المعلومات الفنية والتشغيلية**: تشمل لقطات من سجلات الخادم، عناوين بروتوكول الإنترنت (IP Address) المستخدمة للاتصال، سعة حزمة البيانات المستهلكة، عدد المشغلات الرقمية النشطة حالياً تحت حسابك (للتحقق من توافق عدد خطوط الباقة)، ومعرفات الأجهزة المجهولة الهوية لضمان حماية الحساب من محاولات الاختراق.
              </li>
              <li>
                **بيانات الفواتير والعمليات**: نقوم بتسجيل مرجع المعاملة وحالة الدفع الصادرة من معالج الدفع **Paddle**. ونؤكد بأننا **لا نطلع ولا نخزن** أي تفاصيل لبطاقتك الائتمانية أو بيانات حسابك المصرفي، حيث تتم معالجة ذلك بنظام دفع خارجي مشفر ومؤمن تماماً بالطرف الثالث.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              2. كيف نستخدم معلوماتك؟
            </h2>
            <p>
              يتم استخدام البيانات التي نجمعها في الأغراض المحددة التالية فقط:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4 text-xs">
              <li>
                إنشاء وتأمين وتحديث حسابك الفني والبرمجي على خوادم **EN TEC**.
              </li>
              <li>
                التحقق والتحكم في حدود خطوط الاتصال الرقمية المتزامنة المسموح بها في باقتك لمنع سوء الاستخدام.
              </li>
              <li>
                تقديم الدعم الفني وحل مشكلات الخادم وتسريع زمن الاستجابة وإشعارك بأوقات الصيانة المبرمجة.
              </li>
              <li>
                معالجة وتوثيق عمليات التجديد وفترات الفواتير بالاشتراك مع شريكنا **Paddle**.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              3. أمن وحماية المعلومات
            </h2>
            <p>
              نحن نطبق إجراءات أمنية وفنية متطورة وصارمة لحماية بياناتك من الوصول غير المصرح به، أو التغيير، أو الإفصاح، أو الإتلاف. 
            </p>
            <p>
              يتم نقل كافة البيانات الحساسة المتبادلة بين المنصة ومتصفحك عبر قنوات اتصال مشفرة باستخدام بروتوكولات الحماية من نوع **SSL/TLS**. كما نطبق أنظمة جدران الحماية (Firewalls) ومراقبة مستمرة للأنشطة المشبوهة على خوادم الربط.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              4. ملفات تعريف الارتباط (Cookies)
            </h2>
            <p>
              تستخدم المنصة ملفات تعريف الارتباط الفنية المؤقتة لضمان استمرارية تسجيل دخولك وحفظ تفضيلاتك اللغوية وتسهيل تصفحك للوحة التحكم. يمكنك تعطيل ملفات تعريف الارتباط من متصفحك، ولكن قد يؤثر ذلك على عمل بعض مزايا المنصة التقنية.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              5. حقوقك بخصوص بياناتك
            </h2>
            <p>
              بصفتك مستخدماً لمنصة **EN TEC**، فإنك تملك كامل الحقوق في:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4 text-xs">
              <li>
                الوصول إلى نسختك من البيانات الشخصية المخزنة لدينا والاستفسار عنها.
              </li>
              <li>
                طلب تعديل أو تصحيح أي بيانات غير دقيقة أو قديمة في ملفك التعريفي.
              </li>
              <li>
                طلب حذف حسابك الفني والبرمجي بالكامل من قاعدة بياناتنا نهائياً (إلغاء الترخيص الفني)، وذلك من خلال إرسال طلب رسمي لفريق الدعم.
              </li>
            </ul>
          </section>

        </div>

        {/* Footer info */}
        <div className="text-center pt-4">
          <Link to="/">
            <Button className="cursor-pointer">العودة للصفحة الرئيسية</Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
