---
title: "PHP - Fatal error: Class not found"
date: 2017-05-18
tags: ['php']
summary: ""
categories: ['programing']
thumbnail: ./thumbnail.png
---

## What was happened

I am working on adding new features to a web system written in PHP.

After sometime of coding and make it works on the
local environment, I need to deploy the
code to development servers for testing.

But everything stops working, with a really mysterious message

```sh
Fatal error: Class ... not found
```

What!!!

I double-check the folder, the class. They are there!

## The cause

Since the error message must have something to do with php autoload, I take an investigation, and finally found
the cause!

For php autoload to work, the file name and the class name must **exactly** match.

Let see an example

```php
// filename: app/Models/Userorder.php
namespace App\Models;

class UserOrder { }

// in another file
// instantiate the class
new \App\Models\UserOrder(); 
```

> Pay attention to the file name **Userorder.php**

to instantiate the `UserOder` class, php will try to load the file app/Models/**UserOrder.php** first
but since there's no **UserOrder.php** file (the file was **Userorder.php**), it fails and throws the fatal error.

```sh
Fatal error: Class UserOrder not found
```

Because my local development machine was **Windows**, and windows is case-insensitive, it can load the file normally.

## Solution

Just change the file name

```sh
$ mv app/Models/Userorder.php app/Models/UserOrder.php
```

Hope everyone doesn't waste the time to that kind of bug.