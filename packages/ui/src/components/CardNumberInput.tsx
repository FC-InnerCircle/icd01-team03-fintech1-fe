import { useState, useEffect, forwardRef } from "react";
import { Input, InputProps } from "./Input";

interface CardNumberInputProps extends Omit<InputProps, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export const CardNumberInput = forwardRef<HTMLInputElement, CardNumberInputProps>(
  ({ value, onChange, ...rest }, ref) => {
    const [inputValue, setInputValue] = useState(value || "");

    useEffect(() => {
      setInputValue(formatCardNumber(value || ""));
    }, [value]);

    const formatCardNumber = (input: string): string => {
      const digitsOnly = input.replace(/\D/g, "");
      let formatted = "";
      for (let i = 0; i < digitsOnly.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += " ";
        }
        formatted += digitsOnly[i];
      }
      return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatCardNumber(e.target.value);
      setInputValue(formattedValue);
      onChange?.(formattedValue.replace(/\s/g, ""));
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        placeholder="1234 1234 1234 1234"
        maxLength={19}
        {...rest}
      />
    );
  },
);
