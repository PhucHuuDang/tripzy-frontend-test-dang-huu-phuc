"use client";

import { z } from "zod";
import { CustomCombobox } from "../form/custom-combobox";
import { useEffect, useState } from "react";
import CalendarLocalize from "../ui/calendar-localize";
import { locations } from "@/app/db";
import Image from "next/image";
import { DateRange } from "react-day-picker";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import {
  CalendarIcon,
  ChevronDown,
  ChevronUpIcon,
  SearchIcon,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import { Skeleton } from "../ui/skeleton";
import { useLanguage } from "@/hooks/use-language";
import { BlurFade } from "../ui/blur-fade";

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="relative w-full">
      {error && (
        <p className="text-rose-500 text-xs absolute top-full left-0">
          {error}
        </p>
      )}
    </div>
  );
};

export const BusContent = () => {
  const { t, language } = useLanguage();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [direction, setDirection] = useState<"from" | "to">("from");

  const [isOpenDepartureDate, setIsOpenDepartureDate] =
    useState<boolean>(false);

  const [isOpenRoundTrip, setIsOpenRoundTrip] = useState<boolean>(false);
  const [checkedRoundTrip, setCheckedRoundTrip] = useState<boolean>(false);

  const [passengers, setPassengers] = useState<string>("1");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const mounted = useMounted();

  const handleChangeDirection = () => {
    // Swap the values - use temp variables to avoid state update race condition
    const tempFrom = from;
    const tempTo = to;
    setFrom(tempTo);
    setTo(tempFrom);

    // Toggle direction for visual indicator
    setDirection(direction === "from" ? "to" : "from");
  };

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const handleSearch = () => {
    // Create dynamic validation schema with translated messages
    const formSchema = z
      .object({
        from: z.string().min(1, t("validation.from_required")),
        to: z.string().min(1, t("validation.to_required")),
        departureDate: z.date({
          message: t("validation.departure_date_required"),
        }),
        returnDate: z.date().optional().nullable(),
        passengers: z
          .number()
          .min(1, t("validation.passengers_min"))
          .max(20, t("validation.passengers_max")),
        mode: z.enum(["bus"]).default("bus"),
      })
      .refine(
        (data) => !data.returnDate || data.returnDate >= data.departureDate,
        {
          message: t("validation.return_date_invalid"),
          path: ["returnDate"],
        }
      );

    try {
      // Parse passenger string → number
      const pax = parseInt(passengers);

      const result = formSchema.parse({
        from,
        to,
        departureDate: dateRange?.from,
        returnDate: dateRange?.to ? dateRange?.to : undefined,
        passengers: pax,
      });

      // Clear error
      setFormErrors({});

      // Build query parameters
      const query = new URLSearchParams({
        mode: "bus",
        from: result.from,
        to: result.to,
        dep: result.departureDate.toISOString(),
        ...(result.returnDate ? { ret: result.returnDate.toISOString() } : {}),

        pax: String(result.passengers),
      }).toString();

      router.push(`/search?${query}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formatted = err.format();
        const errorMap: Record<string, string> = {};

        if (formatted.from?._errors?.length) {
          errorMap.from = formatted.from._errors[0];
        }
        if (formatted.to?._errors?.length) {
          errorMap.to = formatted.to._errors[0];
        }
        if (formatted.departureDate?._errors?.length) {
          errorMap.departureDate = formatted.departureDate._errors[0];
        }
        if (formatted.returnDate?._errors?.length) {
          errorMap.returnDate = formatted.returnDate._errors[0];
        }
        if (formatted.passengers?._errors?.length) {
          errorMap.passengers = formatted.passengers._errors[0];
        }

        setFormErrors(errorMap);
      }
    }
  };

  useEffect(() => {
    if (dateRange?.to) {
      // setIsOpenRoundTrip(true);
      setTimeout(() => {
        setCheckedRoundTrip(true);
      }, 0);
    } else {
      setTimeout(() => {
        setCheckedRoundTrip(false);
      }, 0);
    }
  }, [dateRange?.to]);

  // console.log({ language });

  if (!mounted)
    return (
      <>
        <Skeleton className="w-full h-[52px] rounded-md" />
        <Skeleton className="w-full h-[52px] rounded-md" />

        <Skeleton className="w-full h-[52px] rounded-md" />
      </>
    );
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-2">
        {/* From/To Section */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
          <div className="flex flex-col gap-2 items-start w-full sm:w-auto sm:flex-1">
            <span className="font-medium leading-[12px] text-xs text-[#65686F]">
              {t("bus_form.bus_from")}
            </span>

            <CustomCombobox
              key="from"
              options={locations.filter(({ short_code }) => short_code !== to)}
              value={from}
              onChange={setFrom}
              placeholder={t("bus_form.placeholder_location")}
            />

            <ErrorMessage error={formErrors.from} />
          </div>

          <div
            className={`cursor-pointer transition-all mt-0 sm:mt-5 duration-300 size-10 sm:size-12 self-center sm:self-auto mx-auto sm:mx-0 ${
              direction === "from" ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => {
              if (from && to) {
                handleChangeDirection();
              }
            }}
          >
            <Image
              src="/change-button.png"
              alt="change-direction"
              width={48}
              height={48}
              className={`bg-cover bg-center w-full h-full bg-no-repeat`}
              style={{
                opacity: from && to ? 1 : 0.5,
              }}
            />
          </div>

          <div className="flex flex-col gap-2 items-start w-full sm:w-auto sm:flex-1">
            <span className="font-medium leading-[12px] text-xs text-[#65686F]">
              {t("bus_form.bus_to")}
            </span>

            <CustomCombobox
              key="to"
              options={locations.filter(
                ({ short_code }) => short_code !== from
              )}
              value={to}
              onChange={setTo}
              placeholder={t("bus_form.placeholder_location")}
            />

            <ErrorMessage error={formErrors.to} />
          </div>
        </div>

        {/* Dates Section */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2">
          <Popover
            open={isOpenDepartureDate}
            onOpenChange={setIsOpenDepartureDate}
          >
            <PopoverTrigger className="w-full">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="font-medium leading-[12px] text-xs text-[#65686F]">
                  {t("bus_form.departure_date")}
                </span>
                <div
                  className={`bg-white flex items-center gap-2 h-[52px] w-full text-[#65686F] px-4 py-2 focus:ring-[#19C0FF] focus:ring-offset-2 focus:outline-none border focus:border-[#19C0FF] rounded-md cursor-pointer transition duration-300 ${
                    isOpenDepartureDate ? " border-[#19C0FF]" : ""
                  }`}
                >
                  <CalendarIcon className="size-4 text-black" />
                  <span>
                    {dateRange?.from
                      ? format(dateRange?.from, "dd/MM/yyyy")
                      : t("bus_form.placeholder_departure")}
                  </span>
                </div>

                <ErrorMessage error={formErrors.departureDate} />
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-full border-none border-0 border-s-transparent p-0 z-50">
              <CalendarLocalize
                selected={dateRange?.from}
                onSelect={(date) =>
                  setDateRange({
                    from: date,
                    to: date
                      ? new Date(
                          new Date(date).setDate(new Date(date).getDate() + 2)
                        )
                      : undefined,
                  })
                }
                mode="single"
                numberOfMonths={2}
                locale={language}
                defaultMonth={new Date()}
                buttonVariant="outline"
                className="[--cell-size:--spacing(8)] md:[--cell-size:--spacing(10)]"
                disabled={{
                  before: new Date(),
                }}
              />
            </PopoverContent>
          </Popover>

          <Popover open={isOpenRoundTrip} onOpenChange={setIsOpenRoundTrip}>
            <PopoverTrigger
              className="w-full flex gap-1.5 flex-col"
              style={{
                opacity: checkedRoundTrip ? 1 : 0.4,
              }}
            >
              <div className="flex w-full items-center  gap-2 ">
                <Checkbox
                  id="roundTrip"
                  checked={checkedRoundTrip}
                  onCheckedChange={(val) => {
                    setCheckedRoundTrip(Boolean(val));

                    if (!val) {
                      setDateRange((prev) => {
                        return {
                          from: prev?.from ?? new Date(),
                          to: undefined,
                        };
                      });
                    }
                  }}
                  className="w-4 h-4 rounded border-[#CCCFD5] text-[#19C0FF] focus:ring-[#19C0FF] cursor-pointer"
                />
                <Label
                  className="text-xs font-medium leading-[12px] text-gray-900 cursor-pointer select-none "
                  onClick={() => setIsOpenRoundTrip(!isOpenRoundTrip)}
                >
                  {t("common.round_trip")}
                </Label>
              </div>

              <div
                className={`bg-white h-[52px]  flex items-center gap-2 w-full text-[#65686F] px-4 py-2 focus:ring-[#19C0FF] focus:ring-offset-2 focus:outline-none border focus:border-[#19C0FF] rounded-md cursor-pointer transition duration-300 ${
                  isOpenDepartureDate ? " border-[#19C0FF]" : ""
                }`}
              >
                <CalendarIcon className="size-4 text-black" />
                <span>
                  {dateRange?.to
                    ? format(dateRange?.to, "dd/MM/yyyy")
                    : t("bus_form.placeholder_return")}
                </span>
              </div>

              <ErrorMessage error={formErrors.returnDate} />
            </PopoverTrigger>

            <PopoverContent className="w-full border-none border-0 border-s-transparent p-0 z-50">
              <CalendarLocalize
                selected={dateRange}
                onSelect={(range) => {
                  if (!range) return;

                  setDateRange({
                    from: range.from ?? dateRange?.from ?? new Date(),
                    to: range.to ?? new Date(),
                  });

                  if (range.to) setCheckedRoundTrip(true);
                }}
                mode="range"
                numberOfMonths={2}
                locale={language}
                defaultMonth={new Date()}
                buttonVariant="outline"
                className="[--cell-size:--spacing(8)] md:[--cell-size:--spacing(10)]"
                disabled={{
                  before: new Date(),
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Passengers Section */}
        <div className="w-full sm:w-auto flex flex-col gap-2 items-start sm:basis-auto lg:max-w-[150px]">
          <span className="font-medium leading-[12px] text-xs text-[#65686F]">
            {t("bus_form.no_of_passengers")}
          </span>
          <InputGroup className="h-[52px] w-full">
            <InputGroupInput
              placeholder="1"
              className="pl-1! "
              value={passengers}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "") return setPassengers("");

                const num = parseInt(value);
                if (!isNaN(num) && num >= 0) {
                  setPassengers(String(num));
                }
              }}
            />
            <InputGroupAddon>
              <InputGroupText className="flex items-center px-2">
                <User size={16} className="text-black" />
              </InputGroupText>
            </InputGroupAddon>

            <InputGroupAddon
              align="inline-end"
              className="p-0 overflow-hidden border-l border-gray-200"
            >
              <div className="flex flex-col h-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-[25px] w-[28px]"
                  onClick={() =>
                    setPassengers(String(parseInt(passengers) + 1))
                  }
                >
                  <ChevronUpIcon />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-[25px] w-[28px] border-t border-gray-200"
                  onClick={() =>
                    setPassengers(
                      String(
                        parseInt(passengers) - 1 > 0
                          ? parseInt(passengers) - 1
                          : 1
                      )
                    )
                  }
                  disabled={parseInt(passengers) === 1}
                >
                  <ChevronDown />
                </Button>
              </div>
            </InputGroupAddon>
          </InputGroup>

          <ErrorMessage error={formErrors.passengers} />
        </div>
      </div>

      <div className="flex justify-center min-h-[80px] md:h-[100px] items-end pt-4">
        <BlurFade delay={0.5} inView>
          <Button
            className="w-full sm:w-[266px] h-[52px] mx-auto rounded-full text-white bg-[#19C0FF] hover:bg-[#19C0FF]/90 cursor-pointer transition duration-300"
            onClick={handleSearch}
          >
            <SearchIcon className="size-5 " />{" "}
            <span className="font-semibold text-base uppercase">
              {t("bus_form.search_button")}
            </span>
          </Button>
        </BlurFade>
      </div>
    </>
  );
};
