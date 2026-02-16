
/**
 * SearchBar component - Allows users to search/filter products
 */
function SearchBar(){
  

  function handleSearchChange(e){
    
  }

  function handleClearSearch() {
   
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative max-w-2xl mx-auto">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-3 pl-12 pr-12 text-base border-2 border-gray-200 rounded-full outline-none transition-all focus:border-blue-600 focus:shadow-lg"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg p-1 transition-colors"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
