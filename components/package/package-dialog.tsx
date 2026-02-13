import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface IPackageDialog {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  formData: {
    name: string;
    price: number;
    features: string[];
    isPopular: boolean;
  };
  setFormData: (val: {
    name: string;
    price: number;
    features: string[];
    isPopular: boolean;
  }) => void;
  addFeatureField: () => void;
  removeFeatureField: (index: number) => void;
  updateFeatureValue: (index: number, value: string) => void;
  handleSave: () => void;
  editingId: string | null;
  resetForm: () => void;
}

const PackageDialog = ({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  addFeatureField,
  removeFeatureField,
  updateFeatureValue,
  handleSave,
  editingId,
  resetForm,
}: IPackageDialog) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        if (!val) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Paket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingId ? "Edit" : "Tambah"} Paket</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nama Paket</Label>
            <Input
              value={formData.name}
              placeholder="Masukan nama paket anda"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Harga (Rp)</Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex items-center space-x-2 py-2">
            <Switch
              checked={formData.isPopular}
              onCheckedChange={(val) =>
                setFormData({ ...formData, isPopular: val })
              }
            />
            <Label>Tampilkan Badge &quot;Paling Populer&quot;</Label>
          </div>

          <div className="space-y-2">
            <Label>Daftar Fitur</Label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Fitur ${index + 1}`}
                  value={feature}
                  onChange={(e) => updateFeatureValue(index, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeatureField(index)}
                  disabled={formData.features.length === 1}
                >
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={addFeatureField}
            >
              <Plus className="mr-2 h-3 w-3" /> Tambah Baris Fitur
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Simpan Paket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDialog;
