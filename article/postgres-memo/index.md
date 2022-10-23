---
title: "Postgres Memo"
date: 2017-07-25T07:04:16+09:00
description:
thumbnail: ./thumbnail.png
tags: ["postgres"]
categories: ['programing']

---

## Useful Postgres command

### 1. Move DB to another server

```shell script
pg_dump -C -h sourceip -U username password | psql -h destinationip -U username
```

### 2. Init, start, restart

```shell script
initdb -D /path/to/data/folder
pg_ctl -D /path/to/data/folder start
pg_ctl -D /path/to/data/folder restart
```

### 3. Config file

- pg_hba.config: use to config authentication method
- postgres.conf: use to config listenning host, etc.

### 4. Config authentication

- **For server**

```shell script
vim /path/to/pg_hba.conf
# add the following line:
host    all             all             10.0.0.70/32            md5
# change IP address
```

- **For client**\
  Create ~/.pgpass and add the following line

```shell script
host:port:dbname:usr:pwd
```

change permission

```shell script
chmod 0600 ~/.pgpass
```
