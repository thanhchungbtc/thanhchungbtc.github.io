<template>
  <Layout>
    <div class="container px-5 py-8 mx-auto flex flex-wrap">
      <aside
          v-if="headings.length"
          class="
          w-full
          md:w-2/10
          sm:w-0
          flex flex-col
          pr-5
          hidden
          sm:block
          border-r-1 border-gray-300
          dark:border-gray-700
        "
          aria-label="left-sidebar"
      >
        <div class="w-full flex flex-col sticky top-5">
          <table-of-content/>
        </div>
      </aside>

      <section class="w-full md:w-8/10 flex flex-col px-2 md:px-10"
               :class="!headings.length ? 'md:w-10/10' : 'md:w-8/10'">

        <h1 class="text-3xl text-gray-600 dark:text-white font-normal ">{{ $page.post.title }}</h1>
        <div class="text-lg text-gray-400 font-thin mt-2">
          {{ $page.post.date }}
        </div>

        <div class="flex my-6 text-sm">
          <g-link
              :to="tag.path"
              v-for="tag in $page.post.tags"
              :key="tag.id"
              class="
              bg-transparent
              text-secondary-500
              hover:bg-secondary-500 hover:text-white
              font-semibold
              py-2
              px-4
              border border-secondary-500
              hover:border-transparent
              rounded-full
              mr-4
            "
          >
            {{ tag.title }}
          </g-link>
        </div>

        <g-image
            class="mb-8"
            v-if="$page.post.thumbnail"
            :src="$page.post.thumbnail.src"
        />

        <div class="markdown-body mb-8" v-html="$page.post.content"/>

        <div class="text-center mb-8">
          <g-link
              to="/article"
              class="
              font-bold
              uppercase
              inline-flex
              px-6
              py-2
              font-medium
              text-xs
              leading-6
              text-center text-gray-800
              hover:text-white
              uppercase
              transition
              bg-primary-500
              rounded
              shadow
              ripple
              hover:shadow-lg hover:bg-primary-600
              focus:outline-none
              waves-effect
              mr-4
            "
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
              <path
                  fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
              />
            </svg>
            <span>Back to Article</span>
          </g-link>
        </div>

        <div class="pb-6 hidden sm:block" v-if="$page.post.related.length > 0">
          <related-post :posts="$page.post.related"></related-post>
        </div>

        <post-comment :title="$page.post.title"/>
      </section>

      <!--      <aside-->
      <!--        class="-->
      <!--          w-full-->
      <!--          md:w-2/7-->
      <!--          flex flex-col-->
      <!--          pl-2-->
      <!--          pr-2-->
      <!--          md:pr-0 md:pl-6 md:border-l-1-->
      <!--          border-gray-300-->
      <!--          dark:border-gray-700-->
      <!--        "-->
      <!--        aria-label="right-sidebar"-->
      <!--      >-->
      <!--        <app-sidebar :sidebar="$page.post.sidebar" />-->
      <!--      </aside>-->
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
post: post (path: $path) {
title
summary
sidebar
thumbnail
path
date (format: "MMMM D, Y")
content
headings {
depth
value
anchor
}
categories {
id
path
}
tags {
title
path
}
related {
id
path
title
thumbnail
date (format: "MMMM D, Y")
}
}
}
</page-query>

<static-query>
query {
metadata {
siteTitle
siteDescription
siteAuthor
archive_title
archive_text
}
}
</static-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.post.summary
        },
        {name: 'description', content: this.$page.post.summary},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:description', content: this.$page.post.summary},
        {name: 'twitter:title', content: this.$page.post.title},
        {
          name: 'twitter:site',
          content: `@${this.$static.metadata.siteAuthor}`
        },
        {name: 'twitter:image', content: this.getThumbnailImage},
        {
          name: 'twitter:creator',
          content: `@${this.$static.metadata.siteAuthor}`
        },
        {property: 'og:type', content: 'article'},
        {property: 'og:title', content: this.$page.post.title},
        {property: 'og:description', content: this.$page.post.summary},
        {
          property: 'og:url',
          content: `${this.getBaseUrl}${this.$page.post.path}/`
        },
        {
          property: 'article:published_time',
          content: this.$page.post.date
        },
        {property: 'og:updated_time', content: this.$page.post.date},
        {property: 'og:image', content: this.getThumbnailImage},
        {property: 'og:image:secure_url', content: this.getThumbnailImage},
        {property: 'og:image:width', content: '912'},
        {property: 'og:image:height', content: '513'}
      ]
    }
  },

  components: {
    AppSidebar: () => import('~/components/parts/AppSidebar'),
    RelatedPost: () => import('~/components/RelatedPost'),
    PostComment: () => import('~/components/PostComment'),
    TableOfContent: () => import('~/components/TableOfContent')
  },

  computed: {
    getThumbnailImage() {
      let thumbnailImage = `${this.getBaseUrl}/default-thumb.png`
      const cover = this.$page.post.thumbnail
      if (cover != null) {
        thumbnailImage = `${this.getBaseUrl}${this.$page.post.thumbnail.src}`
      }
      return thumbnailImage
    },
    getBaseUrl() {
      return process.env.GRIDSOME_BASE_URL
    },
    page() {
      return this.$page.post
    },
    headings() {
      return this.page.headings.filter((h) => h.depth > 1)
    },
  }
}
</script>

<style src="../css/github-markdown.css"/>
