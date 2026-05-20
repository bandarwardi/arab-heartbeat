import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({ meta: [{ title: "إنشاء حساب — EN TEC" }] }),
});

function SignupPage() {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("كلمة المرور يجب ألا تقل عن 6 أحرف");
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(email, password, name);
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setGLoading(true);
    try {
      await signInWithGoogle();
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الدخول بـ Google");
    } finally {
      setGLoading(false);
    }
  }

  return (
    <AuthShell
      title="ابدأ رحلتك مع EN TEC"
      subtitle="أنشئ حسابك خلال ثوانٍ"
      footer={
        <>
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            سجّل الدخول
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
        التسجيل باستخدام Google
      </Button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-white/10" />
        <span>أو</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">الاسم الكامل</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="اسمك"
          />
        </div>
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
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="6 أحرف على الأقل"
            minLength={6}
          />
        </div>

        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full font-semibold" disabled={loading}>
          {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
          إنشاء الحساب
        </Button>
      </form>
    </AuthShell>
  );
}