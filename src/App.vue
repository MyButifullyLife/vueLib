<template>
    <div>
        <transition :name='transitionName'>
            <keep-alive :include="includeArray">
                <router-view></router-view>
            </keep-alive>
        </transition>
        <loading v-model="isLoading" :text="loadingText" :isShowCancel="isShowCancel"></loading>
    </div>
</template>

<script>
	   import { Loading } from 'vux'
	import { mapState } from 'vuex'
	import includeArray from './route/cacheRouteName';
	export default {
		name: 'app',
		components: {
			Loading
		},
		data() {
			return {
				transitionName: 'bounce-in',
				includeArray: includeArray // 需要缓存的页面
			}
		},
		computed: {
			...mapState({
				isLoading: state => state.vux.isLoading,
				isShowCancel: state => state.vux.isShowCancel,
				loadingText: state => state.vux.loadingText || ''
			})
		},
		watch: {
			$route(to, from) {
				let goTo = this.$router.goTo,
					noAnimatePages = {
						// 从下列页面跳转到其它页面都没有转场动画 eg:['/initial']
						from: [],
						// 跳转到下列页面都没有转场动画 eg:['/initial']
						to: [],
						// 同时满足to和from时没有转场动画 eg:[{to:'/message/detail', from:'/'}]
						and: [{to:'/', from:'/'},{to:'/historyDetail', from:'/'}]
					};
				if (noAnimatePages.to.indexOf(to.path) > -1 || noAnimatePages.from.indexOf(from.path) > -1) {
					this.noAnimate = true;
				} else if (noAnimatePages.and.find(item => item.to === to.path && item.from === from.path)) {
					this.noAnimate = true;
				} else {
					this.noAnimate = this.$router.noAnimate || false;
				}
				if (!this.noAnimate) {
					// 判断页面回退还是前进
					if (goTo) {
						this.transitionName = 'bounce-in'
					} else {
						this.transitionName = 'bounce-out'
					}
				} else {
					this.transitionName = 'no-animate'
				}
				window.scrollTo(0, 0);
				this.$router.goTo = false;
				this.$router.noAnimate = false;
			}
		}
	}
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import "assets/css/base.less";
    .bounce-out-enter-active,
    .bounce-out-leave-active,
    .bounce-in-enter-active,
    .bounce-in-leave-active {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .bounce-out-enter-active {
        animation: boun-in-left .4s;
    }
    .bounce-out-leave-active {
        animation: boun-out-right .4s;
    }
    .bounce-in-enter-active {
        animation: boun-in-right .4s;
    }
    .bounce-in-leave-active {
        animation: boun-out-left .4s;
    }
    @keyframes boun-in-left {
        0% {
            transform: translate3d(-100%, 0, 0);
        }

        100% {
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes boun-out-left {
        0% {
            transform: translate3d(0, 0, 0);
        }

        100% {
            transform: translate3d(-100%, 0, 0);
        }
    }
    @keyframes boun-in-right {
        0% {
            transform: translate3d(100%, 0, 0);
        }

        100% {
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes boun-out-right {
        0% {
            transform: translate3d(0, 0, 0);
        }

        100% {
            transform: translate3d(100%, 0, 0);
        }
    }
</style>
