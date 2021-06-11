const TYPES = {
    string: String,
    number: Number,
    boolean: Boolean,
    symbol: Symbol,
    date: Date,
    array: Array,
    object: Object,
    function: Function,
    any: null
};
export default {
    // type:null
    any() {
        return {
            type: null
        };
    },
    // type:String
    string(d) {
        return {
            type: String,
            default: d
        };
    },
    // type:Number
    number(d) {
        return {
            type: Number,
            default: d
        };
    },
    // type:Boolean
    bool(d = false) {
        return {
            type: Boolean,
            default: d
        };
    },
    // type:Object
    object(d = {}) {
        return {
            type: Object,
            default: function () {
                return d;
            }
        };
    },
    // type:Array
    array(d) {
        return {
            type: Array,
            default: function () {
                return d;
            }
        };
    },
    // type:Function
    func() {
        return {
            type: Function
        };
    },
    // type:[String,Number]
    oneOfType2(list, d) {
        return {
            type: list,
            default: d
        };
    },
    oneOfType(list, d) {
        const types = list.map(prop => {
            return prop['type']['name'];
            // return prop.type;
        });
        return {
            type: types,
            default: d
        };
    },
    // type:
    oneOfString(list, d = '') {
        return {
            validator: function (value) {
                return list.indexOf(value) !== -1;
            },
            default: d
        };
    }
};
// https://cloud.tencent.com/developer/article/1776214
// https://v3.cn.vuejs.org/guide/typescript-support.html#%E6%B3%A8%E8%A7%A3-props
// <Array<string | number>>()
//# sourceMappingURL=pType.js.map