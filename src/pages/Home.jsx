import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ProductList from '../components/ProductList'

function Home (){
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-12 px-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
            Welcome to ShoppyGlobe
          </h1>
          <p className="text-lg md:text-xl opacity-90 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Discover amazing products at unbeatable prices
          </p>
        </div>
        <SearchBar />
        <ProductList />
      </main>
    </div>
  )
}

export default Home
