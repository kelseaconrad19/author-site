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
                <a className="brand-mark" href="/">
                  FC
                </a>
                <a className="brand-text" href="/">
                  <span className="brand-title">Finally Creative</span>
                  <span className="brand-subtitle">Finally making the time for creativity</span>
                </a>
              </div>
              <nav className="site-nav" aria-label="Primary">
                <a href="#about">About</a>
                <a href="/services">Services & Courses</a>
                {/* <a href="#services">Courses</a> */}
                <a href="/books">Books</a>
                <a href="/blog">Blog</a>
                <a href="#contact">Connect</a>
              </nav>
            </div>
          </header>

          <main className="site-main">{children}</main>

          <footer className="site-footer">
            <div className="footer-content">
              <p>© 2024 Finally Creative. All rights reserved.</p>
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
