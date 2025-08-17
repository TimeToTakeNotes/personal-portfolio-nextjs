"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface LogoLinkProps {
  href?: string;
  className?: string;
}

export default function Logo({ href = "/", className = "" }: LogoLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`flex flex-col items-start space-y-1 cursor-pointer group ${className}`}
    >
      <div className="flex items-center">
        <span className="text-3xl font-bold">
          Arno Christie
        </span>
      </div>
    </Link>
  );
}