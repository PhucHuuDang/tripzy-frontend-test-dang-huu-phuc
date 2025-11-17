"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { BusContent } from "@/components/content/bus-content";
import { useLanguage } from "@/hooks/use-language";
import { BlurFade } from "../ui/blur-fade";

export function HomeContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 pt-8 md:pt-12 pb-12 md:pb-16 ">
        <div className="w-full max-w-[1300px] space-y-8 md:space-y-12 flex flex-col items-center">
          {/* Hero Text */}
          <div className="space-y-2 md:space-y-3 text-center px-4">
            <BlurFade delay={0.1} inView>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
                {t("hero.title")}
              </h1>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                {t("hero.subtitle")}
              </p>
            </BlurFade>
          </div>

          {/* Tabs Card */}

          <BlurFade delay={0.25} inView>
            <Card className="border-0 shadow-lg w-full min-h-[328px] h-auto rounded-[16px] p-0 pt-2 lg:min-w-[1300px] lg:max-w-[1300px]">
              <CardContent className="p-0 m-0 h-full ">
                <Tabs defaultValue="bus" className="w-full h-full">
                  <div className="px-2 sm:px-3 pb-4 rounded-b-[18px] shadow-md">
                    <TabsList className="grid w-full grid-cols-3 rounded-[16px] p-0 h-auto bg-transparent ">
                      <TabsTrigger
                        value="bus"
                        className="flex items-center justify-start gap-1 sm:gap-2 border-b-2 bg-white data-[state=active]:bg-[#EBF9FF] w-full min-h-[60px] sm:min-h-[74px] rounded-[8px] py-2 sm:py-[12px] px-2 sm:px-[16px] cursor-pointer transition-all duration-300"
                      >
                        <Image
                          src="/bus-icon.png"
                          alt="Bus"
                          width={48}
                          height={48}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                        />
                        <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
                          {t("tabs.bus")}
                        </span>
                        <span className="sm:hidden text-xs">
                          {t("tabs.bus_short")}
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="hotel"
                        className="flex items-center justify-start gap-1 sm:gap-2 border-b-2 bg-white data-[state=active]:bg-[#F4FFEB] w-full min-h-[60px] sm:min-h-[74px] rounded-[8px] py-2 sm:py-[12px] px-2 sm:px-[16px] cursor-pointer transition-all duration-300"
                      >
                        <Image
                          src="/hotel-icon.png"
                          alt="Hotel"
                          width={48}
                          height={48}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                        />
                        <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
                          {t("tabs.hotel")}
                        </span>
                        <span className="sm:hidden text-xs">
                          {t("tabs.hotel_short")}
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="flight"
                        className="flex items-center justify-start gap-1 sm:gap-2 border-b-2 bg-white data-[state=active]:bg-[#E1EDFE] min-h-[60px] sm:min-h-[74px] rounded-[8px] py-2 sm:py-[12px] px-2 sm:px-[16px] cursor-pointer transition-all duration-300 w-full"
                      >
                        <Image
                          src="/flight-icon.png"
                          alt="Flight"
                          width={48}
                          height={48}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                        />
                        <span className="text-xs sm:text-sm md:text-base">
                          {t("tabs.flight")}
                        </span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent
                    value="bus"
                    className="w-full px-2 sm:px-3 h-full"
                  >
                    <div className="my-3 sm:my-4">
                      <BlurFade delay={0.25} inView>
                        <BusContent />
                      </BlurFade>
                    </div>
                  </TabsContent>

                  <TabsContent value="hotel" className="mt-0 p-6 sm:p-12">
                    <Empty className="border-0">
                      <EmptyDescription>{t("common.noData")}</EmptyDescription>
                    </Empty>
                  </TabsContent>

                  <TabsContent value="flight" className="mt-0 p-6 sm:p-12">
                    <Empty className="border-0">
                      <EmptyDescription>{t("common.noData")}</EmptyDescription>
                    </Empty>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </main>
    </div>
  );
}
