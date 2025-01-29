
import "./globals.scss";
import {Inter} from 'next/font/google'
import {Providers} from './providers'
import { Navigation } from "@/components/Navigation";

const inter = Inter({subsets:['latin']})

export const metadata = {
  title: "My bookstore",
  description: "A little bookstore",
};





export default function RootLayout({children,}:{children: React.ReactNode;}) {

  return (
    <html lang="en" >
      <body className={`${inter.className} themed-bg`} >
      <Providers>
        <Navigation/>  
        <main className="container mx-auto px-4 py-8">{children}</main>
      </Providers>
      </body>
    </html>
  );
}
