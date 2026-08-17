import { describe, it, expect, vi } from "vitest"
import { fizzBuzz } from "./fizzBuzz.js"
describe("fizzBuzz", () => {
  it(" applies the convention of the FizzBuzz game", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

    fizzBuzz(15)

    expect(consoleSpy.mock.calls.map(([value]) => value)).toEqual([
      1,
      2,
      "Fizz",
      4,
      "Buzz",
      "Fizz",
      7,
      8,
      "Fizz",
      "Buzz",
      11,
      "Fizz",
      13,
      14,
      "FizzBuzz",
    ])

    consoleSpy.mockRestore()
  })
})
