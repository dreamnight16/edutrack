interface ResourceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResourceSearch({ value, onChange }: ResourceSearchProps) {
  return (
    <div className="px-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索资源..."
        className="w-full px-4 py-2.5 rounded-card border border-primary/10 bg-surface text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/30 transition-colors"
      />
    </div>
  );
}
