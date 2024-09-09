import { forwardRef } from "react";
import { Input, InputProps } from "./Input";

interface NumberInputProps extends Omit<InputProps, "type" | "onChange"> {
  value?: string | number;
  onChange?: (value: string) => void;
  allowDecimal?: boolean;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, allowDecimal = false, allowNegative = false, allowLeadingZeros = false, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      const regex = allowNegative
        ? allowDecimal
          ? /^-?\d*\.?\d*$/
          : /^-?\d*$/
        : allowDecimal
          ? /^\d*\.?\d*$/
          : /^\d*$/;

      if (regex.test(newValue) || newValue === "") {
        if (!allowLeadingZeros && newValue.length > 1 && newValue[0] === "0" && newValue[1] !== ".") {
          newValue = newValue.replace(/^0+/, "") || "0";
        }

        onChange?.(newValue);
      }
    };

    return <Input ref={ref} type="text" inputMode="numeric" value={value} onChange={handleChange} {...rest} />;
  },
);
