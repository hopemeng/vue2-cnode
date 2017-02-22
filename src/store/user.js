import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
    state: JSON.parse(sessionStorage.getItem('user')) || {},
    mutations: { // sessionStorage只能存储字符串类型的对象
        [USER_SIGNIN](state, user) {
            sessionStorage.setItem('user', JSON.stringify(user))
            Object.assign(state, user)
        },
        [USER_SIGNOUT](state) {
            sessionStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [USER_SIGNIN](context, user) {
            context.commit(USER_SIGNIN, user)
        },
        [USER_SIGNOUT](context) {
            context.commit(USER_SIGNOUT)
        }
    }
}