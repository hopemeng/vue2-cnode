<style lang="less" scoped>
    @import '../../../less/config';
    .datas {
        padding: 10px;
        border-bottom: 1px solid #eee;
        .tit {
            position: relative;
            padding: 10px 0;
            margin: 0;
            line-height: 24px;
            font-weight: bold;
            font-size: 22px;
            text-align: center;
            color: @text;
        }
        .bottom {
            .item {
                padding: 0 5px;
                color: #666;
                .iconfont {
                    padding-right: 3px;
                }
            }
        }
    }
    
    .re-list {
        li {
            padding: 10px;
            border-bottom: 1px solid #eee;
            list-style: none;
        }
        .headimg {
            padding-right: 10px;
            .pic {
                overflow: hidden;
                display: block;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: 1px solid #ddd;
                background-color: #eee;
                background-position: center center;
                background-size: cover;
            }
        }
        .bd {
            .common {
                margin-left: 4px;
                line-height: 17px;
                font-size: 16px;
                padding: 8px 16px;
                border: 1px solid #f5f5f5;
                font-style: normal;
                color: #fff;
                border-radius: 3px;
                -webkit-border-radius: 3px;
                -moz-border-radius: 3px;
                -o-border-radius: 3px;
            }
            .collect {               
                background-color: #FF6633;            
            }
            .de_collect {        
                background-color: #9D9D9D;       
            }
        }
        
        
        time {
            padding-left: 10px;
            font-size: 12px;
        }
        .num {
            font-size: 13px;
        }
        .bottom {
            .icon {
                position: relative;
                padding: 5px 10px;
                &.fabulous {
                    color: @main;
                }
                em {
                    font-size: 13px;
                    font-style: normal;
                }
            }
        }
        .markdown-body {
            padding: 10px 0;
        }
        .replies-count {
            border-left: 5px solid @main;
            em {
                font-style: normal;
                color: @main;
            }
        }
    }
    
    .reply {
        padding: 50px 10px;
    }
    
    .tip-login {
        padding: 100px;
        text-align: center;
    }
</style>
<template>
    <div>
        <v-header title="主题">
            <div slot="left" class="item" flex="main:center cross:center" v-on:click="$router.go(-1)">
                <i class="iconfont icon-back"></i>
            </div>
        </v-header>
        <v-content style="bottom: 0;">
            <v-loading v-if="!theme.id && existinstance"></v-loading>
            <v-nodata v-if="!existinstance" msg="话题不存在"></v-nodata>
            <template v-if="theme.id">
                <ul class="re-list">
                    <!-- 楼主信息 start -->
                    <li flex="box:first">
                        <div class="headimg">
                            <router-link class="pic" :to="'/user/' + theme.author.loginname" :style="{ backgroundImage: 'url(' + theme.author.avatar_url + ')' }"></router-link>
                        </div>
                        <div class="bd">
                            <div flex>
                                <router-link flex-box="0" :to="'/user/' + theme.author.loginname">{{ theme.author.loginname }}</router-link>
                                <time flex-box="1">发布于{{ theme.create_at | formatDate}}</time>
                                <input v-if="user.accesstoken" flex-box="0" :class="theme.is_collect ? 'common de_collect' : 'common collect'" type="button" :value="theme.is_collect ? '取消收藏' : '收藏'" @click="collect">
                            </div>
                        </div>
                    </li>
                    <!-- 楼主信息 end -->
                    <!-- 主题信息 start -->
                    <li>
                        <div class="datas">
                            <div class="tit">{{ theme.title }}</div>
                            <div class="bottom" flex="main:center">
                                <div class="item click" flex="main:center cross:center">
                                    <i class="iconfont icon-click"></i>
                                    <div class="num">{{ theme.visit_count }}</div>
                                </div>
                                <div class="item reply" flex="main:center cross:center">
                                    <i class="iconfont icon-comment"></i>
                                    <div class="num">{{ theme.reply_count }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="markdown-body" v-html="theme.content"></div>
                    </li>
                    <!-- 主题信息 end -->
                    <li class="replies-count" v-if="theme.replies.length">
                        共(<em>{{ theme.replies.length }}</em>)条回复
                    </li>
                    <!-- 主题评论 start -->
                    <li v-for="(item, index) in theme.replies">
                        <div flex="box:first">
                            <div class="headimg">
                                 <router-link class="pic" :to="'/user/' + item.author.loginname" :style="{ backgroundImage: 'url(' + item.author.avatar_url + ')' }"></router-link>
                            </div>
                            <div class="bd">
                                <div flex>
                                    <router-link flex-box="0" :to="'/user/' + item.author.loginname">{{ item.author.loginname }}</router-link>
                                    <time flex-box="1">{{ item.create_at | formatDate }}</time>
                                    <div flex-box="0" class="num">#{{ index + 1 }}</div>
                                </div>
                                <div class="markdown-body" v-html="item.content"></div>
                                <div class="bottom" flex="dir:right cross:center">
                                    <div class="icon" @click="commentShow(item, index)">
                                        <i class="iconfont icon-comment-topic"></i>
                                    </div>
                                    <div class="icon" :class="{fabulous: testThing(item.ups)}" v-if="item.author.loginname !== user.loginname" @click="fabulousItem(item)">
                                        <i class="iconfont icon-comment-fabulous"></i>
                                        <em v-if="item.ups.length">{{ item.ups.length }}</em>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <reply-box v-if="item.comment" :loginname="item.author.loginname" :reply_id="item.id" @success="getTheme"></reply-box>
                    </li>
                    <!-- 主题评论 end -->
                </ul>
                <div class="reply" v-if="user.id">
                    <reply-box @success="getTheme"></reply-box>
                </div>
                <div class="tip-login" v-if="!user.id">
                    你还未登录，请先<router-link to="/login">登录</router-link>
                </div>
            </template>
        </v-content>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import replyBox from './reply-box'
    export default {
        components: { replyBox },
        computed: mapState({ user: (state) => state.user}),
        data() {
            return {
                existinstance: true, 
                theme: {},
            }      
        },
        created() {
            this.getTheme()
        },
        methods: {
            getTheme() {
                let vid = this.$route.params.vid
                let url = 'https://cnodejs.org/api/v1/topic/'+vid;
                if (this.user.accesstoken) {
                    url += `?accesstoken=${this.user.accesstoken}`
                }
                
                this.$http.get(url).then((response) => {
                    // success callback
                    response.body.data.replies.forEach((item) => item.comment = false)
                    this.theme = response.body.data; 
                }, (response) => {
                    this.existinstance = false
                });
            },
            commentShow(item) { //显示隐藏回复框
                if(!this.user.accesstoken) return this.$router.push('/login')
                item.comment = !item.comment
            },
            testThing(ups) { // 是否已经点过赞
                return ups.indexOf(this.user.id) > -1
            },
            fabulousItem({ups, id}) { //点赞
                if(!this.user.accesstoken) return this.$router.push('/login');
                let index = ups.indexOf(this.user.id)
                if(index > -1){
                    ups.splice(index, 1)
                } else {
                    ups.push(this.user.id)
                }
                let url = `https://cnodejs.org/api/v1/reply/${id}/ups`
                this.$http.post(url, {accesstoken:this.user.accesstoken}).then((response) => {
                    // success callback
                }, (response) => {
                });
            },
            collect() { // 收藏
                let url = 'https://cnodejs.org/api/v1/topic_collect/collect'
                if (this.theme.is_collect) {
                    url = 'https://cnodejs.org/api/v1/topic_collect/de_collect'
                }
                this.$http.post(url, {accesstoken:this.user.accesstoken, topic_id: this.theme.id}).then((response) => {
                    // success callback
                    this.theme.is_collect = !this.theme.is_collect
                }, (response) => {
                });
            },
        },
    }
</script>
