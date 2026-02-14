import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FeatureForm } from "@/types/fitur";

interface IDialogCreate {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  formData: FeatureForm;
  setFormData: (val: FeatureForm) => void;
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit" : "Tambah"} Konten Fitur
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Judul Fitur</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Masukkan judul..."
            />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Masukkan penjelasan singkat..."
              className="h-24"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreate;
