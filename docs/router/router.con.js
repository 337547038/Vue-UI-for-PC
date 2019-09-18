/**
 * Created by 337547038 on 2018/8/16 0016.
 */
/* const router = [
  {
    path: '/button',
    name: 'button',
    component: () => import('../docs/button.md')
    // group: 'form'
  },
  {
    path: '/cascader',
    name: 'cascader',
    component: () => import('../docs/cascader.md')
    // group: 'form'
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../docs/index.md')
    // group: 'form'
  }
] */
const router = [
  {
    path: '/form',
    name: 'form',
    component: () => import('../docs/form.md')
    // group: 'form'
  },
  {
    path: '/autoForm',
    name: 'autoForm',
    component: () => import('../docs/autoForm.md')
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../docs/index.md')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../docs/table.md')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../docs/select.md')
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('../docs/button.md')
  },
  {
    path: '/input',
    name: 'input',
    component: () => import('../docs/input.md')
  },
  {
    path: '/switch',
    name: 'switch',
    component: () => import('../docs/switch.md')
  },
  {
    path: '/datePicker',
    name: 'datePicker',
    component: () => import('../docs/datePicker.md')
  },
  {
    path: '/textarea',
    name: 'textarea',
    component: () => import('../docs/textarea.md')
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component: () => import('../docs/checkbox.md')
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import('../docs/radio.md')
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: () => import('../docs/dialog.md')
  },
  {
    path: '/dialogAlert',
    name: 'dialogAlert',
    component: () => import('../docs/dialogAlert.md')
  },
  {
    path: '/collapse',
    name: 'collapse',
    component: () => import('../docs/collapse.md')
  },
  {
    path: '/steps',
    name: 'steps',
    component: () => import('../docs/steps.md')
  },
  {
    path: '/tree',
    name: 'tree',
    component: () => import('../docs/tree.md')
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../docs/loading.md')
  },
  {
    path: '/pagination',
    name: 'pagination',
    component: () => import('../docs/page.md')
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: () => import('../docs/tabs.md')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../docs/upload.md')
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('../docs/icon.md')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../docs/menu.md')
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: () => import('../docs/swiper.md')
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('../docs/echarts.md')
  },
  {
    path: '/lazy',
    name: 'lazy',
    component: () => import('../docs/lazy.md')
  },
  {
    path: '/backTop',
    name: 'backTop',
    component: () => import('../docs/backTop.md')
  },
  {
    path: '/breadcrumb',
    name: 'breadcrumb',
    component: () => import('../docs/breadcrumb.md')
  },
  {
    path: '/cascader',
    name: 'cascader',
    component: () => import('../docs/cascader.md')
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import('../docs/progress.md')
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: () => import('../docs/transfer.md')
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      // keepAlive: true // 需要被缓存
    },
    component: () => import('../docs/test.vue')
  }
]
export default router
