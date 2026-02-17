import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Header from '../components/Header'


 export default function NotFound(){
  const error = useRouteError()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white p-12 rounded-2xl shadow-lg">
          <h1 className="text-9xl font-bold text-blue-600 mb-4 animate-bounce">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>

          {/* Display error details if available */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-red-600 mb-4">Error Details:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Status:</strong> {error.status || 'Unknown'}
                </p>
                <p>
                  <strong>Status Text:</strong> {error.statusText || 'Not Found'}
                </p>
                {error.message && (
                  <p>
                    <strong>Message:</strong> {error.message}
                  </p>
                )}
                {error.data && (
                  <p>
                    <strong>Additional Info:</strong> {error.data}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-underline inline-flex items-center gap-2"
            >
              🏠 Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Go Back
            </button>
          </div>

          <div className="mt-12">
            <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
              🛒
            </div>
            <p className="text-gray-600">Let's get you back on track!</p>
          </div>
        </div>
      </div>
    </div>
  )
}


