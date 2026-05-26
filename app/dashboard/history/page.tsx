'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        // Placeholder for fetching history from database
        setHistory([])
      } catch (error) {
        console.error('Error fetching history:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chat History</h1>
      
      {history.length === 0 ? (
        <p className="text-gray-600">No chat history yet. Start a conversation!</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">Created: {new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
