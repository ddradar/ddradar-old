export const hasProperty = <K extends string>(
  x: unknown,
  name: K
): x is { [M in K]: unknown } => x instanceof Object && name in x

export const hasStringProperty = <K extends string>(
  x: unknown,
  name: K
): x is { [M in K]: string } =>
  hasProperty(x, name) && typeof x[name] === 'string'

export const hasNumberProperty = <K extends string>(
  x: unknown,
  name: K
): x is { [M in K]: number } =>
  hasProperty(x, name) && typeof x[name] === 'number'
