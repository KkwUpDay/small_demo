//引入
import { requestSeckillList } from "../../util/request"

export const state = {
    //动态数据列表
    list: []
}


export const mutations = {
    //修改list列表
    changeList(state, arr) {
        state.list = arr
        console.log(arr, '2324234 ');
    }
}


export const actions = {
    requestList(context) {
        requestSeckillList().then(res => {
            context.commit("changeList", res.data.list)
        })
    }
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