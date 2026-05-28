import React, { useState } from 'react'
import api, { setAuthSession } from '../config/api.js'

function AuthForm({
  onSuccess,
  title,
  subtitle,
  defaultMode = 'login',
}) {
  const [isLogin, setIsLogin] = useState(defaultMode === 'login')
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData

      const { data } = await api.post(endpoint, payload)

      if (!data.success) {
        throw new Error(data.message || 'Request failed')
      }

      const { token, _id, name, email } = data.data
      setAuthSession({
        token,
        user: { _id, name, email },
      })

      onSuccess?.({ _id, name, email })
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          {title ?? (isLogin ? 'Sign In' : 'Create Account')}
        </h2>
        {subtitle && (
          <p className="text-center text-gray-600 text-sm mb-6">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-4" />}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={6}
            className="w-full p-2 border rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-60"
          >
            {submitting ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-500 ml-2 font-semibold"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
