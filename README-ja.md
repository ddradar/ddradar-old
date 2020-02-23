# DDRadar

[![last commit](https://img.shields.io/github/last-commit/ddradar/ddradar "last commit")](https://staging.ddradar.app/)
[![release version](https://img.shields.io/github/v/release/ddradar/ddradar "release version")](https://ddradar.app/)
[![Node CI Status](https://github.com/ddradar/ddradar/workflows/Node%20CI/badge.svg "Node CI Status")](https://github.com/ddradar/ddradar/actions?query=workflow%3A%22Node+CI%22)
[![codecov](https://codecov.io/gh/ddradar/ddradar/branch/master/graph/badge.svg)](https://codecov.io/gh/ddradar/ddradar)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ddradar/ddradar)](https://dependabot.com)
[![License](https://img.shields.io/github/license/ddradar/ddradar)](LICENSE)

DDR スコア集計ツール

## Build Setup

``` bash
# 依存関係のインストール
npm install

# (任意) Firestore が絡む開発やテストを行う場合は、Firebase CLI をインストールします。
# エミュレータの実行にはJava 8 以上が必要です。
npm install -g firebase-tools
firebase setup:emulators:firestore

# jest による単体テストを実行 ( /__firebase__/ フォルダを除く)
npm test
# firestore emulator を起動し、jest による単体テストを実行
firebase emulators:exec --only firestore "npm run test:all"

# localhost:3000 でホットリロード機能付きの開発用配信を行う
npm run dev
```

フレームワークの詳細については、[Nuxt.js のドキュメント](https://ja.nuxtjs.org)を参照してください。

## Contributing

プロジェクトに貢献される方は、[こちらのガイド](CONTRIBUTING-ja.md)をご覧ください。
