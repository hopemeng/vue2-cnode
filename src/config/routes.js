import App from '../app'

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/', // 首页
                component: resolve => require(['../pages/index/'], resolve)
            },
            {
                path: '/topic/:vid', // 查看帖子信息
                component: resolve => require(['../pages/topic/vid/'], resolve)
            },
            {
                path: '/login', // 登录
                component: resolve => require(['../pages/login/'], resolve)
            },
            {
                path: '/my/home', // 我的
                component: resolve => require(['../pages/my/home/'], resolve)
            },
            {
                path: '/user/:username', // 用户资料
                component: resolve => require(['../pages/user/'], resolve)
            },
            {
                path: '/topic/create/theme', // 发表话题
                component: resolve => require(['../pages/topic/create/theme'], resolve)
            },
            {
                path: '/my/messages/', //我的消息
                component: resolve => require(['../pages/my/messages/'], resolve)
            },
            {
                path: '/my/collect/', //我的收藏
                component: resolve => require(['../pages/my/collect/'], resolve)
            },
            {
                path: '/about/', //关于
                component: resolve => require(['../pages/about/'], resolve)
            },
        ]
    }
]

