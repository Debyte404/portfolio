import { Archivo_Black, Doto, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata = {
  title: "Debyte Expo - Ankit Chetri",
  description:
    "A cinematic neobrutalist maker portfolio for Ankit Chetri, also known as Debyte.",
  metadataBase: new URL("https://debyte.vercel.app"),
  openGraph: {
    title: "Debyte Expo - Ankit Chetri",
    description:
      "Software, shaders, hardware experiments, games, and design-forward production work.",
    images: ["/assets/profile.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${space.variable} ${doto.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
