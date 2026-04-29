import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Pesantren Smart Digital",
  description: "Platform manajemen pesantren digital terintegrasi untuk modernisasi pendidikan islam di Indonesia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${poppins.variable} font-sans text-gray-800 bg-white`}>
        {children}
      </body>
    </html>
  );
}
