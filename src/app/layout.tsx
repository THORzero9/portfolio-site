import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { ThemeToggle } from "@/components/UI/ThemeToggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhaswat Gogoi - Android Developer",
  description: "Android Developer specialized in Kotlin, Jetpack Compose, and AI integration using GCP. Building innovative mobile solutions with MVVM architecture and modern development practices.",
  keywords: ["Android Developer", "Kotlin", "Jetpack Compose", "Mobile Development", "AI", "GCP", "MVVM", "Bhaswat Gogoi"],
  authors: [{ name: "Bhaswat Gogoi" }],
  openGraph: {
    title: "Bhaswat Gogoi - Android Developer",
    description: "Android Developer specialized in Kotlin, Jetpack Compose, and AI integration using GCP. Building innovative mobile solutions with MVVM architecture.",
    type: "website",
    url: "https://bhaswat.dev", // Update with your actual domain
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhaswat Gogoi - Android Developer",
    description: "Android Developer specialized in Kotlin, Jetpack Compose, and AI integration using GCP. Building innovative mobile solutions with MVVM architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
