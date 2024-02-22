import { stylesheet } from "@metro/common";
import { semanticColors } from "@ui/color";
import { General } from "@ui/components";

const { View } = General;

export default function LineDivider({ addPadding, addPaddingTB }: { addPadding?: boolean, addPaddingTB?: boolean }) {
  const styles = stylesheet.createThemedStyleSheet({
    line: {
      width: "100%",
      height: 2,
      backgroundColor: semanticColors.BACKGROUND_ACCENT,
      borderRadius: 2147483647,
    },
  });

  return (
    <View
      style={[
        addPaddingTB &&{ marginTop: 16, marginBottom: 16 },
        addPadding && { marginHorizontal: 16 },
      ]}
    >
      <View style={styles.line} />
    </View>
  );
}
