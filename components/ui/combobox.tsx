import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import clsx from "clsx";
import { Material } from "@/components/ui/material-1";
import { Button } from "@/components/ui/button-1";
import { Input } from "./input-combobox";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LocationProps } from "@/app/db";

const SearchIcon = () => (
  <Image src="/bus-search.png" alt="Search" width={30} height={30} />
);

const ArrowBottomIcon = ({ className }: { className?: string }) => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-gray-1000"
  >
    <path
      d="M4 12.6111L8.92308 17.5L20 6.5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z"
    />
  </svg>
);

const ComboboxContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
  inputValue: string;
  onChangeInputValue: (value: string) => void;
  value: string;
  onChangeValue: (value: string) => void;
  disabled?: boolean;
  errored?: boolean;
  size?: "small" | "medium" | "large";
  options: LocationProps[];
  setOptions: React.Dispatch<React.SetStateAction<LocationProps[]>>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
} | null>(null);

interface ComboboxProps {
  placeholder?: string;
  value?: string | null;
  onChange?: (value: string) => void;
  disabled?: boolean;
  errored?: boolean;
  width?: number;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;

  className?: string;
}

export const Combobox = ({
  placeholder = "Search...",
  value,
  onChange,
  disabled = false,
  errored = false,
  width,
  size = "medium",
  children,

  className,
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [_value, set_value] = useState<string>(value || "");
  const [options, setOptions] = useState<LocationProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef<string | null | undefined>(value);
  const prevOptionsLengthRef = useRef<number>(0);

  const onChangeInputValue = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const onChangeValue = useCallback(
    (value: string) => {
      set_value(value);
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  // Sync value from parent prop
  useEffect(() => {
    if (value !== prevValueRef.current) {
      prevValueRef.current = value;
      if (value !== undefined && value !== null) {
        set_value(value);
      }
    }
  }, [value]);

  // Update input display when options are first loaded or value changes from parent
  useEffect(() => {
    const optionsChanged = options.length !== prevOptionsLengthRef.current;
    prevOptionsLengthRef.current = options.length;

    // Update display when _value changes and options are available
    if (_value && options.length > 0) {
      const selectedOption = options.find((opt) => opt.short_code === _value);
      if (selectedOption) {
        const displayValue =
          selectedOption.english_name + " - " + selectedOption.code_state;
        // Always update the display value when _value changes
        setInputValue(displayValue);
      }
    } else if (!_value) {
      // Clear input when value is cleared
      setInputValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_value, options]);

  return (
    <ComboboxContext.Provider
      value={{
        isOpen,
        setIsOpen,
        placeholder,
        inputValue,
        onChangeInputValue,
        disabled,
        errored,
        size,
        value: _value,
        onChangeValue,
        options,
        setOptions,
        inputRef,
      }}
    >
      <div
        className={cn(
          "relative w-full h-[52px] inline-block rounded-sm text-sm font-sans border transition-colors duration-200",
          errored
            ? "border-red-900 focus-within:border-red-900 hover:border-red-900"
            : "border-[#CCCFD5] hover:border-[#19C0FF] focus-within:border-[#19C0FF]",
          className
        )}
        style={{ width }}
      >
        {children}
      </div>
    </ComboboxContext.Provider>
  );
};

const ComboboxInput = ({ classNameInput }: { classNameInput?: string }) => {
  const context = useContext(ComboboxContext);
  const [_errored, set_errored] = useState<boolean>(context?.errored || false);

  const onFocus = () => {
    context?.setIsOpen(true);
    set_errored(false);
  };

  const onBlur = () => {
    context?.setIsOpen(false);
    const currentOption = context?.options.find(
      (option) => option.short_code === context.value
    );
    if (currentOption) {
      context?.onChangeInputValue(
        currentOption.english_name + " - " + currentOption.code_state
      );
    }
    set_errored(context?.errored || false);
  };

  const handleInputChange = (value: string) => {
    context?.onChangeInputValue(value);
    // Open dropdown when user starts typing
    if (!context?.isOpen) {
      context?.setIsOpen(true);
    }
  };

  const onCloseClick = () => {
    context?.onChangeInputValue("");
    context?.onChangeValue("");
    context?.setIsOpen(false);
  };

  useEffect(() => {
    // set_errored(context?.errored || false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    set_errored(context?.errored || false);
    // set_errored((prev) => {
    //   if (prev === (context?.errored ?? false)) return prev;
    //   return context?.errored ?? false;
    // });
  }, [context?.errored]);

  // console.log(context?.inputValue);

  return (
    <Input
      prefix={<SearchIcon />}
      prefixStyling={false}
      suffix={
        context?.inputValue ? (
          <Button
            variant="unstyled"
            svgOnly
            className="fill-gray-700 -mr-3"
            onClick={onCloseClick}
          >
            <CloseIcon className={clsx(context?.errored && "fill-red-900")} />
          </Button>
        ) : (
          <ArrowBottomIcon
            className={clsx("duration-200", context?.isOpen && "rotate-180")}
          />
        )
      }
      suffixStyling={
        context?.disabled ? "cursor-not-allowed" : "cursor-pointer"
      }
      placeholder={context?.placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      value={context?.inputValue}
      onChange={handleInputChange}
      disabled={context?.disabled}
      error={_errored}
      size={context?.size}
      ref={context?.inputRef}
      wrapperClassName="!border-none !shadow-none hover:!border-none focus-within:!border-none focus-within:!shadow-none"
      className={cn(
        "h-full",
        context?.errored && "text-red-900",
        classNameInput
      )}
    />
  );
};

const ComboboxList = ({
  children,
  maxWidth,
  emptyMessage = "No results",
}: {
  children?: React.ReactNode;
  maxWidth?: number;
  emptyMessage?: string;
}) => {
  const context = useContext(ComboboxContext);
  const [position, setPosition] = useState<{ top?: number; bottom?: number }>();
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (React.isValidElement<ComboboxOptionProps>(child)) {
      const searchText = context?.inputValue?.toLowerCase().trim() || "";

      // If no search text, show all options
      if (!searchText) return true;

      // Find the corresponding location data from options array
      const locationData = context?.options.find(
        (opt) => opt.short_code === child.props.value
      );

      if (locationData) {
        // Search in english_name, code_state, and short_code
        const englishName = locationData.english_name?.toLowerCase() || "";
        const codeState = locationData.code_state?.toLowerCase() || "";
        const shortCode = locationData.short_code?.toLowerCase() || "";

        return (
          englishName.includes(searchText) ||
          codeState.includes(searchText) ||
          shortCode.includes(searchText)
        );
      }

      // Fallback to searching in the rendered children text
      const childText = child.props.children?.toString().toLowerCase() || "";
      const valueText = child.props.value?.toLowerCase() || "";
      return childText.includes(searchText) || valueText.includes(searchText);
    }
    return false;
  });

  useEffect(() => {
    if (!context) return;

    // Extract LocationProps from children
    const extractedOptions: LocationProps[] = React.Children.toArray(children)
      .map((child) => {
        if (React.isValidElement<ComboboxOptionProps>(child)) {
          // Try to extract location data from the child structure
          const childContent = child.props.children;

          // If children is a div with spans (like in CustomCombobox), extract the data
          if (React.isValidElement(childContent)) {
            const contentProps = childContent.props as {
              children?: React.ReactNode;
            };
            const spans = React.Children.toArray(contentProps.children);
            const firstSpan = spans[0];
            const secondSpan = spans[1];

            if (
              React.isValidElement(firstSpan) &&
              React.isValidElement(secondSpan)
            ) {
              const firstProps = firstSpan.props as {
                children?: React.ReactNode;
              };
              const secondProps = secondSpan.props as {
                children?: React.ReactNode;
              };
              const firstText = firstProps.children;
              const secondText = secondProps.children;

              // Parse "MD - Moldova, Republic of"
              const englishName =
                typeof firstText === "string"
                  ? firstText.split(" - ")[1] || firstText
                  : child.props.value;

              return {
                short_code: child.props.value,
                english_name: englishName,
                code_state:
                  typeof secondText === "string"
                    ? secondText
                    : child.props.value,
              };
            }
          }

          // Fallback: simple text children
          return {
            short_code: child.props.value,
            english_name: child.props.children?.toString() || child.props.value,
            code_state: child.props.children?.toString() || child.props.value,
          };
        }
        return undefined;
      })
      .filter(
        (option): option is LocationProps =>
          option !== undefined && option.short_code !== ""
      );

    context.setOptions(extractedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  useEffect(() => {
    const getPosition = () => {
      if (
        context?.isOpen &&
        context.inputRef &&
        context.inputRef.current &&
        menuRef.current
      ) {
        const buttonRect = context.inputRef.current.getBoundingClientRect();
        const menuHeight = menuRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        let _position;

        if (buttonRect.bottom + menuHeight <= viewportHeight) {
          _position = { top: buttonRect.height + 10 };
        } else if (buttonRect.top - menuHeight >= 0) {
          _position = { bottom: buttonRect.height + 28 };
        } else {
          _position = { top: buttonRect.height + 28 };
        }

        setPosition(_position);
      }
    };

    getPosition();

    window.addEventListener("resize", getPosition);
    window.addEventListener("scroll", getPosition);

    return () => {
      window.removeEventListener("resize", getPosition);
      window.removeEventListener("scroll", getPosition);
    };
  }, [context?.isOpen, context?.inputRef]);

  return (
    <Material
      ref={menuRef}
      type="menu"
      className={clsx(
        "absolute w-full z-50 left-1/2 -translate-x-[40%] min-w-[331px]",
        context?.isOpen && "opacity-100",
        !context?.isOpen && "opacity-0 pointer-events-none duration-200"
      )}
      style={{ maxWidth, ...position }}
    >
      <ul className="p-2 ">
        {filteredChildren.length > 0 ? (
          filteredChildren
        ) : (
          <li
            className={clsx(
              "flex justify-center items-center p-2 text-gray-900",
              context?.size === "large" ? "text-base" : "text-sm"
            )}
          >
            {emptyMessage}
          </li>
        )}
      </ul>
    </Material>
  );
};

interface ComboboxOptionProps {
  value: string;
  children: React.ReactNode;

  className?: string;
}

const ComboboxOption = ({
  value,
  children,
  className,
}: ComboboxOptionProps) => {
  const context = useContext(ComboboxContext);

  const onClick = () => {
    context?.onChangeValue(value);
    // Update display with the selected option
    const selectedOption = context?.options.find(
      (opt) => opt.short_code === value
    );
    if (selectedOption) {
      context?.onChangeInputValue(
        selectedOption.english_name + " - " + selectedOption.code_state
      );
    }
    context?.setIsOpen(false);
  };

  return (
    <li
      className={clsx(
        "flex justify-between items-center gap-2 cursor-pointer px-2 py-2.5 w-full rounded-md hover:bg-gray-alpha-100 active:bg-gray-alpha-100 font-sans text-gray-1000 fill-gray-1000 ",
        context?.size === "large" ? "text-base" : "text-sm",
        className
      )}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
      {value === context?.value && <CheckIcon />}
    </li>
  );
};

Combobox.Input = ComboboxInput;
Combobox.List = ComboboxList;
Combobox.Option = ComboboxOption;
