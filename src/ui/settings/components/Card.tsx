import { ReactNative as RN, stylesheet } from "@metro/common";
import { findByProps } from "@metro/filters";
import { getAssetIDByName } from "@ui/assets";
import { semanticColors } from "@ui/color";
import { Forms } from "@ui/components";
import { TableRowGroup, TableSwitchRow, TableCheckboxRow, TableRadioRow, TableRowIcon, TableRow, IconButton } from "@ui/components";
import LineDivider from "@ui/components/LineDivider";

const { FormRow, FormSwitch, FormRadio } = Forms;
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");

// TODO: These styles work weirdly. iOS has cramped text, Android with low DPI probably does too. Fix?
const styles = stylesheet.createThemedStyleSheet({
    card: {
        backgroundColor: semanticColors?.BACKGROUND_SECONDARY,
        borderRadius: 16,
    },
    header: {
        padding: 0,
        backgroundColor: semanticColors?.BACKGROUND_SECONDARY,
        marginLeft: 5,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    actions: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    icon: {
        width: 22,
        height: 22,
        paddingLeft: 5,
        tintColor: semanticColors?.INTERACTIVE_NORMAL,
    },
})

interface Action {
    icon: string;
    onPress: () => void;
}

interface OverflowAction extends Action {
    label: string;
    isDestructive?: boolean;
}

export interface CardWrapper<T> {
    item: T;
    index: number;
}

interface CardProps {
    index?: number;
    headerLabel: string | React.ComponentType;
    headerIcon?: string;
    toggleType?: "switch" | "radio";
    hasSettings?: boolean;
    toggleValue?: boolean;
    onToggleChange?: (v: boolean) => void;
    descriptionLabel?: string | React.ComponentType;
    actions?: Action[];
    overflowTitle?: string;
    overflowActions?: OverflowAction[];
}

export default function Card(props: CardProps) {
    let pressableState = props.toggleValue ?? false;

    return ( 
        <RN.View style={[styles.card, { marginTop: props.index !== 0 ? 10 : 0 }]}>
            <TableRowGroup>
            {props.toggleType && (props.toggleType === "switch" ?
                <TableSwitchRow
                    style={styles.header}
                    label={props.headerLabel}
                    icon={props.headerIcon && <FormRow.Icon source={getAssetIDByName(props.headerIcon)} />}
                    value={props.toggleValue}
                    onValueChange={props.onToggleChange}
                /> : <TableCheckboxRow
                    style={styles.header}
                    label={props.headerLabel}
                    icon={props.headerIcon && <FormRow.Icon source={getAssetIDByName(props.headerIcon)} />}
                    onPress={() => {
                        pressableState = !pressableState;
                        props.onToggleChange?.(pressableState)
                    }}
                    checked={props.toggleValue}
                />)}
            <TableRow
                label={props.descriptionLabel}
                trailing={
                    <RN.View style={styles.actions}>
                        {props.overflowActions &&
                            <IconButton
                                {...props}
                                size="sm"
                                variant="secondary"
                                icon={(props.hasSettings ? getAssetIDByName("ic_settings_white_24px") : getAssetIDByName("ic_more_24px"))} 
                                onPress={() => showSimpleActionSheet({
                                    key: "CardOverflow",
                                    header: {
                                        title: props.overflowTitle,
                                        onClose: () => hideActionSheet(),
                                    },
                                    options: props.overflowActions?.map(i => ({ ...i, icon: getAssetIDByName(i.icon) })),
                                })}
                            />
                        }
                    </RN.View>
                }
            />
            </TableRowGroup>
        </RN.View>
    )
}
