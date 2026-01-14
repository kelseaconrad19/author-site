import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Author Studio",
  description: "Author business website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="site">
          <header className="site-header">
            <div className="header-content">
              <div className="brand">
                <span className="brand-mark">AS</span>
                <div>
                  <p className="brand-title">Author Studio</p>
                  <p className="brand-subtitle">Books, essays, and speaking</p>
                </div>
              </div>
              <nav className="site-nav" aria-label="Primary">
                <a href="#about">About</a>
                <a href="#books">Books</a>
                <a href="#services">Services</a>
                <a href="#events">Events</a>
                <a href="#contact">Contact</a>
              </nav>
            </div>
          </header>

          <main className="site-main">{children}</main>

          <footer className="site-footer">
            <div className="footer-content">
              <p>© 2024 Author Studio. All rights reserved.</p>
              <div className="footer-links">
                <a href="#newsletter">Newsletter</a>
                <a href="#press">Press Kit</a>
                <a href="#privacy">Privacy</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
