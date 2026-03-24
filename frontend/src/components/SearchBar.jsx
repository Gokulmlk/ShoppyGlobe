import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, clearSearchTerm, selectSearchTerm } from '../store/searchSlice'
import { Search, X } from 'lucide-react'

function SearchBar() {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  function handleSearchChange(e) {
    dispatch(setSearchTerm(e.target.value))
  }

  function handleClearSearch() {
    dispatch(clearSearchTerm())
    inputRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      handleClearSearch()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 my-8">
      <div className="relative max-w-2xl mx-auto">
        
        {/* Search Input */}
        <div className={`relative transition-all duration-300 ${
          isFocused ? 'scale-105' : 'scale-100'
        }`}>
          
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
            isFocused ? 'text-blue-600' : 'text-gray-400'
          }`}>
            <Search size={20} />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className={`w-full py-3.5 pl-12 pr-12 text-base border-2 rounded-full outline-none transition-all duration-200 ${
              isFocused
                ? 'border-blue-600 shadow-lg bg-white'
                : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
            }`}
          />
          
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 hover:bg-red-50 rounded-full"
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Active Search Indicator */}
      {searchTerm && !isFocused && (
        <div className="max-w-2xl mx-auto mt-3 text-center">
          <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
            <Search size={14} className="text-blue-600" />
            Searching for: <strong className="text-blue-600">{searchTerm}</strong>
            <button
              onClick={handleClearSearch}
              className="ml-1 text-gray-400 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        </div>
      )}
    </div>
  )
}

export default SearchBar
