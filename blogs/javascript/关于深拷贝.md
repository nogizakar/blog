---
title: 关于深拷贝
date: 2021-10-20
tags:
 - concept
 - javascript
categories: 
 - concept
 - javascript
---

浅拷贝：创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是**内存地址** ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

深拷贝：将一个对象从内存中完整的拷贝一份出来,从堆内存中**开辟一个新的区域**存放新对象,且修改新对象不会影响原对象。

简单实现：拷贝其他引用类型、拷贝函数、循环引用等情况不适用。

```js
JSON.parse(JSON.stringify());
```

- 原始类型直接返回，引用类型创建新对象，需克隆对象属性执行深拷贝（深层次对象继续递归）
- 兼容数组
- 解决循环引用问题，额外开辟个存储空间，map数据结构（检测map中有无克隆过的对象，有返回，没用存储）（WeakMap进行优化，键为弱引用，垃圾回收内存释放）

```js
function deepCopy (target, hash = new WeakMap()) {     
    if(target === null) return target
    if(target instanceof Date) return new Date(target)
    if(target instanceof RegExp) return new RegExp(target)
    if(target instanceof HTMLElement) return target
    if(typeof target !== 'object') return target
    
    //引用类型就要进行深拷贝
    if (hash.get(target)) return hash.get(target)
    const copyTarget = new target.constructor()
    hash.set(target, copyTarget)

    Reflect.ownKeys(target).forEach(key => {
        copyTarget[key] = deepCopy(target[key], hash)
    })
    return copyTarget
}
```

