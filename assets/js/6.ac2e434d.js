(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{lT2f:function(t,a,o){"use strict";o.r(a);var e=o("KHd+"),n=o("Kw5r"),l=n.a.config.optionMergeStrategies.computed,i={category:{edges:[{node:{id:"demo",title:"demo",path:"/category/demo/",belongsTo:{totalCount:3}}},{node:{id:"life",title:"life",path:"/category/life/",belongsTo:{totalCount:3}}},{node:{id:"programing",title:"programing",path:"/category/programing/",belongsTo:{totalCount:16}}}]}},s=function(t){var a=t.options;a.__staticData?a.__staticData.data=i:(a.__staticData=n.a.observable({data:i}),a.computed=l({$static:function(){return a.__staticData.data}},a.computed))},c=Object(e.a)({},(function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{attrs:{className:"w-full flex flex-col my-4"}},[o("h2",{staticClass:"title-font text-lg font-normal mb-3"},[t._v("CATEGORIES")]),o("nav",{staticClass:"list-none mb-5"},t._l(t.$static.category.edges,(function(a){return o("ul",[o("li",{staticClass:"font-normal "},[o("g-link",{attrs:{to:a.node.path}},[t._v(t._s(t._f("capitalise")(a.node.title))+" ("+t._s(a.node.belongsTo.totalCount)+")\n        ")])],1)])})),0)])}),[],!1,null,null,null);"function"==typeof s&&s(c);a.default=c.exports}}]);