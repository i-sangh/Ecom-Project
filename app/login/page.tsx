// app/login/page.tsx

"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // State for error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation for demonstration purposes
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in both fields.')
      return
    }

    // Simulate a login attempt (replace this with your actual login logic)
    console.log('Login attempt:', formData)

    // Here you would typically verify credentials
    // For demonstration, let's assume the login is always successful
    const isLoginSuccessful = true; // Change this based on your actual login logic

    if (isLoginSuccessful) {
      console.log('Login successful, redirecting to /interests');
      // Redirect to interests page after successful login
      router.push('/interests'); // Updated redirection
    } else {
      setErrorMessage('Invalid email or password.'); // Handle login failure
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <div className="rounded-lg p-8 bg-white border border-gray-300 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
        
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-lg">Welcome back to ECOMMERCE</h2>
          <p className="text-sm text-gray-600">The next gen business marketplace</p>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block">Email</label>
            <input
              type="email"
              placeholder="Enter"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter"
                className="w-full rounded border border-gray-300 px-3 py-2 pr-16"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-black py-3 text-white hover:bg-gray-800"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an Account? </span>
          <Link href="/" className="font-semibold text-black">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  )
}
