import { v4 } from "uuid"
import { Card, Deck } from "../../src/types/states"

export const createRandomCard = (): Card => {
  const effectValue = Math.floor(Math.random() * 1000)
  return { id: v4(), name: `user_${effectValue}`, value: Math.floor(Math.random() * 10), effect: () => effectValue }
}

export const createRandomCards = (number: number): Card[] => Array.from(Array(number)).fill(createRandomCard())

export const createRandomDeck = (): Deck => {
  const numberOfCards = Math.floor(Math.random() * 5 + 2);
  const number = Math.floor(Math.random() * 1000)
  return { name: `deck_${number}`, cards: createRandomCards(numberOfCards) };
}

export const createRandomDecks = (number: number) => Array.from(Array(number)).fill(createRandomDeck())
