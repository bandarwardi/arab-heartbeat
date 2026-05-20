import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { href: "#features", label: "المميزات" },
  { href: "#pricing", label: "الأسعار" },
  { href: "#devices", label: "الأجهزة" },
  { href: "#faq", label: "الأسئلة" },
  { href: "#contact", label: "تواصل" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, profile, logout, loading } = useAuth();
  const displayName = profile?.displayName ?? user?.displayName ?? user?.email;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
            <span className="text-lg font-black">E</span>
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            EN <span className="text-primary">TEC</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {loading ? null : user ? (
            <>
              <span className="text-sm text-muted-foreground">
                مرحباً، <span className="text-foreground">{displayName}</span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                aria-label="تسجيل الخروج"
              >
                <LogOut className="ml-2 h-4 w-4" />
                خروج
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
              <Button size="sm" className="font-semibold" asChild>
                <Link to="/signup">ابدأ الآن</Link>
              </Button>
            </>
          )}
        </div>

        <button
          aria-label="القائمة"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-background/95 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2 pt-3">
              {user ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  تسجيل الخروج
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      دخول
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 font-semibold" asChild>
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      ابدأ الآن
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}