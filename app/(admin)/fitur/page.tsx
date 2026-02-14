"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Activity,
  Users,
  Briefcase,
  Receipt,
  BarChart3,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IFeature } from "@/types/fitur";
import DialogCreate from "@/components/fitur/dialog/dialog-create";

// Data statis untuk visual yang tidak perlu diubah admin
const VISUAL_CONFIG = [
  { icon: <Activity />, color: "bg-[#F4FCE3]", iconColor: "text-green-600" },
  { icon: <Users />, color: "bg-[#F8F0FC]", iconColor: "text-purple-600" },
  { icon: <UserCog />, color: "bg-[#FFF5F5]", iconColor: "text-red-600" },
  { icon: <Briefcase />, color: "bg-[#E7F5FF]", iconColor: "text-blue-600" },
  { icon: <Receipt />, color: "bg-[#FFF9DB]", iconColor: "text-orange-600" },
  { icon: <BarChart3 />, color: "bg-[#E6FCF5]", iconColor: "text-emerald-600" },
];

export default function FeatureCMS() {
  const [features, setFeatures] = useState<IFeature[]>([
    {
      id: "1",
      title: "Manajemen Pasien & Antrean",
      description: "Pendaftaran cepat dan manajemen alur kunjungan yang tertib",
    },
    {
      id: "2",
      title: "Rekam Medis Elektronik (RME)",
      description:
        "Catatan medis lengkap (CPPT), diagnosa ICD-10, hingga riwayat digital",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleSave = () => {
    if (editingId) {
      setFeatures(
        features.map((f) =>
          f.id === editingId ? { ...formData, id: f.id } : f,
        ),
      );
    } else {
      setFeatures([...features, { ...formData, id: crypto.randomUUID() }]);
    }
    setIsOpen(false);
    setFormData({ title: "", description: "" });
    setEditingId(null);
  };

  const handleEdit = (feature: IFeature) => {
    setEditingId(feature.id);
    setFormData({ title: feature.title, description: feature.description });
    setIsOpen(true);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Konten Section Fitur
          </h1>
          <p className="text-muted-foreground text-sm">
            Admin hanya mengelola teks judul dan deskripsi fitur.
          </p>
        </div>
        {features.length < 6 && (
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Fitur
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          // Ambil config visual berdasarkan index (looping 1-6)
          const config = VISUAL_CONFIG[index % VISUAL_CONFIG.length];

          return (
            <div
              key={feature.id}
              className={`${config.color} p-6 rounded-3xl border border-black/5 relative group`}
            >
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => handleEdit(feature)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive"
                  onClick={() =>
                    setFeatures(features.filter((f) => f.id !== feature.id))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div
                className={`bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-6 ${config.iconColor}`}
              >
                {config.icon}
              </div>

              <h3 className="font-bold text-lg mb-2 text-slate-800">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      <DialogCreate
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
        editingId={editingId}
      />
    </div>
  );
}
