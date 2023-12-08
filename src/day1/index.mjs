import { compose, flatten, head, isNil, map, split, sum, last, join, test, unless, curry } from "ramda"
import { INPUT } from "./input.mjs"

const log = arg => {
    console.log(arg)
    return arg
}

const matchAll                         = curry((regex, str) => [...str.matchAll(regex)])
const splitLines                       = split("\n")
const hasDigitCharacter                = test(/\d/)
const matchAllDigitOrDigitWord         = matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
const findFirstDigit                   = compose(unless(isNil, last), head, matchAllDigitOrDigitWord)
const findLastDigit                    = compose(unless(isNil, last), last, matchAllDigitOrDigitWord)
const findFirstAndLastDigit            = str => [findFirstDigit(str), findLastDigit(str)]
const convertDigitWordToDigitCharacter = digitWord => ({
    one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9'
}[digitWord] ?? '0')

const result = compose(
    sum,
    flatten,
    map(compose(
        parseInt,
        join(''),
        map(unless(hasDigitCharacter, convertDigitWordToDigitCharacter)),
        findFirstAndLastDigit
    )),
    splitLines
)(INPUT)

log(result)
