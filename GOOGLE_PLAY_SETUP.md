# Gordito Fitness – Google Play TWA Setup Guide

## Förutsättningar

- Node.js installerat
- Bubblewrap CLI: `npm install -g @bubblewrap/cli`
- Java JDK (för keytool)
- Android Studio eller Android SDK

---

## Steg 1 – Bygg TWA-projektet med Bubblewrap

```bash
mkdir gordito-twa && cd gordito-twa
bubblewrap init --manifest https://radiobaron.github.io/Gordito-Fitness/manifest.json
```

Bubblewrap läser manifest.json och skapar ett Android-projekt. Svara på frågorna (paketnamn, app-namn, versioner).

Rekommenderade inställningar:
- **Package name:** `se.radiobaron.gordito`
- **App name:** `Gordito Fitness`
- **Version code:** `1`
- **Version name:** `1.0`

```bash
bubblewrap build
```

---

## Steg 2 – Hämta SHA-256 fingeravtryck

```bash
keytool -list -v -keystore gordito.jks
```

Kopiera fingeravtrycket som ser ut som:
```
SHA256: AB:CD:EF:12:34:56:78:90:...
```

Ta bort kolontecknen och konvertera till formatet:
```
AB:CD:EF:12:34:56:78:90:...
```

(Behåll kolon-formatet som det är – det är korrekt format för assetlinks.json)

---

## Steg 3 – Uppdatera assetlinks.json

Öppna `.well-known/assetlinks.json` och ersätt `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` med ditt faktiska fingeravtryck.

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "se.radiobaron.gordito",
    "sha256_cert_fingerprints": ["AB:CD:EF:12:34:56:..."]
  }
}]
```

Pusha sedan till GitHub:
```bash
git add .well-known/assetlinks.json
git commit -m "Add SHA-256 fingerprint to assetlinks.json"
git push
```

---

## Steg 4 – Verifiera Digital Asset Links

Öppna denna URL i webbläsaren (efter att GitHub Pages är uppdaterat):

```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://radiobaron.github.io/Gordito-Fitness&relation=delegate_permission/common.handle_all_urls
```

Om allt är korrekt ska du se din app i svaret.

---

## Steg 5 – Testa APK

```bash
bubblewrap install
```

Installerar APK:n på en ansluten Android-enhet. Öppna appen och verifiera att:
- Appen öppnas utan webbläsaradressfält (TWA-läge)
- PWA-installation fungerar
- Offline-läge fungerar

---

## Steg 6 – Publicera på Google Play

1. Gå till [Google Play Console](https://play.google.com/console)
2. Skapa en ny app
3. Ladda upp APK/AAB från `gordito-twa/app-release-signed.apk`
4. Fyll i:
   - Beskrivning (svenska och engelska)
   - Skärmbilder (ta med Android-emulatorn)
   - Ikon (192x192 och 512x512 – exportera från icons/*.svg som PNG)
   - **Integritetspolicylänk:** `https://radiobaron.github.io/Gordito-Fitness/privacy.html`
5. Sätt kategori: **Hälsa & Fitness**
6. Skicka in för granskning

---

## Noteringar

- Google Play kräver **Privacy Policy URL** – använd `privacy.html`
- APK måste vara signerad med release keystore (inte debug)
- TWA kräver HTTPS – GitHub Pages uppfyller detta
- Vid uppdateringar: bump `android:versionCode` i `build.gradle` och bygg om

## Monetisering (nästa steg)

Appen använder en **engångsprismodell** – köper du appen får du allt, inga prenumerationer.

Alternativ för att hantera köpet:
- **Google Play In-app Products** (one-time purchase) – välj "Managed product" (inte subscription) i Play Console
- **Alternativ:** Direkt betalning via Stripe/Swish, sedan manuell aktivering av `isPremium: true` i appen
- **Enklaste lösningen nu:** E-post till gordito@radiobaron.se → betalning via Swish → du sätter `isPremium = true` via supportkod

Pris: **49 kr engång** – full tillgång för alltid.
