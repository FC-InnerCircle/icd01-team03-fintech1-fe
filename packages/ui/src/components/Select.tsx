import React, { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import mergeRefs from "../utils/mergeRefs";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.ComponentPropsWithoutRef<"div">, "value" | "onChange"> {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  visibleOptions?: number;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = "선택하세요", error, visibleOptions = 5, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<(HTMLDivElement | null)[]>([]);

    const selectedOption = options.find((option) => option.value === value);

    const setOptionRef = useCallback((el: HTMLDivElement | null, index: number) => {
      optionsRef.current[index] = el;
    }, []);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (isOpen && highlightedIndex !== -1) {
        optionsRef.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
      }
    }, [isOpen, highlightedIndex]);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (option: SelectOption) => {
      onChange(option.value);
      setIsOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
          setIsOpen(true);
          setHighlightedIndex(0);
          event.preventDefault();
        }
        return;
      }

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowUp":
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          event.preventDefault();
          break;
        case "ArrowDown":
          setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          event.preventDefault();
          break;
        case "Enter":
        case " ":
          if (highlightedIndex !== -1) {
            handleSelect(options[highlightedIndex]);
          }
          event.preventDefault();
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    const optionHeight = 36;

    return (
      <div className="relative" ref={ref ? mergeRefs(ref, selectRef) : selectRef} {...rest}>
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full h-36 px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </button>
        {isOpen && (
          <div
            className="absolute z-10 w-full mt-1 overflow-hidden bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="listbox"
            style={{
              maxHeight: options.length > visibleOptions ? `${optionHeight * visibleOptions}px` : "auto",
              overflowY: options.length > visibleOptions ? "auto" : "visible",
            }}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                ref={(el) => setOptionRef(el, index)}
                role="option"
                tabIndex={0}
                aria-selected={value === option.value}
                className={`cursor-default select-none relative flex items-center justify-center ${
                  highlightedIndex === index ? "bg-blue-600 text-white" : "text-gray-900"
                }`}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelect(option);
                    e.preventDefault();
                  }
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                style={{ height: `${optionHeight}px` }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
