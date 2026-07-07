import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";

interface Props {
  children: ReactNode;
  require: "auth" | "admin";
}

export default function RoleGuard({ children, require }: Props) {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    if (require === "admin" && !adminLoading && !isAdmin) {
      navigate("/");
    }
  }, [user, authLoading, isAdmin, adminLoading, require, navigate]);

  if (authLoading || (require === "admin" && adminLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }
  if (!user) return null;
  if (require === "admin" && !isAdmin) return null;
  return <>{children}</>;
}
