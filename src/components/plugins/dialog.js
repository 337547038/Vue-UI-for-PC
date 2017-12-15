/**
 * Created by guilin on 2017/12/6.
 */
import Layer from '../layer/index'
export default {
    install: function (Vue, options) {
        //注册全局组件，其它页面直接引用不用import
        Vue.component(Layer.name, Layer);
        //添加全局API
        Vue.prototype.$dialog = function (options) {
            let message = Vue.extend(Layer);
            const propsData = Object.assign({}, options);
            let component = new message({
                propsData
            }).$mount();
            component.open();
            /*var component = new message({
             data:options
             }).$mount()*/
            document.body.appendChild(component.$el)
        }
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Layer)
}