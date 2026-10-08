interface ResourceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResourceSearch({ value, onChange }: ResourceSearchProps) {
  return (
    <div>
      <label htmlFor="resource-search" className="wl-kicker wl-secondary">
        搜索资源
      </label>
      <input
        id="resource-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="按名称、说明或标签匹配"
        className="wl-input dn-focus"
        style={{ marginTop: '0.5rem' }}
      />
    </div>
  );
}
