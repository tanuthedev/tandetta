import { ButtonColors } from "@types";
import { ErrorBoundaryProps } from "@types";
import { ReactNative as RN, stylesheet } from "@metro/common";
import { findByName, findByProps, findByStoreName } from "@metro/filters";
import { after } from "@lib/patcher";
import { getDebugInfo, toggleSafeMode } from "@lib/debug";
import { BundleUpdaterManager, DeviceManager } from "@lib/native";
import { semanticColors } from "@ui/color";
import { Button, Codeblock, ErrorBoundary as _ErrorBoundary, SafeAreaView } from "@ui/components";
import { Image } from "@ui/components";
import settings from "@lib/settings";
import { getAssetIDByName } from "../assets";

const { TextStyleSheet } = findByProps("TextStyleSheet");
const styles = stylesheet.createThemedStyleSheet({
    container: {
        flex: 1,
        backgroundColor: semanticColors.BACKGROUND_PRIMARY,
        paddingHorizontal: 16,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
    },
    headerTitle: {
        ...TextStyleSheet["heading-md/semibold"],
        textAlign: "center",
        textTransform: "uppercase",
        color: semanticColors.HEADER_PRIMARY,
    },
    headerDescription: {
        ...TextStyleSheet["text-sm/medium"],
        textAlign: "center",
        color: semanticColors.TEXT_MUTED,
    },
    footer: {
        flexDirection: DeviceManager.isTablet ? "row" : "column",
        justifyContent: "flex-end",
        marginTop: 8,
        marginBottom: 22
    },
});

interface ErrorBoundaryState {
    hasErr: boolean;
    errText?: string;
}

interface Button {
    text: string;
    // TODO: Proper types for the below
    color?: string;
    size?: string;
    onPress: () => void;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasErr: false };
    }

    static getDerivedStateFromError = (error: Error) => ({ hasErr: true, errText: error.message });

    render() {

        if (!this.state.hasErr) {return this.props.children}
        else {
            const debugInfo = getDebugInfo();

            // This is in the patch and not outside of it so that we can use `this`, e.g. for setting state
            const buttons: Button[] = [
                { text: "Restart Discord", onPress: () => {BundleUpdaterManager.reload()} },
                ...!settings.safeMode?.enabled ? [{ text: "Restart in Safe Mode", onPress: toggleSafeMode }] : [],
                { text: "Retry Render", color: ButtonColors.RED, onPress: () => this.setState({ hasErr: false, errText: undefined }) },
            ]

            return (
                    <RN.View style={styles.container}>
                        <RN.View style={styles.header}>
                            <Image
                                source={getAssetIDByName("img_app_crash_darker")}
                                style={{ flex: 1, resizeMode: "contain", maxHeight: 96, paddingRight: 4 }}
                            />
                            <RN.View style={{ flex: 2, paddingLeft: 4 }}>
                                <RN.Text style={styles.headerTitle}>Looks like this page has trouble rendering...</RN.Text>
                                <RN.Text style={styles.headerDescription}>This is most likely a plugin or theme issue, not a Tandetta one.</RN.Text>
                            </RN.View>
                        </RN.View>
                        <RN.View style={{ flex: 6 }}>
                            <Codeblock
                                selectable
                                style={{ flexBasis: "auto", marginBottom: 8 }}
                            >
                                {[
                                    `Discord: ${debugInfo.discord.build} (${debugInfo.os.name})`,
                                    `Tandetta: ${debugInfo.vendetta.version}`
                                ].join("\n")}
                            </Codeblock>
                            <Codeblock
                                selectable
                                style={{ flex: 1, textAlignVertical: "top" }}
                            >
                                {this.state.errText}
                            </Codeblock>
                        </RN.View>
                        <RN.View style={styles.footer}>
                            {buttons.map(button => {
                                const buttonIndex = buttons.indexOf(button) !== 0 ? 8 : 0;

                                return <Button
                                    text={button.text}
                                    color={button.color ?? ButtonColors.BRAND}
                                    size={button.size ?? "small"}
                                    onPress={button.onPress}
                                    style={DeviceManager.isTablet ? { flex: `0.${buttons.length}`, marginLeft: buttonIndex, borderRadius: 25, paddingVertical: 10 } : { marginTop: buttonIndex, borderRadius: 25, paddingVertical: 10 }}
                                />
                            })}
                        </RN.View>
                    </RN.View>
            )
        };
}};
