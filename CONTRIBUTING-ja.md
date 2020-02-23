# HOW TO CONTRIBUTE

[English guideline is here.](CONTRIBUTING.md)

当プロジェクトに関心を寄せていただき、ありがとうございます。このプロジェクトはオープン ソースであるため、誰でもプロジェクトに貢献することができます。皆様がプロジェクトへの貢献を円滑に行えるよう、以下の事項を守っていただけますようお願いします。

## TOC

- [始め方](#getting-started)
- [Issue (課題)](#send-issue)
- [変更内容の作成](#making-changes)
  - [コードスタイル](#coding-style)
  - [ドキュメント・翻訳](#documentation-or-translation)
- [Pull Request (変更リクエスト)](#pull-request)
  - [新曲・新譜面](#new-song-or-charts)
    - [ヒント](#bulb-hint)
- [謝辞](#thanks)

## Getting Started

- DDRadar に貢献する為には [GitHub アカウント](https://github.com/signup/free) が必要です。
- 問題点の報告や機能要望は[オーナーのTwitter アカウント](https://twitter.com/nogic1008)に@リプライを送ることでも可能ですが、オーナーが代理で Issue を立てることになるため、極力避けてください。

## Send issue

- 重複する Issue がないかどうか、はじめに検索してください。
- 機能要望(新機能の追加、既存機能の変更など)には、**必ず** Issue を作成してください。
  - 小さなバグ修正やリファクタリングなどは、Issue を作成せずに直接 Pull Request を送っても構いません。ただし、規模が大きい場合は、事前に Issue を作成し、了解を取ってから作業を始めてください。
- Issue を送るのに、事前の連絡は必要ありません。
- Issue のタイトルと本文はできるだけ英語で書いてください。
  - 英語に慣れていない場合は日本語を使ってください。不正確な英語では、英語話者・日本語話者のどちらにも伝わりません。
- バグを Issue で報告する場合、バグを再現する為の説明、エラーの情報、環境を書いてください。
- 本文は明確に記述し、1 行のみの Issue を送ることは避けてください。
- Issue テンプレートが用意されているので、必要な箇所を切り取って使用してください。
  - [バグ報告](https://github.com/ddradar/ddradar/issues/new?assignees=&labels=bug%3Abug%3A&template=bug-report-------.md&title=%5BBUG%5D)
  - [機能要望](https://github.com/ddradar/ddradar/issues/new?assignees=&labels=enhancement%3Aspeech_balloon%3A&template=feature-request.md&title=)
  - [新曲・新譜面の追加要望](https://github.com/ddradar/ddradar/issues/new?assignees=&labels=&template=new-song-info.md&title=Add%3A+%5BSONG+NAME+OR+EVENT+%2F+%E6%9B%B2%E5%90%8D%E3%81%BE%E3%81%9F%E3%81%AF%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%82%92%E5%85%A5%E5%8A%9B%5D)

## Making Changes

- コードやドキュメントを DDRadar に貢献するには、ベースとなるブランチ(多くの場合 `master` です)から、トピック・ブランチを作ってください。(`issue_999`, `hotfix/song-page`など)
- 変更の為にテストが必要ならば、そのテストも追加または変更してください。
- commit は合理的(ロジック単位)に分けてください。また目的と関係のないコードの変更は含めないでください(コードフォーマットの変更、不要コードの削除など)。
- commit メッセージが正しいフォーマットであることを確認してください。commit メッセージはできるだけ英語でお願いします。
- commit メッセージには、下記の修飾子を先頭につけてください。([angular.js/DEVELOPERS.md](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type)に準じます)
  - **feat**: 新機能
  - **fix**: バグ修正
  - **docs**: ドキュメントの修正のみ
  - **style**: コードの意味を変更しない修正 (スペース・フォーマット・セミコロンなど)
  - **refactor**: バグや機能追加ではないコード修正
  - **perf**: コードの高速化に寄与する修正
  - **test**: テストの追加、または修正
  - **chore**: ビルド構成の変更やライブラリの更新など

```text
修飾子(サブカテゴリ): コミットの概要
<ここは空行>
3行目以降に、このコミットの詳細を記述します。
```

### Coding Style

- Lint ルールか、すでにあるコードのスタイルに準じます。
- 非 ASCII 文字(日本語など)を変数名に使用しないでください。
- コードのコメント部分に非 ASCII 文字を使うのは構いませんが、今後のリリースで英語に変更される可能性があることに留意してください。

### Documentation or Translation

- **大歓迎です！！**
- このドキュメントを含め(注: [英語版](CONTRIBUTING.md)のことです)、不完全な英語を使っている箇所があります。
  オーナーは英語話者ではないため、そういった部分の修正を大いに歓迎します。

## Pull Request

- タイトルは変更の要約を分かりやすく書いてください。
- 本文には、関連する issue の番号を本文に含めてください。( ref #199 など)
- まだ作業中である場合、タイトルの先頭に `[WIP]` を付け、Draft Pull Request で送信してください。マージ可能になったら、`[WIP]` を除去し、Draft を外してください。
  - 作業中に master ブランチが変更された場合は、競合を解消してから `[WIP]` を除去してください。
  - その作業を予約する意味で、まず `[WIP]` の付いた Pull Request を投稿しても構いません。ただし、長い間活動が見られない場合は、クローズされる場合があります。

### New Song or Charts

参考: [#131](https://github.com/ddradar/ddradar/pull/131)

新曲・新譜面を追加する場合は、*事前に Issue を立てる必要はありません。*

1. `song-info/data/songs/chart-[シリーズ名].json` と `song-info/data/charts/chart-[シリーズ名].json` を編集してください。
    - :warning:[static/song.json](static/song.json) と [static/chart.json](static/chart.json) に直接 push **しないで**ください。
      [GitHub Actions](https://github.com/ddradar/ddradar/actions?query=workflow%3A%22Import+Song%22)で自動生成されます。
1. `npm test` コマンドで、JSONファイルをテストしてください。
    - 少なくとも、[charts.json.spec.ts](test/song-info/data/charts.json.spec.ts) と [songs.json.spec.ts](test/song-info/data/songs.json.spec.ts)の2つが合格している必要があります。
1. [テンプレート](.github/PULL_REQUEST_TEMPLATE/new_song_info.md)を利用して、Pull Request を送ってください。
    - `?template=new_song_info.md` を Pull Request の URL に加えることで、テンプレートを使用できます。
    - データが揃っていない場合は、代わりに Draft Pull Request を送ってください。

#### :bulb: Hint

- JSON schema が [static/song-schema.json](static/song-schema.json) and [static/chart-schema.json](static/chart-schema.json)に定義されています。
  対応するエディタの場合、これらを参照することで、入力支援や文法チェックなどの機能が利用できます。

## Thanks

このガイドは、[MMP/CONTRIBUTING.md · sn0w75/MMP](https://github.com/sn0w75/MMP/blob/master/CONTRIBUTING.md)を参考にして作成しました。
