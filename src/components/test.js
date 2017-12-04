import Vue from 'vue'
import test from '../components/test.vue'
var Constructor = Vue.extend(test);
const div = document.createElement('div');
//document.body.appendChild(div);

// new Profile().$mount(div);


Constructor.show=function (options) {
    document.body.appendChild(div);
    const propsData = Object.assign({}, options);
    const alertInstance = new Constructor({
        propsData
    }).$mount(div);
    //alertInstance.open()执行test.vue里面的open方法
};
export default Constructor;