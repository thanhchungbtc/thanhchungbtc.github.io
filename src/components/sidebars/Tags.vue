<template>
  <div className="w-full flex flex-col my-4">
    <h2 class="title-font text-lg font-normal mb-3">TAGS</h2>
    <nav class="list-none mb-5">
      <ul v-for="tag in $static.tags.edges">
        <li class="font-normal ">
          <g-link :to="tag.node.path">{{ tag.node.title }} ({{
              tag.node.belongsTo.totalCount
            }})
          </g-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<static-query>
query {
tags: allTag(sortBy: "title", order: ASC) {
edges {
node {
id
title
path
belongsTo {
totalCount
}
}
}
}
}
</static-query>