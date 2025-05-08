import type { Metadata } from "next";
import "./_styles/globals.css";
import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

export const metadata: Metadata = {
  title: "The Wild Oasis",
};

// preventing accidental property modifications on the props object
type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
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
