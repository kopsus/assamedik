"use client";

import { useState } from "react";
import PackageDialog from "@/components/package/package-dialog";
import { IPackage } from "@/types/package";
import { DataTablePackage } from "@/components/package/table/data-table";
import { columnsPakcage } from "@/components/package/table/columns";

export default function Package() {
  const [packages, setPackages] = useState<IPackage[]>([
    {
      id: "1",
      name: "Paket Basic",
      price: 250000,
      features: ["Unlimited Dokter", "Bridging BPJS"],
      isPopular: true,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<IPackage, "id">>({
    name: "",
    price: 0,
    features: [""],
    isPopular: false,
  });

  const handleEdit = (pkg: IPackage) => {
    setEditingId(pkg.id);
    setFormData({
      name: pkg.name,
      price: pkg.price,
      features: pkg.features,
      isPopular: pkg.isPopular,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setPackages(packages.filter((p) => p.id !== id));
  };

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
        <DataTablePackage
          columns={columnsPakcage(handleEdit, handleDelete)}
          data={packages}
        />
      </div>
    </div>
  );
}
