---
title: "[PHP]Empty関数の問題"
description: empty関数の落とし穴に不注意となると、微妙なバグになります。
thumbnail: ./thumbnail.png
date: 2019-09-25T06:31:41+09:00
tags: ["php"]
categories: ['programing']

---

```php
if (empty($someVar)) {
   // do something
}
 ```

Objectにデータが入っているかどうかを確認するに非常に便利ですね。

でも、こんな書き方が落とし穴あることをご存知ですか？

## 問題

[php docs](https://www.php.net/manual/ja/function.empty.php)によると、次のような値は空っぽであるとみなされます。

- "" (空文字列)
- 0 (整数 の 0)
- 0.0 (浮動小数点数の 0)
- **"0" (文字列 の 0)**
- NULL
- FALSE
- array() (空の配列)

なんと **"0"** の文字列なのに、`true`を返しています！！

こんな例をみてみましょう

```sh
質問: 一日何本のタバコを吸っていますか？
答え（自由書き）：0
```

答えが必須で、"0"を入力したにも関わらず、バリデーションにひっかかれることがわかります。

バリデーションを修正すれば良いと思っていても、もしデータベースの文字列コラムに**0**が入っていて、予期しない結果が出てくる恐れがあります。

```php
// $answer = "0"
if (!empty($someRecord->answer)) {
    doSomethingWithAnswer();
} else {
    notAcceptableData();
}
```

また、もっと酷くなるのは、便利なメソッドだけあって、レガシーコードには全体的に使われていて、影響範囲が非常に壮大に及んでいます。

## 対策

- 意図通りの新しい**is_blank**関数を作りました。

```php
if (!function_exists('is_blank')) {
    function is_blank($value) {
        return empty($value) && !is_numeric($value);
    }
}
```

- Unit test

```php
class IsBlankTest extends TestCase
{
    public function testIsBlank()
    {
        $input = '文字列';
        $this->assertFalse(!isset($input) || is_blank($input));

        $input = '';
        $this->assertTrue(!isset($input) || is_blank($input));

        $input = ' ';
        $this->assertFalse(!isset($input) || is_blank($input));

        $input = 0;
        $this->assertFalse(!isset($input) || is_blank($input));

        $input = 0.0;
        $this->assertFalse(!isset($input) || is_blank($input));

        $input = '0';
        $this->assertFalse(!isset($input) || is_blank($input));

        $input = null;
        $this->assertTrue(!isset($input) || is_blank($input));

        $input = false;
        $this->assertTrue(!isset($input) || is_blank($input));

        $input = [];
        $this->assertTrue(!isset($input) || is_blank($input));

        $this->assertTrue(!isset($undefinedVar) || (empty($undefinedVar) && !is_numeric($undefinedVar)));
    }
}
```

- 使い方

```php
// empty()を使う箇所をこの処理にする
if(!isset($someVar) || is_blank($someVar)) {
  // do something
}
```

## 最後に

意外と、PHPにはこんな書き方（emptyを使う）が普及しているようで、意図に反する動きが出るかもしれないので、注意をしましょう。
