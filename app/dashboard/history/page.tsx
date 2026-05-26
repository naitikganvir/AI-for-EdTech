'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'
import { useRouter } from 'next/navigation'

interface HistoryItem {
  id: string
  title: string
  messages: number
  createdAt: string
}

export default function HistoryPage() {
  const [session, setSession] = useState<any>(null)
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'Understanding Photosynthesis',
      messages: 5,
      createdAt: new Date().toLocaleString(),
    },
    {
      id: '2',
      title: 'Calculus Problem Help',
      messages: 3,
      createdAt: new Date(Date.now() - 86400000).toLocaleString(),
    },
  ])
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
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  if (loading) return null

  if (!session) return null

  return (
    <DashboardLayout user={session.user}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Chat History</h1>
          <p className="text-gray-600 mt-2">View and manage your previous conversations</p>
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">📭 No chat history yet</p>
            <p className="text-gray-500 mb-6">Start a new conversation to begin learning!</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Start Chatting
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer border-l-4 border-indigo-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      💬 {item.messages} messages • 📅 {item.createdAt}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm">
                      📖 Continue
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}