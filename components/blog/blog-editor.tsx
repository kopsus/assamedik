"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List as ListIcon,
  ListOrdered,
  Quote,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ImageIcon,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const headings = [
  { level: 1, icon: <Heading1 className="h-4 w-4" /> },
  { level: 2, icon: <Heading2 className="h-4 w-4" /> },
  { level: 3, icon: <Heading3 className="h-4 w-4" /> },
  { level: 4, icon: <Heading4 className="h-4 w-4" /> },
  { level: 5, icon: <Heading5 className="h-4 w-4" /> },
  { level: 6, icon: <Heading6 className="h-4 w-4" /> },
];

export default function BlogEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (val: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      // StarterKit sudah mencakup heading, bulletList, orderedList, blockquote, dll.
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        // Pastikan bulletList dan orderedList aktif
        bulletList: {},
        orderedList: {},
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-2xl border shadow-lg max-w-full my-8 mx-auto",
        },
      }),
      Placeholder.configure({
        placeholder: "Tuliskan cerita luar biasa anda di sini...",
      }),
      CharacterCount,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 cursor-pointer",
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  // Handler untuk Image
  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          editor
            .chain()
            .focus()
            .setImage({ src: readerEvent.target?.result as string })
            .run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col min-h-150 w-full bg-background border rounded-3xl shadow-sm overflow-hidden border-muted-foreground/20">
      <div className="flex flex-wrap items-center gap-1 p-3 border-b bg-muted/5 backdrop-blur-sm sticky top-0 z-30">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={<Undo className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={<Redo className="h-4 w-4" />}
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          icon={<Bold className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          icon={<Italic className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          icon={<UnderlineIcon className="h-4 w-4" />}
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        {headings.map(({ level, icon }) => (
          <ToolbarButton
            key={level}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as any })
                .run()
            }
            active={editor.isActive("heading", { level })}
            icon={icon}
          />
        ))}

        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
          icon={<Type className="h-4 w-4" />}
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          icon={<AlignLeft className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          icon={<AlignCenter className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          icon={<AlignRight className="h-4 w-4" />}
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          icon={<ListIcon className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          icon={<ListOrdered className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          icon={<Quote className="h-4 w-4" />}
        />

        <ToolbarButton
          onClick={addImage}
          icon={<ImageIcon className="h-4 w-4" />}
        />
      </div>

      <div className="flex-1 bg-white dark:bg-zinc-950 p-10 md:p-20 cursor-text min-h-125">
        <EditorContent
          editor={editor}
          className="prose prose-stone dark:prose-invert lg:prose-2xl max-w-4xl mx-auto focus:outline-none"
        />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active = false,
  icon,
}: {
  onClick: () => void;
  active?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="icon"
      className={`h-9 w-9 transition-all duration-200 ${active ? "bg-secondary shadow-inner scale-95" : "hover:scale-105"}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
