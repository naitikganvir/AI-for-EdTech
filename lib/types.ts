export interface User {
  id: string
  email: string
  name?: string
  created_at: string
}

export interface Conversation {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  user_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface Content {
  id: string
  user_id: string
  title: string
  content: string
  type: string
  created_at: string
  updated_at: string
}
