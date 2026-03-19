"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@arno/components/ui/Button";
import { easings } from "@arno/lib/animations";
import { siteData } from "@arno/assets/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-foreground) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          opacity: 0.06,
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">

        {/* Circular error visual */}
        <motion.div
          className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 mx-auto"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: easings.back }}
        >
          <div className="w-full h-full bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-full flex items-center justify-center border-2 border-destructive/10">
            <AlertTriangle className="h-20 w-20 sm:h-24 sm:w-24 text-destructive/60" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.2, ease: easings.smooth }}
        >
          Something went wrong.
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-md sm:max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: easings.smooth }}
        >
          An unexpected error occurred. Please try again - if the issue persists, feel free to get in touch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: easings.back }}
        >
          <Button
            onClick={reset}
            variant="primary"
            size="lg"
            className="group w-full sm:w-auto btn-shimmer flex items-center"
          >
            <RotateCcw className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-[-180deg]" />
            Try Again
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            size="lg"
            className="group w-full sm:w-auto flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </motion.div>

        {/* Contact link */}
        <motion.p
          className="text-xs sm:text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: easings.smooth }}
        >
          Think this is a mistake?{" "}
          <a
            href={`mailto:${siteData.email}`}
            className="text-foreground/70 hover:text-foreground hover:underline transition-colors duration-200 font-medium"
          >
            Send me a message
          </a>
        </motion.p>

      </div>
    </div>
  );
}
