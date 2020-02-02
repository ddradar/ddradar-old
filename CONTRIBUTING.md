# HOW TO CONTRIBUTE

[日本語版のガイドはこちらです。](CONTRIBUTING-ja.md)

Thank you for your interest in this project. This project is open source, and anyone can contribute to the project. Please follow the instructions below to ensure that you can contribute smoothly.

## TOC

- [Getting Started](#getting-started)
- [Send issue](#send-issue)
- [Making Changes](#making-changes)
  - [Coding Style](#coding-style)
  - [Documentation or Translation](#documentation-or-translation)
- [Pull Request](#pull-request)
  - [New Song or Charts](#new-song-or-charts)
    - [Hint](#bulb-hint)
- [Thanks](#thanks)

- [Send issue](#send-issue)
- [Coding](#coding)
- [Documentation or Translation](#documentation-or-translation)
- [Pull Request](#pull-request)
  - [New Feature](#new-feature)
  - [New Song or Charts](#new-song-or-charts)
  - [Refactor, Bug Fix, Testing etc...](#refactor-bug-fix-testing-etc)
  - [Resolve issue](#resolve-issue)

## Getting Started

- You need your [GitHub account](https://github.com/signup/free) to contribute this project.

## Send issue

- Search for the same issue before submitting it.
- Be sure to create an issue to have a feature request.
  - For small bug fixes or refactorings, you can send PR directly, but if they are a big change, create an issue in advance and get approval.
- You have not to contact us before you send issue.
- You may use English, or Japanese.
- Write things exactly, and Don't send issues with only one sentence.
- Use issue template to report them.
  - [Bug report](https://github.com/ddradar/ddradar/issues/new?assignees=&labels=bug%3Abug%3A&template=bug-report-------.md&title=%5BBUG%5D)
  - [Feature Request](https://github.com/ddradar/ddradar/issues/new?assignees=&labels=enhancement%3Aspeech_balloon%3A&template=feature-request.md&title=)
  - [New Song or Charts](https://github.com/ddradar/ddradar/issues/new?assignees=&labels=&template=new-song-info.md&title=Add%3A+%5BSONG+NAME+OR+EVENT+%2F+%E6%9B%B2%E5%90%8D%E3%81%BE%E3%81%9F%E3%81%AF%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%82%92%E5%85%A5%E5%8A%9B%5D)

## Making Changes

- Checkout your topic branch from base branch(often `master`) to create code or documents. (ex. `issue_99`, `hotfix/song-page`)
- Add or Change test if you need.
- Commit should be logical units. Do not include extra code changes.
- Add prefix to commit message (inherits [angular.js/DEVELOPERS.md](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type))
  - **feat**: A new feature
  - **fix**: A bug fix
  - **docs**: Documentation only changes
  - **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **perf**: A code change that improves performance
  - **test**: Adding missing or correcting existing tests
  - **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

```text
prefix(category): summery
<blank line>
detail
```

### Coding Style

- Follow Lint rules or existing code style.
- Do not use non-ASCII characters for variable names.
- You can use non-ASCII characters in comment block, but it might be deleted future release.

## Documentation or Translation

- *Welcome!!*
- Some document, including this one, use [AYBABTU](https://en.wikipedia.org/wiki/All_your_base_are_belong_to_us) English.
  Repo owner is not an English speaker, so we welcome any modifications to those.

## Pull Request

- Title should include a clear summary of the changes.
- Add related issue number to your description.(ex. ref #199)
- If PR is in progress, add `[WIP]` prefix and send as Draft Pull Request. And remove `[WIP]` and Draft when we can review.
  - Resolve conflict to `master` before you remove `[WIP]` prefix.
  - To reserve the work, You may submit a Pull Request with `[WIP]` first. However, if there is no activity for a long time, it may be closed.

### New Song or Charts

Sample PR: [#131](https://github.com/ddradar/ddradar/pull/131)

You *do not need* to create issue before if you want to add new song or charts.

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

## Thanks

ref. [MMP/CONTRIBUTING.md · sn0w75/MMP](https://github.com/sn0w75/MMP/blob/master/CONTRIBUTING.md)
