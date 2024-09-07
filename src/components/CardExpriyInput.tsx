import { useState, useEffect, forwardRef } from "react";
import { Input } from "./Input";

export interface ExpiryDate {
  month: number;
  year: number;
}

interface CardExpiryInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "value" | "onChange"> {
  value?: ExpiryDate;
  onChange?: (value: ExpiryDate) => void;
}

export const CardExpiryInput = forwardRef<HTMLInputElement, CardExpiryInputProps>(
  ({ value, onChange, ...rest }, ref) => {
    const [inputValue, setInputValue] = useState(formatToString(value) || "");

    useEffect(() => {
      setInputValue(formatToString(value) || "");
    }, [value]);

    function formatToString(date?: ExpiryDate): string {
      if (!date) return "";
      const { month, year } = date;
      return `${month.toString().padStart(2, "0")} / ${year.toString().padStart(2, "0")}`;
    }

    function parseToObject(input: string): ExpiryDate {
      const [month, year] = input.split("/").map((part) => Number.parseInt(part.trim(), 10));
      return { month: Number.isNaN(month) ? 0 : month, year: Number.isNaN(year) ? 0 : year };
    }

    const formatExpiry = (input: string): string => {
      const cleaned = input.replace(/\D/g, "");
      let formatted = cleaned.slice(0, 4);
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)} / ${formatted.slice(2)}`;
      }
      return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatExpiry(e.target.value);
      setInputValue(formattedValue);

      const objectValue = parseToObject(formattedValue);
      onChange?.(objectValue);
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        placeholder="MM / YY"
        maxLength={7}
        {...rest}
      />
    );
  },
);
