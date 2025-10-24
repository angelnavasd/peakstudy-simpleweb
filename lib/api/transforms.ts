import { apiClient, ApiResponse } from './client'

export interface Transform {
  id: string
  session_id: string
  user_id: string
  type: 'summary' | 'quiz' | 'flashcards'
  content: any
  result?: any
  created_at: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number
  explanation?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface QuizContent {
  questions: QuizQuestion[]
  title?: string
  description?: string
}

export interface QuizResult {
  score: number
  total_questions: number
  correct_answers: number
  time_spent: number
  answers: Array<{
    question_id: string
    selected_option: number
    is_correct: boolean
    time_spent: number
  }>
}

export class TransformsService {
  // Generar transformación de quiz
  static async generateQuiz(sessionId: string): Promise<ApiResponse<Transform>> {
    const response = await apiClient.post<ApiResponse<Transform>>(
      `/transform/sessions/${sessionId}/transforms`,
      { type: 'quiz' }
    )
    return response.data
  }

  // Obtener transformaciones de una sesión
  static async getSessionTransforms(sessionId: string): Promise<ApiResponse<Transform[]>> {
    const response = await apiClient.get<ApiResponse<Transform[]>>(
      `/transform/sessions/${sessionId}/transforms`
    )
    return response.data
  }

  // Obtener transformación específica
  static async getTransform(sessionId: string, transformId: string): Promise<ApiResponse<Transform>> {
    const response = await apiClient.get<ApiResponse<Transform>>(
      `/transform/sessions/${sessionId}/transforms/${transformId}`
    )
    return response.data
  }

  // Obtener quiz específico de una sesión
  static async getQuiz(sessionId: string): Promise<ApiResponse<Transform>> {
    const response = await apiClient.get<ApiResponse<Transform>>(
      `/transform/sessions/${sessionId}/quiz`
    )
    return response.data
  }

  // Obtener estado de transformaciones
  static async getTransformStatus(sessionId: string): Promise<ApiResponse<any>> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/transform/sessions/${sessionId}/status`
    )
    return response.data
  }

  // Eliminar transformaciones de una sesión
  static async clearTransforms(sessionId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/transform/sessions/${sessionId}/transforms`
    )
    return response.data
  }
}