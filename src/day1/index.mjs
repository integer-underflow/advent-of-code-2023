import { compose, flatten, head, isNil, map, split, sum, last, join, when, test, unless, curry } from "ramda"
import { INPUT } from "./input.mjs"

const log = x => {
    console.log(x)
    return x
}

const matchAll            = curry((regex, str) => [...str.matchAll(regex)])
const splitLines          = split("\n")
const isDigit             = test(/\d/)
const matchOneDigitOrWord = matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
const firstDigit          = compose(unless(isNil, last), head, matchOneDigitOrWord)
const lastDigit           = compose(unless(isNil, last), last, matchOneDigitOrWord)
const firstAndLastDigit   = str => [firstDigit(str), lastDigit(str)]
const wordToDigit         = word => ({
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}[word] ?? '0')

const result = compose(
    sum,
    flatten,
    map(compose(parseInt, join(''), map(unless(isDigit, wordToDigit)), firstAndLastDigit)), 
    splitLines
)(INPUT)

console.log(result)
