import { compose, map, split, sum, curry, lte, reduce, max, tap, head, chain, filter, flip, prop, transduce, append } from "ramda"
import { INPUT, INPUT_TEST } from "./input.mjs"

const log                  = tap(console.log)
const splitLines           = split("\n")
const match                = curry((regex, str) => str.match(regex))
const findMax              = reduce(max, 0)
const findNumbers           = match(/\d+/g)
const findGameId           = compose(head, map(parseInt), chain(findNumbers), match(/Game \d+/g))
const findMostRed          = compose(findMax, map(parseInt), chain(findNumbers), match(/\d+ red/g))
const findMostGreen        = compose(findMax, map(parseInt), chain(findNumbers), match(/\d+ green/g))
const findMostBlue         = compose(findMax, map(parseInt), chain(findNumbers), match(/\d+ blue/g))
const hasLessThanOrEqual12 = flip(lte)(12)
const hasLessThanOrEqual13 = flip(lte)(13)
const hasLessThanOrEqual14 = flip(lte)(14)
const isPossible           = ({red, green, blue}) => hasLessThanOrEqual12(red) && hasLessThanOrEqual13(green) && hasLessThanOrEqual14(blue)

/*
 * Determine which games would have been possible 
 * if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. 
 * What is the sum of the IDs of those games?
*/

const findGameIdsThatArePossible = transduce(compose(
    map(game => ({id: findGameId(game), red: findMostRed(game), green: findMostGreen(game), blue: findMostBlue(game)})),
    filter(isPossible),
    map(prop('id'))
), flip(append), [])

compose(
    log,
    sum,
    findGameIdsThatArePossible,
    splitLines
)(INPUT)
