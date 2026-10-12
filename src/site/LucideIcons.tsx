import {
  Activity,
  Armchair,
  Asterisk,
  Circle,
  Footprints,
  PersonStanding,
  type LucideProps,
} from "lucide-react";

import { ASTREK_ICON_COLOR, ASTREK_ICON_STROKE } from "./lucide-icons";

export const astrekLucideProps: Pick<LucideProps, "strokeWidth" | "color" | "aria-hidden"> = {
  strokeWidth: ASTREK_ICON_STROKE,
  color: ASTREK_ICON_COLOR,
  "aria-hidden": true,
};

type IconSizeProps = { size?: number; className?: string };

export function AstrekAsterisk({ size = 24, className = "astrek-lucide-icon astrek-ticker-separator" }: IconSizeProps) {
  return <Asterisk size={size} className={className} {...astrekLucideProps} />;
}

export function AstrekArmchair({ size = 20, className = "astrek-lucide-icon astrek-mode-icon" }: IconSizeProps) {
  return <Armchair size={size} className={className} {...astrekLucideProps} />;
}

export function AstrekPersonStanding({ size = 20, className = "astrek-lucide-icon astrek-mode-icon" }: IconSizeProps) {
  return <PersonStanding size={size} className={className} {...astrekLucideProps} />;
}

export function AstrekFootprints({ size = 20, className = "astrek-lucide-icon astrek-mode-icon" }: IconSizeProps) {
  return <Footprints size={size} className={className} {...astrekLucideProps} />;
}

export function AstrekActivity({ size = 20, className = "astrek-lucide-icon astrek-mode-icon" }: IconSizeProps) {
  return <Activity size={size} className={className} {...astrekLucideProps} />;
}

export function AstrekDotCircle({ size = 8, className = "astrek-dot-icon", filled = true }: IconSizeProps & { filled?: boolean }) {
  return (
    <Circle
      size={size}
      className={className}
      strokeWidth={ASTREK_ICON_STROKE}
      color={ASTREK_ICON_COLOR}
      fill={filled ? ASTREK_ICON_COLOR : "none"}
      aria-hidden
    />
  );
}
