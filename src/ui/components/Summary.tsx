import { SummaryProps } from "@types";
import { ReactNative as RN } from "@metro/common";
import { getAssetIDByName } from "@ui/assets";
import { Forms } from "@ui/components";
import { TableRow } from "@ui/components";
import settings from "@lib/settings";

export default function Summary({ label, subLabel, icon, noPadding = false, noAnimation = false, children }: SummaryProps) {
    const { FormRow, FormDivider } = Forms;
    const [hidden, setHidden] = React.useState(true);

    return (
        <>
            <TableRow
                label={label}
                subLabel={subLabel}
                icon={icon && <FormRow.Icon source={getAssetIDByName(icon)} />}
                trailing={<FormRow.Arrow style={{ transform: [{ rotate: `${hidden ? 180 : 90}deg` }] }} />}
                onPress={() => {
                    setHidden(!hidden);
                    if (!settings.disableCustomAnimations) RN.LayoutAnimation.configureNext(RN.LayoutAnimation.Presets.easeInEaseOut);
                }}
            />
            {!hidden && <>
                <FormDivider />
                <RN.View style={!noPadding && { paddingHorizontal: 15 }}>{children}</RN.View>
            </>}
        </>
    )
}