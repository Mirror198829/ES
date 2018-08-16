# promise
## 概念
ES6中新增的异步编程解决方案，可以通过Promise构造函数实例化
## 三种状态
``` javascript
new Promise(cb)
Pending(进行中) ===》Resolved（已完成）
Pending（进行中）===》Rejected（已失败）
```
## 两个原型方法
这两个方式是操作promise异步操作结束之后的结果
1. `Promise.prototype.then()`   //then执行成功之后的函数
2. `Promise.prototype.catch()`  //catch执行失败之后的异常

## 示例
``` javascript
//步骤一：创建一个promies实例
let pFn = new Promise( (resolve,reject) => {
  setTimeout(() => {
    let data = 1
    if(data){
      resolve('成功：我是promise中resolve的结果')
    }else{
      reject('失败：我是promise中reject的结果')
    }
  },2000)
})

console.log('准备调用promise')

//步骤二：操作promise结果，then和catch
pFn.then( value => {
  console.warn(value)
}).catch((err)=>{
  console.error(err)
})

console.log('调用promise结束')

//执行结果：'准备调用promise'===》'调用promise结束'===》'成功：我是promise中resolve的结果'
```
***
## 两个常用的静态方法
1. `Promise.all()`
2. `promise.resolve()`  

 `Promise.all()`可以将多个Promise实例包装成一个新的Promise实例  
 -- 当所有Promise实例状态都变成resolved，Promise.all状态才会变成resolved  
 -- 返回值是一个数组，传递给then的resovle函数
 
 -- 当其中一个被rejected，Promise.all的状态就会变成rejected  
 -- 第一个被rejected实例的返回值会传递给回调函数
 ## promise.all示例
 ``` javascript
 function loadNum(num,time){
  let numRes = new Promise((resolve,reject) => {
  setTimeout(() => {
    if(num > 0){
      resolve('all：我是promise.all中resolve的结果')
    }else{
      reject('all：我是promise.all中reject的结果')
    }
  },time)
  })
  return numRes
}
console.log('调用promise.all开始')
let allDone = Promise.all([loadNum(2,2000),loadNum(0,5000)])
allDone.then(res => {
  console.log(res)
}).catch(error=>{
  console.error(error)
})
console.log('调用promise.all结束')

//执行结果：
调用promise.all开始
调用promise.all结束
all：我是promise.all中reject的结果
 ```
 ***
 ### 任务链
 ``` javascript
new Promise((resolve,reject) => {
  resolve()
}).then(
  ()=>{
    console.log(1)
  },
  ()=>{
    console.log(2)
  }
).then(
  ()=>{
    console.log(3)
  },
  ()=>{
    console.log(4)
  }
)
 ```
 then函数执行后继续执行then……  
 then函数执行后会返回一个新的Promise对象
 * 如果第1个then没有传入处理函数：返回一个继承了上一个处理状态的Promise对象
 * 如果第1个then传入函数：默认返回一个fulfilled/resolved状态的Promise对象
 * 如果第1个then传入函数:手动处理 ，通过处理函数显示的return一个新的promise对象
 
 <span style="color:'red'">问题:</span>不易中途中止链式执行。即：当开始执行promise.then，无论成功与否都会继续链式执行，但当失败中间想退出执行时无法实现。
 #### 手动传值示例
 ``` javascript
 new Promise((resolve,reject) => {
  reject()
}).then(
  ()=>{
    console.log(1)
  },
  ()=>{
    console.log(2)
    return newPromise((resolve,reject)=>{
      reject()
    })
  }
).then(
  ()=>{
    console.log(3)
  },
  ()=>{
    console.log(4)
  }
)

//执行结果：
2
4
 ```
