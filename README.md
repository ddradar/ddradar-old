# DDRadar

[![release version](https://img.shields.io/github/v/release/ddradar/ddradar "release version")](https://ddradar.app/)
[![Node CI Status](https://github.com/ddradar/ddradar/workflows/Node%20CI/badge.svg "Node CI Status")](https://github.com/ddradar/ddradar/actions?query=workflow%3A%22Node+CI%22)
[![codecov](https://codecov.io/gh/ddradar/ddradar/branch/master/graph/badge.svg)](https://codecov.io/gh/ddradar/ddradar)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ddradar/ddradar)](https://dependabot.com)
[![License](https://img.shields.io/github/license/ddradar/ddradar)](LICENSE)

DDR Score Tracker

## Build Setup

``` bash
# install dependencies
npm run install
# (optional) if you develop and test with firestore, install firebase tool.
# firestore emulator needs Java.
npm install -g firebase-tools
firebase setup:emulators:firestore

# unit test with jest (exclude /__firebase__/ folder)
npm test
# run firestore emulator and unit test with jest
firebase emulators:exec --only firestore "npm run test:all"

# serve with hot reload at localhost:3000
npm run dev
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
