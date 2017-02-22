<style lang="less" scoped>
    @import "../../less/config";
    .nav {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 10;
        border-bottom: 1px solid #ddd;
        ul {
            overflow: hidden;
            padding: 0;
            margin: 0;
            li {
                position: relative;
                list-style: none;
                line-height: 49px;
                text-align: center;
            }
            a {
                display: block;
                text-decoration: none;
                font-size: 14px;
                color: lighten(@text, 50%);
            }
            .active {
                &:after {
                    content: "";
                    position: absolute;
                    right: 0;
                    left: 0;
                    top: 46px;
                    bottom: 1px;
                    z-index: 1;
                    height: 3px;
                    background: #4F9D9D;
                }
                a {
                    color: @text;
                }
            }
        }
    }

    .list {
        overflow: hidden;
        padding: 0;
        margin: 0;
        background: #eee;
        li {
            position: relative;
            padding: 15px 15px 0 15px;
            margin-bottom: 15px;
            list-style: none;
            box-shadow: 0 0 5px #ccc;
            background: #fff;
        }
        .top {
            height: 40px;
            .headimg {
                overflow: hidden;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 1px solid #ddd;
                background-position: center center;
                background-size: cover;
            }
            .box {
                padding-left: 5px;
                strong {
                    line-height: 24px;
                    font-size: 16px;
                    font-weight: normal;
                    color: darken(@text, 10%);
                }
                time {
                    line-height: 16px;
                    font-size: 12px;
                    font-style: normal;
                    color: #aaa;
                }
                .tag {
                    margin-left: 4px;
                    line-height: 17px;
                    font-size: 14px;
                    padding: 2px 4px;
                    font-style: normal;
                    color: #fff;
                    background-color: #9393FF;
                    border-radius: 3px;
                    -webkit-border-radius: 3px;
                    -moz-border-radius: 3px;
                    -o-border-radius: 3px;
                }
            }
        }
        .tit {
            padding: 10px 0;
            line-height: 22px;
            font-size: 16px;
            font-weight: bold;
            color: @text;
        }
    }

    .expand {
        padding: 10px 0;
        border-top: 1px solid #e1e1e1;
        text-align: center;
        .item {
            padding: 0 10px;
            line-height: 20px;
            text-align: center;
            border-right: 1px solid #e1e1e1;
            &:last-of-type {
                border: none;
            }
            .iconfont {
                color: #aaa;
            }
            .time {
                padding-left: 3px;
                font-size: 12px;
                color: #aaa;
            }   
        }
    }
</style>
<template>
	<div>
		<nav class="nav">
			<ul flex="box:mean">
				<li :class="{ active: !this.$route.query.tab }">
					<router-link to="/">全部</router-link>
				</li>
				<li :class="{ active: this.$route.query.tab == 'good' }">
                    <router-link to="/?tab=good">精华</router-link>
                </li>
                <li :class="{ active: this.$route.query.tab == 'share' }">
                    <router-link to="/?tab=share">分享</router-link>
                </li>
                <li :class="{ active: this.$route.query.tab == 'ask' }">
                    <router-link to="/?tab=ask">问答</router-link>
                </li>
                <li :class="{ active: this.$route.query.tab == 'job' }">
                    <router-link to="/?tab=job">招聘</router-link>
                </li>
            </ul>
		</nav>
        <v-content>
            <ul class="list">
                <li v-for="item in list" :key="item.id">
                    <router-link :to="'/topic/' + item.id">
                        <div class="top" flex="box:first">
                            <div class="headimg" :style="{ backgroundImage: 'url(' + item.author.avatar_url + ')' }"></div>
                            <div class="box" flex="dir:top">
                                <strong>{{ item.author.loginname }}</strong>
                                <div flex>
                                    <time>{{ item.create_at | formatDate}}</time>
                                    <span class="tag">{{ item.tabname }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="common-typeicon" flex v-if="item.good || item.top">
                            <div class="icon" v-if="item.good">
                                <i class="iconfont icon-topic-good"></i>
                            </div>
                            <div class="icon" v-if="item.top">
                                <i class="iconfont icon-topic-top"></i>
                            </div>
                        </div>
                        <div class="tit">{{ item.title }}</div>
                        <div class="expand" flex="box:mean">
                            <div class="item click" flex="main:center cross:center">
                                <i class="iconfont icon-click"></i>
                                <div class="num">{{ item.visit_count > 0 ? item.visit_count : '暂无阅读' }}</div>
                            </div>
                            <div class="item reply" flex="main:center cross:center">
                                <i class="iconfont icon-comment"></i>
                                <div class="num">{{ item.reply_count > 0 ? item.reply_count : '暂无评论' }}</div>
                            </div>
                            <div class="item last-reply" flex="main:center cross:center">
                                <time class="time">{{ item.last_reply_at | formatDate }}</time>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <v-loading :complete='complete' :loading='loading' @seeing="seeing"></v-loading>
        </v-content>
        <v-footer></v-footer>
	</div>
    
</template>    
<script>
    export default {
        data() {
            return {
                list: [],
                page: 1,
                loading: false, //是否在加载中
                complete: false, //数据是否全部加载完成
            }      
        },
        created() {
            this.pullList()
        },
        methods: {
            pullList() {
                if (this.loading) return
                this.loading = true
                this.$http.get('https://cnodejs.org/api/v1/topics',{params:{page:this.page, tab: this.$route.query.tab || 'all'}}).then((response) => {
                    // success callback
                    if (response.body.data.length > 0) {
                        response.body.data.forEach((value) => {
                            if (value.tab === 'share') {
                                value.tabname = '分享'
                            } else if (value.tab === 'ask') {
                                value.tabname = '问答'
                            } else {
                                value.tabname = '招聘'
                            }
                        })
                        this.list = this.list.concat(response.body.data);
                    } else {
                        this.complete = true
                    }
                    
                    this.page++   
                    this.loading = false;                    
                }, (response) => {
                    // error callback
                });
            },
            seeing() {
                this.pullList()
            }
        },
        watch: {
            $route() {
                Object.assign(this.$data, this.$options.data()) //重新初始化  
                this.pullList()       
            }
        }
    }
</script>