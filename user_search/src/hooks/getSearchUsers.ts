import { useState, useEffect } from "react"

import type { GithubUser, GithubUserSearchResponseData } from "../types"

interface GetSearchUsersParams {
  query: string
}
const BASE_URL = "https://api.github.com/search/users"

export const getSearchUsers = ({ query }: GetSearchUsersParams) => {
  const [users, setUsers] = useState<GithubUser[]>()
  const [totalCount, setTotalCount] = useState(0)

  const searchUrl = `${BASE_URL}?qkjhkh=${query}`

  // Github search API doesn't provide data without query paramas
  if (!query) {
    return null
  }

  // TODO : add aborting controller for user's typing and back&forth
  useEffect(() => {
    const search = async () => {
      const response = await fetch(searchUrl)

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const { total_count, items }: GithubUserSearchResponseData =
        await response.json()

      setUsers(items)
      setTotalCount(total_count)
    }

    search()

    // TODO: aborting here
    return () => {}
  }, [query])

  return { users, totalCount }
}
