import React from "react";
import SideNavigation from "../_components/SideNavigation";

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function Layout(props: LayoutProps): React.ReactElement {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
