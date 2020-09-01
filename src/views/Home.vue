<template>
  <div>
    Promise的使用
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {

      }
    },
    components: {

    },
    methods: {
      init() {
        let pFn = new Promise((resolve, reject) => {
          setTimeout(() => {
            let data = 1
            if (data) {
              resolve('成功：我是promise中resolve的结果')
            } else {
              reject('失败：我是promise中reject的结果')
            }
          }, 7000)
        })
        console.log('准备调用promise')
        pFn.then(value => {
          console.warn(value)
        }).catch((err) => {
          console.error(err)
        })
        console.log('调用promise结束')

        function loadNum(num, time) {
          let numRes = new Promise((resolve, reject) => {
            setTimeout(() => {
              if (num > 0) {
                resolve('all：我是promise.all中resolve的结果')
              } else {
                reject('all：我是promise.all中reject的结果')
              }
            }, time)
          })
          return numRes
        }
        console.log('调用promise.all开始')
        let allDone = Promise.all([loadNum(2, 2000), loadNum(0, 5000)])
        allDone.then(res => {
          console.log(res)
        }).catch(error => {
          console.error(error)
        })
        console.log('调用promise.all结束')

        new Promise((resolve) => {
          resolve()
        }).then(
          () => {
            console.log(1)
          },
          () => {
            console.log(2)
          }
        ).then(
          () => {
            console.log(3)
          },
          () => {
            console.log(4)
          }
        )
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