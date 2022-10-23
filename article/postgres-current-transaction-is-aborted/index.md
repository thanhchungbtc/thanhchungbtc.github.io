---
title: "[Postgres] current transaction is aborted, commands ignored until end of transaction block"
date: 2018-01-12T07:15:40+09:00
thumbnail: ./thumbnail.png
tags: ["postgres"]
categories: ['programing']

---

postgresのクライアントでSQLを実行した際、突然クエリを正しく入力したにもかかわらず、実行できなくなったことがある。

結構ハマったので、このエラーについてまとめておく。

## 原因

`Postgres`の`Transaction`内に一度エラーが発生すると、明示的にその`Transaction`を`abort`しなければならないのだ。

因みに、`SQL Server`等の他のRDBMSだと、エラーが出てきても、その場でクエリを見直しして、処理を続けるんだね。

[例]

```sql
begin;
selet
* from foo; -- わざとseletにした
```

このクエリを実行すると、`「ERROR: syntax error at or near ‘selet’“」`が出るはず。

これで気づいて`select * from foo;`の正しいクエリに修正して、再度実行すると、冒頭のエラーが出ることがわかる。

## 対策

```sql
rollback;
```

を一度実行してから、最初からトランザクションを実行しなければならない。

## なぜ`Postgres`はそうなったのか？

`Postgres`はユーザで終了した`Transaction`とシステムの都合(例外等）で終了した`Transaction`は区別しているようだ。
[https://github.com/postgres/postgres/blob/master/src/backend/access/transam/README](https://github.com/postgres/postgres/blob/master/src/backend/access/transam/README)
を参照すると、

> -

1. システムの都合で`Transaction`が終了した場合：AbortCurrentTransaction アプリケーション状態はTBLOCK_ABORT

> -

2. ユーザで`Transaction`を終了した場合：UserAbortTransactionBlock アプリケーション状態はTBLOCK_ABORT_END

ケース１でも自動に`Transaction`を終了させれば良いでしょうかって思うよね。

実はそれに応じる`onerrorrollback`オプションがあるが、やっぱり長い`Transaction`内にエラーが発生したら、最初から実施しないといけない点は不便が感じるよね〜

`onerrorrollback`についての詳細説明も是非ご参照ください。
[https://www.endpoint.com/blog/2015/02/24/postgres-onerrorrollback-explained](https://www.endpoint.com/blog/2015/02/24/postgres-onerrorrollback-explained)
