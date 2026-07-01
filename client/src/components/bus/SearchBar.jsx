function SearchBar({ search, setSearch }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by bus number, route, or driver..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full 
        bg-white dark:bg-slate-900
        text-slate-900 dark:text-white
        border border-slate-200 dark:border-slate-700
        rounded-lg px-4 py-3
        outline-none
        focus:border-indigo-500 dark:focus:border-purple-500
        shadow-sm
        transition"
      />
    </div>
  );
}

export default SearchBar;