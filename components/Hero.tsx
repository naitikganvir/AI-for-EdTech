'use client'

import Link from 'next/link'

interface HeroProps {
  session: any
}

export default function Hero({ session }: HeroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Learning Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Learn, create, and grow with intelligent tutoring powered by Google Gemini AI
          </p>
          <div className="flex justify-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/login"
                  className="px-8 py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
