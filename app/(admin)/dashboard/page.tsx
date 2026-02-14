"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Package,
  MessageSquare,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Dummy data untuk statistik
  const stats = [
    {
      title: "Total Blog",
      value: "12",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      href: "/blog",
    },
    {
      title: "Paket Aktif",
      value: "3",
      icon: <Package className="h-5 w-5 text-orange-600" />,
      href: "/package",
    },
    {
      title: "Testimoni",
      value: "8",
      icon: <MessageSquare className="h-5 w-5 text-emerald-600" />,
      href: "/testimony",
    },
    {
      title: "Fitur Utama",
      value: "6",
      icon: <LayoutGrid className="h-5 w-5 text-purple-600" />,
      href: "/feature",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Halo, Admin Assamedik!
          </h1>
          <p className="text-muted-foreground">
            Ini adalah ringkasan performa konten website Anda hari ini.
          </p>
        </div>

        <Button variant="outline">Lihat Website</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <Link href={stat.href}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-[10px] text-muted-foreground mt-1 flex items-center">
                  Kelola data <ArrowUpRight className="ml-1 h-3 w-3" />
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
