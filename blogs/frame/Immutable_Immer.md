---
title: 关于深拷贝
date: 2021-10-20
tags:
 - Immutable
 - Immer
categories: 
 - React
---



#### 不可变数据

可变数据举例

```js
let objA = { name: 'Amir' };
let objB = objA;
objB.name = 'Fxxk';
console.log(objA.name); // objA 的name也变成了Fxxk
```

不可变数据概念来源于函数式编程。函数式编程中，对已初始化的“变量”是不可以更改的，每次更改都要创建一个新的“变量”。新的数据进行有副作用的操作都不会影响之前的数据。

对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。主要原理是采用了 `Persistent Data Structure`（持久化数据结构)，就是当每次修改后我们都会得到一个新的版本，且旧版本可以完好保留，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，`Immutable` 使用了 `Structural Sharing`（结构共享），就是对于本次操作没有修改的部分，可以直接把相应的旧的节点拷贝过去。

JS在语言层未实现不可变数据，借助第三方库：`Immutable.js、Immer.js`

* 不可变数据在React中的重要性

​		为了加速diff 算法中`reconcile`(调和)过程，React 只需检查`object`索引有没有变即可确定数据有没有变。

​		React 父组件更新会引起子组件重新 render，传入组件的 props 和 state 只有一层时，我们可以直接使用React.PureComponent，它会进行浅比较，从而控制 shouldComponentUpdate 的返回值；多层或Array 和 Object 类型，浅比较就失效，可用深拷贝，但是耗性能。

​		Immutable 则提供了简洁高效判断数据是否变化的方法，只需 `===` 和 `is` 比较就能知道是否需要执行 `render() `。减少 React 重复渲染，提高性能。

#### Immutable

* 优点：
  * 降低了 Javascript 对象 带来的复杂度，避免副作用
  * 结构共享机制节省内存；
  * 每次修改会创建新对象，记录方便回溯；
  * 函数式编程易调试
  * 实现完整的持久化数据结构，API丰富

#### 常见API

ImutableJS数据结构

- Map：键值对集合，对应于 Object，ES6 也有专门的 Map 对象
- List：有序可重复的列表，对应于 Array
- Set：无序且不可重复的列表

JavaScript和ImmutableJS直接的转换

- 对象转换成Immutable对象：Map
- 数组转换成Immutable数组：List
- 深层转换：fromJS
- Immutable类型转换js：toJS()

ImmutableJS的基本操作

- 修改数据：set
- 获取数据：get



​	