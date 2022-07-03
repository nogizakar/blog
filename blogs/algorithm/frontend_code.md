---
title: 前端中手写代码总结
date: 2022-2-15
tags:
 - Leetcode
 - Frontend
categories: 
 - Leetcode
---


#### Ajax

```js
const getJOSN = function (url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if(xhr.readyState !== 4) return;
            if(xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.responseText));
            }
        };
        xhr.send();
    });
};
```



#### 去重

```js
function unique(array) {
    return [...new Set(array)];
}
```

```js
function unique(arr) {
    var res = arr.filter(function(item, index, array) {
        return array.indexOf(item) === index
    })
    return res
}
```

```js
function unique(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {         //第一个等同于第二个，splice方法删除第二个
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

```



#### 柯里化

```js
function curry(fn, args= []) {
    const len = fn.length;
    return function () {
        args = args.concat([...arguments]);
        if (args.length < len) {
            return curry(fn, args);
        } else {
            return fn(...args);
        }
    }
}
```

```js
//es6
const curry = (fn, arr = []) => (...args) => (
    arg => arg.length === fn.length ? fn(...arg) : curry(fn, arg)
)([...arr, ...args])
```



#### 深拷贝

```js
function deepCopy (target, hash = new WeakMap()) {     
    if(target === null) return target
    if(target instanceof Date) return new Date(target)
    if(target instanceof RegExp) return new RegExp(target)
    if(typeof target !== 'object') return target
    
    //解决循环引用
    if (hash.get(target)) return hash.get(target)
    const copyTarget = new target.constructor()
    hash.set(target, copyTarget)

    //递归 
    Reflect.ownKeys(target).forEach(key => {
        copyTarget[key] = deepCopy(target[key], hash)
    })
    return copyTarget
}
```



#### 数组扁平化

```js
//reduce
function reduceFlat(ary = []) {
    return ary.reduce((res, item) => 
    res.concat(Array.isArray(item) ? reduceFlat(item) : item), [])
  }
 
  //递归
function recursionFlat(ary = []) {
    const res = []
    ary.forEach(item => {
      if (Array.isArray(item)) {
        res.push(...recursionFlat(item))
      } else {
        res.push(item)
      }
    })
    return res
}
```



#### new

```js
function myNew() {
    const obj = new Object();
    //获取数组中第一项为当前的类名即为构造函数
    const constructor = [].shift.call(arguments);
    //原型继承
    obj.__proto__ = constructor.prototype;
    //继承构造函数实例上的属性
    const result = constructor.apply(obj, arguments);
    //若返回为引用类型，直接返回，否则返回创建的对象
    return result instanceof Object ? result : obj;
}
```



#### instanceof

```js
function myInstanceOf(L, R) {
    R = R.prototype;
    L = L.__proto__;
    while (true) {
        if(L === null) return false;
        if(L === R) return true;
        L = L.__proto__;
    }
}
```



#### 防抖

```js
const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
```



#### 节流

```js
//定时器
const throttle = (fn, delay = 500) => {
    let timer;
    return function () {
        !timer && (timer = setTimeout(() => {
            timer = null;
            fn(...arguments);
        }, delay))
    }
}

//时间戳
const throttle2 = (fn, delay = 500) => {
    let oldDate = Date.now();
    return function () {
        const nowDate = Date.now();
        if (nowDate - oldDate >= delay) {
            fn(...arguments);
            oldDate = nowDate;
        }
    }
}
```



#### call改变this

```js
Function.prototype.myCall = function (context = window) {
    //参数调整
    const args = [...arguments].slice(1);
    //上下文里整个函数保存this
    context.fn = this;
    //隐式绑定
    const result = context.fn(...args);
    //加的删去
    delete context.fn;
    return result;
}
```



#### apply改变this

```js
//与call类似，第二参数为数组
Function.prototype.myApply = function (context = window) {
    context.fn = this;
    let result;
    if(arguments[1]) {
        if(!Array.isArray(arguments[1])) {
            result = context.fn(arguments[1]);
        } else {
            result = context.fn(...arguments[1]);
        }
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}
```



#### bind改变this

```js
Function.prototype.myBind = function (context = window) {
    const args = [...arguments].slice(1);
    const fn = this;
    const resFn = function () {
        return fn.apply(this instanceof resFn ? this : context, args.concat(...arguments));
    }
    //维护fn的原型
	resFn.prototype = Object.create(fn.prototype);
}
```



#### 寄生组合式继承

```js
//寄生组合继承
//ES5的继承，实质是先创造子类的实例对象，然后将再将父类的方法添加到this上
function Super(foo) {
    this.foo = foo
}
Super.prototype.printFoo = function() {
    console.log(this.foo);
}
function Sub(bar) {
    this.bar =bar
    Super.call(this)
}
Sub.prototype = Object.create(Super.prototype)
Sub.prototype.constructor = Sub
```



#### 发布订阅模式

```js
class EventEmit {
    constructor() {
        this.events = {}
    }
    //实现订阅
    on(type, callBack) {
        if(!this.events[type]) {
            this.events[type] = [callBack];
        }else {
            this.events[type].push(callBack);
        }
    }
    //删除订阅
    off(type, callBack) {
        if(!this.events[type]) return;
        this.events[type] = this.events[type].filter((item) => {
            return item !== callBack;
        });
    }
    //只执行一次订阅事件 
    once(type, callBack) {
        function fn() {
            callBack();
            this.off(type, fn);
        }
        this.on(type, fn);
    }
    //触发事件
    emit(type, ...rest) {
        this.events[type] && this.events[type].forEach((fn) => fn.apply(this, rest));
    }
}
```



#### Promise乞丐版

```js
//面试够用版
function myPromise(constructor) {
    let self = this;
    self.status = "pending";
    self.value = undefined;
    self.reason = undefined;
    function resolve(value) {
        if(self.status === "pending") {
            self.value = value;
            self.status = "resloved";
        }
    }
    function reject(reason) {
        if(self.status === "pending") {
            self.reason = reason;
            self.status = "rejected";
        }
    }
    try{
        constructor(resolve, reject);
    }catch(e){
        reject(e)
    }
}

myPromise.prototype.then = function(onFullfilled, onRejected) {
    let self = this;
    switch(self.status) {
        case "resolved":
            onFullfilled(self.value);
            break;
        case "rejected":
            onRejected(self.reason);
            break;
        default:
    }
}
```



#### PromiseAll与PromiseAllsettled

```js
Promise.myAll = (Promises) => {
    return new Promise((rs, rj) => {
        let count = 0;
        let result = [];
        const len = Promises.length;
        if (len === 0) {
            return rs([])
        }
        Promises.forEach((p, i) => {
            Promise.resolve(p).then((res) => {
                count += 1;
                result[i] = res
                if (count === len) {
                    rs(result)
                }
            }).catch(rj)
        })
    })
}

Promise.myAllSettled = (promises) => {
    return new Promise((rs, rj) => {
        let count = 0;
        let result = [];
        const len = promises.length;
        if (len === 0) {
            return rs([])
        }
        promises.forEach((p, i) => {
            Promise.resolve(p).then((res) => {
                count += 1;
                result[i] = {
                    status: 'fulfilled',
                    value: res
                }
                if (count === len) {
                    rs(result)
                }
            }).catch((err) => {
                count += 1
                result[i] = {
                    status: 'rejected',
                    reason: err
                }
                if (count === len) {
                    rs(result)
                }
            })
        })
    })
}

```



#### Promise race与finally

```js
Promise.myRace = (promises) => {
    return new Promise ((rs, rj) => {
        promises.forEach((p) => {
            Promise.resolve(p).then(rs).catch(rj)
        })
    })
}

Promise.prototype.finally = function (cb) {
    return this.then(
        (data) => {return Promise.resolve(cb()).then((n) => data)}, 
        (err) => {return Promise.resolve(cb()).then((n) => { throw err })}
    )
  }
  //不管前面Promise是fulfilled还是rejected，都执行回调函数cb

```



#### Promise resolve reject

```js
Promise.myResolve = function (value) {
    //Promise实例直接返回
    if(value && typeof value === 'object' && (value instanceof Promise)) {
        return value
    }
    //其他Promise再包装一下
    return new Promise((resolve) => {
        resolve(value)
    })
}


Promise.myReject = function (value) {
    return new Promise((_, reject) => {
        reject(value)
    })
}
```



#### Array map filter reduce

```js
Array.prototype._map = function(f){
	let res = []
    this.forEach(item =>{
        res.push(f(item))
    })
    return res
}
```

```js
Array.prototype._filter = function(f){
    let res = []
    this.forEach(item =>{
        if(f(item)) res.push(item)
    })
    return res
}
```

```js
Array.prototype._reduce = function(f){
	var res = 0
    for(let i=0; i<this.length; i++){
        res = f(res, this[i])
    }
    return res
}
```

```JS
function reduce(arr, fn, initialValue) {
  let result = initialValue;
  for (let i = 0; i < arr.length; i++) {
    if (result === undefined && i === 0) {
      result = arr[i];
      continue; // 太妙了
      // 如果没传初始值，第一次将不会执行下面的回调函数
    }
    result = fn(result, arr[i], i, arr);
  }
  return result;
}
//
const reduce = (list, fn, ...init) => {
    let next = init.length ? init[0] : list[0]
    for (let i = init.length ? 0 : 1; i < list.length; i++) {
      next = fn(next, list[i], i)
    }
    return next
  }
```



#### 排序相关

* 冒泡

```js
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
```

* 快速

```js
function fastsort(arr) {
    if(arr.length <= 1){return arr}
    let midIndex = Math.floor(arr.length / 2)
    let mid = arr.splice(midIndex, 1)[0]
    let left = []
    let right = []
    for(let i = 0; i< arr.length; i++){
        if(arr[i] < mid){
            left.push(arr[i])
        }else {
            right.push(arr[i])
        }
    }
    return fastsort(left).concat([mid],fastsort(right))
}
```

* 插入

```js
function insertsort(arr) {
    for(let i=1; i<arr.length; i++){

        let current = arr[i]
        let prev = i-1

        while(prev>=0 && arr[prev]>current) {
            arr[prev+1] = arr[prev]
            prev--
        }

        arr[prev+1] = current
    }
    return arr
}
```

* 选择

```js
function selectsort(array) {
    const len = array.length
    let minIndex  
    for (let i = 0; i < len - 1; i++) {
      minIndex = i  
      for (let j = i + 1; j < len; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j
        }
      }  
    [array[i], array[minIndex]] = [array[minIndex], array[i]]
    }
    return array
  }
```

#### 封装JS类型判断函数

```js

function classof(o) {
  if (o === null) return "null";
  if (typeof o !== "object") return typeof o;
  else
    return Object.prototype.toString
      .call(o)
      .slice(8, -1)
      .toLocaleLowerCase();
}
```

#### 解析url为对象

```js
   function myUrl (ref){
       var str = ref.split('?')[1]
       var arr = str.split('&')
       var obj = {};
       arr.map(item => {
           let myArr = item.split('=')
           obj[myArr[0]] = myArr[1]
       })
       return obj
   }
```



#### ————分割线————
