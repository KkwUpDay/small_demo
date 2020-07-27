import axios from "axios"
import qs from "qs"

//响应拦截
axios.interceptors.response.use(res => {
    console.group("本次路径：" + res.config.url)
    console.log(res)
    console.groupEnd()
    return res;
})


//基础路径
const baseUrl = "/api"

//基础路径上线时候打开
// const baseUrl=""

//-------------------------------------菜单--------------------------------------------------
//菜单添加

export const requestMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}


//菜单列表
export const requestMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}

//获取菜单的某一条数据
export const requestMenuDetail = (params) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: params
    })
}


//修改菜单
export const requestMenuUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}


//删除菜单的某一条数据
export const requestMenuDelete = (params) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}

// -------------------------------------角色--------------------------------------------------
//角色添加

export const requestRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}


//角色列表
export const requestRoleList = () => axios({
    url: baseUrl + "/api/rolelist",
    method: "get",
})

//获取某一个角色
export const requestRoleDetail = params => axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params
})

//角色修改
export const requestRoleUpdate = params => axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(params)
})

//角色删除
export const requestRoleDelete = params => axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify(params)
})



//-------------------------------------管理员--------------------------------------------------
//管理员添加
export const requestManageAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const requestManageCount = () => {
        return axios({
            url: baseUrl + "/api/usercount",
            method: "get",
        })
    }
    //管理员列表
export const requestManageList = (params) => axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params
})

//管理员获取一条
export const requestManageDetail = (params) => axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params
})

//管理员修改
export const requestManageUpdate = (params) => axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(params)
})

//管理员删除
export const requestManageDelete = params => axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify(params)
})