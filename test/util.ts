export function hasProperty<K extends string>(
  x: unknown,
  name: K
): x is { [M in K]: unknown } {
  return x instanceof Object && name in x
}

export function hasStringProperty<K extends string>(
  x: unknown,
  name: K
): x is { [M in K]: string } {
  return hasProperty(x, name) && typeof x[name] === 'string'
}

export function hasNumberProperty<K extends string>(
  x: unknown,
  name: K
): x is { [M in K]: number } {
  return hasProperty(x, name) && typeof x[name] === 'number'
}

/** Generate [0-9a-z]{length} string. */
export const generateRandomString = (length: number) =>
  [...Array(Number.isInteger(length) ? length : 12)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('')
