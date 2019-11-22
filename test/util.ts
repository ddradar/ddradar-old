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
