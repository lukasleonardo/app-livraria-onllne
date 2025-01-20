
import "./globals.scss";
import {Inter} from 'next/font/google'
import {Providers} from './providers'
import { SessionProviderWrapper } from "./sessionProviderWrapper";

const inter = Inter({subsets:['latin']})

export const metadata = {
  title: "My bookstore",
  description: "A little bookstore",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <SessionProviderWrapper>
        <Providers>{children}</Providers>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
