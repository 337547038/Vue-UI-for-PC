/**
 * Created by guilin on 2017/12/11.
 */
import Loading from '../loading/index'
export default {
    install: function (Vue, options) {
        //注册全局组件，其它页面直接引用不用import
        Vue.component(Loading.name, Loading);
        //添加全局API
        let component;
        Vue.prototype.$loading = function (options) {
            var message = Vue.extend(Loading);
            const propsData = Object.assign({}, options);
            component = new message({
                propsData
            }).$mount();
            component.open();
            /*var component = new message({
             data:options
             }).$mount()*/
            document.body.appendChild(component.$el)
        };
        Vue.prototype.$loading.close=function () {
            component.close();
        }
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Loading)
}
