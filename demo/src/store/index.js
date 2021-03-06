import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

//引入module中的模块
// import  from ""

//引入mutations和actions
import { state, mutations, getters } from "./mutations"
import actions from "./actions"

//引入menu/role
import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage"
import cate from "./modules/cate"
import spec from "./modules/spec"
import goods from "./modules/goods"
import member from "./modules/member"
import banner from "./modules/banner"
import seckill from "./modules/seckill"






export default new Vuex.Store({ //直接暴露出去
    state,
    mutations,
    getters,
    actions,
    modules: {
        menu,
        role,
        manage,
        cate,
        spec,
        goods,
        member,
        banner,
        seckill
    }
})