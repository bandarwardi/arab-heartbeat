import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { ShieldCheck, Receipt, RotateCcw, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicyPage,
  head: () => ({ meta: [{ title: "سياسة الاسترجاع ورد الأموال — EN TEC" }] }),
});

function RefundPolicyPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30">
            <RotateCcw className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">سياسة الاسترجاع ورد الأموال</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            سياسة استرداد الرسوم وشروط رد الأموال الخاصة بالاشتراكات والخدمات الرقمية لمنصة EN TEC.
          </p>
        </div>

        {/* Quick summary grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-sm">استرجاع مضمون</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              خلال أول 24 ساعة من الاشتراك في حال وجود مشكلة تقنية فنية مثبتة من خوادمنا تمنع تشغيل خطوط الاتصال الرقمية بالكامل.
            </p>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold text-sm">شروط عدم الاستحقاق</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              لا يشمل الاسترداد حالات انقطاع الإنترنت المحلي لدى العميل، عدم توافق الأجهزة والبرامج الخارجية، أو بعد تفعيل واستهلاك الباقة.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Receipt className="h-5 w-5" />
              <h3 className="font-bold text-sm">بوابة معالجة آمنة</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              تتم معالجة كافة الطلبات والمبالغ المستردة عبر شريكنا المعتمد Paddle وبما يتماشى مع معايير الحماية الدولية للمستهلك.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 rounded-2xl border border-white/5 bg-card/20 p-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              1. أحكام وشروط عامة
            </h2>
            <p>
              نظراً لأن منصة **EN TEC** تقدم خدمات رقمية تعتمد على التراخيص الفورية وخطوط الربط والاتصال الرقمي المؤقتة والمخصصة للعميل فور إتمام عملية الدفع، فإن تفعيل الخدمة يعتبر استهلاكاً فعلياً لها. يرجى التأكد من استفساراتك الفنية واختبار التوافق بشكل كامل قبل المباشرة بالاشتراك.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              2. حالات استحقاق استرداد الأموال
            </h2>
            <p>
              يوافق فريق الدعم الفني على طلبات الاسترداد المالي في الحالات الحصرية التالية فقط:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4 text-xs">
              <li>
                وجود خلل تقني تام أو عطل برمجي مستمر من جانب خوادم الربط والاتصال الخاصة بنا يمنعك من استخدام الباقة المخصصة لك، وبشرط تواصلك مع الدعم الفني خلال أول 24 ساعة من الاشتراك وعدم تمكن فريق الدعم من حل المشكلة خلال 48 ساعة من الإبلاغ.
              </li>
              <li>
                حدوث خطأ تقني في بوابة الدفع يؤدي إلى تكرار خصم القيمة المالية لنفس الفاتورة والاشتراك في وقت واحد (يتم رد المبلغ المكرر تلقائياً فور التحقق).
              </li>
              <li>
                فشل النظام في إنشاء حسابك الرقمي أو تفعيل خطوط الاتصال المطلوبة خلال 24 ساعة من الدفع المعتمد دون وجود خطأ في البيانات المدخلة من قبل العميل.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              3. الحالات غير القابلة للاسترداد المالي
            </h2>
            <p>
              لا تقبل منصة **EN TEC** طلبات الاسترداد أو الإلغاء في أي من الحالات التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4 text-xs">
              <li>
                المشاكل الناتجة عن رداءة أو بطء اتصال الإنترنت الخاص بالعميل، أو القيود المفروضة من قبل مزود الخدمة المحلي لديه (ISP) والتي قد تعيق استقرار البث.
              </li>
              <li>
                عدم معرفة العميل بكيفية تشغيل أو ضبط برمجيات الربط والاتصال الرقمي على أجهزته الخاصة، أو محاولة استخدام مشغلات غير متوافقة برمجياً مع خوادمنا.
              </li>
              <li>
                إلغاء الاشتراك بعد مرور 7 أيام كاملة من التفعيل التلقائي دون وجود مشكلة برمجية مثبتة من جهتنا.
              </li>
              <li>
                مخالفة العميل لأي بند من بنود شروط الخدمة (مثل محاولة مشاركة الحساب أو تفعيل خطوط اتصال تتجاوز الحدود المسموحة للباقة المشتراة، مما يؤدي لتعليق الحساب تلقائياً).
              </li>
              <li>
                الاشتراكات التي تمت في أوقات التخفيضات الكبرى أو الباقات الرقمية التي تحتوي على خصومات استثنائية.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              4. خطوات تقديم ومراجعة الطلبات
            </h2>
            <p>
              لتقديم طلب استرداد, يجب اتباع الخطوات التالية بدقة:
            </p>
            <ol className="list-decimal list-inside space-y-2 mr-4 text-xs">
              <li>
                إرسال بريد إلكتروني إلى فريق الدعم المعتمد لدينا، يحتوي على عنوان "طلب استرداد مالي لـ حساب رقم X".
              </li>
              <li>
                إرفاق تفاصيل الفاتورة كاملة والرمز التعريفي للمشغل من بوابة الدفع Paddle، بالإضافة إلى شرح فني وافٍ مدعوم بلقطات شاشة توضح وجه الخلل البرمجي المزعوم.
              </li>
              <li>
                سيقوم فريق الجودة بفحص سجلات الاتصال الفنية للخادم وجلسات الربط الخاصة بحسابك للتحقق من الادعاء خلال 48 ساعة عمل.
              </li>
              <li>
                في حال الموافقة، يتم إخطار العميل وتوجيه المعاملة لبوابة معالجة الدفع Paddle، ويستغرق وصول المبلغ لحساب بطاقتك البنكية الأصلية ما بين 5 إلى 10 أيام عمل حسب البنك المصدر للبطاقة.
              </li>
            </ol>
          </section>

        </div>

      </div>
      <Footer />
    </AppShell>
  );
}
