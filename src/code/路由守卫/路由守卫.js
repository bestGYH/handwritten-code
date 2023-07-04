
// 该文件专门用于穿件整个应用的路由器
import VueRouter from 'vue-router'
import store from '@/store';

// 创建一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/home',
            meta: {
                // 是否授权
                isAuth: true,
                permissionKey: 'home',
                title: '首页'
            },
            component: () => import("@/pages/home"), // 组件路径
        },
        {
            name: 'detail',
            path: '/detail',
            meta: {
                // 是否授权
                isAuth: true,
                title: '详情',
                permissionKey: 'detail',
            },
            component: () => import("@/pages/detail"), // 组件路径
            beforeEnter: (to, from, next) => {
                const { meta } = to
                //  判断是否需要鉴定一下权限
                if (meta.isAuth) {
                    if (localStorage.getItem('permissionList').includes(meta.permissionKey)) {
                        next()
                    } else {
                        alert(`无权限查看${meta.title}`)
                    }
                } else {
                    next()
                }
            }

        }
    ]
})

router.beforeEach((to, from, next) => {
    const { meta } = to
    //  判断是否需要鉴定一下权限
    if (meta.isAuth) {
        if (localStorage.getItem('permissionList').includes(meta.permissionKey)) {
            next()
        } else {
            alert(`无权限查看${meta.title}`)
        }
    } else {
        next()
    }

})
router.afterEach((to) => {
  store.commit('system/setPageTabs',to);
})
export default router




