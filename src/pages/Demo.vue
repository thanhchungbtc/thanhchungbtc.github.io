<template>
  <Layout>
    <section class="body-font">
      <div class="container mx-auto flex flex-wrap py-8">
        <div class="w-full md:w-3/3 flex flex-col pr-0 md:pr-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="post in $page.posts.edges" :key="post.id">
              <post-card :post="post"></post-card>
            </div>
          </div>

          <pagination-posts
              class="mt-10"
              v-if="$page.posts.pageInfo.totalPages > 1"
              base="/blog"
              :totalPages="$page.posts.pageInfo.totalPages"
              :currentPage="$page.posts.pageInfo.currentPage"
          />
        </div>

      </div>
    </section>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
posts: allPost (filter:{categories:{contains:"demo"}}, sortBy: "date", order: DESC, perPage: 20, page: $page) @paginate
{
totalCount
pageInfo {
totalPages
currentPage
}
edges {
node {
id
title
tags {
id
title
path
}
categories {
id
path
}
date (format: "MMMM D, Y")
summary
thumbnail
timeToRead
path
}
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
}
}
</static-query>


<script>
export default {
  metaInfo() {
    return {
      title: this.$static.metadata.siteTitle,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.metadata.siteDescription,
        },
        {name: 'author', content: this.$static.metadata.siteAuthor},
        {name: 'twitter:card', content: 'summary_large_image'},
        {
          name: 'twitter:description',
          content: this.$static.metadata.siteDescription,
        },
        {name: 'twitter:title', content: this.$static.metadata.siteTitle},
        {
          name: 'twitter:site',
          content: `@${this.$static.metadata.siteAuthor}`,
        },
        {
          name: 'twitter:image',
          content: `${process.env.GRIDSOME_BASE_URL}/images/default-thumb.png`,
        },
        {
          name: 'twitter:creator',
          content: `@${this.$static.metadata.siteAuthor}`,
        },
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: this.$static.metadata.siteTitle},
        {
          property: 'og:description',
          content: this.$static.metadata.siteDescription,
        },
        {
          property: 'og:url',
          content: process.env.GRIDSOME_BASE_URL,
        },
        {
          property: 'og:image',
          content: `${process.env.GRIDSOME_BASE_URL}/images/default-thumb.png`,
        },
        {
          property: 'og:image:secure_url',
          content: `${process.env.GRIDSOME_BASE_URL}/images/default-thumb.png`,
        },
      ],
    }
  },
  components: {
    AppSidebar: () => import('~/components/parts/AppSidebar'),
    PaginationPosts: () => import('~/components/PaginationPosts'),
    PostCard: () => import('~/components/PostCard'),
  },
}
</script>
