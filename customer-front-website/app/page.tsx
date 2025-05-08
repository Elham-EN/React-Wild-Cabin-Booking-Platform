import Link from "next/link";

// Page Components are Server Component
export default function Page() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/cabins">Explore luxry cabins</Link>
    </div>
  );
}
