(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{363:function(t,e,r){"use strict";r.r(e);r(17),r(104);var n,o,c=r(29),l=(r(2),r(1),r(52),r(19)),m=r(358),f={name:"LatestPost",props:["post"],computed:{title:function(){return this.post.attributes.title},tags:function(){return this.post.attributes.tags||[]},description:function(){return this.post.attributes.description},thumbnail:function(){return this.post.attributes.thumbnail||"/images/default-thumbnail.jpg"},permalink:function(){var t=this.post;if(t.attributes.hasOwnProperty("permalink"))return"".concat("posts","/").concat(t.attributes.permalink);var path,e=t.meta.resourcePath.split("\\").pop().split("/"),r=e.pop();return path="index.md"===r?e.pop():r.split(".")[0],"".concat("posts","/").concat(path)}}},d=r(33),h=Object(d.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-row",{staticClass:"py-5  posts"},[r("b-col",{attrs:{md:"6","align-self":"center"}},[r("div",{staticClass:"image"},[r("nuxt-link",{staticClass:"text-left font-weight-bold",attrs:{tag:"a",to:t.permalink}},[r("picture",[r("img",{attrs:{src:t.thumbnail,onerror:"this.src='/images/default-thumbnail.jpg'",alt:""}})])])],1)]),t._v(" "),r("b-col",{attrs:{md:"5","offset-md":"1"}},[r("article",[r("h2",{staticClass:"pt-4"},[t._v(t._s(t.title))]),t._v(" "),r("p",[t._v(t._s(t.description))]),t._v(" "),r("nuxt-link",{staticClass:"text-left font-weight-bold",attrs:{tag:"a",to:t.permalink}},[r("b-btn",{attrs:{variant:"primary"}},[t._v("Read more")])],1)],1)])],1)}),[],!1,null,null,null).exports,v=r(360),k=r.n(v),_=(n=r(336),o=n.keys().map((function(t){var e=t.match(/\/(.+)\.md$/);return Object(c.a)(e,2)[1],n(t)})),k.a.orderBy(o,(function(i){return i.attributes.date}),"desc")),data=_,w=(r(361),{components:{LatestPost:h,ArticleComponent:m.a},asyncData:function(){return Object(l.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=r(336),e.keys().map((function(t){var r=t.match(/\/(.+)\.md$/);Object(c.a)(r,2)[1];return e(t)})),t.abrupt("return",{posts:data,latestPost:_[0]});case 3:case"end":return t.stop()}}),t)})))()},data:function(){return{prefix:"posts"}},methods:{getPermalink:function(t){if(t.attributes.hasOwnProperty("permalink"))return"".concat(this.prefix,"/").concat(t.attributes.permalink);var e,r=t.meta.resourcePath.split("\\").pop().split("/"),n=r.pop();return e="index.md"===n?r.pop():n.split(".")[0],"".concat(this.prefix,"/").concat(e)}}}),x=Object(d.a)(w,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{},[e("div",{staticStyle:{"background-color":"#f5f6f6"}},[e("div",{staticClass:"container"},[e("LatestPost",{attrs:{post:this.latestPost}})],1)]),this._v(" "),e("div",{staticClass:"container posts"},[e("div",{staticClass:"category-link"},[e("nuxt-link",{attrs:{to:"/posts"}},[e("h2",{staticClass:"mb-4"},[this._v(" Recent posts ")])]),this._v(" "),e("b-row",this._l(this.posts,(function(t,r){return e("b-col",{key:r,attrs:{md:"6"}},[e("ArticleComponent",{attrs:{post:t}})],1)})),1)],1)])])}),[],!1,null,null,null);e.default=x.exports}}]);