import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "تسجيل الدخول — EN TEC" }] }),
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
});

function LoginPage() {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      navigate({ to: redirect || "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setGLoading(true);
    try {
      await signInWithGoogle();
      navigate({ to: redirect || "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الدخول بـ Google");
    } finally {
      setGLoading(false);
    }
  }

  return (
    <AuthShell
      title="مرحباً بعودتك"
      subtitle="سجّل الدخول إلى حسابك في EN TEC"
      footer={
        <>
          ليس لديك حساب؟{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            أنشئ حساباً جديداً
          </Link>
        </>
      }
    >
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onGoogle}
        disabled={gLoading}
      >
        {gLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
        المتابعة باستخدام Google
      </Button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-white/10" />
        <span>أو</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">كلمة المرور</Label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full font-semibold" disabled={loading}>
          {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
          تسجيل الدخول
        </Button>
      </form>
    </AuthShell>
  );
}