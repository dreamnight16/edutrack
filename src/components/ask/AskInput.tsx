interface AskInputProps {
  onSubmit: (query: string) => void;
  loading: boolean;
}

export function AskInput({ onSubmit, loading }: AskInputProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('query') as HTMLInputElement | null;
    if (!input) return;
    const query = input.value.trim();
    if (query && !loading) {
      onSubmit(query);
      input.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ask-query" className="wl-kicker">
        你的情况
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0" style={{ marginTop: '0.75rem' }}>
        <input
          id="ask-query"
          name="query"
          type="text"
          placeholder="比如：我是河南高二理科生，对计算机感兴趣"
          className="wl-input dn-focus sm:border-r-0"
          style={{ flex: '1 1 auto' }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="wl-btn wl-btn--primary dn-interactive dn-focus"
          style={{ flex: '0 0 auto' }}
        >
          {loading ? '查找中…' : '查找'}
        </button>
      </div>
      <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem' }}>
        关键词在本机匹配，不发送任何内容到网络。
      </p>
    </form>
  );
}
