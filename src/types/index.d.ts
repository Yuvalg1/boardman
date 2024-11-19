export type SetActions<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false | undefined) => void

