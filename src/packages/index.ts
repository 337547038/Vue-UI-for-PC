/**
 * Created by 337547038 on 2018/8/31 0031.
 */
import {App, provide, readonly} from 'vue'
// 所有需要全局注册的组件入口
import BackTop from './backTop/index.vue'
import Badge from './badge/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import {Button, ButtonGroup} from './button/index'
import {Carousel, CarouselItem} from './carousel/index'
import Cascader from './cascader/index.vue'
import {Collapse, CollapsePanel} from './collapse/index'
import Transition from './transition/index.vue'
import Input from './input/index.vue'
import {Radio, RadioGroup} from './radio/index'
import {Checkbox, CheckboxGroup} from './checkbox/index'
import Switch from './switch/index.vue'
import Textarea from './textarea/index.vue'
import {Select, Option} from './select/index'
import InputNumber from './inputNumber/index.vue'
import FormItem from './formItem/index.vue'
import Form from './form/index.vue'
import AutoForm from './autoForm/index.vue'
import DatePicker from './datePicker/index.vue'
import Pagination from './pagination/index.vue'
import {Table, TableColumn} from './table/index'
import {Tabs, TabPane} from './tabs/index'
import {Icon, Icons} from './icon/index'
import Dialog from './dialog/index.vue'
import Message from './message/index'
import ColorPicker from './colorPicker/index.vue'
import Progress from './progress/index.vue'
import Tooltip from './tooltip/index.vue'
import Loading from './loading'
import Lazy from './lazy'
import Tree from './tree/index.vue'
import './theme/index.scss'
const component = [
  BackTop,
  Badge,
  Breadcrumb,
  Button, ButtonGroup,
  Carousel, CarouselItem,
  Cascader,
  Collapse, CollapsePanel,
  Transition,
  Input,
  Radio, RadioGroup,
  Checkbox, CheckboxGroup,
  Switch,
  Textarea,
  Select, Option,
  InputNumber,
  FormItem,
  Form,
  DatePicker,
  Pagination,
  AutoForm,
  Table, TableColumn,
  Dialog,
  Tabs, TabPane,
  ColorPicker,
  Progress,
  Tooltip,
  Tree,
  Icon, Icons
]

/*
const install = function (Vue, options) {
  component.forEach(item => {
    Vue.component(item.name, item)
  })
  /!*Vue.prototype.$dialog = DialogAlert.Dialog
  Vue.prototype.$dialogClear = DialogAlert.Clear
  Vue.prototype.$alert = DialogAlert.Alert
  Vue.prototype.$msg = DialogAlert.Msg
  Vue.prototype.$loading = Loading*!/
  // Vue.use(Loading)
  /!*Vue.use(Loading.directive)*!/
}
export default install*/

export default (app: App): void => {
  component.forEach(item => {
    app.component(item.name, item)
  })
  // message
  app.config.globalProperties.$alert = Message.alert
  app.config.globalProperties.$msg = Message.msg
  app.config.globalProperties.$dialog = Message.dialog
  app.config.globalProperties.$clear = Message.clear
  app.provide('Message', readonly(Message))
  // loading
  app.config.globalProperties.$loading = Loading.Loading
  app.provide('Loading', readonly(Loading))
  app.use(Loading.vLoading)
  // lazy
  app.use(Lazy)
}
