'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { generateContent } from '@/lib/gemini'

export default function ContentPage() {
  const [prompt, setPrompt] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const result = await generateContent(prompt)
      setContent(result)
    } catch (error) {
      console.error('Error:', error)
      setContent('Error generating content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Generator</h1>
      
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What would you like to generate?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your request..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {content && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Generated Content</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        </div>
      )}
    </div>
  )
}
