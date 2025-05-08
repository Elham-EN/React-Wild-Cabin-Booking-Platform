import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./_styles/globals.css";
import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  // controls how a font is displayed before it's fully loaded
  // Prioritizes text visibility immediately, even if it means
  // a font change later
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites," +
    "surrounded by beautiful mountains and dark forests",
};

// preventing accidental property modifications on the props object
type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" className={josefin.className}>
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
        </header>
        <Navigation />
        {props.children}
      </body>
    </html>
  );
}

export default RootLayout;
