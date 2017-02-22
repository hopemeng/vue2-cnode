<style lang="less" scoped>
    @import "../../../less/config";
    .collect-num {
        background-color: #F8F8F8;
        padding: 10px 10px;
        margin: 10px;
        color: #FF66FF
    }
    .msg-box {
        .list {
            padding: 0;
            margin: 0;
            li {
                position: relative;
                padding: 10px;
                list-style: none;
                border-bottom: 1px solid #eee;
                background: #fff;
                a {
                    width: 50px;
                }
                .name {
                    font-weight: bold;
                    line-height: 28px;
                    time {
                        padding-left: 5px;
                        font-size: 12px;
                        font-weight: normal;
                        color: #999;
                    }
                }
                .content {
                    padding: 5px 0;
                }
                .weidu {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 1;
                    width: auto;
                    text-align: right;
                    .iconfont {
                        font-size: 60px;
                        color: @text;
                    }
                }
            }
        }
    }
    .tip-login {
        position: absolute;
        top: 45%;
        left: 50%;
        z-index: 2;
        width: 140px;
        margin: 0 0 0 -60px;
        text-align: center;
        font-size: 14px;
    }
    
    .user-headimg {
        width: 38px;
        height: 38px;
        margin-right: 10px;
        border-radius: 50%;
        border: 1px solid #ddd;
        background-size: cover;
        background-color: #eee;
    }
    
    .markdown-body {
        padding: 5px;
        margin-top: 10px;
        border-radius: 5px;
        background: #eee;
    }
</style>
<template>
    <div>
        <v-header title="收藏">
            <div slot="left" class="item" flex="main:center cross:center" v-on:click="$router.go(-1)">
                <i class="iconfont icon-back"></i>
            </div>
        </v-header>
        <v-content>
            
            <div class="collect-num">共{{ list.length }}个话题收藏</div>
            <div class="msg-box" v-if="list.length">
                <ul class="list">
                    <li flex="box:first" v-for="(item, index) in list">
                        <router-link class="user" :to="'/user/' + item.author.loginname">
                            <div class="user-headimg" :style="{backgroundImage: 'url(' + item.author.avatar_url +')'}"></div>
                        </router-link>
                        <div>
                            <div class="name">{{ item.author.loginname }}
                                <time>{{ item.create_at | formatDate }}</time>
                            </div>
                            <div>      
                                <router-link style="color: #0099CC;" :to="'/topic/' +item.id">{{ item.title }}</router-link>
                            </div>
                            
                        </div> 
                        
                    </li>
                </ul>
            </div>
           
            <div class="tip-login" v-if="!user.id">
                你还未登录，请先<router-link to="/login">登录</router-link>
            </div>
        </v-content>
        
        <v-footer></v-footer>
    </div>
</template>
<script>
import { mapState } from 'vuex'
    export default {
        data() {
            return {
                list: [],
                msg: '你还未登录，请先'
            }
        },
        computed: mapState({ user: (state) => state.user }),
        created() {
            if(this.user.accesstoken) {
                this.getList()
            }   
        },
        methods: {
            getList() {
                this.$http.get('https://cnodejs.org/api/v1/topic_collect/JustforNode').then((response) => {
                    // success callback
                    this.list = response.body.data;
                }, (response) => {
                    // error callback
                });
            }
        }
    }
</script>