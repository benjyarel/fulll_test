import { fizzBuzz } from "./fizzBuzz.ts"
const run = (input: any) => {
  if (isNaN(Number(input))) {
    console.log("Please provide a valid number as an argument.")
    process.exit(1)
  }
  fizzBuzz(input)
}

run(process.argv[2])
