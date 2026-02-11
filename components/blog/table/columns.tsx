"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBlogPost } from "@/types/blog";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export const columnsBlog: ColumnDef<IBlogPost>[] = [
  {
    accessorKey: "title",
    header: "Judul Artikel",
    cell: ({ row }) => (
      <div className="font-semibold text-primary">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => (
      <Badge variant="secondary" className="capitalize">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-blue-500 hover:text-blue-600"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
