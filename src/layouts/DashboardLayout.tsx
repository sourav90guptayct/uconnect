import { ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { motion } from "framer-motion";

interface Props {
  sidebar: ReactNode;
  title?: string;
}

export default function DashboardLayout({ sidebar, title }: Props) {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminCheck();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/30">
        {sidebar}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 border-b bg-background/70 backdrop-blur-xl flex items-center gap-3 px-4">
            <SidebarTrigger />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground truncate max-w-[40vw]">
                {title ?? pathname}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-xs font-medium truncate max-w-[220px]">{user?.email}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Signed in
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1">
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          </header>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex-1 p-4 sm:p-6 lg:p-8"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
}
