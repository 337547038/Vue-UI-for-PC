import Vue from 'vue'
import Router from 'vue-router'
/*import index from '@/pages/index'
 import layer from '@/pages/layer'
 import test from '@/pages/test'
 import dialog from '@/pages/dialog'
 import carousel from '@/pages/carousel'*/
import pages from '@/pages/index.js'


Vue.use(Router)

var page = function () {
    let array=[];
    for (let i in pages) {
        let paa=pages[i].default;
        array.push({
            path:'path',
            name:'name',
            component:'component'
        })
    }
};
page()
export default new Router({
    routes: [
        /*{
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
         }*/
    ]
})
