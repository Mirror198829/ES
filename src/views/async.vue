<template>
  <div>
    async和await使用
  </div>
</template>

<script>
  export default {
    name: 'async',
    data() {
      return {

      }
    },
    components: {

    },
    methods: {
      init() {
        //await is only valid in async function
        //await/async的写法更加简洁
        async function fn() {
          //try catch的作用是捕获错误
          try {
            let v = await getValue(3) //加上await之后，console.log(v)会在此行执行完再执行
            console.log(v)
            let w = await getValue(9)
            console.log(w)
            //输入一个错误值
            let y = await getValue(110)
            console.log(y)
          } catch (e) {
            console.log(e)
          }
        }

        function getValue(num) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (num < 100) {
                resolve(num)
              } else {
                reject('传入值不符合规范')
              }
            }, 1000)
          })
        }
        fn()
      }

    },
    mounted() {
      this.init()
    },
    created() {}
  }
</script>

<style>

</style>
<style scoped>

</style>