import { useState, forwardRef } from "react";
import { Input } from "./Input";
import { ExpiryDate } from "../types";

interface CardExpiryInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "value" | "onChange"> {
  value?: ExpiryDate;
  onChange?: (value: ExpiryDate) => void;
  error?: string;
}

export const CardExpiryInput = forwardRef<HTMLInputElement, CardExpiryInputProps>(
  ({ value, onChange, error, ...rest }, ref) => {
    const [inputValue, setInputValue] = useState(formatToString(value));

    function formatToString(date?: ExpiryDate): string {
      if (!date || (!date.month && !date.year)) return "";
      return `${date.month.padStart(2, "0")} / ${date.year.padStart(2, "0")}`;
    }

    function parseToObject(input: string): ExpiryDate {
      const [month, year] = input.split("/").map((part) => part.trim());
      return {
        month: month || "",
        year: year || "",
      };
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
        error={error}
        {...rest}
      />
    );
  },
);
