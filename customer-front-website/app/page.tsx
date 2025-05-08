import Link from "next/link";

// Page Components are Server Component
export default function Page() {
  return (
    <div>
      <h1 className="text-5xl text-center bg-amber-600 p-5 font-bold">
        Home Page
      </h1>
      <Link className="text-blue-400 cursor-pointer" href="/cabins">
        Explore luxry cabins
      </Link>
    </div>
  );
}
