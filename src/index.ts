import { patchLogHook } from "@lib/debug";
import { patchCommands } from "@lib/commands";
import { initPlugins } from "@lib/plugins";
import { patchChatBackground } from "@lib/themes";
import { patchAssets } from "@ui/assets";
import initQuickInstall from "@ui/quickInstall";
import initSafeMode from "@ui/safeMode";
import initSettings from "@ui/settings";
import initFixes from "@lib/fixes";
import initExperiments from "@lib/experiments";
import logger from "@lib/logger";
import initBadges from "@lib/badges"
import windowObject from "@lib/windowObject";

export default async () => {
    // Load everything in parallel
    const unloads = await Promise.all([
        patchLogHook(),
        patchAssets(),
        patchCommands(),
        patchChatBackground(),
        initFixes(),
        initSafeMode(),
        initSettings(),
        initExperiments(),
        initQuickInstall(),
    ]);

    // Assign window object
    window.vendetta = await windowObject(unloads);

    // Once done, load plugins
    unloads.push(await initPlugins());

    // TODO: Fix the badges
    // Uncomment this to enable the BADGES module
    // Be careful, as it's not fully finished!
    //unloads.push(initBadges());

    // We good :3
    // Seems like everything went fine
    logger.log("We good :3")
    logger.log("Tandetta is ready!");
}
