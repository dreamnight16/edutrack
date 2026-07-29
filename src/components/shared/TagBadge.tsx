interface TagBadgeProps {
  label: string;
  colorClass?: string;
}

export function TagBadge({ label, colorClass = 'bg-primary/10 text-primary' }: TagBadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-chip ${colorClass}`}
    >
      {label}
    </span>
  );
}
