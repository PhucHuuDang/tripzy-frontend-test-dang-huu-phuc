import { LocationProps, locations } from "@/app/db";
import { Combobox } from "@/components/ui/combobox";
import { CloudHail } from "lucide-react";
import { useState, useEffect } from "react";

interface CustomComboboxProps {
  placeholder?: string;
  width?: number;
  value?: string;
  onChange?: (value: string) => void;

  options: LocationProps[];
}
export const CustomCombobox = ({
  placeholder,
  width,
  value,
  onChange,
  options,
}: CustomComboboxProps) => {
  const [internalValue, setInternalValue] = useState(value ?? "");

  // Sync internal value with prop value when it changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div className="w-full">
      <Combobox
        placeholder={placeholder ?? "Search..."}
        // width={256}
        value={value ?? internalValue}
        onChange={handleChange}
        className="w-full"
      >
        <Combobox.Input />
        <Combobox.List>
          {options.map((item: LocationProps) => (
            <Combobox.Option
              key={item.short_code}
              value={item.short_code}
              className=""
            >
              <div className="flex flex-col">
                <span className="text-[18px] font-medium text-black">
                  {item.short_code} - {item.english_name}
                </span>

                <span className="text-[15px] text-gray-500 -mt-[2px]">
                  {item.code_state}
                </span>
              </div>
            </Combobox.Option>
          ))}
        </Combobox.List>
      </Combobox>
    </div>
  );
};
