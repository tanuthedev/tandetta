import { ReactNative as RN, url } from "@metro/common";
import { DISCORD_SERVER, GITHUB } from "@lib/constants";
import { getDebugInfo, toggleSafeMode } from "@lib/debug";
import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { getAssetIDByName } from "@ui/assets";
import { Forms, Summary, ErrorBoundary } from "@ui/components";
import { TableRowGroup, TableSwitchRow, TableRowIcon, TableRow } from "@ui/components";
import { ModernTableRowGroup } from "@/ui/components/ModernTableRow";
import LineDivider from "@ui/components/LineDivider";
import settings from "@lib/settings";
import Version from "@ui/settings/components/Version";
import { showConfirmationAlert } from "@ui/alerts";

const { FormRow, FormSwitchRow, FormSection, FormDivider } = Forms;
const debugInfo = getDebugInfo();

export default function General() {
    useProxy(settings);

    const versions = [
        {
            label: "Build",
            version: debugInfo.vendetta.version,
            icon: "ic_progress_wrench_24px",
        },
        {
            label: "Release\nChannel",
            version: `${__tandettaChannel}`,
            icon: "ic_stage_channel_24px",
        },
        {
            label: "Discord",
            version: `${debugInfo.discord.version} (${debugInfo.discord.build})`,
            icon: "Discord",
        },
        {
            label: "React",
            version: debugInfo.react.version,
            icon: "ic_category_16px",
        },
        {
            label: "React Native",
            version: debugInfo.react.nativeVersion,
            icon: "mobile",
        },
        {
            label: "Bytecode",
            version: debugInfo.hermes.bytecodeVersion,
            icon: "ic_server_security_24px",
        },
    ];

    const platformInfo = [
        {
            label: "Loader",
            version: debugInfo.vendetta.loader,
            icon: "ic_download_24px",
        },
        {
            label: "Operating System",
            version: `${debugInfo.os.name} ${debugInfo.os.version}`,
            icon: "ic_cog_24px"
        },
        ...(debugInfo.os.sdk ? [{
            label: "SDK",
            version: debugInfo.os.sdk,
            icon: "ic_behavior_24px"
        }] : []),
        {
            label: "Manufacturer",
            version: debugInfo.device.manufacturer,
            icon: "ic_badge_staff"
        },
        {
            label: "Brand",
            version: debugInfo.device.brand,
            icon: "ic_settings_boost_24px"
        },
        {
            label: "Model",
            version: debugInfo.device.model,
            icon: "ic_phonelink_24px"
        },
        {
            label: RN.Platform.select({ android: "Codename", ios: "Machine ID" })!,
            version: debugInfo.device.codename,
            icon: "ic_compose_24px"
        }
    ];

    return (
        <ErrorBoundary>
            <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
                <ModernTableRowGroup title="Links">
                    <TableRow
                        label="Discord Server"
                        icon={<FormRow.Icon source={getAssetIDByName("Discord")} />}
                        trailing={<FormRow.Arrow/>}
                        onPress={() => url.openDeeplink(DISCORD_SERVER)}
                    />
                    {/*<FormDivider />
                    <FormRow
                        label="GitHub"
                        leading={<FormRow.Icon source={getAssetIDByName("img_account_sync_github_white")} />}
                        trailing={FormRow.Arrow}
                        onPress={() => url.openURL(GITHUB)}
                    />*/}
                </ModernTableRowGroup>
                <ModernTableRowGroup title="Actions">
                    <TableRow
                        label="Reload Discord"
                        icon={<FormRow.Icon source={getAssetIDByName("ic_message_retry")} />}
                        onPress={() => BundleUpdaterManager.reload()}
                    />
                    <FormDivider />
                    <TableRow
                        label={settings.safeMode?.enabled ? "Return to Normal Mode" : "Reload in Safe Mode"}
                        subLabel={`This will reload Discord ${settings.safeMode?.enabled ? "normally." : "without loading plugins."}`}
                        icon={<FormRow.Icon source={getAssetIDByName("ic_privacy_24px")} />}
                        onPress={toggleSafeMode}
                    />
                </ModernTableRowGroup>
                <ModernTableRowGroup title='Other'>
                    <TableSwitchRow
                            label="Tandetta Badges"
                            subLabel="Tandetta badges are in the works. Until then, this toggle will stay disabled."
                            icon={<FormRow.Icon source={getAssetIDByName("ic_nitro_rep_24px")} />}
                            disabled={true}
                            value={!settings.disableBadges}
                            onValueChange={(v: boolean) => {
                                settings.disableBadges = v;
                            }}
                    />
                    <TableSwitchRow
                            label="Toggle Developer Settings"
                            subLabel="Don't mess up anything. Good luck!"
                            icon={<FormRow.Icon source={getAssetIDByName("ic_progress_wrench_24px")} />}
                            value={settings.developerSettings}
                            onValueChange={(v: boolean) => {
                                settings.developerSettings = v;
                            }}
                    />
                        <TableSwitchRow
                            label="Toggle Experiments"
                            subLabel="This also enables other Staff-only functionality."
                            icon={<FormRow.Icon source={getAssetIDByName("ic_wand")} />}
                            value={settings.experiments}
                            onValueChange={(v: boolean) => {
                                settings.experiments = v;
                                showConfirmationAlert({
                                    title: "Hey there, wait a second!",
                                    content: "Toggling experiments requires restarting Discord. Would you like to do that now?",
                                    confirmText: "Sure!",
                                    cancelText: "Nah, not now.",
                                    // @ts-expect-error oh god
                                    confirmColor: "brand",
                                    onConfirm: BundleUpdaterManager.reload,
                                    /*onCancel: () => {
                                        settings.experiments = !v
                                    }*/
                                });
                            }}
                    />
                </ModernTableRowGroup>
                <ModernTableRowGroup title="About">
                    <Summary label="Tandetta" icon="ic_information_filled_24px">
                        {versions.map((v, i) => (
                            <>
                                <Version label={v.label} version={v.version} icon={v.icon} />
                                {i !== versions.length - 1 && <FormDivider />}
                            </>
                        ))}
                    </Summary>
                    {/*<LineDivider addPadding={true} />*/}
                    <Summary label="Platform" icon="ic_mobile_device">
                        {platformInfo.map((p, i) => (
                            <>
                                <Version label={p.label} version={p.version} icon={p.icon} />
                                {i !== platformInfo.length - 1 && <FormDivider />}
                            </>
                        ))}
                    </Summary>
                </ModernTableRowGroup>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}