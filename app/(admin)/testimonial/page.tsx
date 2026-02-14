"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ITestimony, TestimonyForm } from "@/types/testimonail";
import DialogCreate from "@/components/testimonial/dialog/dialog-create";
import { DataTableTestimonail } from "@/components/testimonial/table/data-table";
import { columnsTestimonial } from "@/components/testimonial/table/columns";

export default function TestimonyCMS() {
  const [testimonies, setTestimonies] = useState<ITestimony[]>([
    {
      id: "1",
      name: "dr. Ahmad",
      role: "Pemilik Klinik Pratama",
      content:
        "Sejak pakai Assamedik, pencatatan rekam medis jadi jauh lebih rapi. Paling juara adalah layanan support-nya!",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: "2",
      name: "Ibu Sari",
      role: "Admin Puskesmas",
      content:
        "Sangat terbantu untuk integrasi SATUSEHAT. Tidak perlu input dua kali, semua otomatis.",
      avatar: "",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<TestimonyForm>({
    name: "",
    role: "",
    content: "",
    avatar: "",
  });

  // --- Handlers ---
  const handleSave = () => {
    if (editingId) {
      setTestimonies(
        testimonies.map((t) =>
          t.id === editingId ? { ...formData, id: t.id } : t,
        ),
      );
    } else {
      setTestimonies([
        ...testimonies,
        { ...formData, id: crypto.randomUUID() },
      ]);
    }
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", role: "", content: "", avatar: "" });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus testimoni ini?")) {
      setTestimonies(testimonies.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (testimony: ITestimony) => {
    const { id, ...rest } = testimony;

    setEditingId(id);
    setFormData(rest);
    setIsOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Testimoni</h1>
          <p className="text-muted-foreground text-sm">
            Apa kata mereka tentang Assamedik.
          </p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Testimoni
        </Button>
      </div>

      {/* Dialog Form */}
      <DialogCreate
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
        editingId={editingId}
      />

      {/* Table List */}
      <div className="border rounded-xl bg-card overflow-hidden">
        <DataTableTestimonail
          columns={columnsTestimonial(handleEdit, handleDelete)}
          data={testimonies}
        />
      </div>
    </div>
  );
}
