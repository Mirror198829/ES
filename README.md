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
这两个方式是操作promise异步结束之后的结果
1. `Promise.prototype.then()`
2. `Promise.prototype.catch()`  
## 两个常用的静态方法
1. `Promise.all()`
2. `promise.resolve()`  
