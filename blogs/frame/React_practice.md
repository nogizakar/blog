---
title: React的小项目练手
date: 2022-4-30
tags:
 - React
 - Practice
categories: 
 - React
---

### React

#### todolist

* 划分：app.jsx; todoConsole.jsx; todoHeader.jsx; todoItem.jsx;  todos.js

* hooks 的使用

  * createContext()与useContext() [管理夜间模式主题]

  createContext 能够创建组件间共享的上下文状态。然后通过 useContext 在组件中使用这些状态

  * useState, useEffect, useRef, useMemo
  * useRef：1.保存一个值,在整个生命周期中维持不变 2.重新赋值ref.current不会触发重新渲染

* 自定义hook的使用

  * 定义add，filter，switch，remove，toggle，update方法

* localStorage保存

  * window.localStorage.getItem
  * JSON.parse(todoData)
  * 在useEffect中window.localStorage.setItem("todos", JSON.stringify(todos))【模拟DidUpdate】

* RWD:媒体查询实现响应式， MEDIA_HOVER  MEDIA_MOBILE

移动端点击事件：用`@media`将:hover伪类的内容括起来即可。从而在不能使用鼠标指针的设备上就不存在该效果



#### five in a row

* useRef记录上一次下棋的行与列，棋盘更新函数（useCallback缓存）
* 处理棋子点击，更新下棋记录，传入位置更新棋盘，更新player（useCallback）
* useEffect模拟didiupdate，根据位置判定输赢

###### Board组件与Chess组件

* 判定输赢：
  * 计算总数的函数：不同方向计算重复棋子的数目，不连续或超出棋盘跳出
  * 目标左右，上下，正斜线，反斜线大于等于4，返回胜者；棋盘满平局



#### snack

* 蛇移动：用复制一份蛇的尾巴通过计算位置后放在蛇头的前面（成为新的蛇头），然后删除旧的蛇尾，这就向前走了一步（重复），蛇位置｛top：0，left：0｝，移动push新蛇头，shift蛇尾。数组末尾是蛇头
* 随机食物位置
* 吃到食物加分：蛇头位置=食物位置
  * 处理蛇身长度：吃到食物，从蛇尾（数组0位）加一截，需按照方向加值

* 死亡判定：碰壁？吃自己（删除蛇头，作对比判定）
