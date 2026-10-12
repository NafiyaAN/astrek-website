type SvgProps = { className?: string; size?: number };

export function BrandArrow({ className = "brand-arrow", size = 14 }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        d="M3 8h8M8 3l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandArrowExt({ className = "brand-arrow brand-arrow--ext", size = 14 }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        d="M5 11V5h6M11 5 5 11"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandChevLeft({ className = "brand-arrow brand-arrow--prev", size = 16 }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        d="M10 3 5 8l5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandChevRight({ className = "brand-arrow brand-arrow--next", size = 16 }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        d="M6 3l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandChevUp({ className = "brand-arrow brand-arrow--up", size = 16 }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        d="M3 10l5-5 5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandChevDown({ className = "brand-arrow brand-arrow--down", size = 16 }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        d="M3 6l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
