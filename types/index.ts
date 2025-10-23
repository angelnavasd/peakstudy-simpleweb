// Session types
export interface Session {
  id: string
  user_id: string
  title: string
  source: 'pdf' | 'text' | 'audio' | 'youtube' | 'manual'
  status: 'processing' | 'completed' | 'failed' | 'archived'
  created_at: string
  updated_at: string
  input_meta: SessionInputMeta
  is_manual?: boolean
  raw_content?: string
  error_message?: string
}

export interface SessionInputMeta {
  fileName?: string
  fileSize?: number
  mimeType?: string
  videoUrl?: string
  videoId?: string
  language?: string
  title?: string
  duration?: number
  processingTime?: number
  [key: string]: any
}

export interface SessionWithOutput extends Session {
  output?: Output
}

// Output types
export interface Output {
  id: string
  session_id: string
  raw_text?: string
  clean_text?: string
  meta: Record<string, any>
  content_hash?: string
  updated_at: string
}

// Transform types
export interface Transform {
  id: string
  session_id: string
  user_id: string
  output_id?: string
  type: 'summary' | 'quiz' | 'flashcards'
  content: TransformContent
  result?: any
  meta: TransformMeta
  created_at: string
}

export interface TransformContent {
  // Para flashcards
  cards?: Array<{
    id: string
    front: string
    back: string
    difficulty?: 'easy' | 'medium' | 'hard'
    category?: string
  }>

  // Para quizzes
  questions?: Array<{
    id: string
    question: string
    options: string[]
    correct_answer: number
    explanation?: string
    difficulty?: 'easy' | 'medium' | 'hard'
  }>

  // Para resúmenes
  summary?: string
  key_points?: string[]
  topics?: string[]
  estimated_reading_time?: string
}

export interface TransformMeta {
  processing_time?: number
  token_usage?: number
  model_version?: string
  [key: string]: any
}

// Chat types
export interface FeynmanChat {
  id: string
  session_id: string
  user_id: string
  title: string
  context_summary?: string
  base_context_hash?: string
  total_messages: number
  total_tokens_used: number
  is_active: boolean
  metadata: Record<string, any>
}

export interface FeynmanMessage {
  id: string
  chat_id: string
  role: 'user' | 'assistant'
  content: string
  message_order: number
  context_tokens?: number
  sync_status?: 'synced' | 'pending' | 'failed'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}