import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, CreditCard, ShieldCheck } from "lucide-react";

export function AppShell({ children }: { children: ReactNode }) {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = profile?.role === "admin";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/5 bg-card/30 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-bold tracking-wider text-primary">
            EN TEC
          </Link>
          <nav className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="ml-2 h-4 w-4" />
                لوحتي
              </Button>
            </Link>
            <Link to="/subscription">
              <Button variant="ghost" size="sm">
                <CreditCard className="ml-2 h-4 w-4" />
                اشتراكي
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ShieldCheck className="ml-2 h-4 w-4" />
                  الأدمن
                </Button>
              </Link>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await logout();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="ml-2 h-4 w-4" />
              خروج
            </Button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-6 py-10">{children}</main>
    </div>
  );
}