import { ReactNative as RN, stylesheet } from "@metro/common";
import { semanticColors } from "@ui/color";
import { General } from "@ui/components";

import SimpleText from "./SimpleText";

const { View, Pressable } = General;

export function ModernTableRowTitle({
  title,
  onPress,
  icon,
}: {
  title: string;
  onPress?: () => void;
  icon?: number;
}) {
  const styles = stylesheet.createThemedStyleSheet({
    androidRipple: {
      color: semanticColors.ANDROID_RIPPLE,
    },
    icon: {
      height: 18,
      tintColor: semanticColors.HEADER_SECONDARY,
      opacity: 0.5,
    },
  });
  const UseCompontent = onPress ? Pressable : View;

  return (
    <UseCompontent
      disabled={false}
      accessibilityRole={"button"}
      onPress={onPress}
      style={{
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {icon && (
        <View style={{ marginRight: 4 }}>
          <RN.Image style={styles.icon} source={icon} resizeMode="contain" />
        </View>
      )}
      <SimpleText variant="text-sm/semibold" color="HEADER_SECONDARY">
        {title}
      </SimpleText>
    </UseCompontent>
  );
}

export function ModernTableRowGroup({
  title,
  onTitlePress,
  icon,
  children,
  padding,
}: React.PropsWithChildren<{
  title: string;
  onTitlePress?: () => void;
  icon?: number;
  padding?: boolean;
}>) {
  const styles = stylesheet.createThemedStyleSheet({
    main: {
      backgroundColor: semanticColors.CARD_PRIMARY_BG,
      borderRadius: 16,
      overflow: "hidden",
      flex: 1,
    },
  });

  return (
    <View style={{ marginHorizontal: 16, marginTop: 16 }}>
      <ModernTableRowTitle title={title} onPress={onTitlePress} icon={icon} />
      <View style={styles.main}>
        {padding ? (
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            {children}
          </View>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
