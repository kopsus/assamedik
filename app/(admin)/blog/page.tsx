"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IBlogPost } from "@/types/blog";
import { DataTableBlog } from "@/components/blog/table/data-table";
import { columnsBlog } from "@/components/blog/table/columns";
import Link from "next/link";

const BlogPage = () => {
  const [data] = React.useState<IBlogPost[]>([
    {
      id: 1,
      title: "Belajar Next.js untuk Pemula",
      category: "Tech",
      content: "...",
    },
    {
      id: 2,
      title: "Tips UI Design dengan Shadcn",
      category: "Design",
      content: "...",
    },
    {
      id: 3,
      title: "Optimasi Performa Web 2026",
      category: "Tech",
      content: "...",
    },
  ]);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog CMS</h1>
          <p className="text-muted-foreground text-sm">
            Kelola konten artikel kamu di sini.
          </p>
        </div>
        <Link href="/blog/add">
          <Button className="shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Add New Post
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <DataTableBlog columns={columnsBlog} data={data} />
      </div>
    </div>
  );
};

export default BlogPage;
