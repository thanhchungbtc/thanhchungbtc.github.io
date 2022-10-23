---
title: "LinuxにHTTPsサーバーを構築してみる"
description: LinuxにApache上の自己証明HTTPSサーバー構築したメモです。
thumbnail: ./thumbnail.png
date: 2017-11-02T22:29:47+09:00
tags: ["linux", "apache", "https"]
categories: ['programing']

---

## 流れ

-
    1. CSRを作成する
-
    2. 証明書発行
-
    3. サーバー設定

### 1. CSRを作成する

CSR (Certificate Signing Request)は証明書発行依頼書と呼ばれ、CA(Certificate authority)へ提出するもの。
作成時に以下の情報が重要出そうだ。

- Common Name (eg, your name or your server's hostname)
- Domain name or server's public IP address

#### 1.1. Private Key(機密鍵)発行

```sh
openssl genrsa -out /path/to/.key 2048
```

#### 1.2. CSR発行 (Certificate Signing Request)

```shell script
openssl req -new -key /path/to/.key -out /path/to/.csr
```

#### 1.3. Private Keyからpassphraseを排除（無効）

`Passphrase`を有効にしていると、サーバー再起動した際、`Private Key`を認証する為、`Passphrase`が求められるので、入力完了するまで、`Website`
をアクセスできないことがある。

```sh
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
```

### 2. 証明書取得

実際はCAに発行してもらうが、テスト時は自己署名証明書を使用する。
このテストのようの証明書は`self-signed certificate`と呼ばれる。

```sh
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

**👉`self-signed certificate`を使用する場合、以下のコマンドでCSR発行せずに、直接証明書を生成することができる**

```sh
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt
```

- req: X509によりCSR作成
- x509: `self-signed`認証発行する指示
- nodes: `passphrase`を使用しない
- days 365: 有効期限（１年）
- newkey rsa:2048長ビットのkeyと証明書同時に発行。(rsa key with 2048 bits long)
- keyout: private keyの作成場所
- out: 証明書の置く場所

### 3. サーバー設定

#### 3.1. 設定ファイル修正

**/etc/httpd/conf.d/ssl.conf**

```sh
# プロトコル
SSLProtocol -All +TLSv1 +TLSv1.1 +TLSv1.2

# 証明書指
SSLCertificateFile path/to/.crt

# 鍵ファイル指定
SSLCertificateKeyFile /path/to/.key
```

#### 3.2. firewall 設定

`https`アクセスを許可する

```sh
firewall-cmd --add-service=https --permanent
firewall-cmd --reload
```
























