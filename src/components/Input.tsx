import { forwardRef } from "react";
import tw from "twin.macro";

export const Input = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(({ ...rest }, ref) => (
  <div css={tw`inline-flex flex-col w-full gap-4`}>
    <input
      ref={ref}
      css={[
        tw`w-full px-12 text-black placeholder-gray-400 border-gray-400 py-9 h-36 rounded-5`,
        tw`hover:border-gray-400`,
        tw`focus:border-gray-400 focus:outline-none focus:ring-0`,
      ]}
      {...rest}
    />
  </div>
));
