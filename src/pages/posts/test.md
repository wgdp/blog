---
layout: ../../layouts/BlogPostLayout.astro
title: 'テスト投稿 - 表示確認用'
pubDate: 2024-11-04
description: '表示確認用'
tags: ["メモ"]
thumbnail: 'ogp-test.jpg'
---

## はじめに

とりあえず記事を見せるページとしての体裁が整ってきたので、一旦見栄えのチェックがてらテスト記事を書いてみました。
（今後表示確認用にも使えるし。。。）

まず、見出しのチェックから

---
h1はタイトルが使っているので基本使わない。

## h2
### h3
#### h4
##### h5
###### h6

行間チェックも

## h2

テストです

### h3

テストです

#### h4

テストです
##### h5

テストです

###### h6

テストです

---

リスト

- テスト
  - テスト
    - てすと
  - テスト

1. テスト
2. テスト
3. テスト

---

引用

> テストで引用

---

インライン表示

これは`テスト`です

---

コード


```go
import os
```

```go
func main() {
    return hoge()
}
```

---

リンク

これは[Google](https://google.com)のりんく

---

テーブル

| テスト | です | よ |
| :-- | :-: | --: |
| テスト | です | よ |
| テスト | です | よ |
| テスト | です | よ |
| ちょっと長いテキストを入れてみました | ちょっと長いテキストを入れてみました | ちょっと長いテキストを入れてみました |

---

文字効果

**太字**

*斜体*

~~打消~~

ディレクティブ

以下のように書く。

- リンクカード
- youtube埋め込み
- キャプション付き画像

```markdown
## コンマで複数URLを区切る
::linkcard{urls="https://zenn.dev/,https://zenn.dev/"}
::youtube{url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
::captionImage{src="default-thumbnail.jpg" alt="ここがキャプションになる"}
```

::linkcard{urls="https://zenn.dev/,https://qiita.com/" alt="キャプション"}
::youtube{url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
::captionImage{src="default-thumbnail.jpg" alt="ここがキャプションになる"}

注釈

注釈はFootnotes以下に書かれるらしい[^1]
[^1]: これが注釈内容だ！
