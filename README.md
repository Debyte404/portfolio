<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=180&color=0:161f19,55:6ca600,100:d8ff35&text=DEBYTE%20EXPO&fontColor=f4f0df&fontSize=48&fontAlignY=36&desc=neobrutalist%20portfolio%20%2B%203D%20maker%20scene%20%2B%20admin%20control%20room&descAlignY=58&descSize=15" alt="Debyte Expo banner" width="100%" />

<a href="https://github.com/Debyte404">
  <img src="https://img.shields.io/badge/GitHub-Debyte404-161f19?style=for-the-badge&logo=github&logoColor=f4f0df" alt="GitHub Debyte404" />
</a>
<a href="https://www.linkedin.com/in/ankit-chetri-debyte-910b46300/">
  <img src="https://img.shields.io/badge/LinkedIn-Ankit%20Chetri-6ca600?style=for-the-badge&logo=linkedin&logoColor=161f19" alt="LinkedIn Ankit Chetri" />
</a>
<a href="https://drive.google.com/file/d/1oZzJXBH-rjmzZ3gGgn4evf0JkhwsEEQ1/view?usp=sharing">
  <img src="https://img.shields.io/badge/Resume-Google%20Drive-d8ff35?style=for-the-badge&logo=googledrive&logoColor=161f19" alt="Resume on Google Drive" />
</a>

<br />
<br />

<img src="https://readme-typing-svg.demolab.com?font=Space+Mono&weight=700&size=20&duration=2200&pause=700&color=D8FF35&center=true&vCenter=true&width=760&lines=I+build+tiny+worlds+with+code%2C+shaders%2C+hardware%2C+and+motion.;A+portfolio+that+acts+less+like+a+page+and+more+like+an+expo.;Next.js+%2B+Three.js+%2B+GSAP+%2B+Vercel+Blob." alt="Animated typing intro" />

</div>

---

## What This Is

**Debyte Expo** is my production-ready portfolio site: a loud, neobrutalist, shader-heavy little stage for projects, experiments, proof slots, and the things I keep building after midnight.

It is not a static resume page. It has:

<table>
  <tr>
    <td width="50%">
      <h3>3D Maker Stage</h3>
      <p>A responsive React Three Fiber scene with Chainsawman, a dark neon-green shader backdrop, mobile-aware DPR caps, and visibility-based rendering.</p>
    </td>
    <td width="50%">
      <h3>Boot Splash</h3>
      <p>An OS-style splash screen with flip panels, per-letter click timing, sound effects, and reduced-motion support.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>Portfolio Manager</h3>
      <p>A hidden admin dashboard for editing projects, skills, certificates, typography, image URLs, uploads, crop position, zoom, and item order.</p>
    </td>
    <td width="50%">
      <h3>Vercel-Ready Storage</h3>
      <p>Admin edits and image uploads persist through Vercel Blob in production, with local JSON and local uploads for development.</p>
    </td>
  </tr>
</table>

---

## Stack

<p>
  <img src="https://img.shields.io/badge/Next.js-16.2.9-000000?style=flat-square&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=161f19" alt="React" />
  <img src="https://img.shields.io/badge/Three.js-R3F-111111?style=flat-square&logo=threedotjs" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-motion-88CE02?style=flat-square" alt="GSAP" />
  <img src="https://img.shields.io/badge/Howler-audio-ff4f86?style=flat-square" alt="Howler" />
  <img src="https://img.shields.io/badge/Vercel%20Blob-storage-d8ff35?style=flat-square&logo=vercel&logoColor=161f19" alt="Vercel Blob" />
</p>

| Layer | Purpose |
| --- | --- |
| `app/` | Next.js App Router pages and admin API routes |
| `components/` | Portfolio experience, splash, 3D scene, motion, sound, admin UI |
| `data/portfolio-content.json` | Seed content for first deploys and local development |
| `lib/portfolio-store.js` | Local JSON storage plus Vercel Blob production persistence |
| `public/assets/` | Local static assets, sounds, model, profile image |
| `scripts/check-portfolio.mjs` | Production contract check before builds |

---

## Admin Control Room

The admin panel lives at:

```txt
/admin
```

It lets me maintain the portfolio without touching code:

- Add, remove, and rearrange projects.
- Edit project copy, links, tags, accents, source URLs, and images.
- Upload images or paste image URLs.
- Pan/crop with `Crop X`, `Crop Y`, and `Zoom`.
- Edit skill headings, skill subtitles, and skill items.
- Manage certificate proof slots.
- Tune public typography from sliders.
- Use raw JSON for deeper edits.

Production access is protected by a signed httpOnly cookie and `ADMIN_PASSCODE`.

---

## Local Development

```bash
npm install
npm run dev
```

Then open the port printed by Next.js.

The existing local setup usually runs at:

```txt
http://localhost:3001
```

Run the checks:

```bash
npm run check:portfolio
npm run lint
npm run build
```

---

## Environment Variables

Create `.env.local` for local development:

```bash
ADMIN_PASSCODE=your-local-passcode
VITE_ADMIN_PASSCODE=your-local-passcode
BLOB_STORE_ID=store_xxxxxxxxxxxxxxxx
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
BLOB_WEBHOOK_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nreplace-with-public-key\n-----END PUBLIC KEY-----"
```

Notes:

- `ADMIN_PASSCODE` is required in production.
- `VITE_ADMIN_PASSCODE` is only a local fallback from the earlier setup.
- `BLOB_READ_WRITE_TOKEN` is required if `/admin` should persist edits on Vercel.
- `.env.local` is ignored and must never be committed.

---

## Deploying To Vercel

1. Create or connect a Vercel Blob store.
2. Add these Vercel Environment Variables:

```bash
ADMIN_PASSCODE=your-production-passcode
BLOB_STORE_ID=store_xxxxxxxxxxxxxxxx
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
BLOB_WEBHOOK_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nreplace-with-public-key\n-----END PUBLIC KEY-----"
```

3. Deploy with the default build command:

```bash
npm run build
```

The build runs `npm run check:portfolio` first, then `next build`.

Production persistence:

| Data | Production location |
| --- | --- |
| Portfolio content | `portfolio/content.json` in Vercel Blob |
| Uploaded images | `portfolio/uploads/*` in Vercel Blob |
| Initial seed | `data/portfolio-content.json` |

Without `BLOB_READ_WRITE_TOKEN`, the public site can render seed content, but admin saves/uploads cannot persist on Vercel.

---

## Production Checklist

- [ ] `ADMIN_PASSCODE` set in Vercel.
- [ ] Vercel Blob connected.
- [ ] `BLOB_READ_WRITE_TOKEN` set in Vercel.
- [ ] `npm run build` passes locally.
- [ ] `/admin` unlocks after deploy.
- [ ] A test admin save survives a redeploy.
- [ ] A test uploaded image renders from its Blob URL.

---

## Visual Direction

The site is intentionally bold:

- Neobrutalist blocks and hard shadows.
- Acid green, dark shader green, sky, pink, and orange accents.
- Motion as tactile feedback, not decoration spam.
- A first-person maker voice instead of resume copy.
- 3D on desktop and mobile, with performance caps.

---

<div align="center">

<strong>Built by Ankit Chetri / Debyte404.</strong>

<br />
<br />

<img src="https://capsule-render.vercel.app/api?type=waving&height=110&section=footer&color=0:d8ff35,60:6ca600,100:161f19" alt="Footer wave" width="100%" />

</div>
