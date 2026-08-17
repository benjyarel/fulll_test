import { describe, it, expect, vi, afterEach } from "vitest"
import { fizzBuzz } from "./fizzBuzz.js"
describe("fizzBuzz", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("prints nothing when the input is negative", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

    fizzBuzz(-5)

    expect(consoleSpy).not.toHaveBeenCalled()
  })

  it("prints nothing when the input is zero", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

    fizzBuzz(0)

    expect(consoleSpy).not.toHaveBeenCalled()
  })

  it("prints nothing when the number is a float", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

    fizzBuzz(3.5)

    expect(consoleSpy).not.toHaveBeenCalled()
  })

  it("applies the convention of the FizzBuzz game", () => {
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
  })

  it("can inject new rules", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

    const newRule = [{ divisor: 5, output: "Hello World" }]

    fizzBuzz(10, newRule)

    expect(consoleSpy.mock.calls.map(([value]) => value)).toEqual([
      1,
      2,
      3,
      4,
      "Hello World",
      6,
      7,
      8,
      9,
      "Hello World",
    ])
  })
})
