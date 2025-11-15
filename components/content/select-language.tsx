"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguageStore } from "@/hooks/use-language";

export type Language = "en" | "zh" | "vi" | "ja" | "th" | "ko" | "es";

interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  {
    value: "en",
    label: "English",
    flag: "🇬🇧",
    nativeName: "English",
  },
  {
    value: "zh",
    label: "Chinese",
    flag: "🇨🇳",
    nativeName: "中文",
  },
  {
    value: "vi",
    label: "Vietnamese",
    flag: "🇻🇳",
    nativeName: "Tiếng Việt",
  },
  {
    value: "ja",
    label: "Japanese",
    flag: "🇯🇵",
    nativeName: "日本語",
  },
  {
    value: "th",
    label: "Thai",
    flag: "🇹🇭",
    nativeName: "ภาษาไทย",
  },
  {
    value: "ko",
    label: "Korean",
    flag: "🇰🇷",
    nativeName: "한국어",
  },
  {
    value: "es",
    label: "Spanish",
    flag: "🇪🇸",
    nativeName: "Español",
  },
];

interface SelectLanguageProps {
  className?: string;
}

export const SelectLanguage = ({ className }: SelectLanguageProps) => {
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
  };

  const selectedOption = languages.find((lang) => lang.value === language);

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className={className}>
        <SelectValue>
          <div className="flex items-center gap-2">
            <Languages className="size-4" />
            <span className="text-sm">
              {selectedOption?.flag} {selectedOption?.label}
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{language.label}</span>
                <span className="text-xs text-muted-foreground">
                  {language.nativeName}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
