import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)


function havePower(url) {
    return store.state.user.menus_url.some(i => i == url)
}

let router = new Router({
    routes: [{
        path: "/login",
        component: () =>
            import ("../pages/login/login.vue")
    }, {
        path: "/",
        component: () =>
            import ("../pages/index/index.vue"),
        children: [{
                path: "banner",
                component: () =>
                    import ("../pages/banner/banner.vue"),
                name: "轮播图管理",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }

            },
            {
                path: "cate",
                component: () =>
                    import ("../pages/cate/cate"),
                name: "商品分类",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }
            },
            {
                path: "goods",
                component: () =>
                    import ("../pages/goods/goods"),
                name: "商品管理",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }
            },
            {
                path: "home",
                component: () =>
                    import ("../pages/home/home"),
                name: "首页"
            },

            {
                path: "manage",
                component: () =>
                    import ("../pages/manage/manage"),
                name: "管理员管理",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }
            },
            {
                path: "member",
                component: () =>
                    import ("../pages/member/member"),
                name: "会员管理",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }
            },
            {
                path: "menu",
                component: () =>
                    import ("../pages/menu/menu"),
                name: "菜单管理",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }
            },
            {
                path: "role",
                component: () =>
                    import ("../pages/role/role"),
                name: "角色管理",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }
            },
            {
                path: "seckill",
                component: () =>
                    import ("../pages/seckill/seckill"),
                name: "秒杀活动",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }
            },
            {
                path: "spec",
                component: () =>
                    import ("../pages/spec/spec"),
                name: "商品规格",
                beforeEnter(to, from, next) {
                    havePower('/menu') ? next() : next("/home")
                }
            },
            {
                path: "",
                redirect: "home"
            },
        ]
    }, ]
})



//登录拦截
router.beforeEach((to, from, next) => {
    //如果前往登录页面，next()
    if (to.path === "/login") {
        next()
        return;
    }
    //如果去的不是登录，就要判断store.user. user是true,next();user-null,next('/login')
    if (store.state.user) {
        next();
        return;
    }
    next("/login")
})


//暴露路由
export default router