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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import BlogEditor from "@/components/blog/blog-editor";

// 1. Definisi Tipe Data
interface BlogPost {
  id: number;
  title: string;
  category: string;
  content: string;
}

// 2. Dummy Data Awal
const INITIAL_DATA: BlogPost[] = [
  {
    id: 1,
    title: "Belajar Next.js untuk Pemula",
    category: "Tech",
    content: "Isi konten tutorial...",
  },
  {
    id: 2,
    title: "Tips UI Design dengan Shadcn",
    category: "Design",
    content: "Cara menggunakan shadcn...",
  },
];

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_DATA);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // State untuk form
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  // 3. Fungsi CRUD
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      // Update
      setPosts(
        posts.map((p) =>
          p.id === editingPost.id ? { ...formData, id: p.id } : p,
        ),
      );
    } else {
      // Create
      const newPost = { ...formData, id: Date.now() };
      setPosts([...posts, newPost]);
    }
    closeDialog();
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      category: post.category,
      content: post.content,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingPost(null);
    setFormData({ title: "", category: "", content: "" });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header & Tombol Tambah */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Blog</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPost(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            {" "}
            {/* Lebarkan dialog */}
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Post" : "Create New Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Judul Artikel"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {/* Ganti Textarea dengan Editor Baru */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Konten Blog</label>
                <BlogEditor
                  content={formData.content}
                  onChange={(html) =>
                    setFormData({ ...formData, content: html })
                  }
                />
              </div>

              <DialogFooter>
                <Button type="submit">Simpan Artikel</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabel Data */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(post)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(post.id)}
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
};

export default BlogPage;
