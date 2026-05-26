'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'
import ChatInterface from '@/components/ChatInterface'

export default function Dashboard() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <DashboardLayout user={session.user}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Chat with AI or generate content</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 min-h-[500px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Chat Assistant</h2>
            <ChatInterface />
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">💡 Quick Tips</h3>
              <ul className="text-sm space-y-2">
                <li>✓ Ask questions about any topic</li>
                <li>✓ Get homework help</li>
                <li>✓ Generate study materials</li>
                <li>✓ Practice explanations</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Conversations</span>
                  <span className="text-2xl font-bold text-indigo-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Content Generated</span>
                  <span className="text-2xl font-bold text-indigo-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Learning Hours</span>
                  <span className="text-2xl font-bold text-indigo-600">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}