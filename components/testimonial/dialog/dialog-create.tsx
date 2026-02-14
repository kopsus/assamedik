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
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonyForm } from "@/types/testimonail";

interface IDialogCreate {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  formData: TestimonyForm;
  setFormData: (val: TestimonyForm) => void;
  handleSave: () => void;
  editingId: string | null;
}

const DialogCreate = ({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  handleSave,
  editingId,
}: IDialogCreate) => {
  return (
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
  );
};

export default DialogCreate;
