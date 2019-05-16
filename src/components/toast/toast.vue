/*
可全局调用，this.Toast(text,time)即可,时间默认为1.5s，可自己指定
*/
<style lang="less" scoped>
    .toast-container{
        position: relative;
        -webkit-user-select: none;
        user-select: none;
    }
    .toast-content{
        position: fixed;
        top: 35%;
        left: 50%;
        z-index: 1000;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        min-width: 250px;
        min-height: 0;
        padding: 15px 10px;
        border-radius: 4px;
        text-align: center;
        background-color:rgba(0,0,0,.7);
        color: #fff;
        font-size: 16px;
        font-family:PingFangSC-Regular;
        transition:opacity .1s linear;
        word-wrap: break-word;
        word-break: break-all;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
<template>
    <transition name ="fade">
        <div class="toast-container" id="toast" v-show="show">
            <div class="toast-content">{{text}}</div>
        </div>
    </transition>
</template>
<script>
    export default{
        data() {
            return{
                show:false,
                text:''
            }
        }
    }
</script>
