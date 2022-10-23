---
title: "[PHP]UTF-8 BOMに気を付けよう"
date: 2018-02-13T19:16:40+09:00
description: ""
thumbnail: ./thumbnail.jpeg
tags: ["php", "bom"]
categories: ['programing']

---
特に大した改修をしていないのに、システムをstagingに反映したら、いきなり動作しなくなり、結構ハマった経験があったのでメモする。

## 問題

Webページアクセスして、何も表示されない。
Responseコードを確認すると200だったが、「**Gzipが不正よ**」のようなメッセージが出た。

## 原因

このレガシシステムはレスポンスをGzipする為、`ob_start("ob_gzhandler");`を使っっている。

このGzip化したレスポンスの先頭数バイトを確認すると、**EF BB BF**というGzipではないフォーマットが入ったことがわかった。

この数バイトが吐き出されたのは、ソースコードファイルが`UTF-8 with BOM`のエンコーディングで保存された原因がわかった。

使っていたEditorがSakuraという馴染みのないEditorのようで、**UTF-8 BOM付で保存**を設定したのだ。

## 対策

全て**UTF-8 BOM付**のソースファイルを抽出し、BOMを消せば、正常に動いた。

### BOM付きファイル抽出

```sh
grep -rl $'\xEF\xBB\xBF' .
```

### BOMを排除する

```sh
sed -i '1 s/^\xef\xbb\xbf//' *.php
```
