import axios from "axios"
import qs from "qs"
import store from "../store"
import { warningAlert } from "./alert"
import router from "../router"

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
// const baseUrl = ""

//-----------登录-------------------
export const requestLogin = params => axios({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: qs.stringify(params)
})

//-----------------------菜单-----------------------
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

// -----------------------角色-----------------------
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



//-----------------------管理员-----------------------
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








//-----------------------商品分类-----------------------
//商品分类添加

export const requestCateAdd = (params) => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: formData
    })
}


//商品分类列表
export const requestCateList = (params) => axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params
})

//获取某一个数据
export const requestCateDetail = params => axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params
})

//商品分类修改
export const requestCateUpdate = params => {
        var formData = new FormData()
        for (let i in params) {
            formData.append(i, params[i])
        }
        return axios({
            url: baseUrl + "/api/cateedit",
            method: "post",
            data: formData
        })
    }
    //商品分类删除
export const requestCateDelete = params => axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify(params)
})






//-----------------------商品规格-----------------------

//商品规格添加
export const requestSpecAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//商品规格总数
export const requestSpecCount = () => {
        return axios({
            url: baseUrl + "/api/specscount",
            method: "get",
        })
    }
    //商品规格列表
export const requestSpecList = (params) => axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params
})

//商品规格获取一条
export const requestSpecDetail = (params) => axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params
})

//商品规格修改
export const requestSpecUpdate = (params) => axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(params)
})

//商品规格删除
export const requestSpecDelete = params => axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify(params)
})












//-----------------------商品管理-----------------------

//商品添加
export const requestGoodsAdd = (params) => {
    //有文件上传需要formData
    let formDate = new FormData()
    for (let i in params) {
        formDate.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: formDate
    })
}

//商品总数
export const requestGoodsCount = () => {
        return axios({
            url: baseUrl + "/api/goodscount",
            method: "get",
        })
    }
    //商品列表
export const requestGoodsList = (params) => axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params
})

//商品获取一条
export const requestGoodsDetail = (params) => axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params
})

//商品修改
export const requestGoodsUpdate = (params) => {
        //有文件上传需要formData
        let formDate = new FormData()
        for (let i in params) {
            formDate.append(i, params[i])
        }
        return axios({
            url: baseUrl + "/api/goodsedit",
            method: "post",
            data: formDate
        })
    }
    //商品删除
export const requestGoodsDelete = params => axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: qs.stringify(params)
})










//-----------------------会员管理-----------------------

// //会员添加
// export const requestMemberAdd = (params) => {
//     return axios({
//         url: baseUrl + "/api/goodsadd",
//         method: "post",
//         data: qs.stringify(params)
//     })
// }

// //会员总数
// export const requestMemberCount = () => {
//         return axios({
//             url: baseUrl + "/api/goodscount",
//             method: "get",
//         })
//     }


//会员列表
export const requestMemberList = (params) => axios({
    url: baseUrl + "/api/memberlist",
    method: "get",
    params
})

//会员获取一条
export const requestMemberDetail = (params) => axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params
})

//会员修改
export const requestMemberUpdate = (params) => axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(params)
})

// //会员删除
// export const requestMemberDelete = params => axios({
//     url: baseUrl + "/api/goodsdelete",
//     method: "post",
//     data: qs.stringify(params)
// })







//-----------------------轮播图管理-----------------------

//轮播图添加
export const requestBannerAdd = (params) => {
    //有文件上传需要formData
    let formDate = new FormData()
    for (let i in params) {
        formDate.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: formDate
    })
}

//轮播图列表
export const requestBannerList = (params) => axios({
    url: baseUrl + "/api/bannerlist",
    method: "get",
    params
})

//轮播图获取一条
export const requestBannerDetail = (params) => axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params
})

//轮播图修改
export const requestBannerUpdate = (params) => {
        //有文件上传需要formData
        let formDate = new FormData()
        for (let i in params) {
            formDate.append(i, params[i])
        }
        return axios({
            url: baseUrl + "/api/banneredit",
            method: "post",
            data: formDate
        })
    }
    //轮播图删除
export const requestBannerDelete = params => axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: qs.stringify(params),
})






//-----------------------秒杀活动-----------------------

//秒杀商品添加
export const requestSeckillAdd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//秒杀商品列表
export const requestSeckillList = (params) => axios({
    url: baseUrl + "/api/secklist",
    method: "get",
    params
})

//秒杀商品获取一条
export const requestSeckillDetail = (params) => axios({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params
})

//秒杀商品修改
export const requestSeckillUpdate = (params) => axios({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data: qs.stringify(params)
})

//秒杀商品删除
export const requestSeckillDelete = params => axios({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data: qs.stringify(params)
})