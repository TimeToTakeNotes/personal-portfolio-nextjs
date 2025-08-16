import React from "react";
import type { StaticImageData } from "next/image";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  className?: string;
  image: string | StaticImageData; // Path to your background image
  overlay?: boolean; // Optional overlay toggle
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  className = "",
  image,
  overlay = true
}) => {
    const imageUrl = typeof image === "string" ? image : image.src;
  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        {overlay && (
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, rgba(10, 10, 10, 0.6) 2px)",
              backgroundSize: "8px 8px"
            }}
          />
        )}
        <div className="relative z-[2] h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default BackgroundWrapper;