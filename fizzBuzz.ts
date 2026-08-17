const DEFAULT_RULES = [
  { divisor: 3, output: "Fizz" },
  { divisor: 5, output: "Buzz" },
]
type Rule = { divisor: number; output: string }

export const fizzBuzz = (number: number, rules: Rule[] = DEFAULT_RULES) => {
  if (!number || !Number.isInteger(number)) {
    return
  }
  for (let i = 1; i <= number; i++) {
    const result = rules.reduce((acc, rule) => {
      if (i % rule.divisor === 0) {
        acc += rule.output
      }
      return acc
    }, "")

    console.log(result || i)
  }
}
