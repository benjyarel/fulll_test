import { fizzBuzz } from "./fizzBuzz.ts"
const run = (input: stinrg | undefined) => {
  const userNumber = Number(input)

  if (isNaN(userNumber)) {
    console.log("Please provide a valid number as an argument.")
    process.exit(1)
  }
  fizzBuzz(userNumber)
}

run(process.argv[2])
