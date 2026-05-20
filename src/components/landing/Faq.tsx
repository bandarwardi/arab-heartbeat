import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "كم يستغرق تفعيل اشتراكي؟",
    a: "يتم تفعيل اشتراكك تلقائياً خلال دقائق بعد إتمام عملية الدفع، وفي حالات نادرة قد يصل التفعيل إلى ساعة بحد أقصى.",
  },
  {
    q: "هل يمكنني تشغيل الاشتراك على أكثر من جهاز؟",
    a: "نعم، يمكنك اختيار خطة بعدد أجهزة متزامنة من 1 إلى 5 حسب احتياجك، ويمكنك ترقية الخطة لاحقاً.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نستخدم بوابة Paddle العالمية التي تدعم البطاقات الائتمانية والمدينة بأمان كامل.",
  },
  {
    q: "هل يمكنني استرداد المبلغ؟",
    a: "نعم، طلبات الاسترداد تتم مراجعتها خلال 7 أيام من تاريخ الشراء وفقاً لسياسة الاسترداد.",
  },
  {
    q: "ماذا يحدث عند انتهاء الاشتراك؟",
    a: "ستصلك إشعارات قبل انتهاء الاشتراك ويمكنك التجديد بسهولة، وإذا جددت قبل انتهاء المدة تُضاف الأيام المتبقية تلقائياً.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            الأسئلة الشائعة
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            كل ما تحتاج معرفته
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-white/10 bg-card/60 px-5 backdrop-blur"
            >
              <AccordionTrigger className="text-start text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}