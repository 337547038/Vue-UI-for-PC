// props类型检验
// import {defineComponent} from 'vue'
import {PropType} from 'vue'

/*interface test {
  name: string
  children: any
}*/
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
}
type TypeKey = keyof typeof TYPES

export default {
  // type:null
  any() {
    return {
      type: null
    }
  },
  // type:String
  string(d?: string) {
    return {
      type: String,
      default: d
    }
  },
  // type:Number
  number(d?: number) {
    return {
      type: Number,
      default: d
    }
  },
  // type:Boolean
  bool(d = false) {
    return {
      type: Boolean,
      default: d
    }
  },
  // type:Object
  object(d = {}) {
    return {
      type: Object,
      default: function () {
        return d
      }
    }
  },
  // type:Array
  array<T>(d?: Array<any>) {
    return {
      type: Array as PropType<T[]>,
      default: function () {
        return d
      }
    }
  },
  // type:Function
  func() {
    return {
      type: Function
    }
  },
  // type:[String,Number]
  /*  oneOfType2(list: [], d: any) {
    return {
      type: list,
      default: d
    }
  },*/
  oneOfType(list: [], d?: any) {
    const types = list.map(prop => {
      return prop['type']
    })
    return {
      type: types,
      default: d
    }
  },
  // type:
  oneOfString(list: Array<any>, d?: any) {
    return {
      validator: function (value: string) {
        return list.indexOf(value) !== -1
      },
      default: d
    }
  }
}
// https://cloud.tencent.com/developer/article/1776214
// https://v3.cn.vuejs.org/guide/typescript-support.html#%E6%B3%A8%E8%A7%A3-props
// <Array<string | number>>()
