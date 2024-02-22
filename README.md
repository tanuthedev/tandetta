> [!IMPORTANT]  
> This project serves as a continuation vendetta-mod/Vendetta.
> It is a fork of Vendetta with improvements and additions.

# Tandetta
A mod for Discord's mobile apps.

## Installing
You can install Tandetta on an already patched Vendetta installation. To do so:    
* Head to Settings -> Vendetta - General -> Toggle "Developer Settings",
* Re-enter Settings, then head to Vendetta - Developer,
* Toggle the "Load from custom url" option,
* In the Custom URL, enter `https://tandetta.tanu.lol/get/tandetta.js`
* Restart Discord (or `Reload Discord` via the `General` tab.)
* Tandetta is now installed!

> [!WARNING]  
> The tools used below are not finished, you're using them on your own risk.
> You can also use the original [Vendetta Install Guide](https://github.com/vendetta-mod/Vendetta?tab=readme-ov-file#installing),
> and install Tandetta itself via the method above.

### Android
* Root - [TandettaXposed](https://tandetta.tanu.lol/get/TandettaXposed.apk)
* Non-root - [TandettaManager](https://tandetta.tanu.lol/get/TandettaManager-signed.apk)

### iOS
> [!WARNING]
> iOS may work, but is not tested.
> Proceed with caution!
* Jailbroken - [VendettaTweak](https://github.com/vendetta-mod/VendettaTweak)
    - You can get prebuilt `.deb` files from GitHub Actions - we support rootful and rootless jailbreaks!
* Jailed - You can get IPAs from [the thread](https://discord.com/channels/1015931589865246730/1087295482667208766) in our [Discord server](https://discord.gg/n9QQ4XhhJP) or from our [host](https://discord.k6.tf/ios/).
    - These IPAs do *not* work with AltStore! You should use [Sideloadly](https://sideloadly.io).

## Contributing
1. Install a Vendetta/Tandetta loader with loader config support (any mentioned in the [Installing](#installing) section).

2. Go to Settings > General and enable Developer Settings.

3. Clone the repo:
    ```
    git clone https://github.com/tanuthedev/tandetta
    ```

4. Install dependencies:
    ```
    npm i
    ```

5. Build Tandetta's code:
    ```
    npm run build
    ```
    5.1. Build Vendetta's code for release:
    ```
    npm run buildRelease
    ```

6. In the newly created `dist` directory, run a HTTP server. I recommend [http-server](https://www.npmjs.com/package/http-server).

7. Go to Settings > Developer enabled earlier. Enable `Load from custom url` and input the IP address and port of the server (e.g.  e.g. `http://192.168.1.236:4040`) in the new input box labelled `VENDETTA URL`.

8. Restart Discord. Upon reload, you should notice that your device will download Vendetta's bundled code from your server, rather than GitHub.

9. Make your changes, rebuild, reload, go wild!
