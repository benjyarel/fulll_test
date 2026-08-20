import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import App from "./App"
import { SelectionProvider } from "./contexts/SelectionContext"
import { useGetSearchUsers } from "./hooks/useGetSearchUsers"
import { mockUser } from "./test/mocks"

vi.mock("./hooks/useGetSearchUsers", () => ({
  useGetSearchUsers: vi.fn(),
}))

const renderApp = () => {
  vi.mocked(useGetSearchUsers).mockReturnValue({
    users: [mockUser],
    totalCount: 1,
    isLoading: false,
  })

  render(
    <SelectionProvider>
      <App />
    </SelectionProvider>,
  )
}

describe("App - selection workflow", () => {
  it("duplicates the selected user", async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole("checkbox", { name: `Select ${mockUser.login}` }))
    await user.click(screen.getByRole("button", { name: "Duplicate selection" }))

    expect(screen.getByText(`${mockUser.login}(1)`)).toBeTruthy()
  })

  it("deletes the selected user", async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole("checkbox", { name: `Select ${mockUser.login}` }))
    await user.click(screen.getByRole("button", { name: "Delete selection" }))

    expect(screen.queryByText(mockUser.login)).toBeNull()
  })
})
