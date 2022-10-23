---
title: "Mac setup tips & tricks"
date: 2018-06-23T21:23:22+09:00
thumbnail: ./thumbnail.png
description: Some of my mac tips & tricks
draft: false
tags: ["linux", "mac", "tip"]
categories: ['programing']

---

### よく使われるコマンドをAliasに

**~/.zshrc or ~/.bash_profile or whatever you use**

```sh
# append this line to the bottom
source ~/.aliases
```

**~/.aliases**

```sh
alias gs="git status"
alias gl="git log"
alias gaa="git add ."
alias gc="git commit -m "
alias gclean="git reset --hard && clean -df"
alias projects="cd /Volumes/Data/projects "
alias p="phpunit "
alias pf="phpunit --filter "
```

```sh
source ~/.aliases
```

これで **gs**は**git status**、**gc**はコミットなど便利に使える。

### 複数Pythonバージョンがあっても、**PATH**変更せず、好みバージョン使用できる

**python2**と**python3**が混在な環境では**python3**コマンドを打つのは面倒だね。

**~/.aliases**

```sh
alias python="python3"
```

### デフォルトの**Terminal**より、**Oh My ZSH!**を使う

メリットは様々だが、https://ohmyz.sh/をご確認ください

### Flutter Catalina error

```sh
sudo xattr -d com.apple.quarantine ~/thanhchungbui/flutter/bin/cache/artifacts/libimobiledevice/idevice_id
sudo xattr -d com.apple.quarantine ~/flutter/bin/cache/artifacts/libimobiledevice/idevice_id
sudo xattr -d com.apple.quarantine ~/flutter/bin/cache/artifacts/libimobiledevice/ideviceinfo
sudo xattr -d com.apple.quarantine ~/flutter/bin/cache/artifacts/usbmuxd/iproxy
```

