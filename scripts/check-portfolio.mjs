import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

const file = (target) => path.join(root, target);
const exists = (target) => existsSync(file(target));
const read = (target) => readFileSync(file(target), "utf8");
const readIfExists = (target) => (exists(target) ? read(target) : "");
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const pkg = JSON.parse(read("package.json"));
const layout = readIfExists("app/layout.jsx");
const page = readIfExists("app/page.jsx");
const shell = readIfExists("components/PortfolioPage.jsx");
const pageSurface = `${page}\n${shell}`;
const globals = readIfExists("app/globals.css");
const data = readIfExists("lib/portfolio-data.js");
const splash = readIfExists("components/SplashExperience.jsx");
const scene = readIfExists("components/MakerScene.jsx");
const sfx = readIfExists("components/SfxLayer.jsx");
const interactions = readIfExists("components/PortfolioMotion.jsx");
const projectShowcase = readIfExists("components/ProjectShowcase.jsx");
const adminDashboard = readIfExists("components/AdminDashboard.jsx");
const store = readIfExists("lib/portfolio-store.js");
const auth = readIfExists("lib/admin-auth.js");
const adminPage = readIfExists("app/admin/page.jsx");
const loginRoute = readIfExists("app/api/admin/login/route.js");
const contentRoute = readIfExists("app/api/admin/content/route.js");
const uploadRoute = readIfExists("app/api/admin/upload/route.js");
const contentJson = readIfExists("data/portfolio-content.json");
const contentSource = `${data}\n${contentJson}`;
const envExample = readIfExists(".env.example");
const readme = readIfExists("README.md");

expect(pkg.scripts?.dev === "next dev", "dev script must run next dev");
expect(pkg.scripts?.build?.includes("check:portfolio") && pkg.scripts?.build?.includes("next build"), "build script must run contract checks before next build");
expect(pkg.dependencies?.next, "Next.js must be installed");
expect(pkg.dependencies?.gsap, "GSAP must be installed");
expect(pkg.dependencies?.["@gsap/react"], "@gsap/react must be installed");
expect(pkg.dependencies?.["@vercel/blob"], "Vercel Blob must be installed for production admin persistence");
expect(!String(pkg.scripts?.dev).includes("vite"), "Vite dev script must be removed");

expect(exists("app/layout.jsx"), "App Router layout must exist");
expect(exists("app/page.jsx"), "App Router page must exist");
expect(layout.includes("<html") && layout.includes("<body"), "layout must render html/body");
expect(layout.includes("next/font/google"), "layout must use next/font/google");
expect(page.includes("PortfolioPage"), "page must render the portfolio client shell");
expect(page.includes("readPortfolioContent"), "page must load editable portfolio content from the server store");
expect(page.includes("force-dynamic"), "page must stay dynamic so admin edits can refresh content");
expect(shell.includes("'use client'"), "portfolio shell must be a client component");
expect(pageSurface.includes("SplashExperience"), "page must include the splash experience");
expect(pageSurface.includes("MakerScene"), "page must include the 3D maker scene");
expect(pageSurface.includes("SfxLayer"), "page must include delegated sound effects");

expect(contentSource.includes("Ankit Chetri"), "portfolio data must include the owner name");
expect(contentSource.includes("Sebastian Lague"), "portfolio must include Sebastian Lague inspiration");
expect(contentSource.includes("wood carving"), "portfolio must include wood carving");
expect(contentSource.includes("shaders"), "portfolio must include shaders");
expect(contentSource.includes("baking"), "portfolio must include baking");
expect(contentSource.includes("cats"), "portfolio must include cats");
expect(contentSource.includes("https://drive.google.com/file/d/1oZzJXBH-rjmzZ3gGgn4evf0JkhwsEEQ1/view?usp=sharing"), "resume must use the provided Google Drive source URL");
expect(contentSource.includes("https://www.linkedin.com/in/ankit-chetri-debyte-910b46300/"), "LinkedIn URL must keep the exact source-of-truth link");
expect(contentJson.includes('"body": "I '), "story chapters must speak in first person");
expect(contentJson.includes('"description": "I '), "project descriptions must speak in first person");
expect(contentJson.includes("tiny universe") || contentJson.includes("lab bench"), "portfolio copy must feel imaginative instead of plain resume-like");
expect(contentJson.includes('"skillStacks"'), "editable content JSON must include skill stacks");
expect(contentJson.includes('"subtitle"'), "skill stacks must include visible subtitles");
expect(contentJson.includes('"typography"'), "editable content JSON must include typography controls");
expect(contentJson.includes('"heroTitle"'), "typography controls must include hero title sizing");

expect(splash.includes("WELCOME TO DEBYTE EXPO"), "splash must animate WELCOME TO DEBYTE EXPO");
expect(splash.includes("/assets/flip-sound.mp3"), "splash must use the old flip sound");
expect(splash.includes("/assets/chainsaw.mp3"), "splash must use the old chainsaw sound");
expect(splash.includes("prefers-reduced-motion"), "splash must respect reduced motion");
expect(splash.includes("bootRows"), "splash must include OS boot rows");
expect(splash.includes("flipPanels"), "splash must include old-style flip reveal panels");
expect(splash.includes("clickSeries"), "splash must sequence click sound effects during reveal");
expect(splash.includes("flipPanels.join(\"\").length"), "splash click count must be derived from the revealed letter count");
expect(splash.includes("LETTER_CLICK_INTERVAL_MS"), "splash clicks must use a deliberate per-letter interval");
expect(splash.includes("onStart: playClickSeries"), "splash click sequence must begin when the letters reveal");
expect(splash.includes("started.current"), "splash begin action must be guarded against duplicate timelines");
expect(splash.includes("stopSplashSounds"), "splash must stop active sounds when it exits");
expect(splash.includes("splash-status"), "splash must expose a boot status panel");
expect(splash.includes("splash-tiles"), "splash must render flip panel tiles");

expect(scene.includes("'use client'"), "MakerScene must be a client component");
expect(scene.includes("Canvas"), "MakerScene must render a React Three Fiber Canvas");
expect(scene.includes("/assets/chainsawmangrave.glb"), "MakerScene must load the Chainsawman GLB");
expect(scene.includes("isMobile"), "MakerScene must keep a mobile performance mode");
expect(scene.includes("dpr={isMobile ?"), "MakerScene must cap pixel ratio on mobile");
expect(scene.includes("useSceneVisibility"), "3D scene must observe visibility for performance");
expect(scene.includes('frameloop={sceneActive ? "always" : "demand"}'), "3D scene must use an adaptive frameloop for performance");
expect(scene.includes("SceneShaderBackdrop"), "MakerScene must use a shader backdrop");
expect(scene.includes("ShaderMaterial") || scene.includes("shaderMaterial"), "MakerScene must use a shader material");
expect(scene.includes("iTime") && scene.includes("iResolution"), "shader backdrop must expose Shadertoy-style uniforms");
expect(scene.includes("CHAINSAWMAN_RIGHT_PROFILE_Y"), "Chainsawman must use an explicit right-facing profile rotation");
expect(scene.includes("CHAINSAWMAN_RIGHT_PROFILE_Y = 0.905"), "Chainsawman right profile angle must be reduced by about 10 degrees");
expect(scene.includes("CHAINSAWMAN_SCENE_OFFSET_X"), "Chainsawman must expose an explicit left scene offset");
expect(scene.includes("fractalTreeField"), "shader backdrop must generate a fractal tree field");
expect(scene.includes("treeCanopy"), "shader backdrop must include fractal canopy forms");
expect(scene.includes("treeTrunk"), "shader backdrop must include tree/trunk silhouettes");
expect(scene.includes("struct Ray"), "shader backdrop must use raymarch-style fractal tree rays");
expect(scene.includes("vmarch"), "shader backdrop must include volumetric fractal tree marching");
expect(scene.includes("MAXDIST"), "shader backdrop must bound raymarch distance for performance");
expect(scene.includes("RAYMARCH_STEPS 20"), "shader raymarch must use a lower step budget for performance");
expect(scene.includes("VMARCH_STEPS 6"), "shader volume march must use a lower step budget for performance");
expect(scene.includes("CANOPY_ITERATIONS 8"), "fractal canopy iterations must be capped for performance");
expect(scene.includes("neonGreenGrade"), "shader backdrop must apply a dark neon-green grade");
expect(scene.includes("#161f19"), "shader backdrop must use the requested dark green base color");
expect(scene.includes("#6ca600"), "shader backdrop must use the requested neon green accent");
expect(scene.includes("DETAIL_CONTRAST"), "shader backdrop must expose stronger detail contrast tuning");
expect(scene.includes("dpr={isMobile ? [0.75, 1] : [1, 1.25]}"), "3D canvas DPR must be capped lower for performance");
expect(scene.includes("antialias: false"), "3D canvas antialiasing must stay disabled for performance");
expect(scene.includes("const bladeCount = isMobile ? 12 : 28"), "Workbench grid density must be reduced for performance");
expect(!scene.includes("sunRings"), "old ring shader background must be removed");
expect(!scene.includes("FloatingMakerParts"), "random floating maker parts must be removed from the Chainsawman background");

expect(sfx.includes("'use client'"), "SfxLayer must be a client component");
expect(sfx.includes("Howl"), "SfxLayer must use the existing sound assets through Howler");
expect(sfx.includes("pointerenter"), "hover sounds must be wired");
expect(sfx.includes("dblclick"), "double-click sounds must be wired");
expect(sfx.includes("data-sfx"), "sound effects must be delegated through data-sfx");

expect(interactions.includes("useGSAP"), "PortfolioMotion must use @gsap/react useGSAP");
expect(interactions.includes("ScrollTrigger"), "scroll animation must use ScrollTrigger");
expect(interactions.includes("matchMedia"), "GSAP animations must use matchMedia");
expect(interactions.includes("prefers-reduced-motion"), "GSAP animations must respect reduced motion");

expect(projectShowcase.includes("PAGE_SIZE"), "projects must expose pagination size");
expect(projectShowcase.includes("aria-current"), "project pagination must mark the current page");
expect(projectShowcase.includes("onDoubleClick"), "project cards must support a double-click gesture");
expect(projectShowcase.includes("onPointerMove"), "project cards must support pointer motion");
expect(projectShowcase.includes("getPrimaryActionLabel"), "project cards must compute Open vs Source labels from URLs");
expect(projectShowcase.includes("isGithubUrl"), "GitHub project links must default to Source");
expect(projectShowcase.includes("imageCrop"), "project cards must apply image crop metadata");

expect(exists("app/admin/page.jsx"), "admin dashboard page must exist");
expect(adminPage.includes("AdminDashboard"), "admin page must render the dashboard");
expect(auth.includes("ADMIN_PASSCODE") && auth.includes("VITE_ADMIN_PASSCODE"), "admin auth must use passcode from env only");
expect(auth.includes('process.env.NODE_ENV === "production"'), "production auth must require ADMIN_PASSCODE instead of dev fallback");
expect(auth.includes("createHmac"), "admin session cookie must be signed");
expect(loginRoute.includes("cookies") && loginRoute.includes("httpOnly"), "admin login must set an httpOnly cookie");
expect(contentRoute.includes("readPortfolioContent") && contentRoute.includes("writePortfolioContent"), "admin content API must read/write portfolio data");
expect(uploadRoute.includes("request.formData()"), "admin upload API must accept FormData");
expect(uploadRoute.includes("public/uploads"), "admin upload API must store files under public/uploads");
expect(uploadRoute.includes("@vercel/blob") && uploadRoute.includes("BLOB_READ_WRITE_TOKEN"), "admin upload API must use Vercel Blob in production");
expect(store.includes("portfolio-content.json"), "portfolio store must persist to JSON");
expect(store.includes("@vercel/blob") && store.includes("allowOverwrite") && store.includes("BLOB_READ_WRITE_TOKEN"), "portfolio store must persist admin edits to Vercel Blob in production");
expect(store.includes("readBlobText") && store.includes("new Response(stream).text()"), "portfolio store must read Blob streams across Node/Vercel runtimes");
expect(adminDashboard.includes("Projects") && adminDashboard.includes("Skills") && adminDashboard.includes("Certificates"), "admin dashboard must expose project, skill, and certificate editors");
expect(adminDashboard.includes("Typography"), "admin dashboard must expose typography controls");
expect(adminDashboard.includes("Font Size"), "admin dashboard must allow font size editing");
expect(adminDashboard.includes("Raw JSON"), "admin dashboard must include a raw JSON editor for everything else");
expect(adminDashboard.includes("image URL") || adminDashboard.includes("Image URL"), "admin dashboard must allow image URLs");
expect(adminDashboard.includes("type=\"file\""), "admin dashboard must allow file uploads");
expect(adminDashboard.includes("Crop X") && adminDashboard.includes("Crop Y") && adminDashboard.includes("Zoom"), "admin dashboard must expose pan/crop controls");
expect(adminDashboard.includes("moveItem"), "admin dashboard must allow rearranging content");

expect(globals.includes("--acid"), "global CSS must define the acid accent token");
expect(globals.includes("--shadow-hard"), "global CSS must define hard neobrutalist shadows");
expect(globals.includes("border: 2px solid"), "global CSS must use thick borders");
expect(globals.includes("border-radius: 0"), "global CSS must keep sharp neobrutalist corners");
expect(globals.includes("@media (max-width: 720px)"), "global CSS must include mobile layout rules");
expect(globals.includes("@media (prefers-reduced-motion: reduce)"), "global CSS must include reduced-motion rules");
expect(globals.includes(".project-grid"), "global CSS must style project pagination grid");
expect(globals.includes(".stack-subtitle"), "global CSS must style skill stack subtitles");
expect(globals.includes(".story-card .section-label"), "story card labels must have readable contrast");
expect(globals.includes(".admin-page"), "global CSS must style the admin dashboard");
expect(globals.includes("--font-size-hero-title-max"), "global CSS must support editable hero title font sizing");
expect(globals.includes("--font-size-section-title-max"), "global CSS must support editable section title font sizing");
expect(
  envExample.includes("ADMIN_PASSCODE") &&
    envExample.includes("BLOB_STORE_ID") &&
    envExample.includes("BLOB_READ_WRITE_TOKEN") &&
    envExample.includes("BLOB_WEBHOOK_PUBLIC_KEY"),
  "env example must document production Vercel env vars",
);
expect(
  readme.includes("Vercel") &&
    readme.includes("BLOB_STORE_ID") &&
    readme.includes("BLOB_READ_WRITE_TOKEN") &&
    readme.includes("Production Checklist"),
  "README must document Vercel deployment setup",
);

if (failures.length) {
  console.error("Next portfolio contract failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Next portfolio contract passed.");
