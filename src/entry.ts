import { ClientInfoManager } from "@lib/native";

// This logs in the native logging implementation, e.g. logcat
console.log("Hello from Tandetta!");

// Make 'freeze' and 'seal' do nothing
Object.freeze = Object;
Object.seal = Object;

import(".").then((m) => m.default()).catch((e) => {
    console.log(e?.stack ?? e.toString());
    alert([
        "Tandetta failed to load!\n",
        "Type: Entry-level crash",
        `Build Number: ${ClientInfoManager.Build}`,
        `Tandetta: ${__tandettaVersion}`,
        e?.stack || e.toString(),
    ].join("\n"));
});
