<template>
  <div id="app">
    <div class="main-header">
      <div class="main-header-logo">
        <a href="/"><img src="./logo.png" alt="logo"></a>
      </div>
      <div class="main-header-title"><a href="/">AK-UI-Docs</a></div>
      <ul class="main-header-nav">
        <li class="active"><a href="svn://192.168.0.2/code/项目开发/Java本地库/本地库前端新框架/akui-demos" target="_blank">资源</a></li>
      </ul>
    </div>
    <div class="main-">
      <div class="main-left" :style="{display:showNav?'block':'none'}">
        <ul>
          <!--过滤index，首字母大写-->
          <li v-for="(item,index) in navigator" :key="index">
            <router-link :to="item.path">{{item.name.substring(0,1).toUpperCase()+item.name.substring(1)}}</router-link>
          </li>
          <!-- <li>
            <router-link to="/test">test 组件</router-link>
          </li> -->
        </ul>
      </div>
      <div class="main-right">
        <transition name="left-fade">
          <router-view class="markdown"></router-view>
        </transition>
      </div>
    </div>
    <div class="fixed-bottom" @click="showNav=!showNav"></div>
    <div class="close-nav" @click="closeNav"></div>
  </div>
</template>

<script>
import './scss/index.scss'
import router from './router/router.con'

export default {
  name: 'App',
  data () {
    return {
      showNav: true
    }
  },
  mounted () {
    console.log(this.navigator)
    /* var value1 = 'B'
    var value2 = 'A'
    console.log(value1 > value2) */
  },
  watch: {},
  methods: {
    _sortBy (sortValue) {
      // 添加排序
      return function (a, b) {
        let val1 = a[sortValue]
        let val2 = b[sortValue]
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 < val2) {
          return -1 // 顺序，倒序1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      }
    },
    closeNav (e) {
      // 关闭右则导航
      document.querySelector('.container-nav').style.display = 'none'
      e.target.style.display = 'none'
    }
  },
  computed: {
    navigator () {
      return router.sort(this._sortBy('name')).filter(item => {
        return item.name !== 'index'
      })
    }
  }
}
</script>

<style>

  .hljs{
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #fff;
  }
  .hljs,
  .hljs-subst{
    color: #000;
  }
  .hljs-string,
  .hljs-meta,
  .hljs-symbol,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-addition{
    color: #756bb1;
  }
  .hljs-comment,
  .hljs-quote{
    color: #636363;
  }
  .hljs-number,
  .hljs-regexp,
  .hljs-literal,
  .hljs-bullet,
  .hljs-link{
    color: #31a354;
  }
  .hljs-deletion,
  .hljs-variable{
    color: #88f;
  }
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-title,
  .hljs-section,
  .hljs-built_in,
  .hljs-doctag,
  .hljs-type,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-strong{
    color: #3182bd;
  }
  .hljs-emphasis{
    font-style: italic;
  }
  .hljs-attribute{
    color: #e6550d;
  }
  body{
    margin: 0;
    padding: 0;
    font-family: Microsoft YaHei;
  }
  body, div, ul, li, p{margin: 0;padding: 0}
  .main-left .router-link-active{
    color: #41a259 !important;
    background-color: #eeffde !important;
    border-right: 3px solid #41a259 !important;
  }
  #app{
    overflow: hidden;
    padding: 0;
    width: 100%;
  }
  #app .main-header{
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    -webkit-box-shadow: 0 2px 8px #f0f1f2;
    box-shadow: 0 2px 8px #f0f1f2;
    position: relative;
    z-index: 10;
    height: 65px;
    color: #444;
  }
  #app .main-header .main-header-logo{
    height: 100%;
    float: left;
    margin-left: 40px;
    position: absolute;
  }
  #app .main-header .main-header-logo img{
    height: 30px;
    width: auto;
    border: 0;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  #app .main-header .main-header-title{
    height: 65px;
    line-height: 65px;
    font-size: 25px;
    display: inline-block;
    padding-left: 75px;
    font-weight: bold;
  }
  #app .main-header .main-header-title a{font-size: 25px;text-decoration: none;color: #444;}
  #app .main-header .main-header-nav{
    float: right;
    height: 65px;
    background: transparent;
    margin-right: 120px;
  }
  #app .main-header .main-header-nav li{
    list-style: none;
    color: #314659;
    height: 100%;
    line-height: 65px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-width: 72px;
    border-top: 2px solid transparent;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    float: left;
    border-bottom: 3px solid #fff;
    -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #app .main-header .main-header-nav li a{
    color: #314659;font-size: 15px;text-decoration: none;
  }
  #app .main-header .main-header-nav li.active{
    color: #41a259;
    border-bottom: 3px solid #41a259;
  }
  #app .main-{
    position: relative;
    padding: 20px 0 0;
    margin-left: 0;
    margin-right: 0;
    height: auto;
    zoom: 1;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 30px;
    overflow: hidden;
  }
  #app .main- .main-left{
    float: left;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }
  #app .main- .main-left ul{
    width: 180px;
    margin: 0;
    padding: 0;
  }
  #app .main- .main-left ul li{
    margin: 0;
    list-style: none;
    padding: 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  #app .main- .main-left ul li a{
    font-size: 16px;
    color: #333;
    line-height: 30px;
    height: 30px;
    margin: 0;
    padding: 4px 25px;
    text-decoration: none;
    display: block;
    position: relative;
    -webkit-transition: 0.15s ease-out;
    transition: 0.15s ease-out;
    border-right: 1px solid #e8e8e8;
  }
  #app .main- .main-left ul li a:hover{
    color: #41a259;
  }
  #app .main- .main-left ul li.main--link-group{
    height: auto;
  }
  #app .main- .main-left ul li.main--link-group a:hover{
    color: #333;
    cursor: default;
  }
  #app .main- .main-left ul li.main--link-group ul a{
    display: block;
    height: 40px;
    color: #444;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
  }
  #app .main- .main-left ul li.main--link-group ul a:hover{
    color: #41a259;
    cursor: pointer;
  }
  #app .main- .main-right{
    padding: 0 84px 140px 64px;
    min-height: 500px;
    overflow: hidden;
  }
  /*#app .main- .main-right a{
    color: #41a259;
    text-decoration: none;
  }*/
  .markdown h1{
    color: #0d1a26;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 8px;
    font-size: 30px;
    line-height: 38px;
  }
  .markdown h2,
  .markdown h3,
  .markdown h4,
  .markdown h5,
  .markdown h6{
    font-family: Lato;
    margin: 1.6em 0 0.6em;
    font-weight: 500;
    clear: both;
  }
  .markdown h3{
    font-size: 18px;
  }
  .markdown h4{
    font-size: 16px;
  }
  .markdown h5{
    font-size: 14px;
  }
  .markdown h6{
    font-size: 12px;
  }
  .markdown p,
  .markdown pre{}
  .markdown ul > li > p,
  .markdown ol > li > p{
    margin: 0.2em 0;
  }
  .markdown ul{
    padding: 0;
    margin: 0;
  }
  /*.markdown ul > li{
    list-style-type: circle;
    margin-left: 20px;
    padding-left: 4px;
    padding-top: 15px;
  }
  .markdown ol > li{
    list-style-type: decimal;
    margin-left: 20px;
    padding-left: 4px;
    padding-top: 15px;
  }*/
  .markdown > table{
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #ebedf0;
    width: 100%;
    margin: 8px 0 16px;
  }
  .markdown > table th,
  .markdown > table td{
    color: #314659;
    border: 1px solid #ebedf0;
    text-align: left;
    padding: 10px 15px;
  }
  .markdown > table th{
    white-space: nowrap;
    color: #5c6b77;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.02);
  }
  .markdown strong,
  .markdown b{
    font-weight: 500;
  }
  .markdown .sh-markdown-permalink{
    opacity: 0;
  }
  .markdown h1:hover .sh-markdown-permalink,
  .markdown h2:hover .sh-markdown-permalink,
  .markdown h3:hover .sh-markdown-permalink,
  .markdown h4:hover .sh-markdown-permalink,
  .markdown h5:hover .sh-markdown-permalink,
  .markdown h6:hover .sh-markdown-permalink{
    opacity: 1;
    display: inline-block;
  }
  .markdown > br,
  .markdown p > br{
    clear: both;
  }
  .markdown blockquote{
    font-size: 90%;
    color: #0d1a26;
    border-left: 4px solid #ebedf0;
    padding-left: 0.8em;
    margin: 1em 0;
  }
  .markdown blockquote p{
    margin: 0;
  }
  .markdown hr{
    height: 1px;
    border: 0;
    background: #ebedf0;
    clear: both;
  }
  .markdown code{color: #444;background-color: #e6effb;margin: 0 4px;display: inline-block;padding: 3px 7px;border-radius: 3px;font-family: Menlo, Monaco, Consolas, Courier, monospace;font-size: 14px;line-height: 20px}
  .markdown pre{margin: 0;padding: 0;}
  .markdown pre code{line-height: 22px;padding: 10px;margin: 0;white-space: pre-wrap; word-wrap: break-word;}
  #app .fixed-bottom{position: fixed;left: 5px;bottom: 5px;width: 20px;height: 15px;cursor: pointer;border-top: 4px solid #41a259;border-bottom: 4px solid #41a259;}
  #app .fixed-bottom:after{content: '';display: block;width: 100%;height: 4px; background: #41a259;position: relative;top: 5px;}
  /*锚点*/
  #app .header-anchor{color: #41a259;text-decoration: none;opacity: 0;display: none}
  #app h2:hover .header-anchor, #app h3:hover .header-anchor{opacity: 1}
  #app .container-nav{position: fixed;right: 20px;top: 60px;background: #fff;z-index: 20;box-shadow: 0 0 10px #ddd;padding: 8px;}
  #app .container-nav li ul{padding-left: 10px;}
  #app .container-nav li{list-style: none;margin: 0;padding: 0;line-height: 25px;}
  #app .container-nav li:before{content: '．';display: inline-block; vertical-align: middle;color: #999;font-size: 10px;}
  #app .container-nav li a{font-size: 14px;text-decoration: none;display: inline-block;vertical-align: middle;color: #666}
  #app .container-nav li a:hover{color: #41a259}
  /*关闭右则导航*/
  .close-nav{position: fixed;right: 20px;top: 60px;z-index: 21;width: 16px;height: 16px;cursor: pointer}
  .close-nav:before{content: '';display: block;width: 2px;background: #41a259;height: 16px;position: relative;left: 8px;top: 0;transform: rotate(45deg)}
  .close-nav:after{content: '';display: block;width: 100%;height: 2px;background: #41a259;position: relative;left: 0;top: -9px;transform: rotate(45deg)}
  .green{color: #41a259}
  .green:hover{text-decoration: underline;cursor: pointer}
</style>
<style>
  .left-fade-enter-active{
    transition: all 1.2s ease;
  }
  .left-fade-leave-active{
    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .left-fade-enter, .left-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
</style>
