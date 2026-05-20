import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                <span className="text-lg font-black">E</span>
              </span>
              <span className="text-lg font-extrabold">
                EN <span className="text-primary">TEC</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              منصة بث رقمي فاخرة متعددة الأجهزة، بتجربة سلسة ودفع آمن ودعم على مدار
              الساعة.
            </p>
          </div>
          <div>
            <h4 className="font-bold">روابط</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">المميزات</a></li>
              <li><a href="#pricing" className="hover:text-foreground">الأسعار</a></li>
              <li><a href="#faq" className="hover:text-foreground">الأسئلة الشائعة</a></li>
              <li><a href="#contact" className="hover:text-foreground">تواصل</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">قانوني</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy-policy" className="hover:text-foreground">سياسة الخصوصية</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-foreground">شروط الاستخدام</Link></li>
              <li><Link to="/refund-policy" className="hover:text-foreground">سياسة الاسترداد</Link></li>
              <li><a href="#" className="hover:text-foreground">من نحن</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} EN TEC. جميع الحقوق محفوظة.</p>
          <p>صُنع بشغف لتجربة بث رقمية فاخرة.</p>
        </div>
      </div>
    </footer>
  );
}