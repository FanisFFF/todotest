
interface Props {
  children: React.ReactNode;
  setFilter: (filter: string) => void;
  filter: string;
  filterKey: string;
}

function Button({ children, setFilter, filter, filterKey }: Props) {
  return (
    <button
      onClick={() => setFilter(filterKey)}
      className={`px-2 py-1 rounded ${
        filter === filterKey
          ? 'bg-blue-500 text-white'
          : 'text-blue-500 hover:underline'
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
