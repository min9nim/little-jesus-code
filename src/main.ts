import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
// import ElementUI from 'element-ui'
import Tag from 'element-ui/lib/tag'
import Input from 'element-ui/lib/input'
import Tabs from 'element-ui/lib/tabs'
import TabPane from 'element-ui/lib/tab-pane'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
// import locale from 'element-ui/lib/locale/lang/ko'
import {setApiServer, initSentry} from '@/utils'

setApiServer()
initSentry(Vue)

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(Tag)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
