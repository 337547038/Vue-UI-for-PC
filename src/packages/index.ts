/**
 * Created by 337547038 on 2018/8/31 0031.
 */
import {App} from 'vue'
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
/*import DatePicker from './datePicker/index'
import {Dialog, DialogAlert} from './dialog/index'
import {Form, FormItem, AutoForm} from './form/index'
import Input from './input/index'
import Loading from './loading/index'

import {Select, Option} from './select/index'
import Switch from './switch/index'
import {Table, TableColumn} from './table/index'
import {Tabs, TabPane} from './tabs/index'
import Textarea from './textarea/index'
import Pagination from './pagination/index'
import {Swiper, SwiperItem} from './swiper/index'
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
import InputNumber from './inputNumber'
import {Dropdown, DropdownItem} from './dropdown'
import {Carousel, CarouselItem} from './carousel'*/

const component = [
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Carousel,
  CarouselItem,
  Cascader,
  Collapse,
  CollapsePanel,
  Transition,
  Input,
  Radio, RadioGroup,
  Checkbox, CheckboxGroup
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
}
