---
layout: ../../layouts/BlogPostLayout.astro
title: 'ブログ盆栽Part.1'
pubDate: 2025-1-22
description: 'ブログの技術的なメモ'
tags: ["技術", "メモ"]
thumbnail: "bonsai.png"
---

ブログが順調に育ってきたので、そろそろ技術周りのメモを残しておく。

余談だがブログ盆栽ということで、ペイントを使って15分ぐらいで書いた盆栽をサムネイルにした。
最近のペイントはレイヤー分けもできてえらいねぇ・・・

## リポジトリ

::linkcard{urls="https://github.com/wgdp/blog"}

## 技術スタック

ブログに使用した技術スタックを列挙していく。

### SSGフレームワーク

ブログはSSGフレームワークのAstroで作成した。

::linkcard{urls="https://astro.build/"}

Astroを選んだ特段の理由はない。
Cloudflare Pagesに楽にデプロイできるものであれば何でも良かった。

今のところAstroで困っていることはない。（というか機能追加がかなり楽で驚いている）

既存のテーマを使う場合は、Hugoとかのほうがいいのかもしれないが、今回UI周りは全部自作したのでAstroでちょうど良かったかもしれない。

### CSSフレームワーク

コンポーネントとの相性が良いのでTailwindを採用している。もうちょっとでv4が出るらしい。

::linkcard{urls="https://tailwindcss.com/"}

Bootstrapは仕事で使ったことがあったのだが、Tailwindは使ったことがなかったため今回使ってみることに。

実際使ってみて、ブログ程度の規模で一からUIを作るなら全部Tailwindでいいのではという感想になった。
（とりあえず早く動くものを作りたいのであればBootstrapのほうがいいと思った、Tailwindに慣れてる人からしたらそんなに変わらないかもだが）

### ホスティング

Cloudflare Pagesを使っている。現状の利用量であれば無料。

::linkcard{urls="https://www.cloudflare.com/ja-jp/developer-platform/products/pages/"}

採用した理由はドメインをCloudflareで管理しているので楽だから。

今のところ不便に感じている点はないし、Cloudflare側で設定するだけで自動ビルドが走って勝手にサイトが公開されるのがいい。
（ブランチを分けて設定してやればプロダクション環境とは別にプレビュー環境も勝手に作ってくれる）

### 画像保存、リサイズ

保存先はCloudflare R2にしてリサイズはCloudflare ImagesのTransformationsを使っている。
現状の利用量であれば無料。

::linkcard{urls="https://www.cloudflare.com/ja-jp/developer-platform/products/cloudflare-images/,https://www.cloudflare.com/ja-jp/developer-platform/products/r2/"}

無料枠を使い切ったらリサイズは止まってしまうが、あんまり誰も見てないブログなら問題ない。
仮に止まっても画像はそのまま配信されるようだし。

リサイズは物によるが10分の1ぐらいまで帯域幅を節約できているように見えるので、元の画像を使うよりは画像の表示が早くなっているはず。

::captionImage{src="transformations-sample.png" alt="かなり帯域を節約できていることが確認できる"}

## 実装した要素

### UI

UIは全部自作した。
こういったUIのカスタマイズは大好きなので、それほど苦労はしなかった。

ベースの色に関しては、Nordを採用している。
Nordに関しては以下の記事に書いている。

::linkcard{urls="https://wgdp.dev/posts/blog-color"}

#### コンポーネント

コンポーネントもリンクカードやキャプション付きの画像など、いくつか必要なものがあったので、自作した。

::linkcard{urls="https://github.com/wgdp/blog/tree/main/src/components"}

また、Markdown内でも利用したかったので、remarkのプラグインとして実装した。

::linkcard{urls="https://github.com/wgdp/blog/tree/main/src/plugins"}

以下の例のように記述すると、ビルド時に変換されるようになった。

```markdown
// リンクカード
::linkcard{urls="https//wgdp.dev"}

// キャプション付きの画像
::captionImage{src="bonsai.png" alt="盆栽"}
```

#### Favicon

Faviconの画像も自作した。はじめはClaudeに作らせたドット絵を使っていたが、
自分で書いた盆栽の絵に変えてみた。（この記事のサムネイルのやつ）

#### その多

その他以下の機能を自作した。

- タグ機能
- ToC

## 今後

引き続きブログを育てていく。

この記事ではざっくりまとめたが、細かい部分に関する記事を別で書くかも。

あと今後の機能実装について。

あまりjsを含ませないように作ってきたが、いいね機能とかが欲しくなってきたので、
Cloudflare D1とかWorkersとかを使って作るかもしれない。

やる気があればブログ盆栽Part.2が作られるかも。
