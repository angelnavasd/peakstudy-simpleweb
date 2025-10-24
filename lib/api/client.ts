import axios, { AxiosInstance, AxiosError } from 'axios'
import { createClient } from '@/lib/supabase/client'

interface ApiConfig {
  baseURL: string
  timeout: number
}

class ApiClient {
  private instance: AxiosInstance

  constructor(config: ApiConfig) {
    console.log('🔗 API Client initialized with baseURL:', config.baseURL)
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor para añadir token de autenticación
    this.instance.interceptors.request.use(
      async (config) => {
        console.log('🚀 Making request to:', config.method?.toUpperCase(), config.url)
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`
          console.log('✅ Auth token added to request')
        } else {
          console.log('❌ No auth session found')
        }

        return config
      },
      (error) => {
        console.error('❌ Request interceptor error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor para manejar errores y refresh de token
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      async (error: AxiosError) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && originalRequest) {
          const supabase = createClient()
          const { error: refreshError } = await supabase.auth.refreshSession()

          if (!refreshError) {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.access_token) {
              originalRequest.headers.Authorization = `Bearer ${session.access_token}`
              return this.instance(originalRequest)
            }
          }
        }

        return Promise.reject(error)
      }
    )
  }

  // Métodos genéricos
  async get<T>(url: string, config?: any) {
    return this.instance.get<T>(url, config)
  }

  async post<T>(url: string, data?: any, config?: any) {
    return this.instance.post<T>(url, data, config)
  }

  async put<T>(url: string, data?: any, config?: any) {
    return this.instance.put<T>(url, data, config)
  }

  async delete<T>(url: string, config?: any) {
    return this.instance.delete<T>(url, config)
  }

  async patch<T>(url: string, data?: any, config?: any) {
    return this.instance.patch<T>(url, data, config)
  }
}

// Exportar instancia configurada
export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
  timeout: 30000,
})