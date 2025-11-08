/**
 * Base API client for making HTTP requests
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export interface ApiError {
  error: string
  details?: any
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.error || 'An error occurred')
    }
    return response.json()
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`, 
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    )
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value)
        }
      })
    }

    const response = await fetch(url.toString())
    return this.handleResponse<T>(response)
  }

  async post<T>(path: string, data?: any): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async patch<T>(path: string, data: any): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return this.handleResponse<T>(response)
  }

  async delete<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
    return this.handleResponse<T>(response)
  }
}

export const apiClient = new ApiClient()
