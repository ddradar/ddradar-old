# CONTRIBUTING

## TOC

- [Pull Request]()
  - [New Song or Charts]()

## Pull Request / プルリクエスト

### New Song or Charts

Sample PR: [#131](https://github.com/ddradar/ddradar/pull/131)

1. Edit `song-info/data/songs/chart-[series].json` & `song-info/data/charts/chart-[series].json`.
    - :warning:**DO NOT** push [static/song.json](static/song.json) and [static/chart.json](static/chart.json) directly.
      They are created automatically by [GitHub Actions](https://github.com/ddradar/ddradar/actions?query=workflow%3A%22Import+Song%22).
    - :bulb: JSON schema is defined to [static/song-schema.json](static/song-schema.json) and [static/chart-schema.json](static/chart-schema.json).
1. Test your JSON with `npm test` command
    - [charts.json.spec.ts](test/song-info/data/charts.json.spec.ts) and [songs.json.spec.ts](test/song-info/data/songs.json.spec.ts)
`?template=new_song_info.md`
