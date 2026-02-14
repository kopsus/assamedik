"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ITestimony } from "@/types/testimonail";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export const columnsTestimonial = (
  onEdit: (pkg: ITestimony) => void,
  onDelete: (id: string) => void,
): ColumnDef<ITestimony>[] => [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const t = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={t.avatar} />
            <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-sm">{t.name}</span>
            <span className="text-[11px] text-muted-foreground">{t.role}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Testimoni",
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
          onClick={() => onEdit(row.original)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
