'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'

export default function SettingsPage() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/auth/login')
        } else {
          setSession(session)
        }
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) return null

  if (!session) return null

  return (
    <DashboardLayout user={session.user}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Account Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              👤 Account Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-lg text-gray-900 p-3 bg-gray-50 rounded-lg">{session.user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg font-mono">{session.user?.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <p className="text-lg text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {new Date(session.user?.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              ⚙️ Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label className="text-gray-700 font-medium">Email Notifications</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label className="text-gray-700 font-medium">Save Chat History</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label className="text-gray-700 font-medium">Dark Mode</label>
                <input type="checkbox" className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
              🚨 Danger Zone
            </h2>
            <p className="text-red-700 mb-4">Once you logout, you will need to sign in again to access your account.</p>
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                🚪 Logout
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-red-700 font-medium">Are you sure you want to logout?</p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition font-medium"
                  >
                    {loading ? '⏳ Logging out...' : '✓ Yes, Logout'}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-medium"
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}