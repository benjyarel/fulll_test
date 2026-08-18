import { describe, expect, it, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"

import { useGetSearchUsers } from "./useGetSearchUsers"
import { mockUsers, mockSearchResponse } from "../test/mocks"

describe("useGetSearchUsers", () => {
  it("does not call the GitHub API when the query is empty", () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)

    const { result } = renderHook(() => useGetSearchUsers({ query: "" }))

    expect(fetchMock).not.toHaveBeenCalled()
    expect(result.current).toEqual({ users: [], totalCount: 0 })
  })

  it("fetches users from the GitHub search API and exposes them", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSearchResponse),
    } as Response)
    vi.stubGlobal("fetch", fetchMock)

    const { result } = renderHook(() => useGetSearchUsers({ query: "A" }))

    expect(result.current).toEqual({ users: [], totalCount: 0 })

    await waitFor(() => {
      expect(result.current.totalCount).toBe(mockSearchResponse.total_count)
    })

    expect(result.current.users).toEqual(mockUsers)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/search/users?q=A",
      expect.objectContaining({ signal: expect.anything() }),
    )
  })
})
