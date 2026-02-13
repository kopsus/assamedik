"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import PackageDialog from "@/components/package/package-dialog";
import { IPackage } from "@/types/package";

const INITIAL_DATA: IPackage[] = [
  {
    id: "1",
    name: "Paket Basic",
    price: 250000,
    features: ["Unlimited Dokter", "Bridging BPJS"],
    isPopular: true,
  },
];

export default function Package() {
  const [packages, setPackages] = useState<IPackage[]>(INITIAL_DATA);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<IPackage, "id">>({
    name: "",
    price: 0,
    features: [""],
    isPopular: false,
  });

  const addFeatureField = () =>
    setFormData({ ...formData, features: [...formData.features, ""] });
  const removeFeatureField = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };
  const updateFeatureValue = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSave = () => {
    if (editingId) {
      setPackages(
        packages.map((p) =>
          p.id === editingId ? { ...formData, id: p.id } : p,
        ),
      );
    } else {
      setPackages([...packages, { ...formData, id: crypto.randomUUID() }]);
    }
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", price: 0, features: [""], isPopular: false });
    setEditingId(null);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Paket Harga</h1>
        <PackageDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          formData={formData}
          setFormData={setFormData}
          addFeatureField={addFeatureField}
          removeFeatureField={removeFeatureField}
          updateFeatureValue={updateFeatureValue}
          handleSave={handleSave}
          editingId={editingId}
          resetForm={resetForm}
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Paket</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Total Fitur</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>
                  <div className="font-medium">{pkg.name}</div>
                  {pkg.isPopular && (
                    <Badge variant="secondary" className="text-[10px]">
                      Populer
                    </Badge>
                  )}
                </TableCell>
                <TableCell>Rp {pkg.price.toLocaleString()}</TableCell>
                <TableCell>{pkg.features.length} Fitur</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingId(pkg.id);
                      setFormData({ ...pkg });
                      setIsOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() =>
                      setPackages(packages.filter((p) => p.id !== pkg.id))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
