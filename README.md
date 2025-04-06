# Blog

[ブログ](https://blog.wgdp.dev)

## 運用方法

Cloudflare Pages上で動かしているので、PushされたらCloudflare側で用意されたCIが走り、自動でデプロイされる。

本番環境であればmainブランチを、検証環境であればdevelopブランチを利用する。

### 月の振り返り

毎月developブランチにGitHub Actionsで自動的に振り返り用のページを`templates/monthly-template.md`から生成する。
