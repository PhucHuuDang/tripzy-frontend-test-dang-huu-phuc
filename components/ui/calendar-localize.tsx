"use client";

import * as React from "react";
import { Locale, Matcher, type DateRange } from "react-day-picker";
import { enUS, zhCN, vi, ja, th, ko, es } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";

import { Card, CardContent } from "./card";
import { cn } from "@/lib/utils";
import { Language } from "../content/select-language";

// Map language codes to date-fns locales
const localeMap: Record<Language, Locale> = {
  en: enUS,
  zh: zhCN,
  vi: vi,
  ja: ja,
  th: th,
  ko: ko,
  es: es,
};

type CalendarLocalizeProps =
  | {
      mode: "single";
      selected?: Date;
      onSelect?: (date: Date | undefined) => void;
      numberOfMonths: number;
      locale?: Language;
      className?: string;
      defaultMonth?: Date;
      buttonVariant: "outline" | "ghost" | "default";
      required?: boolean;
      disabled?: Matcher;
    }
  | ({
      mode: "range";
      selected?: DateRange | undefined;
      onSelect?: (range: DateRange | undefined) => void;
      numberOfMonths: number;
      locale?: Language;
      className?: string;
      defaultMonth?: Date;
      buttonVariant: "outline" | "ghost" | "default";
      required?: boolean;
      disabled?: Matcher;
    } & {
      modifiers?: Record<string, Matcher | Matcher[] | undefined>;
      modifiersClassNames?: Record<string, string>;
    });

// interface CalendarLocalizeProps extends <typeof Calendar>

export default function CalendarLocalize({
  mode,
  numberOfMonths,
  defaultMonth,
  required,
  onSelect,
  selected,
  buttonVariant,
  locale = "en",
  disabled,
  className,
}: CalendarLocalizeProps) {
  // Get the actual date-fns locale object from the language code
  const dateFnsLocale = localeMap[locale] || enUS;

  return (
    <Card className="w-full min-w-xl">
      <CardContent className="pt-4 w-full">
        {mode === "single" && (
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            defaultMonth={defaultMonth}
            numberOfMonths={numberOfMonths}
            locale={dateFnsLocale}
            className={cn("bg-transparent p-0", className)}
            buttonVariant={buttonVariant}
            required={required}
            disabled={disabled}
            modifiers={{
              weekend: { dayOfWeek: [0, 6] },
            }}
            modifiersClassNames={{
              weekend: "text-rose-500",
            }}
          />
        )}

        {mode === "range" && (
          <Calendar
            mode="range"
            selected={selected}
            onSelect={onSelect}
            defaultMonth={defaultMonth}
            numberOfMonths={numberOfMonths}
            locale={dateFnsLocale}
            className={cn("bg-transparent p-0", className)}
            buttonVariant={buttonVariant}
            required={required}
            disabled={disabled}
            modifiers={{
              weekend: { dayOfWeek: [0, 6] },
            }}
            modifiersClassNames={{
              weekend: "text-rose-500",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
