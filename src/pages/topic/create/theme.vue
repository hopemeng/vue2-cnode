<style lang="less" scoped>
    form {
        height: 100%;
    }
    
    .title {
        padding: 5px 10px;
    }
    
    .select {
        padding: 5px 10px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        select {
            padding: 0;
            border-radius: 5px;
            background: none;
        }
    }
    
    .con {
        padding: 5px 10px;
        textarea {
            line-height: 24px;
        }
    }
    
    input,
    select,
    textarea {
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        padding: 0 5px;
        line-height: 28px;
        border: none;
        font-size: 14px;
        resize: none;
    }
</style>
<template>
    <div>
        <v-header title="发表">
            <div slot="left" class="item" flex="main:center cross:center" v-on:click="$router.go(-1)">
                <i class="iconfont icon-back"></i>
            </div>
            <a class="item" flex="main:center cross:center" slot="right" @click="submit">
                <i class="iconfont icon-edit"></i>
            </a>
        </v-header>
        <v-content>
            <form flex="dir:top" @submit.prevent="submit">
                <div class="title">
                    <input type="text" placeholder="标题..." v-model="form.title">
                </div>
                <div class="select">
                    <select v-model="form.tab">
                        <option value="">请选择</option>
                        <option value="share">分享</option>
                        <option value="ask">问答</option>
                        <option value="job">招聘</option>
                    </select>
                </div>
                <div class="con" flex="dir:top" flex-box="1">
                    <textarea flex-box="1" placeholder="内容..." v-model="form.content"></textarea>
                </div>
            </form>
        </v-content>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import utils from '../../../util/utils'
    export default {
        computed: mapState({ user: (state) => state.user}),
        data() {
            return {
                form: {
                    tab: '',
                    content: '',
                    title: '',
                    topic_id: ''
                }
            }
        },
        methods: {
            submit() {
                var { form } = this;
                form.accesstoken = this.user.accesstoken
                if (!this.user.accesstoken){
                    utils.toast('请先登录')
                    return this.$router.push('/login');
                }else if (!form.title) {
                    return utils.toast('标题不能为空')
                } else if(!form.tab) {
                    return utils.toast('选项不能为空')
                } else if(!form.content) {
                    return utils.toast('内容不能为空')
                }

                this.$http.post('https://cnodejs.org/api/v1/topics',form).then((response) => {
                    // success callback
                    var topic_id = response.body.topic_id
                    this.$router.push({path: `/topic/${topic_id}`})               
                }, (err) => {
                    // error callback
                    util.toast(err)
                });
            }
        }
    }
</script>
        
                
