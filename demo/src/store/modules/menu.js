//引入
import { requestMenuList } from "../../util/request"

const state = {
    //动态列表数据
    list: []
}
const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    }
}
const actions = {
    requestList(context) {

        requestMenuList({ istree: true }).then(res => { //{ istree: true }树状结构展示
            context.commit("changeList", res.data.list)
        })
    }
}
const getters = {
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}