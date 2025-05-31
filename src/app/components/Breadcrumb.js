"use client";  // ✅ Ensures it's a client component

import Link from "next/link";
import { usePathname } from "next/navigation";  // ✅ Correct import for App Router

const Breadcrumb = ({title }) => {
  const pathname = usePathname();  
  if (!pathname) return null; // ✅ Prevents errors during initial render

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="container py-2 px-4">
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb mb-0">
      <li className="breadcrumb-item">
        <Link href="https://sowtex.com/">Home</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        { title }
      </li>
    </ol>
  </nav>
  </div>
  );
};

export default Breadcrumb;
