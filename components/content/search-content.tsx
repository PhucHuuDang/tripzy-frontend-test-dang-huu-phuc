"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { BlurFade } from "@/components/ui/blur-fade";

import { locations } from "@/app/db";

const Row = ({
  delay,
  label,
  value,
  show = true,
}: {
  delay: number;
  label: string;
  value: string;
  show?: boolean;
}) => {
  if (!show) return null;

  return (
    <BlurFade delay={delay} inView>
      <li className="text-base">
        <strong>{label}</strong> {value}
      </li>
    </BlurFade>
  );
};

export function SearchContent() {
  const { t } = useLanguage();
  const params = useSearchParams();

  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const dep = params.get("dep") || "";
  const ret = params.get("ret") || "";
  const pax = params.get("pax") || "";

  const getCityName = (code: string) =>
    locations.find((l) => l.short_code === code)?.english_name || "";

  const cityFrom = getCityName(from);
  const cityTo = getCityName(to);

  const fmt = (date: string) =>
    date ? format(new Date(date), "dd/MM/yyyy") : "-";

  return (
    <div className="p-4 container mx-auto flex justify-center items-center">
      <Card className="border-0 shadow-lg w-[1300px] h-[500px] rounded-[16px] p-0 pt-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            <BlurFade delay={0.05} inView>
              {t("search_page.title")}
            </BlurFade>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="mt-4 space-y-4 text-sm font-semibold">
            <Row
              delay={0.1}
              label={t("search_page.from_label")}
              value={cityFrom}
            />

            <Row delay={0.2} label={t("search_page.to_label")} value={cityTo} />

            <Row
              delay={0.3}
              label={t("search_page.departure_date_label")}
              value={fmt(dep)}
            />

            <Row
              delay={0.4}
              label={t("search_page.return_date_label")}
              value={fmt(ret)}
              show={!!ret}
            />

            <Row
              delay={0.5}
              label={t("search_page.passengers_label").toUpperCase()}
              value={pax}
            />
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------- Export Page ------------------------- */

export default function SearchPage() {
  const { t } = useLanguage();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          {t("common.loading")}
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
