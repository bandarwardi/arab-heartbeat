import { useEffect, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  children: ReactNode;
  requireAdmin?: boolean;
};

export function ProtectedRoute({ children, requireAdmin = false }: Props) {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({
        to: "/login",
        search: { redirect: location.pathname },
      });
      return;
    }
    if (requireAdmin && profile && profile.role !== "admin") {
      navigate({ to: "/dashboard" });
    }
  }, [user, profile, loading, requireAdmin, navigate, location.pathname]);

  if (loading || !user || (requireAdmin && profile?.role !== "admin")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm">جارٍ التحقق...</div>
      </div>
    );
  }

  return <>{children}</>;
}