/**
 * Created by 337547038 on 2018/8/31 0031.
 */
// 所有需要全局注册的组件入口
import Button from './button/index'
import {Collapse, CollapsePanel} from './collapse/index'
import {Checkbox, CheckboxGroup} from './checkbox/index'
import DatePicker from './datePicker/index'
import {Dialog, DialogAlert} from './dialog/index'
import {Form, FormItem, AutoForm} from './form/index'
import Input from './input/index'
import Loading from './loading/index'
import {Radio, RadioGroup} from './radio/index'
import Select from './select/index'
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
import BackTop from './backTop/index'
import Breadcrumb from './breadcrumb/index'
import Cascader from './cascader/index'
import Progress from './progress/index'
import Transfer from './transfer/index'
import Steps from './steps/index'
import Tooltip from './tooltip/index'
import ColorPicker from './colorPicker'
import Transition from './transition'
import Slider from './slider'
import Badge from './badge'
import {Icon, Icons} from './icon'

const component = [
  Button,
  Dialog,
  Form, FormItem,
  Input,
  Select,
  Switch,
  Table, TableColumn,
  DatePicker,
  Checkbox, CheckboxGroup,
  Tabs, TabPane,
  Textarea,
  Radio, RadioGroup,
  Collapse, CollapsePanel,
  Pagination,
  AutoForm,
  Swiper,
  SwiperItem,
  Tree,
  Upload,
  ImgCrop,
  Menu,
  ECharts,
  BackTop,
  Breadcrumb,
  Cascader,
  Progress,
  Transfer,
  Steps,
  Tooltip,
  ColorPicker,
  Transition,
  Slider,
  Icon,
  Icons,
  Badge
]
const install = function (Vue, options) {
  component.forEach(item => {
    Vue.component(item.name, item)
  })
  Vue.prototype.$dialog = DialogAlert.Dialog
  Vue.prototype.$dialogClear = DialogAlert.Clear
  Vue.prototype.$alert = DialogAlert.Alert
  Vue.prototype.$msg = DialogAlert.Msg
  // Vue.prototype.$loading = Loading
  Vue.use(Loading)
}
export default install

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
