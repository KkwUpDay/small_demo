//引入
import { requestBannerList } from "../../util/request"

export const state = {
    list: [],
}

export const mutations = {
    //修改list列表
    changeList(state, arr) {
        state.list = arr
    },

}

export const actions = {
    //获取当前列表数
    requestList(context) {
        requestBannerList().then(res => {
            context.commit("changeList", res.data.list)
        })
    },

}

export const getters = {
    list(state) {
        return state.list
    },

}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}