import Link from "next/link";
import React from "react";

export default function Navigation(): React.ReactElement {
  return (
    <ul>
      <li>
        <Link href={"/cabins"}>Cabins</Link>
      </li>
      <li>
        <Link href={"/about"}>About</Link>
      </li>
      <li>
        <Link href={"/account"}>Account</Link>
      </li>
    </ul>
  );
}
