import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/login">
      <h1>login</h1>
      </Link>
      <Link href="/register">
      <h1>register</h1>
      </Link>
    </div>
  );
}
