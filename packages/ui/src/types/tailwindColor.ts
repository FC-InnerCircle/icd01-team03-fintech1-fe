// Tailwind의 기본 색상 팔레트
type TailwindColors =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

// 색상의 음영
type ColorShades = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950";

// Tailwind 색상 상수 키 타입
export type ColorConstantsKeyType = `${TailwindColors}-${ColorShades}` | TailwindColors;
