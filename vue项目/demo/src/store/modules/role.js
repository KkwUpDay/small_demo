//引入
import { requestRoleList } from "../../util/request"

const state = {
    //动态数据列表
    list: []
}


const mutations = {
    //修改list列表
    changeList(state, arr) {
        state.list = arr
    }
}


const actions = {
    requestList(context) {
        requestRoleList().then(res => {
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