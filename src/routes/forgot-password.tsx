import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
  head: () => ({ meta: [{ title: "استعادة كلمة المرور — EN TEC" }] }),
});

function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذّر إرسال الرابط");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="استعادة كلمة المرور"
      subtitle="سنرسل لك رابط إعادة التعيين عبر البريد"
      footer={
        <>
          تذكّرت كلمة المرور؟{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            عودة لتسجيل الدخول
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-primary" />
          <p className="text-sm">
            تم إرسال رابط إعادة التعيين إلى <strong>{email}</strong>. تحقق من بريدك
            (وفولدر الـ Spam).
          </p>
        </div>
      ) : (
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

          {error && (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full font-semibold" disabled={loading}>
            {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
            إرسال الرابط
          </Button>
        </form>
      )}
    </AuthShell>
  );
}