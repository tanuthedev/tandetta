
// Tandetta - experiments.ts
// 
// This feature is finished and working.
// Toggle available in "General" settings.
// First implemented in build 09/02/2024@16:21:15 

import { FluxDispatcher, moment } from "@metro/common";
import { findByProps, findByStoreName } from "@metro/filters";
import logger from "@lib/logger";
import settings from "@lib/settings";

const { getCurrentUser } = findByStoreName("UserStore");
const { getSerializedState } = findByProps("getSerializedState");

function onDispatch() {
    // Check if user has enabled the experiments in "General" settings.
    if(settings.experiments === true) {
        // Hey, look, it's time for an experiment!
        try {
            // Discord, please dont break this :(
            logger.log('Experiments enabled, trying to patch...')
            const user = getCurrentUser();
            user.flags += 1;
            const actionHandlers = FluxDispatcher._actionHandlers._computeOrderedActionHandlers("OVERLAY_INITIALIZE").filter(b => b.name.includes("Experiment"));
            actionHandlers.forEach(({ actionHandler }) => actionHandler({
                serializedExperimentStore: getSerializedState(),
                user,
            }));
        } catch(e) {
            logger.error("Failed to enable experiments: ", e);
        }
    } else {
        // I don't think the experiments are enabled, man.
        logger.info("Experiments are disabled, we're not doing anything here!")
        return;
    }

    // Seems like we're done here!
    logger.log('The "experiment" is done! :3')
    FluxDispatcher.unsubscribe("CONNECTION_OPEN", onDispatch);
}

export default () => FluxDispatcher.subscribe("CONNECTION_OPEN", onDispatch);