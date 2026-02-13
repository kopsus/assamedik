"use client";

import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Save,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const INITIAL_SOCIALS = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://facebook.com/assamedik",
    isEnabled: true,
    icon: <Facebook className="h-5 w-5 text-blue-600" />,
  },
  {
    id: "x",
    name: "X (Twitter)",
    url: "https://x.com/assamedik",
    isEnabled: true,
    icon: <Twitter className="h-5 w-5 text-black" />,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/assamedik",
    isEnabled: true,
    icon: <Instagram className="h-5 w-5 text-pink-600" />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/company/assamedik",
    isEnabled: true,
    icon: <Linkedin className="h-5 w-5 text-blue-700" />,
  },
];

export default function SocialMediaCMS() {
  const [socials, setSocials] = useState(INITIAL_SOCIALS);

  const handleToggle = (id: string) => {
    setSocials(
      socials.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s)),
    );
  };

  const handleUrlChange = (id: string, value: string) => {
    setSocials(socials.map((s) => (s.id === id ? { ...s, url: value } : s)));
  };

  const handleSave = () => {
    console.log("Saving Social Media Settings:", socials);
    alert("Konfigurasi Social Media Berhasil Disimpan!");
  };

  return (
    <div className="p-8 w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Social Media Settings
        </h1>
        <p className="text-muted-foreground text-sm">
          Atur link dan ikon sosial media yang muncul di bagian footer website.
        </p>
      </div>

      <div className="space-y-6">
        {socials.map((social) => (
          <div
            key={social.id}
            className={`flex items-start gap-4 p-4 border rounded-xl transition-all ${!social.isEnabled ? "bg-muted/30 opacity-60" : "bg-card shadow-sm"}`}
          >
            <div className="p-3 bg-muted rounded-lg shrink-0">
              {social.icon}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-bold">{social.name}</Label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    {social.isEnabled ? "Aktif" : "Nonaktif"}
                  </span>
                  <Switch
                    checked={social.isEnabled}
                    onCheckedChange={() => handleToggle(social.id)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  value={social.url}
                  placeholder={`Masukkan URL ${social.name}`}
                  onChange={(e) => handleUrlChange(social.id, e.target.value)}
                  disabled={!social.isEnabled}
                  className="bg-background"
                />
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className={!social.isEnabled ? "hidden" : ""}
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="w-full md:w-auto px-12 h-11 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="mr-2 h-4 w-4" /> Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
}
