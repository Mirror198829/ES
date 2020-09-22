<template>
    <div>
        vue
    </div>
</template>

<script>
export default {
  name:'',
  data(){
   return {

   }
  },
  components: {

  },
  methods:{
    asycnFn(time){
      return new Promise(resovle =>{
        setTimeout(()=>{
          console.log(`${time / 1000}秒之后，asycnFn执行中`)
          resovle('asycnFn执行完成')
        },time)
      })
    },
    async init(){
      console.log('准备执行asycnFn方法')
      let res = await this.asycnFn(5000)
      console.log(res)
      console.log('我等await执行完再显示')
    }
  },
  mounted(){
    this.init()
  },
  created(){}
}
</script>

<style>

</style>
<style scoped>

</style>