type Rule = { divisor: number; output: string }

const DEFAULT_RULES = [
  { divisor: 3, output: "Fizz" },
  { divisor: 5, output: "Buzz" },
]

export const fizzBuzz = (number: number, rules: Rule[] = DEFAULT_RULES) => {
  if (!number || number < 1 || !Number.isInteger(number)) {
    return
  }

  for (let i = 1; i <= number; i++) {
    console.log(numberToFizzBuzz(i, rules) || i)
  }
}

const numberToFizzBuzz = (number: number, rules: Rule[]) => {
  return rules.reduce((acc, rule) => {
    if (number % rule.divisor === 0) {
      acc += rule.output
    }
    return acc
  }, "")
}
