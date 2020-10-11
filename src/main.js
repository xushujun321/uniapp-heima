import Vue from 'vue'
import App from './App'
//对请求方式进行挂载
import request from '@/utils/request'
Object.keys(request).forEach(key => Vue.prototype[key]=request[key])

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
