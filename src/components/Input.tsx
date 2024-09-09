import { forwardRef } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...rest }, ref) => (
  <div className="inline-flex flex-col w-full gap-4">
    <input
      ref={ref}
      className={`w-full px-12 py-9 h-36 text-black placeholder-gray-400 rounded-5
                  hover:ouline-none hover:ring-0
                  focus:border-blue-400 focus:outline-none focus:ring-0
                  h
                  ${error ? "border-red-500" : " border-gray-300"}
                  ${className || ""}`}
      {...rest}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
));
