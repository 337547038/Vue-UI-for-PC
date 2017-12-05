import Vue from 'vue'
import Router from 'vue-router'
/*import index from '@/pages/index'
 import layer from '@/pages/layer'
 import test from '@/pages/test'
 import dialog from '@/pages/dialog'
 import carousel from '@/pages/carousel'*/
import pages from '@/pages/pages'

Vue.use(Router);

let array = [];
for (let i in pages) {
    let page = pages[i].default;
    array.push({
        path: page.path,
        name: page.name,
        component: page
    });
}
export default new Router({
    routes:array
})
/*export default new Router({
    routes:
     [
     {
     path: '/',
     name: 'index',
     component: index
     },
     {
     path: '/layer',
     name: 'layer',
     component: layer
     },
     {
     path: '/dialog',
     name: 'dialog',
     component: dialog
     },
     {
     path: '/carousel',
     name: 'carousel',
     component: carousel
     },
     {
     path: '/test',
     name: 'test',
     component: test

     ] }
})*/
