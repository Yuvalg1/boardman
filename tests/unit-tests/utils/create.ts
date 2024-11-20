import { v4 } from "uuid"
import { Card } from "../../../src/types/states"

export const createRandomCard = (): Card => {
  const effectValue = Math.floor(Math.random() * 1000)
  return { id: v4(), value: Math.floor(Math.random() * 10), effect: () => effectValue }
}

export const createRandomCards = (number: number): Card[] => Array.from(Array(number)).fill(createRandomCard())

