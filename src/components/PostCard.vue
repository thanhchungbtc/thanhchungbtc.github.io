<template>
  <div
      class="
      h-full
      overflow-hidden
      text-gray-700
    "
  >
    <g-link :to="`${post.node.path}/`" class="text-copy-primary">
      <g-image
          class="lg:h-48 md:h-36 w-full object-cover object-center"
          :src="
          post.node.thumbnail
            ? post.node.thumbnail.src
            : '/images/default-thumb.png'
        "
          :alt="post.node.title"
      />
    </g-link>
    <div class="p-0">

      <!--      Date-->
      <div class="py-2 text-lg text-gray-500 dark:text-gray-400 font-thin">{{ post.node.date }}</div>

      <!--      title-->
      <h1 class="text-2xl text-gray-500 mb-3">
        <g-link :to="`${post.node.path}/`" class="text-gray-600 dark:text-white font-normal">
          {{ post.node.title }}
        </g-link>

      </h1>

      <!--      summary-->
      <p v-if="showingSummary" class="leading-relaxed mb-3 text-gray-500">{{ post.node.summary }}</p>

      <!--      tag-->
      <div class="flex my-4 text-sm">
        <g-link
            :to="tag.path"
            v-for="tag in post.node.tags"
            :key="tag.id"
            class="
              bg-transparent
              text-secondary-500
              hover:bg-secondary-500 hover:text-white
              font-semibold
              py-1
              px-2
              border border-secondary-500
              hover:border-transparent
              rounded-lg
              mr-3
            "
        >
          {{ tag.title }}
        </g-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['post', 'showingSummary'],
}
</script>
