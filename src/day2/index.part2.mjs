import { compose, map, split, sum, curry, reduce, max, tap, chain, flip, transduce, append, product } from "ramda"
import { INPUT, INPUT_TEST } from "./input.mjs"

const log            = tap(console.log)
const splitLines     = split("\n")
const match          = curry((regex, str) => str.match(regex))
const findMax        = reduce(max, 0)
const findNumbers    = match(/\d+/g)
const findMostRed   = compose(findMax, map(parseInt), chain(findNumbers), match(/\d+ red/g))
const findMostGreen = compose(findMax, map(parseInt), chain(findNumbers), match(/\d+ green/g))
const findMostBlue  = compose(findMax, map(parseInt), chain(findNumbers), match(/\d+ blue/g))

const findMostCubesAndMultiply = transduce(compose(
    map(game => [findMostRed(game), findMostGreen(game), findMostBlue(game)]),
    map(product)
), flip(append), [])

compose(
    log,
    sum,
    findMostCubesAndMultiply,
    splitLines
)(INPUT)
