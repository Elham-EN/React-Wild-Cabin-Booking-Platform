import type { Metadata } from "next";
import "./_styles/globals.css";
import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

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
    <html lang="en">
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
