import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable')
}

const client = new GoogleGenerativeAI(apiKey)

export async function generateContent(prompt: string): Promise<string> {
  try {
    const model = client.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating content:', error)
    throw error
  }
}

export async function chat(messages: any[]): Promise<string> {
  try {
    const model = client.getGenerativeModel({ model: 'gemini-pro' })
    const chat = model.startChat()
    
    for (const message of messages.slice(0, -1)) {
      await chat.sendMessage(message.content)
    }
    
    const result = await chat.sendMessage(messages[messages.length - 1].content)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error in chat:', error)
    throw error
  }
}
