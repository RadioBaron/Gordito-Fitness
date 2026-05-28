# Gordito Fitness – Google Play Publiceringsguide

> **Mål:** Publicera appen i Google Play via TWA (Trusted Web Activity) utan krascher.

---

## Vad som redan är klart

| Sak | Status |
|-----|--------|
| PNG-ikoner (192x192, 512x512, 1024x1024) | Klar |
| manifest.json med PNG-ikoner | Klar |
| Service Worker (gordito-v3) | Klar |
| Privacy Policy (privacy.html) | Klar |
| assetlinks.json (placeholder) | Behöver din SHA-256 |
| Node.js installerat | v24.15.0 |

---

## STEG 1 – Publicera på GitHub Pages

Din app måste vara live på internet innan du bygger APK:n.

```bash
cd "C:\Users\Walter\Desktop\Träningsapp"

git add .
git commit -m "Google Play release prep"
git push origin main
```

Gå till: GitHub -> ditt repo -> Settings -> Pages -> Source: main branch -> / (root)

Din app blir live på: https://radiobaron.github.io/Gordito-Fitness/

Vänta 2-3 minuter och verifiera att sidan laddar.

---

## STEG 2 – Installera Bubblewrap

```bash
npm install -g @bubblewrap/cli
bubblewrap --version
```

Bubblewrap kräver Java JDK. Installera om det saknas:
- Ladda ner: https://adoptium.net/ (valj LTS-versionen)
- Installera och lagg till i PATH

---

## STEG 3 – Generera TWA-projektet

```bash
mkdir C:\Users\Walter\GorditoTWA
cd C:\Users\Walter\GorditoTWA

bubblewrap init --manifest https://radiobaron.github.io/Gordito-Fitness/manifest.json
```

Bubblewrap staller fragor – svara sa har:

| Fraga | Svar |
|-------|------|
| Package ID | se.radiobaron.gordito |
| App name | Gordito Fitness |
| Display mode | standalone |
| Orientation | portrait |
| Signing key | Create new key |
| Keystore filename | gordito.jks |
| Key alias | gordito-key |
| Keystore password | Valj starkt losenord – SPARA PA SAKERT STALLE |

---

## STEG 4 – Hamta SHA-256 fingerprint

```bash
cd C:\Users\Walter\GorditoTWA
keytool -list -v -keystore gordito.jks -alias gordito-key
```

Ange losenordet. Kopiera SHA256-raden:
```
SHA256: AB:CD:EF:12:34:56...
```

---

## STEG 5 – Uppdatera assetlinks.json

Oppna: C:\Users\Walter\Desktop\Traningsapp\.well-known\assetlinks.json

Ersatt:
  REPLACE_WITH_YOUR_SHA256_FINGERPRINT

med ditt riktiga fingerprint (med kolon, precis som keytool visade).

Pusha sedan:
```bash
cd "C:\Users\Walter\Desktop\Traningsapp"
git add .well-known/assetlinks.json
git commit -m "Add real SHA-256 fingerprint"
git push
```

Verifiera (vanta 2-3 min efter push):
```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://radiobaron.github.io/Gordito-Fitness&relation=delegate_permission/common.handle_all_urls
```

Du ska se linked: true i svaret.

---

## STEG 6 – Bygg AAB

```bash
cd C:\Users\Walter\GorditoTWA
bubblewrap build
```

Resultaten:
- app-release-signed.apk  (for sideloading pa telefon)
- app-release-bundle.aab  (for Play Store – anvand denna)

---

## STEG 7 – Testa pa Android innan uppladdning

```bash
adb install app-release-signed.apk
```

Checklista:
- Appen oppnar utan krasch
- Onboarding visas vid forsta oppning
- Traning kan startas och avslutas
- Offline-lage fungerar (stang av wifi)
- Tillbaka-knappen pa Android beter sig ratt

---

## STEG 8 – Google Play Developer-konto

1. Ga till: https://play.google.com/console
2. Betala $25 engavsavgift
3. Fyll i kontaktuppgifter
4. Vanta godkannande (1-3 dagar)

---

## STEG 9 – Skapa app i Play Console

1. Skapa app -> "Gordito Fitness" -> Svenska -> Gratis
2. Store listing:
   - Kortbeskrivning (max 80 tecken): Din personliga traeningsapp med program, streak och progress
   - Screenshots: Minst 2 phone-screenshots (1080x1920 px)
   - Feature graphic: 1024x500 px (skapa i Canva.com – gratis)
   - App-ikon: Ladda upp icons/icon-512.png
3. Content rating: Fyll i enkaten -> Alla aldre, inget olampligt
4. Target audience: 18+
5. Privacy Policy URL: https://radiobaron.github.io/Gordito-Fitness/privacy.html
6. App category: Health & Fitness

---

## STEG 10 – Intern testning -> Produktion

1. Releases -> Internal testing -> Ladda upp .aab-filen
2. Lagg till ditt Google-konto som intern testare
3. Testa via Play Store-lanken du far
4. Om allt fungerar: Releases -> Production -> Gradual rollout (borja med 10%)

---

## Crash Prevention – Gordito Fitness specifikt

Appen har dessa skydd inbyggda:

| Risk | Skydd |
|------|-------|
| localStorage full | try/catch i save() med toast-varning |
| State-korruption | Migration-system v1-v5 med fallbacks |
| Natverksavbrott | Service Worker offline-cache |
| Render-krasch | try/catch i render() |
| Traning forlorad vid app-byte | visibilitychange + pagehide events |

Extra att testa pa Android:

1. Back-button (Android hardvaruknapp)
   Lagg till i init() om det saknas:
   ```javascript
   window.addEventListener('popstate', () => {
     if (this.state.currentView !== 'dashboard') {
       this.setView('dashboard');
     }
   });
   history.pushState({}, '');
   ```

2. Liten skarm (360px bredd) – testa pa budget-telefon

3. Android WebView-version
   TWA kraver Android 5.0+ och Chrome/WebView 72+.
   Det tackar >99% av aktiva Android-enheter.

---

## Komplett Checklista

PRE-BUILD
[ ] GitHub Pages live och tillganglig
[ ] assetlinks.json med riktig SHA-256 uppdaterad och pushad
[ ] Digital Asset Links verifierad via API
[ ] PNG-ikoner: 192x192, 512x512 (klart)
[ ] privacy.html live (klart)

BUILD
[ ] bubblewrap init klar
[ ] gordito.jks keystore sparad pa sakert stalle
[ ] bubblewrap build genererat .aab

TEST
[ ] Installerat APK pa Android-enhet
[ ] Testat alla 5 navigation-tabbar
[ ] Startat och avslutat ett traningspass
[ ] Testat offline-lage
[ ] Testat back-knappen

PLAY CONSOLE
[ ] Developer-konto skapat ($25)
[ ] App skapad
[ ] Store listing komplett med screenshots
[ ] Privacy Policy URL ifylld
[ ] Content rating klar
[ ] Intern testning godkand
[ ] Production release skapad

---

## Vanliga misstag

| Misstag | Losning |
|---------|---------|
| SHA-256 stammer inte – Verify misslyckas | Kontrollera att fingerprint matchar keytool exakt inklusive kolon |
| Vit skarm vid start | Se till att GitHub Pages laddas korrekt |
| APK visar webblaasaren istallet for app | assetlinks.json ar inte korrekt verifierad |
| Play Store-granskning avvisad | Saknar privacy policy URL, content rating, eller screenshots |
| bubblewrap hittar inte Java | Installera JDK fran adoptium.net och lagg till i PATH |

---

Skapad for Gordito Fitness v5 – TWA via Bubblewrap
