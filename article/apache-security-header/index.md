---
title: "[Security]HTTP Security Headers"
date: 2017-10-13T20:02:05+09:00
thumbnail: ./thumbnail.png
draft: false
tags: ["security", "apache"]
categories: ['programing']

---

# All about Apache HTTP Security Header

## X-XSS-Protection

### 概要

```sh
X-XSS-Protection: 0; 
X-XSS-Protection: 1; 
X-XSS-Protection: 1; mode=block
```

### 設定方法

```sh
X-XSS-Protection: 1; mode=block
```

- 理由は[こちら](https://blog.innerht.ml/the-misunderstood-x-xss-protection/)ご覧ください

|platform|どう設定するの|
|:-------|:-------|
|Rails4,5|設定不要。(デフォルト有効）|
|Django|SECURE_BROWSER_XSS_FILTER = True|
|Express.js|Helmet|
|Go|unrolled/secure|
|Nginx|add_header: X-XSS-Protection “1; mode=block”;|
|Apache|Header always set X-XSS-Protection “1; mode=block”|

## Content Security Policy (CSP)

### 概要

```sh
Content-Security-Policy: <policy>
```

### 設定方法

|platform|どう設定するの|
|:-------|:-------|
|Rails4,5|secureheaders|
|Django|django-csp|
|Express.js|helmet/csp|
|Go|unrolled/secure|
|Nginx|add_header Content-Security-Policy “<policy>”;|
|Apache|Header always set Content-Security-Policy “<policy>”|

参照：

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
- https://csp.withgoogle.com/docs/adopting-csp.html

## HTTP Strict Transport Security (HSTS)

### 概要

```sh
Strict-Transport-Security: max-age=<expire-time>
Strict-Transport-Security: max-age=<expire-time>; includeSubDomains
Strict-Transport-Security: max-age=<expire-time>; preload
```

### 設定方法

|platform|どう設定するの|
|:-------|:-------|
|Rails 4|config.force_ssl = true; config.ssl_options = { hsts: { subdomains: true } }|
|Rails 5|config.force_ssl = true|
|Django|SECURE_HSTS_SECONDS = 31536000; SECURE_HSTS_INCLUDE_SUBDOMAINS = True|
|Express.js|helmet|
|Go|unrolled/secure|
|Nginx|add_header Strict-Transport-Security “max-age=31536000; includeSubdomains; “;|
|Apache|Header always set Strict-Transport-Security “max-age=31536000; includeSubdomains;|

## HTTP Public Key Pinning (HPKP)

### 概要

```sh
Public-Key-Pins: pin-sha256=<base64==>; max-age=<expireTime>;
Public-Key-Pins: pin-sha256=<base64==>; max-age=<expireTime>; includeSubDomains
Public-Key-Pins: pin-sha256=<base64==>; max-age=<expireTime>; report-uri=<reportURI>
```

### 設定方法

設定を推奨しない
参照：https://blog.qualys.com/ssllabs/2016/09/06/is-http-public-key-pinning-dead

## X-Frame-Options

### 概要

```sh
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
X-Frame-Options: ALLOW-FROM https://example.com/
```

### 設定方法

|platform|どう設定するの|
|:-------|:-------|
|Rails4,5|config.action_dispatch.default_headers[‘X-Frame-Options’] = “DENY”|
|Django|X_FRAME_OPTIONS = ‘DENY’|
|Express.js|helmet|
|Go|unrolled/secure|
|Nginx|add_header X-Frame-Options “deny”;|
|Apache|Header always set X-Frame-Options “deny”|

## X-Content-Type-Options

### 概要

```sh
X-Content-Type-Options: nosniff;
```

**MIME sniffing**を防ぐヘッダ

### 設定方法

|platform|どう設定するの|
|:-------|:-------|
|Rails4,5|デフォルト有効|
|Django|SECURE_CONTENT_TYPE_NOSNIFF = True|
|Express.js|helmet|
|Go|unrolled/secure|
|Nginx|add_header X-Content-Type-Options nosniff;|
|Apache|Header always set X-Content-Type-Options nosniff|

## Referrer-Policy

### 概要

```sh
Referrer-Policy: "no-referrer"
Referrer-Policy: "no-referrer-when-downgrade"
Referrer-Policy: "origin"
Referrer-Policy: "origin-when-cross-origin"
Referrer-Policy: "same-origin"
Referrer-Policy: "strict-origin"
Referrer-Policy: "strict-origin-when-cross-origin"
Referrer-Policy: "unsafe-url"
```

### 設定方法

|platform|どう設定するの|
|:-------|:-------|
|Rails4,5|secureheaders|
|Django|Custom middleware|
|Express.js|helmet|
|Go|Custom middleware|
|Nginx|add_header Referrer-Policy “no-referrer”;|
|Apache|Header always set Referrer-Policy “no-referrer”|

## 参照

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
- https://techtalk.vn/tat-ca-nhung-thu-ban-can-biet-ve-http-security-headers.html
