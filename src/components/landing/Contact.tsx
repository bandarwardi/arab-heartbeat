import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              تواصل معنا
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              نحن هنا للمساعدة
            </h2>
            <p className="mt-4 text-muted-foreground">
              فريقنا متاح على مدار الساعة للإجابة على استفساراتك ومساعدتك في اختيار
              الخطة الأنسب.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <span>support@entec.app</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <span>دردشة مباشرة 24/7</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Phone className="h-4 w-4" />
                </span>
                <span>+1 (000) 000-0000</span>
              </li>
            </ul>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input id="name" placeholder="اسمك الكامل" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="subject">الموضوع</Label>
              <Input id="subject" placeholder="كيف يمكننا مساعدتك؟" />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="message">الرسالة</Label>
              <Textarea id="message" placeholder="اكتب رسالتك هنا..." rows={5} />
            </div>
            <Button className="mt-6 w-full font-semibold" size="lg">
              إرسال الرسالة
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}