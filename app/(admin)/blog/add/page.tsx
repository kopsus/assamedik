"use client";

import { useState } from "react";
import BlogEditor from "@/components/blog/blog-editor";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log({ title, content });
    alert("Postingan berhasil disimpan!");
    router.push("/blog"); // Kembali ke tabel setelah save
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Navigasi */}
        <div className="flex items-center justify-between">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
            </Button>
          </Link>
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Save className="mr-2 h-4 w-4" /> Publish Post
          </Button>
        </div>

        {/* Input Judul Massive */}
        <input
          type="text"
          placeholder="Judul Artikel..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-4xl md:text-5xl font-bold outline-none placeholder:text-muted-foreground/40 py-4"
        />

        {/* Editor Area */}
        <BlogEditor content={content} onChange={setContent} />
      </div>
    </div>
  );
}
