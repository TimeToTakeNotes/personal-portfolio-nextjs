"use client";
import { motion } from "framer-motion";
import { Badge } from "@arno/components/ui/Badge";
import { cn } from "@arno/lib/utils";
import { easings } from "@arno/lib/animations";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <div className={cn("mb-12", alignClass, className)}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.82 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: easings.back }}
          className="inline-block mb-4"
        >
          <Badge variant="outline">{badge}</Badge>
        </motion.div>
      )}

      <motion.h2
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, delay: badge ? 0.08 : 0, ease: easings.smooth }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className="text-xl max-w-3xl text-foreground/80 mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, delay: badge ? 0.18 : 0.1, ease: easings.smooth }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
