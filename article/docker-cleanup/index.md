---
title: "Clean up docker"
date: 2017-08-03
thumbnail: ./thumbnail.png
tags: ["docker"]
categories: ['programing']

---

Docker is so easy to run any applications and services without pollute your local machine.

However, it's also easy to make your SSD quickly gets full because of unused images, containers.

So here's a quick todo to clean up the docker.

## Clean everything

This will clean up any dangling resources

```shell
docker system prune
```

And this will remove all unused resources. So double whether you might want to run it

```shell
docker system prune -a
```

## Remove docker images

### Remove dangling images

```shell
docker images purge
```

Remove all

```shell
docker rmi $(docker images -a -q)
```

Remove containers

```shell
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

Remove volumes

```shell
docker volume prune
```

