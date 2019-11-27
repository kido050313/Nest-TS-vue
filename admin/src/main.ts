import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import './plugins/element'
import './plugins/avue'
import router from './router'
// import EleForm from 'vue-ele-form'

// Vue.use(EleForm)

Vue.config.productionTip = false

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

// avue上传图片使用
Vue.prototype.$httpajax = http

// http请求使用
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
