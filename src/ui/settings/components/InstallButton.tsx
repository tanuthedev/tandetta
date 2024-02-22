import { ReactNative as RN, stylesheet, clipboard } from "@metro/common";
import { HTTP_REGEX_MULTI } from "@lib/constants";
import { showConfirmationAlert, showInputAlert } from "@ui/alerts";
import { getAssetIDByName } from "@ui/assets";
import { semanticColors } from "@ui/color";
import { IconButton } from "@ui/components";
import { BundleUpdaterManager } from "@lib/native";
import settings from "@lib/settings";

const styles = stylesheet.createThemedStyleSheet({
    icon: {
        marginRight: 10,
        tintColor: semanticColors.HEADER_PRIMARY,
    },
});

interface InstallButtonProps {
    alertTitle: string;
    hasReload?: boolean;
    installFunction: (id: string) => Promise<void>;
}

export default function InstallButton({ alertTitle, hasReload, installFunction: fetchFunction }: InstallButtonProps) {
    return (
        /*<RN.TouchableOpacity onPress={() =>
            clipboard.getString().then((content) =>
                showInputAlert({
                    title: alertTitle,
                    initialValue: content.match(HTTP_REGEX_MULTI)?.[0] ?? "",
                    placeholder: "https://example.com/",
                    onConfirm: (input: string) => fetchFunction(input),
                    confirmText: "Install",
                    cancelText: "Cancel",
                })
            )
        }>
            <RN.Image style={styles.icon} source={getAssetIDByName("ic_add_24px")} />
        </RN.TouchableOpacity>*/
        <RN.TouchableOpacity style={{
            flexDirection: "row",
            justifyContent: "flex-start",
          }}>
        {hasReload && settings.disableForcedThemeReload ?
            <IconButton
                    size="sm"
                    variant="secondary"
                    icon={getAssetIDByName("ic_message_retry")} 
                    onPress={() =>
                        showConfirmationAlert({
                            title: "Hey, just to be sure",
                            content: "Do you really want to reload Discord?",
                            confirmText: "Yep!",
                            cancelText: "Nope.",
                            // @ts-expect-error oh god
                            confirmColor: "brand",
                            onConfirm: BundleUpdaterManager.reload,
                            /*onCancel: () => {
                                settings.experiments = !v
                            }*/
                        })
                    }
                    style={{marginRight: 7}}
                />
        : undefined}
        <IconButton
            size="sm"
            variant="secondary"
            icon={getAssetIDByName("ic_add_24px")} 
            onPress={() =>
                clipboard.getString().then((content) =>
                    showInputAlert({
                        title: alertTitle,
                        initialValue: content.match(HTTP_REGEX_MULTI)?.[0] ?? "",
                        placeholder: "https://example.com/",
                        onConfirm: (input: string) => fetchFunction(input),
                        confirmText: "Install",
                        cancelText: "Cancel",
                    })
                )
            }
        />
        </RN.TouchableOpacity>
    );
}
