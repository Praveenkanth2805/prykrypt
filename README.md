# PryKrypt

**Your Secrets, Hidden in Pixels.**

PryKrypt is a privacy-first image steganography web application. It hides text messages or
arbitrary files inside the pixels of a PNG image, optionally encrypting the payload with a
password. Everything — decoding, encoding, encryption, decryption — runs locally in the browser.
There is no backend, no database and no telemetry.

> **Copyright (c) 2026 Praveenkanth G. All Rights Reserved.**

---

## Features

- **Hide Secret (Encode)** — upload a PNG, enter a message *or* attach a file, optionally set a
  password, and download a PNG that looks identical but carries the payload.
- **Extract Secret (Decode)** — upload a PryKrypt PNG, detect the payload automatically, enter the
  password if required, and recover the text or download the file.
- **AES-256-GCM encryption** via the Web Crypto API, with PBKDF2-SHA256 key derivation
  (210 000 iterations) and a fresh random salt + IV per image.
- **LSB steganography** across the R, G and B channels (alpha is never modified).
- **Self-verifying output** — every generated PNG is decoded again in memory before download.
- **Capacity validation** — the payload size is checked against the image capacity before writing.
- **Modern dark UI** — responsive, purple-accented, drag-and-drop everywhere.

---

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build
npm start
```

Requirements: Node.js 18.17+ and a modern browser with the Web Crypto API
(Chrome, Edge, Firefox, Safari 15+). Encryption requires a secure context — `localhost` or HTTPS.

---

## Usage

### Hiding a secret

1. Open **Hide** from the navigation.
2. Drop a cover image (PNG recommended).
3. Choose **Text message** or **File** and provide the secret.
4. Optionally enter a password. With a password the payload is encrypted; without one it is only
   hidden.
5. Click **Hide secret in image**.
6. Verify the success message and click **Download PNG**.

### Extracting a secret

1. Open **Extract** from the navigation.
2. Drop the original PryKrypt PNG.
3. If the payload is encrypted, enter the password and click **Unlock & extract**.
4. Copy the recovered text, or download the recovered file.

---

## Technical Details

### Container format

Every payload is prefixed with a fixed 14-byte header:

| Offset | Size | Field                                    |
| ------ | ---- | ---------------------------------------- |
| 0      | 8    | Magic string `PRYKRYPT`                  |
| 8      | 1    | Format version (currently `1`)           |
| 9      | 1    | Flags — bit 0 = AES-GCM encrypted        |
| 10     | 4    | Body length (uint32, big endian)         |
| 14     | N    | Body                                     |

The body is either the serialized payload or, when encrypted,
`salt(16) | iv(12) | AES-GCM ciphertext(+16 tag)`.

### Serialized payload

| Byte 0 | Meaning | Remaining bytes                                   |
| ------ | ------- | ------------------------------------------------- |
| `0`    | Text    | UTF-8 message                                     |
| `1`    | File    | `nameLen(2) | name | mimeLen(2) | mime | file`  |

### Embedding

Each bit of the container is written into the least-significant bit of consecutive R, G and B
channel values:

```
bitIndex → pixel = floor(bitIndex / 3), channel = bitIndex % 3
data[pixel * 4 + channel] = (value & 0xFE) | bit
```

Capacity in bytes is `floor(width × height × 3 / 8)`.

### Cryptography

- Key derivation: PBKDF2-HMAC-SHA256, 210 000 iterations, 16-byte random salt.
- Cipher: AES-256-GCM with a 12-byte random IV and a 16-byte authentication tag.
- A wrong password fails GCM authentication and surfaces as a clear "incorrect password" error.

### Project structure

```
app/
  layout.tsx        Root layout with navigation and footer
  page.tsx          Landing dashboard
  hide/page.tsx     Hide Secret page
  extract/page.tsx  Extract Secret page
  about/page.tsx    Technical details and limitations
components/
  NavBar.tsx        Top navigation with active state
  Footer.tsx        Copyright footer
  HidePanel.tsx     Encoding workflow
  ExtractPanel.tsx  Decoding workflow
  ImageDropzone.tsx Reusable drag-and-drop image input
  StepHeader.tsx    Section heading helper
  Alert.tsx         Status message component
lib/
  container.ts      Payload serialization + container header
  crypto.ts         AES-GCM / PBKDF2 helpers
  stego.ts          LSB embed / extract primitives
  image.ts          Canvas and image helpers
  errors.ts         Domain error type
  format.ts         Byte / percent formatting
```

`lib/` is completely independent of React, so the steganography and crypto logic can be reused
elsewhere.

---

## Limitations

- PryKrypt images must be decoded with PryKrypt-compatible logic. This format is **not** compatible
  with Steghide or any other steganography tool.
- The output must stay a PNG. **JPEG compression, resizing, cropping, format conversion, or any
  editing will destroy the hidden data.**
- Messaging apps and social networks often recompress images — transfer the original PNG file.
- Without a password the payload is hidden but **not encrypted**.
- Fully opaque images are recommended. Semi-transparent pixels may not round-trip perfectly
  through the canvas; PryKrypt warns you if verification fails.
- There is no password recovery. A lost password means an unrecoverable payload.
- Cover images above 20 megapixels are rejected to keep browser memory usage safe.
- Always share the generated PNG **as a file or document** — not as a photo.
  Chat apps that recompress photos (WhatsApp, Telegram, Instagram, iMessage photo mode)
  convert the image to JPEG and destroy the payload. The Share button in the Hide panel
  uses the Web Share API with `files`, which sends the PNG as a document through the
  native share sheet.

---

## Privacy

- No image, secret, file or password ever leaves the browser.
- No `localStorage`, `sessionStorage` or cookies are used for secrets or passwords.
- No analytics, tracking or third-party scripts are included.

---

---

## SEO

PryKrypt ships with production-ready SEO configured through the Next.js App Router:

- Full Open Graph and Twitter Card metadata (dynamic OG image at `/opengraph-image`).
- JSON-LD `SoftwareApplication` structured data embedded in the root layout, with
  **Praveenkanth G** (`https://praveenkanth-g.vercel.app/`) as the creator.
- Canonical URLs on every page.
- `robots.txt` and `sitemap.xml` generated by `app/robots.ts` and `app/sitemap.ts`.
- `metadataBase` set to `https://prykrypt.vercel.app`.

To deploy on a different domain, change `SITE_URL` in `app/layout.tsx`, `app/robots.ts` and
`app/sitemap.ts`.

---

## Transparency handling

On load, PryKrypt detects images that contain semi-transparent pixels and composites them onto
a solid black background before embedding. This guarantees that the exported PNG round-trips
losslessly through the canvas pipeline (browsers apply premultiplied-alpha rounding on
semi-transparent pixels, which would otherwise corrupt the payload). Images that were already
fully opaque are unchanged.

## License

Copyright (c) 2026 Praveenkanth G. All Rights Reserved.