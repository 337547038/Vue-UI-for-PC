/**
 * Created by 337547038 on 2018/8/31 0031.
 */
import {App, provide,readonly} from 'vue'
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
import {Dialog, MessageBox} from './dialog/index'
/*

/*import {Dialog, DialogAlert} from './dialog/index'
import Loading from './loading/index'

import Tree from './tree/index'
import {Upload, ImgCrop} from './upload/index'
import Menu from './menu/index'
import ECharts from './echarts/index'

import Progress from './progress/index'
import Transfer from './transfer/index'
import Steps from './steps/index'
import Tooltip from './tooltip/index'
import ColorPicker from './colorPicker'
import Slider from './slider'
import {Icon, Icons} from './icon'

import {Dropdown, DropdownItem} from './dropdown'
import {Carousel, CarouselItem} from './carousel'*/
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
  Tabs, TabPane,
  Dialog
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
  console.log(app)
  console.log('------')
  component.forEach(item => {
    app.component(item.name, item)
  })
  app.config.globalProperties.$alert = MessageBox.alert
  app.config.globalProperties.$msg = MessageBox.msg
  app.config.globalProperties.$dialog = MessageBox.dialog
  app.config.globalProperties.$clear = MessageBox.clear
  app.provide('MessageBox', readonly(MessageBox))
}
