import { ReactNative as RN, stylesheet, clipboard } from "@metro/common";
import { getAssetIDByName } from "@ui/assets";
import { semanticColors } from "@ui/color";
import { IconButton } from "@ui/components";
import { BundleUpdaterManager } from "@lib/native";
import { showConfirmationAlert } from "@ui/alerts";

const styles = stylesheet.createThemedStyleSheet({
    icon: {
        marginRight: 10,
        tintColor: semanticColors.HEADER_PRIMARY,
    },
});

export default function ReloadButton() {
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
        <RN.TouchableOpacity>
        <IconButton
            size="sm"
            variant="secondary"
            icon={getAssetIDByName("ic_message_retry")} 
            onPress={() =>
                showConfirmationAlert({
                    title: "Hey, just to be sure,",
                    content: "Do you really want to Reload Discord?",
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
        />
        </RN.TouchableOpacity>
    );
}
