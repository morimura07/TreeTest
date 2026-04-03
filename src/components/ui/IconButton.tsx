import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = {
  label: string;
  children: ReactNode;
  variant?: "default" | "success" | "danger" | "ghost";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const VARIANTS: Record<NonNullable<IconButtonProps["variant"]>, string> = {
  default:
    "border-zinc-700/80 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800/80 hover:border-zinc-600/80",
  success:
    "border-emerald-500/35 bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/50 hover:border-emerald-400/45",
  danger:
    "border-rose-500/35 bg-rose-950/35 text-rose-200 hover:bg-rose-900/45 hover:border-rose-400/45",
  ghost:
    "border-transparent bg-transparent text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100",
};

export function IconButton({
  label,
  children,
  variant = "default",
  className = "",
  disabled,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      className={[
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunset-400/80",
        "disabled:pointer-events-none disabled:opacity-40",
        VARIANTS[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
