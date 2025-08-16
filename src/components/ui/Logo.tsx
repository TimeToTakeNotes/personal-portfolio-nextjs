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
        <Image
          src="/themis-logo.png"
          alt="Themis Logo"
          width={32}
          height={32}
          className="-ml-1 relative top-0.5 transition-transform"
          priority
        />
        <span className="text-2xl font-bold">
          Themis
        </span>
      </div>
      <span className="text-xs">
        Fraud Management Infolytics
      </span>
    </Link>
  );
}