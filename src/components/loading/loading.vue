<style lang="less" scoped>
    .loading-mask {
        /*position: absolute;*/
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
        opacity: .0;
        display: none;
        z-index: 2090;
    }

    .loading-three-bounce.loading {
        /*position: absolute;*/
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: transparent !important;
        z-index: 2099;
        margin: 0 auto;
        /*width: 66px;*/
        text-align: center;
    }

     .bounce div {
        width: 18px;
        height: 18px;
        /*background-color: #1ab394;*/
        border-radius: 100%;
        display: inline-block;
        animation: threeBounceDelay 1.4s infinite ease-in-out;
        animation-fill-mode: both;
    }
    .loading-three-bounce .bounce1 {
        animation-delay: -.32s;
    }

    .loading-three-bounce .bounce2 {
        animation-delay: -.16s;
    }
    .loading-three-bounce .loading-text {
        color: #409EFF;
        margin: 3px 0;
        font-size: 14px;
    }
    .circular {
        animation: loading-rotate 2s linear infinite;
    }
    @keyframes threeBounceDelay{
        0%,
        100%,
        80%{-webkit-transform:scale(0);transform:scale(0)}
        40%{-webkit-transform:scale(1);transform:scale(1)}
    }
    @keyframes loading-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
</style>
<template>
    <div v-show="isShow" id="loadingImg" >
        <div class="loading-mask" :style="{position: isFullScreen ? 'fixed' : 'absolute'}"></div>
        <div class="loading loading-three-bounce" :style="{position: isFullScreen ? 'fixed' : 'absolute'}">
            <div v-if="!spinner" class="bounce">
                <div class="bounce1" :style="{backgroundColor: color, width: size, height: size}"></div>
                <div class="bounce2" :style="{backgroundColor: color, width: size, height: size}"></div>
                <div class="bounce3" :style="{backgroundColor: color, width: size, height: size}"></div>
            </div>
            <svg v-else :width="parseInt(size)*2+'px'" :height="parseInt(size)*2+'px'" class="circular"  viewBox="0 0 1024 1024" ><path :fill="color" d="M626.34496 121.8304c0 53.15072-43.07968 96.2304-96.2304 96.2304-53.1456 0-96.2304-43.07968-96.2304-96.2304C433.88928 68.67968 476.96896 25.6 530.11456 25.6c53.1456 0 96.2304 43.0848 96.2304 96.2304zM530.11456 833.9968c-46.50496 0-84.1984 37.69856-84.1984 84.1984s37.69856 84.1984 84.1984 84.1984 84.1984-37.69856 84.1984-84.1984-37.69344-84.1984-84.1984-84.1984z m398.18752-253.83936c-33.21856 0-60.14464-26.92096-60.14464-60.14464 0-33.21856 26.92608-60.14464 60.14464-60.14464 33.22368 0 60.14464 26.92608 60.14464 60.14464-0.00512 33.21856-26.9312 60.14464-60.14464 60.14464zM228.15744 520.0128c0-53.1456-43.07968-96.2304-96.2304-96.2304-53.1456 0-96.2304 43.07968-96.2304 96.2304 0 53.1456 43.07968 96.2304 96.2304 96.2304 53.15072 0 96.2304-43.0848 96.2304-96.2304z m88.448-349.59872c37.5808 37.5808 37.5808 98.5088 0 136.08448-37.5808 37.5808-98.5088 37.5808-136.0896 0s-37.5808-98.5088 0-136.0896 98.5088-37.5808 136.0896 0.00512z m444.03712 580.12672c-28.1856 28.1856-28.1856 73.8816-0.00512 102.0672 28.1856 28.1856 73.8816 28.1856 102.0672 0 28.1856-28.1856 28.1856-73.8816 0-102.0672-28.18048-28.19072-73.87648-28.19072-102.06208 0z m85.05856-478.06464c-18.7904 18.7904-49.25952 18.7904-68.03968 0-18.79552-18.79552-18.79552-49.25952 0-68.0448a48.09728 48.09728 0 0 1 68.03968 0c18.7904 18.7904 18.7904 49.25952 0 68.0448zM316.60544 733.52704c-37.5808-37.5808-98.5088-37.5808-136.0896 0s-37.5808 98.5088 0 136.08448c37.5808 37.5808 98.5088 37.5808 136.08448 0 37.5808-37.57568 37.5808-98.50368 0.00512-136.08448z"  /></svg>
            <p v-if="text" class="loading-text">{{text}}</p>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'loading',
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            isFullScreen: {
                type: Boolean,
                default: true
            },
            color: {
                type: String,
                default: '#1ab394'
            },
            size: {
                type: String,
                default: '20px'
            },
            spinner: {
                type: Boolean,
                default: false
            },
            text: String,
        }
    }
</script>
