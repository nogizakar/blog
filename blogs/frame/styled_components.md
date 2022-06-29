---
title: CSS in JS React
date: 2022-01-21
tags:
 - React
 - styled-components
categories: 
 - React
 - Css
---

### styled-components

结合 React 框架使用，能让其支持 CSS in JS 的写法

例如：styled.button 等同于 styled('button')，是一个柯里化后的函数，而函数后可以接模板字符串

#### 1.优点：

方便设置动态样式

生成的 className 是唯一的，不用担心 className 冲突

使用方便，不需要配置 webpack、开箱即用

SSR 类框架处理 CSS Modules 变量相当棘手



#### 2.基本用法

```jsx
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: red;
  background: white;
`;

export default () => {
    return (
        <Button>amir</Button>
    )
}
```

##### 支持嵌套、伪元素、伪选择器

##### 支持变量、属性

```jsx
const buttonColor = 'red'; 
const Button = styled.button`
    color: ${buttonColor};
    font-size: 16px;
    background: ${props => props.primary ? 'pink' : buttonColor};
`;
export default () => { 
    return ( <Button primary>1111</Button> ) 
}
```

##### 扩展样式

以一个组件为基础生成另一个组件，支持样式继承

##### 设置主题

styled支持设置主题，来达到共享样式的目的



#### 3.原理解析

标签模板字面量是ES6新增的特性，styled-components就是基于这个特性构建的

`styled.button` 只是 `styled('button')`的简写，它实际上相当于调用了一个 button 函数

```jsx
const Button = styled.button`
  color: red;
  font-size: 16px;
`;
// 等同于
const Button = styled('button')([
    'color: red;' +
    'font-size: 16px;'
])
```

* **创建组件过程**

 1，首先生成一个 componentId，SC 会确保这个 id 是唯一的，大致就是全局 count 递增、hash、外加前缀的过程。hash 过后的值会被转成字符串。

2，在 head 中插入一个 style 节点，并返回 className；创建一个 style 的节点，然后塞入到 head 标签中，生成一个 className，并且把模板字符串中的 style 结合 className 塞入到这个 style 节点中。

3，根据解析的 props 和 className 来创建这个 element。