<template>
    <div   >
      <div style="height: 30px;  background-color: red;" v-touchBg  >
        Hallo Word 测试点击效果
      </div>


       <button style="margin-top:50px;height: 30px;width: 100px;" @click="getData"> 请求数据</button>
    </div>
</template>

<script>

	export default {
		name: 'home',
		components: {
		},
		data() {
			return {
			}
		},
		computed: {
		},
		watch: {

		},
    mounted(){
    },
    methods:{
		  getData(){
		    this.baseService.UserMenu({
          uid:'yixq1',
          jsonData:JSON.stringify({"uid":"yixq1"})
        }).then((res)=>{
           console.log(res);
        })
      }

    }
	}
</script>

<style lang="less" scoped>

</style>
