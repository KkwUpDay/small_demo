//引入
import { requestMemberList } from "../../util/request"

const state = {
    //动态数据列表
    list: [],
}


const mutations = {
    //修改list列表
    changeList(state, arr) {
        state.list = arr
    },
}


const actions = {
    //获取列表数据
    requestList(context) {
        requestMemberList().then(res => {
            context.commit("changeList", res.data.list)
        })
    },

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