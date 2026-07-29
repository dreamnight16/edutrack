interface AskInputProps {
  onSubmit: (query: string) => void;
  loading: boolean;
}

export function AskInput({ onSubmit, loading }: AskInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('query') as HTMLInputElement;
    const query = input.value.trim();
    if (query && !loading) {
      onSubmit(query);
      input.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="flex gap-2">
        <input
          name="query"
          type="text"
          placeholder="比如：我是河南高二理科生，对计算机感兴趣..."
          className="flex-1 px-4 py-3 rounded-card border border-primary/10 bg-surface text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/30 transition-colors"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-primary text-white rounded-card text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {loading ? '思考中...' : '提问'}
        </button>
      </div>
    </form>
  );
}
