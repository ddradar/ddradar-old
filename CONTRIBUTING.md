# CONTRIBUTING

## TOC

- [Send issue]()
- [Coding]()
- [Documentation or Translation]()
- [Pull Request]()
  - [New Feature]()
  - [New Song or Charts]()
  - [Refactor, Bug Fix, Testing etc...]()
  - [Resolve issue]()

## Send issue

- Search for the same issue before submitting it.
- You may use English, or Japanese.
- Write things exactly, and Don't send issues with only one sentence.

## Coding

- Follow Lint rules or existing code style.
- Do not use non-ASCII characters for variable names.
- You can use non-ASCII characters in comment block, but it might be deleted future release.

## Documentation or Translation

- *Welcome!!*

## Pull Request

Add prefix like below. (inherits [angular.js/DEVELOPERS.md](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type))
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### New Feature

You need to open issue before.

### New Song or Charts

Sample PR: [#131](https://github.com/ddradar/ddradar/pull/131)

1. Edit `song-info/data/songs/chart-[series].json` & `song-info/data/charts/chart-[series].json`.
    - :warning:**DO NOT** push [static/song.json](static/song.json) and [static/chart.json](static/chart.json) directly.
      They are created automatically by [GitHub Actions](https://github.com/ddradar/ddradar/actions?query=workflow%3A%22Import+Song%22).
1. Test your JSON with `npm test` command
    - Pass at least two tests: [charts.json.spec.ts](test/song-info/data/charts.json.spec.ts) and [songs.json.spec.ts](test/song-info/data/songs.json.spec.ts).
1. Create Pull Request with template.
    - Add `?template=new_song_info.md` query to your PR URL to use template.
    - If data is not completely, Create draft PR instead.

#### :bulb: Hint
- JSON schema is defined to [static/song-schema.json](static/song-schema.json) and [static/chart-schema.json](static/chart-schema.json).

### Refactor, Bug Fix, Testing etc...

You don't need to open issue, but state your changes clearly.

### Resolve issue

Similar as refactor.
