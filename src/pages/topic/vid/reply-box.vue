<style lang="less" scoped>
    @import '../../../less/config';
    .reply-box {
        .text {
            padding: 5px 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            border: 1px solid #eee;
            textarea {
                box-sizing: border-box;
                width: 100%;
                line-height: 24px;
                border: none;
                font-size: 13px;
                resize: none;
                &:focus {
                    outline: none;
                }
            }
        }
        .btn {
            padding: 5px 30px;
            line-height: 24px;
            border-radius: 5px;
            border: 1px solid darken(@main, 3%);
            font-size: 14px;
            color: #fff;
            background: @main;
            &:focus {
                outline: none;
            }
        }
        .msg {
            padding: 5px 10px;
            line-height: 26px;
            color: red;
        }
    }
</style>
<template>
    <div class="reply-box">
        <form @submit.prevent="submit">
            <div class="text">
                <textarea :placeholder="loginname ? '@' + loginname : '发表你的看法...'" v-model="content"></textarea>
            </div>
            <div flex="main:right">
                <div class="msg"></div>
                <div flex-box="0"> <button class="btn">{{ btnname }}</button></div>
            </div>
        </form>
    </div>
</template>
<script>
    import util from '../../../util/utils'
    import { mapState } from 'vuex'
    export default {
        computed: mapState({ user: (state) => state.user}),
        props: {
            reply_id: { //评论的评论id，如果没有则是对主题的评论
                type: String,
                default: ''
            },
            loginname: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                btnname: '回复',
                content: ''
            }
        },
        methods: {
            submit() {
                if(!this.content) return util.toast('请输入回复内容')
                this.btnname = '回复中...'
                var { reply_id, content, loginname } = this
                var { vid } = this.$route.params
                if (reply_id) {
                    content = `@${loginname} ${content}`
                }
                this.$http.post(`https://cnodejs.org/api/v1/topic/${vid}/replies`, {reply_id : reply_id, content : content , accesstoken : this.user.accesstoken}).then((response) => {
                    // success callback
                    this.btnname = '回复'
                    this.content = ''; 
                    this.$emit('success')               
                }, (response) => {
                    this.btnname = '回复失败'
                });
            }
        },
        watch: {
            
        }
    }
</script>