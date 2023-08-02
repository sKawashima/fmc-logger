import Scrambo from 'scrambo'
import cubeNotationNormalizer from 'cube-notation-normalizer'

const threeByThree = new Scrambo().type('333')

export const createFmcScrambleToNormalScramble = () => {
  let scramble = threeByThree.get(1)[0]
  while (
    `R' U' F ${scramble} R' U' F`.length !==
    cubeNotationNormalizer(`R' U' F ${scramble} R' U' F`).length
  ) {
    scramble = threeByThree.get(1)[0]
  }
  return `Scramble: ${cubeNotationNormalizer(
    `R' U' F ${scramble} R' U' F`,
  )}\nInverse: ${cubeNotationNormalizer(`R' U' F ${scramble} R' U' F`, {
    invert: true,
  })}`
}
