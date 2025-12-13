"use client";

import { useState } from "react";
import { FileText, Video, Link as LinkIcon, Plus, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useAddLessonMaterialMutation, useDeleteLessonMaterialMutation } from "@/redux/api/endPoints/lessonsApiSlice";

export default function LessonMaterials({ lessonId, materials = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", url: "", type: "link" });

  const [addMaterial, { isLoading: isAdding }] = useAddLessonMaterialMutation();
  const [deleteMaterial, { isLoading: isDeleting }] = useDeleteLessonMaterialMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;

    try {
      await addMaterial({ lessonId, data: formData }).unwrap();
      toast.success("Material added successfully");
      setFormData({ title: "", url: "", type: "link" });
      setIsOpen(false);
    } catch (err) {
        console.log("FULL ERROR:", err);
        console.log("ERROR DATA:", err?.data);
        console.log("ERROR MESSAGE:", err?.data?.message);
        alert(err?.data?.message || "Failed to create assignment");

    }
  };

  const handleDelete = async (materialId) => {
    if (confirm("Delete this material?")) {
      try {
        await deleteMaterial({ lessonId, materialId }).unwrap();
        toast.success("Deleted");
      } catch (err) { toast.error("Failed"); }
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "pdf": return <FileText className="text-red-500" size={20} />;
      case "video": return <Video className="text-blue-500" size={20} />;
      default: return <LinkIcon className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-700">Learning Materials</h3>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="text-[#FF4667] border-[#FF4667] hover:bg-pink-50">
              <Plus size={16} className="mr-1" /> Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Material</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Ex: Homework Sheet, Lecture Slides" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link">Website Link</SelectItem>
                    <SelectItem value="pdf">PDF / Document</SelectItem>
                    <SelectItem value="video">Video (YouTube/Zoom)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>URL / Link</Label>
                <Input placeholder="https://..." value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <Button type="submit" className="w-full bg-[#FF4667]" disabled={isAdding}>
                {isAdding ? <Spinner size={20} /> : "Add Material"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {materials.length > 0 ? (
          materials.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-3 border rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-white rounded-lg border">
                  {getIcon(item.type)}
                </div>
                <div className="truncate">
                  <h4 className="font-medium text-sm text-gray-900 truncate">{item.title}</h4>
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                    {item.url} <ExternalLink size={10} />
                  </a>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600" onClick={() => handleDelete(item._id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-xl">
            No materials added yet.
          </div>
        )}
      </div>
    </div>
  );
}