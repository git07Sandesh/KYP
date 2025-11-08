import { apiClient } from './client'
import type { Candidate, Party, Constituency, Province } from '@repo/database'

export interface CandidatesResponse {
  candidates: (Candidate & {
    party: Party
    constituency: Constituency & {
      province: Province
      district: any
    }
  })[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CandidateFilters {
  level?: 'FEDERAL' | 'PROVINCIAL' | 'LOCAL'
  partyId?: number
  constituencyId?: number
  page?: number
  limit?: number
  sortBy?: 'name' | 'impactScore' | 'fulfillmentRate' | 'scandalScore'
  order?: 'asc' | 'desc'
  minImpactScore?: number
  maxScandalScore?: number
}

export async function fetchCandidates(filters?: CandidateFilters): Promise<CandidatesResponse> {
  const params: Record<string, string> = {}
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = String(value)
      }
    })
  }

  return apiClient.get<CandidatesResponse>('/candidates', params)
}

export async function fetchCandidateById(id: string) {
  return apiClient.get(`/candidates/${id}`)
}

export async function fetchCandidatePromises(id: string, filters?: any) {
  const params: Record<string, string> = {}
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = String(value)
      }
    })
  }
  return apiClient.get(`/candidates/${id}/promises`, params)
}

export async function fetchCandidateWorks(id: string, filters?: any) {
  const params: Record<string, string> = {}
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = String(value)
      }
    })
  }
  return apiClient.get(`/candidates/${id}/works`, params)
}

export async function fetchCandidateCases(id: string, filters?: any) {
  const params: Record<string, string> = {}
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = String(value)
      }
    })
  }
  return apiClient.get(`/candidates/${id}/cases`, params)
}

export async function fetchCandidateRumors(id: string) {
  return apiClient.get(`/candidates/${id}/rumors`)
}

export async function fetchCandidateSources(id: string) {
  return apiClient.get(`/candidates/${id}/sources`)
}

export async function compareCandidates(candidateIds: string[]) {
  return apiClient.post('/compare', { candidateIds })
}

export async function search(query: string, type: string = 'candidates', limit: number = 20) {
  return apiClient.get('/search', {
    q: query,
    type,
    limit: String(limit)
  })
}

export interface RankingsFilters {
  category?: 'TOP_IMPACT' | 'CLEANEST_RECORDS' | 'HIGHEST_FULFILLMENT' | 'MOST_EXPERIENCED' | 'MOST_POPULAR'
  level?: 'FEDERAL' | 'PROVINCIAL' | 'LOCAL'
  partyId?: number
  limit?: number
}

export async function fetchRankings(filters?: RankingsFilters) {
  const params: Record<string, string> = {}
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = String(value)
      }
    })
  }
  return apiClient.get('/rankings', params)
}

export async function fetchParties() {
  return apiClient.get('/parties')
}

export async function fetchProvinces() {
  return apiClient.get('/provinces')
}

export async function fetchConstituencies(filters?: {
  provinceId?: number
  districtId?: number
  level?: string
}) {
  const params: Record<string, string> = {}
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = String(value)
      }
    })
  }
  return apiClient.get('/constituencies', params)
}
