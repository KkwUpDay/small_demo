// 引入
import { requestCateList } from "../../util/request"

export const state = {
    list: []
}
export const mutations = {
    //修改list列表
    changeList(state, arr) {
        state.list = arr
    }
}
export const actions = {
    //获取当前列表数据
    requestList(context) {
        //获取当前页的页数和一页的数量
        requestCateList({ istree: true }).then(res => {
            context.commit("changeList", res.data.list)
        })
    },
}
export const getters = {
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