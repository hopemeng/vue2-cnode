<style lang="less" scoped>
    @import "../../../less/config";
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
        .tab-nav {
            margin-top: 8px;
            border-bottom: 1px solid #eee;
            background: #fff;
            li {
                line-height: 38px;
                text-align: center;
            
                font-size: 16px;
                &:last-of-type {
                    border: none;
                }
                &.on {
                    color: #CC3300;
                }
            }
        }
    }
    .nomsg {
        margin: 200px;
        text-align: center;
        color: #CC3300;
        font-size: 20px;
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
        <v-header title="消息">
            <div slot="left" class="item" flex="main:center cross:center" v-on:click="$router.go(-1)">
                <i class="iconfont icon-back"></i>
            </div>
        </v-header>
        <v-content>
            <div class="tip-login" v-if="!user.id">
                你还未登录，请先<router-link to="/login">登录</router-link>
            </div>
            
            <div class="msg-box">
                <ul class="tab-nav" flex="box:mean">
                    <li :class="{on: !tabIndex}" @click="getNotReadMessage" flex="cross:center main:center">未读消息</li>
                    <li :class="{on: tabIndex}" @click="getHasReadMessage" flex="cross:center main:center">已读消息</li>
                </ul>
                <ul class="list">
                    <li flex="box:first" v-for="(item, index) in list">
                        <router-link class="user" :to="'/user/' + item.author.loginname">
                            <div class="user-headimg" :style="{backgroundImage: 'url(' + item.author.avatar_url +')'}"></div>
                        </router-link>
                        <div>
                            <div class="name">{{ item.author.loginname }}
                                <time>{{ item.create_at | formatDate }}</time>
                            </div>
                            <div v-if="item.type == 'at'">
                                在话题
                                <router-link :to="'/topic/' + item.topic.id">{{ item.topic.title }}</router-link> 中 @了你
                            </div>
                            <div v-if="item.type == 'reply'">
                                回复了你的话题
                                <router-link :to="'/topic/' +item.topic.id">{{ item.topic.title }}</router-link>
                            </div>
                            <div class="markdown-body" v-html="item.reply.content"></div>
                        </div> 
                        <div class="weidu">
                            <i class="iconfont icon-weidu"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="list.length < 1" class="nomsg">～暂无消息～</div>
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
                msg: '你还未登录，请先',
                tabIndex: false,
                has_read_messages: [],
                hasnot_read_messages: []
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
                this.$http.get('https://cnodejs.org/api/v1/messages',{params: {accesstoken:this.user.accesstoken}}).then((response) => {
                    // success callback 
                    this.has_read_messages = response.body.data.has_read_messages;
                    this.hasnot_read_messages = response.body.data.hasnot_read_messages;
                    this.list = response.body.data.hasnot_read_messages;
                }, (response) => {
                    // error callback
                });
            },
            getNotReadMessage() {
                this.tabIndex = false;
                this.list = this.hasnot_read_messages;
            },
            getHasReadMessage() {
                this.tabIndex = true;
                this.list = this.has_read_messages;
            }
        }
    }
</script>