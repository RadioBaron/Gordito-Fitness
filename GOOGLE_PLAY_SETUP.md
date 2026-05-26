# Google Play Setup – Gordito Fitness (TWA)

## Förutsättningar
- Node.js installerat
- Android Studio installerat (för att signera APK)

## Steg 1 – Bygg TWA med Bubblewrap

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://radiobaron.github.io/Gordito-Fitness/manifest.json
bubblewrap build
```

## Steg 2 – Hämta SHA-256 fingeravtryck

```bash
keytool -list -v -keystore android.keystore -alias android
```

Kopiera SHA-256-värdet (format: `AB:CD:EF:...`).

## Steg 3 – Uppdatera assetlinks.json

Ersätt `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` i `.well-known/assetlinks.json` med ditt SHA-256-värde.  
Commit och push till GitHub.

## Steg 4 – Verifiera Digital Asset Links

```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://radiobaron.github.io/Gordito-Fitness&relation=delegate_permission/common.handle_all_urls
```

Ska returnera din app med `relation: delegate_permission/common.handle_all_urls`.

## Steg 5 – Ladda upp till Google Play

1. Gå till https://play.google.com/console
2. Skapa ny app
3. Ladda upp APK/AAB från Bubblewrap
4. Fyll i butiksbeskrivning, skärmdumpar, sekretess-URL: `https://radiobaron.github.io/Gordito-Fitness/privacy.html`
5. Sätt pris: **99 SEK** (engångspris)

## In-App Billing (för att verifiera köp)
När Google Play-fakturering är aktivt, lägg till följande i appen vid köpbekräftelse:
```js
app.state.isPremium = true;
app.save();
```
Tills dess används mailto-länk som temporär lösning.
