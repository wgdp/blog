---
layout: ../../layouts/BlogPostLayout.astro
title: 'ブログの色について'
pubDate: 2024-11-09
description: 'ブロクの色について'
tags: ["技術"]
thumbnail: "nord.png"
imageLicense:
    author: 2016-present Sven Greb
    license: Attribution-NonCommercial-ShareAlike 4.0 International
    link: https://github.com/nordtheme/assets/blob/main/license
---

ブログに使っている色へのこだわりをちょっとだけ紹介したいです。

## Nord

本ブログではNordというカラーパレットを利用しています。

::linkcard{url="https://www.nordtheme.com/"}

Nordはドイツのソフトウェア開発者であるSven Greb 氏が作成したカラーパレットであり、エディタやターミナルのテーマとして有名です。

私は、特にシンプルで落ち着いた色が多く採用されているところが好きで、普段利用しているエディタはだいたいNordのテーマを利用しています。

また、公式サイトがあるのも気に入っている点で、サイトには、カラーパレットに関するドキュメントや、各種テーマへのリンクが集約されていたりします。

## 実際の使用例

もちろんブログにもこのカラーパレットを利用したかったので、本ブログは、基本的にNordで定義されているNord0からNord15の色を利用しています。

例えば今書いているこの文章は、[nord1(#3b4252)](https://www.nordtheme.com/docs/colors-and-palettes#nord1)を使っています。
また、リンクには[nord10(#5e81ac)](https://www.nordtheme.com/docs/colors-and-palettes#nord10)（ホバー時[nord8(#88c0d0)](https://www.nordtheme.com/docs/colors-and-palettes#nord8)）を使っています。

## Astroで利用する

Nordを何も入ってないAstroで利用する場合は、npmからnordのパッケージをインストールしてくればいいですが、本ブログはTailwindを利用しているため、Tailwind用のプラグインを利用しています。

::linkcard{url="https://github.com/crumb1e/tailwind-nord"}

ただnord0からnord15までを定義しているだけのプラグインですが、それ故にシンプルに手間が削減されて非常に助かりました。（手動でやろうとすると結構めんどくさそうだった）

## まとめ

私はデザイナーではないので、一からブログに使うすべての色を選定して組み合わせるなどの作業が難しかったのもあり、Nordを採用して、
決まったカラーパレットから色を選ぶだけの状態にできたのは良いことだと感じています。

なので、デザインが本業ではない方は普段使っているエディタ等のテーマに採用されているカラーパレットを参考にしてみてはいかがでしょうか？
