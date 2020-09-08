# promise
## 概念
ES6中新增的异步编程解决方案，可以通过Promise构造函数实例化。  
解决的问题：ES5中回调地狱。即：异步函数A执行完，回调执行B，B执行完回调C……。promise解决了异步操作和回调的问题。
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
 ## promise.all 并发操作
 #### 等待所有都执行完成
 ### 示例
 ``` javascript
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(20)
const p3 = Promise.resolve(3)

Promise.all([p1,p2,p3]).then((val) => {
    console.log(val)
}) //执行结果：(3) [1, 20, 3]
 ```
 ``` javascript
 function fn(txt,time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(txt)
        },time)
    })
}
const f1 = fn('f1,执行3秒',3000)
const f2 = fn('f2,执行2秒',2000)
const f3 = fn('f3,执行5秒',5000)

Promise.all([f1,f2,f3]).then((val)=>{
    console.log(val)
})   //执行结果：(3) ["f1,执行3秒", "f2,执行2秒", "f3,执行5秒"]
 ```
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
  ## promise.race 竞争操作
  #### 先到先得
  ``` javascript
  function fn(txt,time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(txt)
        },time)
    })
}
const f1 = fn('f1,执行3秒',3000)
const f2 = fn('f2,执行2秒',2000)
const f3 = fn('f3,执行5秒',5000)

Promise.race([f1,f2,f3]).then((val)=>{
    console.log(val) //执行结果：f2,执行2秒
})
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
问题:不易中途中止链式执行。即：当开始执行promise.then，无论成功与否都会继续链式执行，但当失败中间想退出执行时无法实现。
如何解决：通过catch做，catch可以捕获之前的promise调用链中的任一错误，可以中止后续执行
``` javascript
new Promise((resolve,reject) => {
  reject('失败')
}).then(()=>{
   console.log(1)
}).then(()=>{
   console.log(3)
}).catch(err => {
  console.log(err)
})

//执行结果：
失败
```
***
# ES8——async/await
异步函数，`async/await`关键字，`async`就是异步，`await`是等待，使用`async function`即可定义一个异步函数。 
使用 async / await, 搭配 promise, 可以通过编写形似同步的代码来处理异步流程, 提高代码的简洁性和可读性。
``` javascript
//await is only valid in async function
//await/async的写法更加简洁
async function fn(){
  //try catch的作用是捕获错误
  try{
    let v = await getValue(3) //加上await之后，console.log(v)会在此行执行完再执行
    console.log(v) 
    let w = await getValue(9)
    console.log(w)
    //输入一个错误值
    let y = await getValue(110)
    console.log(y)
  }catch(e){
    console.log(e)
  }
}
function getValue(num){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(num<100){
        resolve(num)
      }else{
        reject('传入值不符合规范')
      }      
    },1000)
  })
}
fn() // 3 9 传入值不符合规范
```

