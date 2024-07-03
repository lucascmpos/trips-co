import { NextAuthProvider } from "@/providers/auth";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/providers/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "FSW Trips",
  description: "Sistema de Reserva de Viagens TOP!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <div className="flex flex-col h-screen">
            <div className="h-[94px]">
              <Header />
            </div>
            <div className="flex-1 ">{children}</div>

            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
