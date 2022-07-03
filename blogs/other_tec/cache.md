---
title: 浏览器缓存
date: 2022-5-06
tags:
 - 强缓存
 - 协商缓存
categories: 
 - Other
---



## 1、前端缓存

>当第一次访问网站时,电脑会把网站上图片与数据下载到电脑上,当我们再次访问该网站时,网站就会从电脑中直接加载出来,这就是缓存
>
>* web缓存是指一个Web资源(如html页面、图、JS等)存在于web服务器和客户端(浏览器)之间的副本
>* 缓存会根据进来的请求保存输出内容的副本: 当下一个请求来到的时候,如果是相同的Url,缓存会根据缓存机制决定是直接使用副本响应访问请求还是像源服务器再次发起请求

### Ⅰ - 缓存有哪些好处

>* 缓解服务端压力,不用每次都去请求某些数据
>* 提升性能,打开本地资源肯定比请求服务器来的更快 
>* 减少宽带消耗,当我们使用缓存的时候,只会产生很小的网络消耗,至于为什么打开本地资源也会产生网络消耗?

### Ⅱ - 前端缓存种类

>1. 数据库缓存
>2. CDN缓存
>3. 代理服务器缓存
>4. 浏览器缓存
>

## 2、什么是浏览器缓存策略

>良好的缓存策略可以降低资源的重复加载从而提高页面整体加载速度,通常浏览器缓存策略分为两种结果
>
>* 强缓存
>* 协商缓存
>

### Ⅰ - 基本原理

>* 浏览器在加载资源时,根据请求头的 `Expires(过期时间)` 和`cache-control(缓存控制)`判断是否命中强缓存,命中则直接从缓存中读取资源,不会发送到服务器
>* 如果没有命中强缓存,浏览器一定会发送一个请求到服务器,通过`last-modified`和`etag`验证资源是否命中协商缓存,如果命中,服务器回将这个请求返回,但是不会返回这个资源的数据,依然是从缓存中读取资源
>* 如果前面两者都没有命中,则直接从服务器加载资源 



### Ⅱ - 根据什么规则缓存

>1. **新鲜度**(过期机制):也就是缓存副本有效期. 一个缓存副本必须满足以下条件,浏览器会认为它是有效的,足够新的
>   - 含有完整的过期时间控制头信息(HTTP协议报头),并且仍在有效期内
>   - 浏览器已经使用过这个缓存副本,并且在一个会话中已经检查过新鲜度
>   - **通常是强缓存阶段使用的机制**
>2. **校验值**(验证机制): 服务器返回资源的时候有时在控制头信息带上这个资源的实体标签`Etag`,
>   - 它可以用来作为浏览器再次请求过程的校验标识
>   - 如果发现校验标识不匹配,说明资源已经被修改或者过期,浏览器需要重新获取资源内容
>   - **所以通常是协商缓存中使用的机制**

### Ⅲ - HTTP缓存的两个阶段

>浏览器缓存一般分为两类: **强缓存**(也称本地缓存) 和 **协商缓存**(也称弱缓存)
>
>###### 强缓存阶段
>
>>浏览器发送请求前,会去缓存里查看是否命中强缓存,如果命中,则直接从缓存中读取资源,不会发送请求到服务器;
>
>###### 协商缓存阶段
>
>> 当强缓存没有命中时,浏览器一定会向服务器发起请求
>
>> * 服务器会根据 `request header` 中的一些字段来判断是否命中协商缓存
>> * 如果命中,服务端会返回304响应,但是不会携带任何响应实体,只是高速浏览器可以直接从浏览器缓存中获取这个资源
>> * 如果 **强缓存** 和 **协商缓存** 都没有命中,则直接从服务器加载资源
>

[![image-20211027190616969.png](https://i.postimg.cc/sgx9Vyg7/image-20211027190616969.png)](https://postimg.cc/878rH2Wz)

### Ⅳ - 优先级

>* `Cache-Control`优先级大于 `expires`
>* `Etag` 优先级大于 `last - Modified/if-Modified-since`,同时存在时会以Etag为准

### Ⅴ - 浏览器缓存流程图

[![image-20211027190721706.png](https://i.postimg.cc/6qznX1sM/image-20211027190721706.png)](https://postimg.cc/kR6BNsgS)



## 3、强缓存与协商缓存

### Ⅰ - 强缓存

> ###### 通过`Expires(过yu期)`和`cache-control(缓存控制器)`两种响应头实现
>
> 浏览器在加载资源时,根据请求头的 `Expires(过期时间)` 和`chche-control(缓存控制)`判断是否命中强缓存,命中则直接从缓存中读取资源,不会发送到服务器

#### ①  Expires(过期)

>`Expires`是 http1.0 提出的表示资源过期时间的header, 它描述的是一个绝对时间,由服务端返回;当我们准备再次发起请求时,本地时间未超过这个设置的时间,那么就不会真正的发出请求,而是读取缓存
>
>expires受限于本地时间,如果修改了本地时间,可能会造成缓存失效

#### ②  cache-control

>`cache-control`出现于HTTP1.1, 优先级高于Expires ,表示的是相对时间
>
>* `cache-control:no-cache` 的响应实际上是可以存储在本地缓存去中的,只是在与原始服务器进行新鲜度再验证之前,缓存不能将其提供给客户端使用
>* `Cache-Control: no-store` 真正的不缓存到本地
>* `Cache-Control: public` 可以被所有用户缓存(多用户共享),包括终端和CDN等中间代理服务器
>* `Cache-Control: private`只能被终端浏览器缓存（而且是私有缓存），不允许中继缓存服务器进行缓存
>
>Cache-Control除了在响应中使用，在请求中也可以使用。我们用开发者工具来模拟下请求时带上Cache-Control：勾选Disable cache，刷新页面，可以看到Request Headers中有个字段Cache-Control: no-cache。
>

### Ⅱ - 协商缓存

>###### 协商缓存是通过`【Last-Modified，If-Modified-Since】`和`【ETag、If-None-Match】`这两对Header来管理的
>
>* 当浏览器对某个资源的请求没有命中强缓存(换句话说就是: **强缓存失效后**)
>*  就会发一个请求到服务器,验证协商缓存是否命中; 
>* 如果协商缓存命中,请求响应返回的http状态为`304` 并且会显示一个`Not Modified(未修改的)`的字符串

#### ①  Last-Modified，If-Modified-Since

>1. `Last-Modified`表示本地文件最后修改日期
>   - 浏览器会在request header 加上 `If-Modified-Since`(上此返回的`Last-Modified`的值)
>   - 询问服务器在该日期后资源是否有更新
>   - 有更新的话就会将新的资源发送过来
>2. 但如果在本地打开缓存文件,就会造成`Last-Modified`的修改,所以在HTTP1.1中出现了`Etag`
>3. 当资源过期时（使用`Cache-Control`标识的max-age/s-maxage）
>   - 发现资源具有`Last-Msodified`声明，则向服务器请求时带上头 `If-Modified-Since`（即响应头中的`Last-Modified`值），表示请求时间。
>   - 这个时候服务器收到请求后发现有头`If-Modified-Since`则与**被请求资源**的最后修改时间进行比对
>   - 若最后修改时间较新，说明资源有被改动过，将新资源返回并返回状态`200`，否则返回`304`表示资源没被更新使用缓存即可。

#### ② ETag、If-None-Match

>1. `Etag`就行是一个直问,资源变化都会导致Etag变化,跟最后修改时间没有关系,Etag可以保证每一个资源都是唯一的
>2. 当资源过期时（使用Cache-Control标识的max-age/s-maxage）
>   - 发现资源具有`Etage`声明，则向服务器请求时带上头`If-None-Match`（即响应头中`Etag`的值）
>   - 服务器收到请求后发现有头`If-None-Match` 则与被请求资源的相应校验串进行比对
>   - 决定返回200或304（**注意：服务器会优先验证If-None-Match**）
>
>###### 两者优先级?
>
>>**`ETag`的优先级比`Last-Modified`更高**
>>
>>具体为什么要用`ETag`，主要出于下面几种情况考虑：
>>
>>* 一些文件也许会周期性的更改,但是它的内容并不会改变(仅仅只改变了修改时间),这种时候我们并不希望客户端认为这个文件被修改了,而重新GET
>>* 某些文件修改非常频繁,比如在秒以下的时间内进行修改(比如说1s内修改了N次),而其他方法检查到的粒度是s级的,这种修改无法判断
>>* 某些服务器不能精确的得到文件的最后修改时间
>

### Ⅲ -强缓存与协商缓存简单异同点

>* **相同点**: 如果命中,都是从客户端缓存中加载资源,而不是从服务器加载资源数据
>* **不同点**: 强缓存不发送请求到服务器,协商缓存会发送请求到服务器

## 4、常见几种状态码的区别

>缓存中: 200状态码总是强缓存, 304总是协商缓存
>
>* `200`: 强缓存`expires/Cache-Control`失效时,返回新的资源文件
>* `200(form cache)`: 强缓存两者都存在且未过期; `Cache-Control` 优先`Expirs`(默认就是这个优先级)时-->浏览器从本地获取资源成功  (这个状态还能更详细分类,在下面再给出详解)
>* `304(Not Modified)`:协商缓存`Last-modified/Etag`没有过期时,服务端返回状态码304 
>

## 5、缓存位置

>###### 强缓存我们会把资源放在 `memory cache(内存缓存)`和`disk cache(磁盘缓存)` 中,那么他们的区别在哪呢?为何要如此区分?
>
>* 存储图像和网页等资源主要存储在`disk cache(磁盘存储)`
>* 操作系统缓存文件等资源大部分都会缓存在`memory cache`中
>* 具体操作浏览器自动分配,看谁的资源利用率不高就给谁
>* 查找浏览器缓存时会按照 `Service Worker` --> `Memory Cache` --> `Disk Cache` -->  `Push Cache`

### Ⅰ -  Service Worker

>* 是运行在浏览器背后的独立线程,一般可以用来实现缓存功能. 
>* 使用`Service Worker` 的话,因为其中涉及到请求拦截,所以传输协议必须为`HTTPS`来保障安全
>* `Service Worker`的缓存和浏览器其他内建的缓存机制不同,它可以让我们自由控制缓存那些文件,如何匹配缓存、读取缓存,并且缓存时持续性的

### Ⅱ - Memory Cache

>* **内存中的缓存**: 主要包含的是当前页面中已经抓取到的资源: 例如页面下载的样式、脚本、图片等
>* 读取 **内存** 中的数据肯定比 **磁盘** 的快
>* **内存缓存** 虽然读取高效,但是缓存持续性很短,会随着进程的释放而释放: 如我们关闭了tab页面 ,内存中的缓存也就被释放了 

### Ⅲ -  Disk Cache

>* 存储在 **硬盘** 中的缓存,读取速度慢点,但是什么都能存储到磁盘中,比之 `Memory Cache` 胜在容量和存储时效性上
>* 在所有浏览器缓存中,`Disk Cache`覆盖面基本是最大的
>* 他会根据 `HTTP Header` 中的字段判断哪些资源需要缓存,哪些资源可以不请求直接使用,哪些资源已经过期需要重新请求
>* 并且即便在跨站点的情况下,相同地址的资源一旦被硬盘缓存下来,就不会再去请求数据,绝大部分数据都来自`Disk Cache`
>* **磁盘缓存** 比 **内存缓存** 慢的多
>
>###### example：
>
>>从远程 Web 服务器直接提取访问文件可能需要 **500毫秒(半秒)**, 那么磁盘访问可能需要 **10~20毫秒** ; 而内存访问可能只需要 **100纳秒**; 更高级的还有 **L1缓存访问** 只需要0.5纳秒 (最快和最小的CPU缓存,详见此笔记 [缓存、内存、CPU知识点解析](https://gitee.com/hongjilin/hongs-study-notes/blob/master/%E7%BC%96%E7%A8%8B_%E7%AE%97%E6%B3%95%E5%8F%8A%E8%AF%BE%E7%A8%8B%E5%9F%BA%E7%A1%80%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90%E5%8E%9F%E7%90%86/%E7%BC%93%E5%AD%98%E3%80%81%E5%86%85%E5%AD%98%E3%80%81CPU%E7%9F%A5%E8%AF%86%E7%82%B9%E8%A7%A3%E6%9E%90%E7%AC%94%E8%AE%B0.md#%E5%9B%9Bcpu%E7%9A%84%E5%A4%9A%E7%BA%A7%E7%BC%93%E5%AD%98%E9%AB%98%E9%80%9F%E7%BC%93%E5%AD%98) )

### Ⅳ -  prefetch cache(预取缓存)

>* **link** 标签带上 **prefetch** ,再次加载时会出现
>* `prefetch` 是 **预加载** 的一种方式: 被标记为 `prefetch` 的资源,将会被浏览器在空闲时间加载

### Ⅴ -  Push Cache

>* `Push Cache(推送缓存)` 是 **HTTP/2** 中的内容,当以上三种缓存都没有命中时,它才会被使用
>* 它只在 **会话 (Session)** 中存在,一旦会话结束就会被释放,并且缓存时间也会很短暂
>* 在Chrome浏览器中只有 **5分钟** 左右,同时它也并非严格执行HTTP头中的缓存指令

### Ⅵ -  CPU、内存、硬盘概述

>* CPU、内存、硬盘都是计算机的主要组成部分
>* **CPU**: 中央处理单元的缩写,也叫做 `处理器`,是计算机的运算核心和控制核心; 电脑靠CPU来运算、控制. 让电脑各个部件顺利工作,起到协调作用
>* **硬盘**: 存储资料和软件等数据的设备,有容量大、断电数据不丢失的特点
>* **内存**: 负责 **硬盘** 等硬件上的数据与 **CPU** 之间数据的交换处理. 特点是: `体积小`、`速度快`、`有电可存`、`无电清空`,即电脑在开机状态时内存中可存储数据,关机后将自动清空其中的所有数据

## 6、强缓存有协商缓存的区别

>这里再次总结整理一下两者之间的区别
>
>* 强缓存不发请求到服务端,所以有时候资源更新了浏览器还不知道; 
>* 但是协商缓存会发请求到服务器,所以资源是否更新,服务器肯定知道
>* 大部分web服务器都默认开启协商缓存

## 7、刷新对于强缓存和协商缓存的影响

>* 当 `ctrl+F5`强制刷新网页时: 直接从服务器加载, **跳过强缓存和协商缓存**
>* 当 f5 刷新网页时,跳过强缓存,但是会检查协商缓存
>* 浏览器地址写入URL并回车: 浏览器发现缓存中有这个文件了,就不用继续请求了,直接去缓存拿 (最快)


















