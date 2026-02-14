"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  FileText,
  Instagram,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  Package,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: FileText,
  },
  {
    title: "Package",
    url: "/package",
    icon: Package,
  },
  {
    title: "Sosmed",
    url: "/sosmed",
    icon: Instagram,
  },
  {
    title: "Testimonial",
    url: "/testimonial",
    icon: MessageSquare,
  },
  {
    title: "Fitur",
    url: "/fitur",
    icon: LayoutGrid,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => {
                const isActive =
                  item.url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
