import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Briefcase,
  Sparkles,
  ClipboardList,
  FileCheck,
} from "lucide-react";

const items = [
  { title: "Overview", url: "/candidate", icon: LayoutDashboard, exact: true },
  { title: "My Profile", url: "/candidate/profile", icon: User },
  { title: "Education", url: "/candidate/education", icon: GraduationCap },
  { title: "Experience", url: "/candidate/experience", icon: Briefcase },
  { title: "Skills", url: "/candidate/skills", icon: Sparkles },
  { title: "Applications", url: "/candidate/applications", icon: ClipboardList },
  { title: "Screening Tests", url: "/candidate/screenings", icon: FileCheck },
];

export default function CandidateSidebar() {
  const { state } = useSidebar();
  const { pathname } = useLocation();
  const collapsed = state === "collapsed";
  const isActive = (url: string, exact?: boolean) =>
    exact ? pathname === url : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <User className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">My Career</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Candidate Portal
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Career</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.exact)}>
                    <NavLink to={item.url} end={item.exact} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
