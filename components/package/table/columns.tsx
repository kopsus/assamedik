"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPackage } from "@/types/package";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export const columnsPakcage = (
  onEdit: (pkg: IPackage) => void,
  onDelete: (id: string) => void,
): ColumnDef<IPackage>[] => [
  {
    accessorKey: "name",
    header: "Nama Paket",
    cell: ({ row }) => {
      const pkg = row.original;

      return (
        <div>
          <div className="font-medium">{pkg.name}</div>
          {pkg.isPopular && (
            <Badge variant="secondary" className="text-[10px]">
              Populer
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      const price = row.original.price;
      return <div>Rp {price.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "features",
    header: "Total Fitur",
    cell: ({ row }) => {
      const features = row.original.features;
      return <div>{features.length} Fitur</div>;
    },
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
