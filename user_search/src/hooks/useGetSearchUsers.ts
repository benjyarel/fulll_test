import { useState, useEffect } from "react"

import type { GithubUser, GithubUserSearchResponseData } from "../types"
interface CacheEntry {
  data: GithubUserSearchResponseData
  cachedAt: number
}

interface UseGetSearchUsersParams {
  query: string
}

const DEFAULT_TTL = 2 * 60 * 1000 // 2 minutes

const cache = new Map<string, CacheEntry>()

const getCached = (key: string): GithubUserSearchResponseData | undefined => {
  const entry = cache.get(key)
  if (!entry) {
    return undefined
  }

  const isExpired = Date.now() - entry.cachedAt >= DEFAULT_TTL
  if (isExpired) {
    return undefined
  }

  return entry.data
}

const setCached = (key: string, data: GithubUserSearchResponseData) => {
  cache.set(key, { data, cachedAt: Date.now() })
}

const BASE_URL = "https://api.github.com/search/users"

export const useGetSearchUsers = ({ query }: UseGetSearchUsersParams) => {
  const [users, setUsers] = useState<GithubUser[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Github search API doesn't provide data without query paramas
    if (!query) {
      setUsers([])
      setTotalCount(0)
      setIsLoading(false)
      return
    }

    const cached = getCached(query)
    if (cached) {
      setUsers(cached.items)
      setTotalCount(cached.total_count)
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    const search = async () => {
      setIsLoading(true)

      try {
        const searchUrl = `${BASE_URL}?q=${query}`
        const response = await fetch(searchUrl, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const data: GithubUserSearchResponseData = await response.json()

        setCached(query, data)
        setUsers(data.items)
        setTotalCount(data.total_count)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }
        console.error(error)
      } finally {
        if (controller.signal.aborted) {
          return
        }
        setIsLoading(false)
      }
    }

    search()

    return () => {
      controller.abort()
    }
  }, [query])

  return { users, totalCount, isLoading }
}
