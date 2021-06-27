1.mixins
https://blog.csdn.net/u010059669/article/details/111688244

2.TS2339:Property 'b' does not exist on type '{}'
  a().b=>a()[b]

3.对象添加值
 let obj={}  obj.a='a' => obj[a]='1'

4.import {h, renderSlot} from 'vue'

5.TS7053 object动态取值时报错
const obj1 = {name: 'name2', key: 'key2', value: 'value2'}
const obj2: { [index: string]: any; } = {name: 'name2', key: 'key2', value: 'value2'}
const key =  'name'
console.log(obj1[name]) // 报错
console.log(obj2[name]) // 正确
或者https://www.cnblogs.com/honkerzh/p/13918294.html


// 标签类型
Event
Element
MouseEvent
HTMLElement
HTMLInputElement   const inputElRef = ref<HTMLInputElement>()
HTMLDivElement
HTMLInputElement

// 定义
1.const obj: { [index: number]: any; }
2.const a:array<pro>=[]
type cityProps = {
name: string
children: any
}
3. ref<any>([]
4.let array: Array<any> = []

props: {
callback: {
type: Function as PropType<() => void>},
book: {
type: Object as PropType<Book>,
}
}
解勾
const title = toRef(props, 'title')
const { title } = toRefs(props) // title.value

todo
cascader/index.vue controlChange

// 
1.表单重置默认值问题

