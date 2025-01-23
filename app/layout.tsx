
import "./globals.scss";
import {Inter} from 'next/font/google'
import {Providers} from './providers'

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
