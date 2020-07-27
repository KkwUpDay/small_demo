// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//引入css文件
import "./assets/css/reset.css"

//处理公共组件
import commontComponents from "./components/index"
for (var i in commontComponents) {
    Vue.component(i, commontComponents[i])
}

//处理过滤器
import filter from "./filter/index"
for (var i in filter) {
    Vue.filter(i, filter[i])
}

//处理vuex
import store from "./store"


//6.element-ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})