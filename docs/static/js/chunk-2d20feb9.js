(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d20feb9"],{b64c:function(s,t,a){"use strict";a.r(t);var r={data:function(){return{stepsData1:[{title:"步骤1",description:"已完成状态添加样式completed"},{title:"步骤2",description:"当前状态添加样式active"},{title:"步骤3",description:"描述"}],stepsData2:[{title:"步骤1",desc:"描述",icon:"icon-correct"},{title:"步骤2",desc:"描述",icon:"icon-error"},{title:"步骤3",desc:"描述",icon:"icon-warn"},{title:"步骤4",desc:"描述",icon:"icon-refresh"}],active:1,active2:0}},methods:{_click:function(){console.log("click")},changeStep:function(){this.active>=2?this.active=0:this.active++},changeStep2:function(){this.active2>=3?this.active2=0:this.active2++}}},e=a("2877"),n=Object(e.a)(r,(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("html",[a("head"),a("body",[a("h1",[s._v("Steps 步骤条")]),s._m(0),s._m(1),a("demo-block",[a("div",{staticClass:"source",attrs:{slot:"source"},slot:"source"},[[a("div",[a("ak-steps",{attrs:{data:s.stepsData1,active:s.active}}),a("div",[a("br"),a("ak-button",{on:{click:s.changeStep}},[s._v("下一步")])],1)],1)]],2),a("div",{staticClass:"highlight",attrs:{slot:"highlight"},slot:"highlight"},[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("template")]),s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("ak-steps")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v(":data")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"stepsData1"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v(":active")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"active"')]),s._v(">")]),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("ak-steps")]),s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("br")]),s._v(">")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("ak-button")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("@click")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"changeStep"')]),s._v(">")]),s._v("下一步"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("ak-button")]),s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("template")]),s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),a("span",{pre:!0,attrs:{class:"language-javascript"}},[s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("default")]),s._v(" {\n  data () {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" {\n      "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("stepsData1")]),s._v(": [\n        {\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'步骤1'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("description")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'已完成状态添加样式completed'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("icon")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("''")]),s._v("\n        },\n        {\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'步骤2'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("description")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'当前状态添加样式active'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("icon")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("''")]),s._v("\n        },\n        {\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'步骤3'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("description")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'描述'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("icon")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("''")]),s._v("\n        }\n      ],\n      "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("active")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("\n    }\n  },\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("methods")]),s._v(": {\n    changeStep () {\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("active")]),s._v(" >= "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("2")]),s._v(") {\n        "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("active")]),s._v(" = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n      } "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n        "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("active")]),s._v("++\n      }\n    }\n  }\n}\n")]),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),s._v("\n\n")])])])]),s._m(2),a("demo-block",[a("div",{staticClass:"source",attrs:{slot:"source"},slot:"source"},[[a("div",[a("ak-steps",{attrs:{data:s.stepsData2,active:s.active2},on:{click:s._click}}),a("div",[a("br"),a("ak-button",{on:{click:s.changeStep2}},[s._v("下一步")])],1)],1)]],2),a("div",{staticClass:"highlight",attrs:{slot:"highlight"},slot:"highlight"},[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("template")]),s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("ak-steps")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v(":data")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"stepsData2"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v(":active")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"active2"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("@click")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"_click"')]),s._v(">")]),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("ak-steps")]),s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("br")]),s._v(">")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("ak-button")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("@click")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"changeStep2"')]),s._v(">")]),s._v("下一步"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("ak-button")]),s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("template")]),s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),a("span",{pre:!0,attrs:{class:"language-javascript"}},[s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("default")]),s._v(" {\n  data () {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" {\n      "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("stepsData2")]),s._v(": [\n        {\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'步骤1'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("desc")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'描述'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("icon")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'icon-correct'")]),s._v("\n        },\n        {\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'步骤2'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("desc")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'描述'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("icon")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'icon-error'")]),s._v("\n        },\n        {\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'步骤3'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("desc")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'描述'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("icon")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'icon-warn'")]),s._v("\n        },\n        {\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'步骤4'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("desc")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'描述'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("icon")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'icon-refresh'")]),s._v("\n        }\n      ],\n      "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("active2")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n    }\n  },\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("methods")]),s._v(": {\n    _click () {\n      "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'click'")]),s._v(")\n    },\n    changeStep2 () {\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("active2")]),s._v(" >= "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("3")]),s._v(") {\n        "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("active2")]),s._v(" = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n      } "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n        "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("active2")]),s._v("++\n      }\n    }\n  }\n}\n")]),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),s._v("\n\n")])])])]),s._m(3),s._m(4),s._m(5),s._m(6),s._m(7)],1)])])}),[function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("其它外观可通过自定附加样式实现")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("h3",{attrs:{id:"%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95"}},[this._v("¶")]),this._v(" 基础用法")])},function(){var s=this.$createElement,t=this._self._c||s;return t("h3",{attrs:{id:"%E8%87%AA%E5%AE%9A%E5%9B%BE%E6%A0%87"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#%E8%87%AA%E5%AE%9A%E5%9B%BE%E6%A0%87"}},[this._v("¶")]),this._v(" 自定图标")])},function(){var s=this.$createElement,t=this._self._c||s;return t("h2",{attrs:{id:"api"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[this._v("¶")]),this._v(" API")])},function(){var s=this.$createElement,t=this._self._c||s;return t("h3",{attrs:{id:"steps"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#steps"}},[this._v("¶")]),this._v(" Steps")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("table",[a("thead",[a("tr",[a("th",[s._v("参数")]),a("th",[s._v("类型")]),a("th",[s._v("说明")])])]),a("tbody",[a("tr",[a("td",[s._v("data")]),a("td",[s._v("Array")]),a("td",[s._v("步骤数据")])]),a("tr",[a("td",[s._v("active")]),a("td",[s._v("Number")]),a("td",[s._v("当前位置，从0开始")])]),a("tr",[a("td",[s._v("click")]),a("td",[s._v("Function")]),a("td",[s._v("事件")])])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("h3",{attrs:{id:"steps-data"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#steps-data"}},[this._v("¶")]),this._v(" Steps Data")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("table",[a("thead",[a("tr",[a("th",[s._v("参数")]),a("th",[s._v("类型")]),a("th",[s._v("说明")])])]),a("tbody",[a("tr",[a("td",[s._v("icon")]),a("td",[s._v("Array")]),a("td",[s._v("icon图标样式名")])]),a("tr",[a("td",[s._v("title")]),a("td",[s._v("String")]),a("td",[s._v("标题")])]),a("tr",[a("td",[s._v("desc")]),a("td",[s._v("String")]),a("td",[s._v("描述")])])])])}],!1,null,null,null);t.default=n.exports}}]);