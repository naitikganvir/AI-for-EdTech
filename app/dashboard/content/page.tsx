'use client'

import { useState } from 'react'
import { generateContent } from '@/lib/gemini'
import DashboardLayout from '@/components/DashboardLayout'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface ContentResult {
  id: string
  title: string
  content: string
  createdAt: string
}

export default function ContentPage() {
  const [session, setSession] = useState<any>(null)
  const [prompt, setPrompt] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedContent, setSavedContent] = useState<ContentResult[]>([])
  const [activeTab, setActiveTab] = useState('generate')
  const router = useRouter()

  useState(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/login')
      } else {
        setSession(session)
      }
    }
    checkSession()
  }, [])

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const result = await generateContent(prompt)
      setContent(result)
    } catch (error) {
      console.error('Error:', error)
      setContent('❌ Error generating content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    if (!content) return
    const newItem: ContentResult = {
      id: Date.now().toString(),
      title: prompt.substring(0, 50) + '...',
      content: content,
      createdAt: new Date().toLocaleString(),
    }
    setSavedContent([newItem, ...savedContent])
    setPrompt('')
    setContent('')
  }

  if (!session) return null

  return (
    <DashboardLayout user={session.user}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Generator</h1>
        <p className="text-gray-600 mb-8">Generate educational content, summaries, and study materials</p>

        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'generate'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            ✍️ Generate New
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'saved'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            📚 Saved Content ({savedContent.length})
          </button>
        </div>

        {activeTab === 'generate' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <form onSubmit={handleGenerate} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What would you like to generate?
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Write a summary of photosynthesis, Create study notes for calculus, Explain quantum physics..."
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                >
                  {loading ? '⏳ Generating...' : '✨ Generate Content'}
                </button>
              </form>

              {/* Output Section */}
              {content && (
                <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Generated Content</h2>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                    >
                      💾 Save
                    </button>
                  </div>
                  <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">💡 Tips for Better Results</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ Be specific about the topic</li>
                  <li>✓ Specify the format (essay, bullet points, etc.)</li>
                  <li>✓ Mention the target audience/level</li>
                  <li>✓ Request specific examples if needed</li>
                  <li>✓ Ask for summaries or detailed explanations</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {savedContent.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No saved content yet</p>
                <button
                  onClick={() => setActiveTab('generate')}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedContent.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <button
                        onClick={() => setSavedContent(savedContent.filter(c => c.id !== item.id))}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}