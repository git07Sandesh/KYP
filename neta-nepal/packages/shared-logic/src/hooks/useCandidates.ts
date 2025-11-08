import { useQuery } from '@tanstack/react-query'
import {
  fetchCandidates,
  fetchCandidateById,
  fetchCandidatePromises,
  fetchCandidateWorks,
  fetchCandidateCases,
  fetchCandidateRumors,
  fetchCandidateSources,
  fetchRankings,
  fetchParties,
  fetchProvinces,
  fetchConstituencies,
  search,
  type CandidateFilters,
  type RankingsFilters
} from '../api/candidates'

export function useCandidates(filters?: CandidateFilters) {
  return useQuery({
    queryKey: ['candidates', filters],
    queryFn: () => fetchCandidates(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: () => fetchCandidateById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCandidatePromises(id: string, filters?: any) {
  return useQuery({
    queryKey: ['candidate', id, 'promises', filters],
    queryFn: () => fetchCandidatePromises(id, filters),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCandidateWorks(id: string, filters?: any) {
  return useQuery({
    queryKey: ['candidate', id, 'works', filters],
    queryFn: () => fetchCandidateWorks(id, filters),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCandidateCases(id: string, filters?: any) {
  return useQuery({
    queryKey: ['candidate', id, 'cases', filters],
    queryFn: () => fetchCandidateCases(id, filters),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCandidateRumors(id: string) {
  return useQuery({
    queryKey: ['candidate', id, 'rumors'],
    queryFn: () => fetchCandidateRumors(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCandidateSources(id: string) {
  return useQuery({
    queryKey: ['candidate', id, 'sources'],
    queryFn: () => fetchCandidateSources(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useSearch(query: string, type?: string, limit?: number) {
  return useQuery({
    queryKey: ['search', query, type, limit],
    queryFn: () => search(query, type, limit),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useRankings(filters?: RankingsFilters) {
  return useQuery({
    queryKey: ['rankings', filters],
    queryFn: () => fetchRankings(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useParties() {
  return useQuery({
    queryKey: ['parties'],
    queryFn: fetchParties,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useProvinces() {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: fetchProvinces,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useConstituencies(filters?: { provinceId?: number; districtId?: number; level?: string }) {
  return useQuery({
    queryKey: ['constituencies', filters],
    queryFn: () => fetchConstituencies(filters),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}
