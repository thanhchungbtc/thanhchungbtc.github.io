---
title: "[Shell]Shellでpostgresの複雑なトランザクション制御方法"
description: shで条件付きのSQLを実行する時などに役に立つ
date: 2017-08-03T08:46:25+09:00
thumbnail: ./thumbnail.png
tags: ["shell", "postgres", "coprocess", "linux"]
categories: ['programing']

---

## 問題

`psql`でSQLを指定して実行できるが、例えば複数SQLを同時に実行させ、また前のSQLの結果によって、続行するかしないかという条件付きの複雑SQLを実行することができない。

今回以下のようにShell scriptを作りたい。

```shell script
ConnectDb() {
	 PGPASSWORD=postgres psql -U postgres database -t -A -F , -v ON_ERROR_STOP=1 -v AUTOCOMMIT=0
}

printMsg() {
	echo "$PROGRAM/$SUBMODULE $(date "+ %Y%H%s")" $1 | tee -a ~/Desktop/shell/log/test.log
}

ConnectDb <<EOF
  start transaction;

  select * from ...;
  # other database stubs

  # addtional operations like logging come here
  printMsg "Querying ..."

  # mix of conditional shell and psql command
  if [ some accepted condition ] commit;
  if [ some bad conditions ] rollback;
  if [ should do more database query ] do some CRUD actions
  
  commit;
EOF
```

## 解決方法

`shell`と`SQL`が混在する為、単純の`psql`に制御コマンドを入れることができない。
> ちなみに、`db2`はこのような`shell`scriptを簡単に作れる。

ここで、`coproc`を使えば、実現可能なことがわかった。

`coproc`
の詳細は[stackoverflow](https://unix.stackexchange.com/questions/86270/how-do-you-use-the-command-coproc-in-various-shells)
ですごいわかりやすい回答があるので、ご参考ください。

### `psql`をバックグラウンドで動かせる

### `psql`にSQLを取り入れる

### `SQL`の実行結果を確認する



