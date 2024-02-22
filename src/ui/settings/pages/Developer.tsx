import { ReactNative as RN, NavigationNative, url } from "@metro/common";
import { findByProps } from "@metro/filters";
import { connectToDebugger } from "@lib/debug";
import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { getAssetIDByName } from "@ui/assets";
import { Forms, ErrorBoundary } from "@ui/components";
import { TableRowGroup, TableSwitchRow, TableRowIcon, TableRow, TextInput, General } from "@ui/components";
import { ModernTableRowGroup, ModernTableRowTitle } from "@/ui/components/ModernTableRow";
import settings, { loaderConfig } from "@lib/settings";
import AssetBrowser from "@ui/settings/pages/AssetBrowser";
import LineDivider from "@ui/components/LineDivider";
import { showToast } from "@ui/toasts";

const { FormSection, FormRow, FormSwitchRow, FormInput, FormDivider } = Forms;
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");

export default function Developer() {
    const navigation = NavigationNative.useNavigation();

    useProxy(settings);
    useProxy(loaderConfig);

    return (
        <ErrorBoundary>
            <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
                <ModernTableRowGroup title="Debugging">
                    <FormRow
                        label="Debugger URL"
                        subLabel={"Set the URL of the Tandetta Debugger."}
                        leading={<FormRow.Icon source={getAssetIDByName("ic_phonelink_24px")} />}
                        style={{marginBottom: -15}}
                    />
                    {/*<FormInput
                        value={settings.debuggerUrl}
                        onChange={(v: string) => settings.debuggerUrl = v}
                        placeholder="127.0.0.1:9090"
                        style={{ marginTop: -25, marginHorizontal: 0 }}
                    />*/}
                    <TableRow label={
                        <TextInput
                            defaultValue={settings.debuggerUrl}
                            size="md"
                            onChange={(v: string) => settings.debuggerUrl = v}
                            leadingIcon={() => <FormRow.Icon source={getAssetIDByName("ic_copy_message_link")} />}
                            placeholder="127.0.0.1:9090"
                        />}
                    />
                    <FormDivider />
                    <TableRow
                        label="Connect to debugger websocket"
                        icon={<FormRow.Icon source={getAssetIDByName("ic_activity_24px")} />}
                        onPress={() => connectToDebugger(settings.debuggerUrl)}
                    />
                    {window.__vendetta_rdc && <>
                        <FormDivider />
                        <TableRow
                            label="Connect to React DevTools"
                            icon={<FormRow.Icon source={getAssetIDByName("ic_activity_24px")} />}
                            onPress={() => window.__vendetta_rdc?.connectToDevTools({
                                host: settings.debuggerUrl.split(":")?.[0],
                                resolveRNStyle: RN.StyleSheet.flatten,
                            })}
                        />
                    </>}
                </ModernTableRowGroup>
                {window.__vendetta_loader?.features.loaderConfig && <ModernTableRowGroup title="Loader configuration">
                    <TableSwitchRow
                        label="Load from a custom URL"
                        subLabel={"Override the default Tandetta loader URL."}
                        icon={<FormRow.Icon source={getAssetIDByName("copy")} />}
                        value={loaderConfig.customLoadUrl.enabled}
                        onValueChange={(value: boolean) => {
                            loaderConfig.customLoadUrl.enabled = value;
                            if (!settings.disableCustomAnimations) RN.LayoutAnimation.configureNext(RN.LayoutAnimation.Presets.easeInEaseOut);
                        }}
                    />
                    <FormDivider />
                    {loaderConfig.customLoadUrl.enabled && <>
                        <RN.View style={{ paddingLeft: 10 }}>
                            {/*<FormRow
                                label="Custom URL"
                                subLabel={"Tandetta will be fetched from here on app (re)load."}
                                leading={<FormRow.Icon source={getAssetIDByName("ic_message_edit")} />}
                                style={{marginBottom: -15}}
                            />*/}
                            <TableRow label={
                                <TextInput
                                    label={"Custom URL"}
                                    defaultValue={loaderConfig.customLoadUrl.url}
                                    size="md"
                                    leadingIcon={() => <FormRow.Icon source={getAssetIDByName("ic_globe_24px")} />}
                                    onChange={(v: string) => loaderConfig.customLoadUrl.url = v}
                                    placeholder="http://localhost:4040/tandetta.js"
                                />}
                            />
                            <FormDivider />
                            <TableRow
                                label="Reload Discord"
                                subLabel={"This will refetch Tandetta from the new URL."}
                                icon={<FormRow.Icon source={getAssetIDByName("ic_message_retry")} />}
                                trailing={<FormRow.Arrow style={{ marginRight: 5 }}/>}
                                onPress={() => BundleUpdaterManager.reload()}
                            />
                            <FormDivider />
                        </RN.View>
                        <LineDivider addPadding={true}/>
                    </>}
                    {window.__vendetta_loader.features.devtools && <TableSwitchRow
                        label="Load React DevTools"
                        subLabel={`Version: ${window.__vendetta_loader.features.devtools.version}`}
                        icon={<FormRow.Icon source={getAssetIDByName("ic_badge_staff")} />}
                        value={loaderConfig.loadReactDevTools}
                        onValueChange={(v: boolean) => {
                            loaderConfig.loadReactDevTools = v;
                            showToast("This option requires a reload to take effect.", getAssetIDByName("yellow-alert"))
                        }}
                    />}
                </ModernTableRowGroup>}
                <ModernTableRowGroup title="Other">
                    <TableSwitchRow
                        label="Disable forced theme reload"
                        subLabel={"Disables forced reload when changing themes."}
                        icon={<FormRow.Icon source={getAssetIDByName("ic_theme_24px")} />}
                        value={settings.disableForcedThemeReload}
                        onValueChange={(value: boolean) => {
                            settings.disableForcedThemeReload = value;
                        }}
                    />
                    <TableSwitchRow
                        label="Disable custom animations"
                        subLabel={"Disables animations on Tandetta elements."}
                        icon={<FormRow.Icon source={getAssetIDByName("ic_clip_24px")} />}
                        value={settings.disableCustomAnimations}
                        onValueChange={(value: boolean) => {
                            settings.disableCustomAnimations = value;
                        }}
                    />
                    <TableRow
                        label="Asset Browser"
                        icon={<FormRow.Icon source={getAssetIDByName("ic_image")} />}
                        trailing={<FormRow.Arrow/>}
                        onPress={() => navigation.push("VendettaCustomPage", {
                            title: "Asset Browser",
                            render: AssetBrowser,
                        })}
                    />
                    <FormDivider />
                    <TableRow
                        label="ErrorBoundary Tools"
                        icon={<FormRow.Icon source={getAssetIDByName("ic_warning_24px")} />}
                        trailing={<FormRow.Arrow/>}
                        onPress={() => showSimpleActionSheet({
                            key: "ErrorBoundaryTools",
                            header: {
                                title: "Which ErrorBoundary do you want to trip?",
                                icon: <FormRow.Icon style={{ marginRight: 8 }} source={getAssetIDByName("ic_warning_24px")} />,
                                onClose: () => hideActionSheet(),
                            },
                            options: [
                                // @ts-expect-error 
                                // Of course, to trigger an error, we need to do something incorrectly. The below will do!
                                { label: "Tandetta", onPress: () => navigation.push("VendettaCustomPage", { title: "Tandetta ErrorBoundary", render: () => <undefined /> }) },
                                { label: "Discord", isDestructive: true, onPress: () => navigation.push("VendettaCustomPage", { noErrorBoundary: true }) },
                            ],
                        })}
                    />
                </ModernTableRowGroup>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}
