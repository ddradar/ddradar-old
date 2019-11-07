export type Level =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20

export function isLevel(object: {}): object is Level {
  return (
    typeof object === 'number' &&
    (object === 1 ||
      object === 2 ||
      object === 3 ||
      object === 4 ||
      object === 5 ||
      object === 6 ||
      object === 7 ||
      object === 8 ||
      object === 9 ||
      object === 10 ||
      object === 11 ||
      object === 12 ||
      object === 13 ||
      object === 14 ||
      object === 15 ||
      object === 16 ||
      object === 17 ||
      object === 18 ||
      object === 19 ||
      object === 20)
  )
}
