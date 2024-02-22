import { React } from "@metro/common";
import { semanticColors } from "@ui/color";
import { General } from "@ui/components";
import { findByDisplayName, findByName, findByProps, findByStoreName } from "@metro/filters";
const colorModule = findByProps("colors", "unsafe_rawColors");
const colorResolver = colorModule?.internal ?? colorModule?.meta;
const ThemeStore = findByStoreName("ThemeStore");
type TextStyleSheetCase =
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";
type TextStyleSheetRedesignCase = "normal" | "medium" | "semibold" | "bold";
type TextStyleSheetVariant =
  | `heading-sm/${TextStyleSheetCase}`
  | `heading-md/${TextStyleSheetCase}`
  | `heading-lg/${TextStyleSheetCase}`
  | `heading-xl/${TextStyleSheetCase}`
  | `heading-xxl/${TextStyleSheetCase}`
  | "eyebrow"
  | "redesign/heading-18/bold"
  | `text-xxs/${TextStyleSheetCase}`
  | `text-xs/${TextStyleSheetCase}`
  | `text-sm/${TextStyleSheetCase}`
  | `text-md/${TextStyleSheetCase}`
  | `text-lg/${TextStyleSheetCase}`
  | `redesign/message-preview/${TextStyleSheetRedesignCase}`
  | `redesign/channel-title/${TextStyleSheetRedesignCase}`
  | "display-sm"
  | "display-md"
  | "display-lg";

const TextStyleSheet = findByProps("TextStyleSheet").TextStyleSheet;

function resolveSemanticColor(
  color: any,
  theme: string = ThemeStore.theme,
) {
  return colorResolver.resolveSemanticColor(theme, color);
}

const { Text } = General;

export default function SimpleText({
  variant,
  lineClamp,
  color,
  align,
  style,
  onPress,
  getChildren,
  children,
  liveUpdate,
}: React.PropsWithChildren<{
  variant?: TextStyleSheetVariant;
  lineClamp?: number;
  color?: string;
  align?: "left" | "right" | "center";
  style?: import("react-native").StyleProp<import("react-native").TextStyle>;
  onPress?: () => void;
  getChildren?: () => React.ReactNode | undefined;
  liveUpdate?: boolean;
}>) {
  const [_, forceUpdate] = React.useReducer((x) => ~x, 0);

  React.useEffect(() => {
    if (!liveUpdate) return;
    const nextSecond = new Date().setMilliseconds(1000);

    let interval: any;
    const timeout = setTimeout(() => {
      forceUpdate();
      interval = setInterval(forceUpdate, 1000);
    }, nextSecond - Date.now());

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Text
      style={[
        variant ? TextStyleSheet[variant] : {},
        color ? { color: resolveSemanticColor(semanticColors[color]) } : {},
        align ? { textAlign: align } : {},
        style ?? {},
      ]}
      numberOfLines={lineClamp}
      onPress={onPress}
    >
      {getChildren?.() ?? children}
    </Text>
  );
}
