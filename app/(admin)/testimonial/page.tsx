"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Pencil, Trash2, UserCircle } from "lucide-react";

interface ITestimony {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const INITIAL_DATA: ITestimony[] = [
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
];

export default function TestimonyCMS() {
  const [testimonies, setTestimonies] = useState<ITestimony[]>(INITIAL_DATA);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ITestimony, "id">>({
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
    setEditingId(testimony.id);
    setFormData({ ...testimony });
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Tambah"} Testimoni</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-4">
              <div
                className="relative group cursor-pointer"
                onClick={() => {
                  /* Logic upload image */
                }}
              >
                <Avatar className="h-20 w-20 border-2 border-primary">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback>
                    <UserCircle className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white">Upload</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Lengkap</label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Contoh: dr. Ahmad"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Jabatan / Instansi</label>
              <Input
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="Contoh: Pemilik Klinik Pratama"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Isi Testimoni</label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Tuliskan ulasan pelanggan..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Table List */}
      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="max-w-75">Testimoni</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonies.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={t.avatar} />
                      <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{t.name}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-75">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {t.content}
                  </p>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-blue-500"
                    onClick={() => handleEdit(t)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDelete(t.id)}
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
