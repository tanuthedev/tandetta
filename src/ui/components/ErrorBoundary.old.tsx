import { ErrorBoundaryProps } from "@types";
import { React, ReactNative as RN, stylesheet } from "@metro/common";
import { Forms, Codeblock, Button, Image } from "@ui/components";
import { ModernTableRowGroup } from "./ModernTableRow";
import { getAssetIDByName } from "@ui/assets";
import { findByName, findByNameAll, findByProps } from "@lib/metro/filters";
import { semanticColors } from "../color";
import { BundleUpdaterManager } from "@lib/native";
const { Stack, TableRow, TableRowGroup } = findByProps("TableRow");

interface ErrorBoundaryState {
    hasErr: boolean;
    errText?: string;
}

const styles = stylesheet.createThemedStyleSheet({
    view: {
        flex: 1,
        flexDirection: "column",
        margin: 10,
    },
    title: {
        flex: 1,
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 15,
        justifyContent: "center",
        flexDirection: "row"
    },
    text1: {
        fontSize: 21,
        lineHeight: 23,
        fontFamily: "ggsans-Semibold, NotoSans-Semibold",
        includeFontPadding: false,
        textAlign: "center",
        color: semanticColors.HEADER_PRIMARY
    },
    text2: {
        fontSize: 18,
        lineHeight: 20,
        fontFamily: "ggsans-Semibold, NotoSans-Semibold",
        includeFontPadding: false,
        textAlign: "center",
        color: semanticColors.TEXT_MUTED
    }
});

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasErr: false };
    }

    static getDerivedStateFromError = (error: Error) => ({ hasErr: true, errText: error.message });

    render() {
        if (!this.state.hasErr) return this.props.children;

        return (
            <RN.ScrollView style={styles.view}>
                <RN.View style={styles.title}>
                    <Image
                        source={getAssetIDByName("img_app_crash_darker")}
                        style={{ flex: 1, resizeMode: "contain", maxHeight: 96, paddingLeft: 4, paddingRight: 4 }}
                    />
                    <RN.View style={{flex: 2, paddingLeft: 4, justifyContent: "center", alignItems: "center"}}>
                        <RN.Text style={styles.text1}>
                            Uh oh.
                        </RN.Text>
                        <RN.Text style={styles.text2}>
                            Seems like trouble.
                        </RN.Text>
                    </RN.View>
                </RN.View>
                <TableRowGroup title="How did we get here?">
                    <TableRow
                        label="Something, somewhere went wrong."
                        subLabel={"This is probably related to a plugin and not Tandetta itself. This is not a Discord crash, but a Tandetta exception. Please contact the correct developer for support."}
                        icon={<Forms.FormRow.Icon source={getAssetIDByName("ic_close_circle_24px")} />}
                    />
                    <TableRow label={
                        <Codeblock selectable>{this.state.errText}</Codeblock>
                    }/>
                </TableRowGroup>
                <Button
                    color={Button.Colors.RED}
                    size={Button.Sizes.MEDIUM}
                    style={{ borderRadius: 25, marginTop: 15 }}
                    onPress={() => this.setState({ hasErr: false, errText: undefined })}
                    text="Retry Render"
                />
                <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    style={{ borderRadius: 25, marginTop: 10 }}
                    onPress={() => BundleUpdaterManager.reload()}
                    text="Reload Discord"
                />
                {/*<Image
                    style={{ width: 24, height: 24 }}
                    source={{
                        uri: 'https://cdn.discordapp.com/attachments/852928793219825694/1206297532389654578/waltuh.png?ex=65db7f1f&is=65c90a1f&hm=3690f6c250d0692aac118c1aad453804f975532b91da097d2a3d35dc7cf7e4bf&'
                    }}
                />*/}
            </RN.ScrollView>
        )
    }
}