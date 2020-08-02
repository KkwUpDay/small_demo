//引入
import { requestGoodsList, requestGoodsCount } from "../../util/request"

export const state = {
    list: [],
    //一页的数量
    size: 5,
    //数据总数量
    total: 0,
    //当前的页码
    page: 1
}

export const mutations = {
    //修改list列表

    changeList(state, arr) {
        state.list = arr
    },
    //修改总数
    changeTotal(state, num) {
        state.total = num
    },
    //修改当前页码
    changePage(state, page) {
        state.page = page
    }
}

export const actions = {
    //获取当前列表数
    requestList(context) {
        //获取当前页的页数和一页的数量
        const params = {
            page: context.state.page,
            size: context.state.size
        }
        requestGoodsList(params).then(res => {
            context.commit("changeList", res.data.list)
        })
    },
    //获取总的数量
    requestTotal(context) {
        requestGoodsCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //获取修改页码
    changePage(context, page) {
        context.commit("changePage", page)
    }
}

export const getters = {
    list(state) {
        return state.list
    },
    //分页使用
    total(state) {
        return state.total;
    },
    size(state) {
        return state.size
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}