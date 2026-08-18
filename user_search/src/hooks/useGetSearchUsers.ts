import { useState, useEffect } from "react"

import type { GithubUser, GithubUserSearchResponseData } from "../types"

interface UseGetSearchUsersParams {
  query: string
}
const BASE_URL = "https://api.github.com/search/users"

export const useGetSearchUsers = ({ query }: UseGetSearchUsersParams) => {
  const [users, setUsers] = useState<GithubUser[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const searchUrl = `${BASE_URL}?q=${query}`

  useEffect(() => {
    // Github search API doesn't provide data without query paramas
    if (!query) {
      setUsers([])
      setTotalCount(0)
      return
    }

    const controller = new AbortController()

    const search = async () => {
      const response = await fetch(searchUrl, { signal: controller.signal })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const { total_count, items }: GithubUserSearchResponseData =
        await response.json()

      setUsers(items)
      setTotalCount(total_count)
    }

    search()

    return () => {
      controller.abort()
    }
  }, [query])

  return { users, totalCount }
}
