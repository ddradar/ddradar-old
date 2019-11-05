export enum PlayStyle {
  /** SINGLE PLAY. */
  Single = 1,
  /** DOUBLE PLAY. */
  Double = 2
}

/** PlayStyle Enum - String Mappings. */
export const PlayStyleList = [
  { id: PlayStyle.Single, name: PlayStyle[PlayStyle.Single].toUpperCase() },
  { id: PlayStyle.Double, name: PlayStyle[PlayStyle.Double].toUpperCase() }
]