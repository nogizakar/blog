---
title: 高频算法总结
date: 2022-6-05
tags:
 - Leetcode
 - Prepare
categories: 
 - Leetcode
---

#### 01-无重复字符的最长子串

滑动窗口，slice，indexOf

```js
var lengthOfLongestSubstring = function(s) {
    let i = 0, res = 0, n = 0
    for(j = 0; j < s.length; j++){
        n = s.slice(i, j).indexOf(s[j])
        if(n === -1){
            res = Math.max(res, j-i+1)
        }else {
            i += n+1
        }
    }
    return res
};
```

#### 02-合并两个有序数组

合并、排序

```js
var merge = function(nums1, m, nums2, n) {
    for(let i = 0; i < n; i++){
        nums1[m] = nums2[i]
        m++
    }
    nums1.sort((a, b)=> a-b)
    return nums1
};
```

#### 03-字符串相加

模拟 加法进位

```js
var addStrings = function(num1, num2) {
    let len1 = num1.length,len2 = num2.length, temp = 0, res = ''
    while(len1 || len2){
        if(len1){
            temp += +num1[--len1]
        }
        if(len2){
            temp += +num2[--len2]
        }
        res = temp % 10 + res       //成字符串了
        temp > 9 ? temp = 1 : temp = 0
    }
    if(temp){
        res = 1+ res   //处理第一位的数
    }
    return res
};
```

#### 04-比较版本号

```js
function compareVersion(version1, version2){
    const arr1 = version1.split('.')
    const arr2 = version2.split('.')
    const maxLen = Math.max(arr1.length, arr2.length)
     
    for (let i = 0; i < maxLen; i++) {
        const num1 = arr1[i] ? arr1[i] - '0' : 0
        const num2 = arr2[i] ? arr2[i] - '0' : 0
        if (num1 > num2) return 1
        if (num1 < num2) return -1
    }    
    return 0
};
```

#### 05-有效的括号

```js
var isValid = function(s) {
    while(s.length){
        let temp = s
        s = s.replace('()', '')
        s = s.replace('[]', '')
        s = s.replace('{}', '')
        if(s == temp) return false
    }
    return true
};
```

#### 06-两数之和

双循环；哈希

```js
var twoSum = function(nums, target) {
    const map = new Map()
    for(let i = 0; i < nums.length; i++){
        const res = target - nums[i]
        if(map.has(res)){
            return [map.get(res), i]
        }else{
            map.set(nums[i], i)
        }
    }
};
```

#### 07-爬楼梯

动态规划；斐波那契

```js
var climbStairs = function(n) {
    let dp = new Array(n+1).fill(0)
    dp[0] = 1
    dp[1] = 1
   for(let i=2; i< n+1; i++){
     dp[i] = dp[i-1]+ dp[i-2]  
   }
return dp[n]
};
```

#### 08-全排列

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = nums => {
    if (!nums) return [];
    const res = [];
    // path是组合的数组
    const search = path => {
        if (path.length === nums.length) {
            // 长度满足条件，推入res数组
            res.push(path);
            return;
        }
        for (const num of nums) {
            if (!path.includes(num)) {
                // 将没出现过的数字，加入path继续找
                search([...path, num]);
            }
        }
    };
    // 从空数组开始
    search([]);
    return res;
};

```

#### 09-最大子数组和

注意 max = nums[0]

```js
var maxSubArray = function(nums) {
    let max = nums[0], sum = 0
    for(let i = 0; i < nums.length; i++){
        sum = Math.max(nums[i], sum + nums[i])
        max = Math.max(sum, max)
    }
    return max
};
```

#### 10-路径总和

递归；更新sum的值

```js
var hasPathSum = function(root, sum) {
  // 根节点为空
  if (root === null) return false;
  
  // 叶节点 同时 sum 参数等于叶节点值
  if (root.left === null && root.right === null) return root.val === sum;

  // 总和减去当前值，并递归
  sum = sum - root.val
  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
};
```

#### 11-反转链表

```js
var reverseList = function(head) {
    let prev = null
    curr = head
    while(curr !== null){
        [curr.next, prev, curr] = [prev, curr, curr.next]
    }
    return prev
};
```

#### 12-三数之和

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
      const result = [];
      nums.sort((a, b) => a - b);
      for (let i = 0; i < nums.length; i++) {
        // 跳过重复数字
        if (i && nums[i] === nums[i - 1]) { continue; }
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum > 0) {
            right--;
          } else if (sum < 0) {
            left++;
          } else {
            result.push([nums[i], nums[left++], nums[right--]]);
            // 跳过重复数字
            while (nums[left] === nums[left - 1]) {
              left++;
            }
            // 跳过重复数字
            while (nums[right] === nums[right + 1]) {
              right--;
            }
          }
        }
      }
      return result;
};
```

#### 13-二叉树的层序遍历

```js
var levelOrder = function(root) {
    if(!root) return []
    let res = []
    dfs(root, 0, res)
    return res
};

function dfs(root, step, res){//每层透传当前节点，层数，和输出数组
  if(root){
    if(!res[step]) res[step] = []//初始化当前层数组
    res[step].push(root.val)//当前节点加入当前层数组
    dfs(root.left, step + 1, res)//step+1，递归左节点	
    dfs(root.right, step + 1, res)//step+1，递归右节点	
  }
}
```

#### 14-数组中第K个最大元素

```js
var findKthLargest = function(nums, k) {
    let numss = nums.sort((a, b)=>a - b)
    return numss[nums.length - k]
};
```

```js
var findKthLargest = function(nums, k) {
    let numss = fastsort(nums)
    return numss[numss.length - k]

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
};
```

#### 15-买卖股票最佳时机

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。

|      |                                                              |
| :--- | ------------------------------------------------------------ |
|      | （1）将第一天看成价格最低，后续遍历的时候遇到价格更低则更新价格最低， |
|      | （2）每次都比较最大收益与当日价格减去价格最低的值，选取最大值作为最大收益 |

```js
var maxProfit = function(prices) {
    let max = 0, minprice = prices[0]
    for(let i = 0; i < prices.length; i++){
        minprice = Math.min(minprice, prices[i])
        max = Math.max(max, prices[i]-minprice)
    }
    return max
};
```

#### 16-手撕快排

时间复杂度：O(nlogn)

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

#### 17-环形链表（有无）

打标记，快慢指针

```js
var hasCycle = function(head) {
    while(head){
        if(head.flag){
            return true
        } else{
            head.flag = true
            head = head.next
        }
    }
    return false
};
```

```js
var hasCycle = (head) => {
  let fast = head;
  let slow = head;
  while (fast) {                        
    if (fast.next == null) return false; 
    slow = slow.next;                 
    fast = fast.next.next;             
    if (slow == fast) return true;   
  }
  return false;                   
}
```

#### 18-最长回文子串

     // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
     // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1

```js
var longestPalindrome = function(s) {
        if (s.length<2){
            return s
        }
        let res = ''
        for (let i = 0; i < s.length; i++) {
            // 回文子串长度是奇数
            helper(i, i)
            // 回文子串长度是偶数
            helper(i, i + 1) 
        }

        function helper(m, n) {
            while (m >= 0 && n < s.length && s[m] == s[n]) {
                m--
                n++
            }
            if (n - m - 1 > res.length) {
                // slice也要取[m+1,n-1]这个区间 
                res = s.slice(m + 1, n)
            }
        }
        return res
};
```

#### 19-求根节点到叶节点数字之和

输入：root = [1,2,3]
输出：25
解释：从根到叶子节点路径 1->2 代表数字 12，从根到叶子节点路径 1->3 代表数字 13

因此，数字总和 = 12 + 13 = 25

![image.png](https://pic.leetcode-cn.com/1603933660-UNWQbT-image.png)

```js
const sumNumbers = (root) => {
  const helper = (root, cur) => {
    if (root == null) {
      return 0;
    }
    cur = 10 * cur + root.val;
    if (root.left == null && root.right == null) {
      return cur;
    }
    return helper(root.left, cur) + helper(root.right, cur);
  };
  return helper(root, 0);
};
```

#### 20-二分查找

注意left<=right

```js
var search = function(nums, target) {
    let left = 0,
    right = nums.length - 1;
    while (left <= right) {
        let mid = left + ((right - left) >> 1);
        let num = nums[mid];
        if(num === target){
            return mid;
        } else if(num > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
};
```

#### ————————————————————————————————————————

#### 21-岛屿数量

```js
var numIslands = function(grid) {
  function dfs(grid,i,j){
    // 递归终止条件
    if(i<0||i>=grid.length||j<0||j>=grid[0].length||grid[i][j]==='0'){
       return  
    }
    grid[i][j]='0' // 走过的标记为0
    dfs(grid, i + 1, j)
    dfs(grid, i, j + 1)
    dfs(grid, i - 1, j)
    dfs(grid, i, j - 1)
  }
  let count=0
  for(let i=0;i<grid.length;i++){
      for(let j=0;j<grid[0].length;j++){
          if(grid[i][j]==='1'){
              dfs(grid,i,j)
              count++
          }
      }
  }
 return count
};
```

#### 22-生成有效括号组合

总体思路是：从 `n-1` 推导出 `n` 的组合情况，只需要遍历 `n-1` 的所有组合，并在所有组合的每个位置填入一对括号 `()` 并去重即可。

```js
var generateParenthesis = function (n) {
    let set = new Set(['()']);
    for (let c = 2; c <= n; c++) {
        let nextSet = new Set();
        for (const s of set) {
            for (let j = 0; j <= s.length; j++) {
                nextSet.add(s.slice(0, j) + '()' + s.slice(j));
            }
        }
        set = nextSet;
    }
    return [...set];
};
```

```js
//递归
function generateParenthesis(n){
    const res = []
    resursion(0, 0, '', res, n)
    return res
};
function resursion(left, right, temp, res, n) {
    if (left === n && right === n) {
        res.push(temp)
        return
    }
    if (left < n) {
        resursion(left + 1, right, temp + '(', res, n)
    }
    if (right < n && left > right) {
        resursion(left, right + 1, temp + ')', res, n)
    }
}
```

#### 23-合并两个有序链表

```
（1）新建一个空的表头后面连接两个链表排序后的结点。
（2）遍历两个链表都不为空的情况，取较小值添加在新的链表后面，每次只把被添加的链表的指针后移。
（3）遍历到最后肯定有一个链表还有剩余的结点，它们的值将大于前面所有的，直接连在新的链表后面即可。
```

```js
var mergeTwoLists = function(list1, list2) {
    let head = new ListNode()
    let cur = head
    while(list1 && list2){
        if(list1.val <= list2.val){
            cur.next = list1
            list1 = list1.next    //移动取值的指针
        }else {
            cur.next = list2
            list2 = list2.next
        }
        cur = cur.next       //指针后移
    }
    cur.next = list1 !== null ? list1 : list2
    return head.next
};
```

#### 24-螺旋矩阵

 `m` 行 `n` 列的矩阵 `matrix` ，请按照 **顺时针螺旋顺序** ，返回矩阵中的所有元素

```js
var spiralOrder = function (matrix) {
    if (matrix.length === 0) return []
    const res = []
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1
    while (top < bottom && left < right) {
        for (let i = left; i < right; i++) res.push(matrix[top][i])   // 上层
        for (let i = top; i < bottom; i++) res.push(matrix[i][right]) // 右层
        for (let i = right; i > left; i--) res.push(matrix[bottom][i])// 下层
        for (let i = bottom; i > top; i--) res.push(matrix[i][left])  // 左层
        right--
        top++
        bottom--
        left++  // 四个边界同时收缩，进入内层
    }
    if (top === bottom) // 剩下一行，从左到右依次添加
        for (let i = left; i <= right; i++) res.push(matrix[top][i])
    else if (left === right) // 剩下一列，从上到下依次添加
        for (let i = top; i <= bottom; i++) res.push(matrix[i][left])
    return res
};
```

#### 25-最长递增子序列

动态规划

```js
var lengthOfLIS = function(nums) {
    var dp = new Array(nums.length).fill(1);
    var ans = 0;
    for (var i=0; i<nums.length;i++){ //对于第i个元素nums[i]
        for (var j=0; j<i;j++){ //遍历i前面的i-1个元素
            if (nums[j]<nums[i]) dp[i] = Math.max(dp[i],dp[j]+1)
            //如果nums[j]比nums[i]小 更新dp[i]
        }
        ans = Math.max(ans,dp[i]);
    }
    return ans
};
```

#### 26-二叉树中序遍历

```js
const inorderTraversal = (root) => {
  const res = [];
  const inorder = (root) => {
    if (root == null) {
      return;
    }
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return res;
};
```

#### 27-二叉树最大深度

递归；

二叉树的深度就等于根结点这个1层加上左子树和右子树深度的最大值

```js
var maxDepth = function(root) {
    
    function dfs(rootNode){
        if(!rootNode) return 0
        let l = dfs(rootNode.left)
        let r = dfs(rootNode.right)

        return Math.max(l, r)+1
    }
    
    return dfs(root)
};
```

#### 28-岛屿的最大面积

较岛屿数量比，迭代中增加num记录，外部通过max得到最大值

```js
var maxAreaOfIsland = function(grid) {
    let count=0,x=grid[0].length,y=grid.length;
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j]===1) count=Math.max(count,areaOfIsland(grid,i,j))    //max处理
        }
    }
    return count
};

var areaOfIsland = (grid,i,j) =>{
    if(i>=grid.length||i<0||j>=grid[0].length||j<0||grid[i][j]===0) return 0
    let num=1;       //增加num
    grid[i][j]=0;
    num+=areaOfIsland(grid,i+1,j);
    num+=areaOfIsland(grid,i-1,j);
    num+=areaOfIsland(grid,i,j+1);
    num+=areaOfIsland(grid,i,j-1);
    return num
};
```

#### 29-LRU缓存机制

```js
var LRUCache = function(capacity) {
    this.map = new Map();
    this.capacity = capacity;
};

LRUCache.prototype.get = function(key) {
    if(this.map.has(key)){
        let value = this.map.get(key);
        this.map.delete(key); // 删除后，再 set ，相当于更新到 map 最后一位
        this.map.set(key, value);
        return value
    } else {
        return -1
    }
};

LRUCache.prototype.put = function(key, value) {
    // 如果已有，那就要更新，即要先删了再进行后面的 set
    if(this.map.has(key)){
        this.map.delete(key);
    }
    this.map.set(key, value);
    // put 后判断是否超载
    if(this.map.size > this.capacity){
        this.map.delete(this.map.keys().next().value);
    }
};
```

#### 30-零钱兑换

动态规划

```js
const coinChange = (coins, amount) => {
  let dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1)
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}
```

#### 31-链表中倒数第K个节点

快慢指针；

`一开始快指针和慢指针都指向链表头`
`然后让快指针先走k步，走完k步之后让快指针和慢指针一起走`
`最后慢指针所指向的位置就是n-k的位置，即倒数第k个节点`

```js
var getKthFromEnd = function(head, k) {
    let fast = head
    let slow = head
    let i = 0
    while(i++ < k) {
        fast = fast.next
    }

    while(fast) {
        fast = fast.next
        slow = slow.next
    }

    return slow
};

```

#### 32-斐波那契数列

```js
 var fib = function(n) {
    const dp = [0,1]
    for (let i = 2; i <= n; i++) {
        dp[i] = (dp[i-1] + dp[i-2])
    }
    return dp[n]
};
```

#### 33-翻转二叉树

**先交换左右子树**，它们内部的子树还没翻转——丢给递归去做

```js
const invertTree = (root) => {
  if (root == null) { // 遍历到null节点时，不用翻转，直接返回它本身
    return root;
  }
  [root.left, root.right] = [root.right, root.left]
  // 内部的翻转交给递归去做
  invertTree(root.left);
  invertTree(root.right);
  return root;
};
```

#### 34-长度最小的子数组

找出该数组中满足其和 `≥ target` 的长度最小的 **连续子数组**，返回长度

```js
const minSubArrayLen = (s, nums) => {
  let minLen = Infinity;
  let i = 0;
  let j = 0;
  let sum = 0;
  while (j < nums.length) {   // 主旋律是扩张，找可行解
    sum += nums[j];
    while (sum >= s) {        // 间歇性收缩，优化可行解
      minLen = Math.min(minLen, j - i + 1);
      sum -= nums[i];
      i++;
    }
    j++;
  }
  return minLen === Infinity ? 0 : minLen; // 从未找到可行解，返回0
};
```

#### 35-接雨水

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

每一列上的面积=Math.min(left_max[i],right_max[i])-height[i]

```js
var trap = function(height) {
  let n=height.length;
  if(n===0) return 0;
  let res=0;

  let left_max=[] ,right_max=[];
  //记录左边数组的最大值
  left_max[0]=height[0];
  for(let i=1;i<n;i++){
    left_max[i]=Math.max(left_max[i-1],height[i]);
  }
  //记录右边数组的最大值
  right_max[n-1]=height[n-1];
  for(let i=n-2;i>=0;i--){
    right_max[i]=Math.max(right_max[i+1],height[i]);
  }
  //统计每一列的面积之和
  for(let i=0;i<n;i++){
    res+=Math.min(left_max[i],right_max[i])-height[i];
  }
  return res;
};
```

#### 36-最长重复子数组

暴力优化

```js
var findLength = function(A, B) {
    var max = 0;
    for(var i = 0;i < A.length;i++) {
        var a = A[i];
        if (max > A.length - i) break; // 提前跳出
        for (var j = 0;j < B.length;j++) {
            var b = B[j];
            if (max > B.length - j) break; // 提前跳出
            if (a === b) {
                var len = 1;
                while(i + len < A.length && j + len < B.length && A[i + len] === B[j+len]) {
                    len += 1;
                }
                if (len > max) {
                    max = len;
                }
            }
        }
    }
    return max;
};
```

#### 37-二叉树前序遍历

根 →左→右

```js
var preorderTraversal = (root) => {
    let result = []
    var dfs = (node) => {
        if(node) {
            // 先根节点
            result.push(node.val)
            // 然后遍历左子树
            dfs(node.left)
            // 再遍历右子树
            dfs(node.right)
        }
    }
    dfs(root)
    return result
};
```

#### 38-合并区间

```js
var merge = function (intervals) {
  let res = [];
  intervals.sort((a, b) => a[0] - b[0]);

  let prev = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i];
    if (prev[1] >= cur[0]) { // 有重合
      prev[1] = Math.max(cur[1], prev[1]); 
    } else {       // 不重合，prev推入res数组 
      res.push(prev);
      prev = cur;  // 更新 prev
    }
  }

  res.push(prev);
  return res;
};
```

#### 39-二叉树锯齿形层序遍历

偶数层从左至右，奇数层从右至左

```js
var zigzagLevelOrder = function(root) {
    var res = [];
    dfs(0, root);
    return res;
    function dfs(i, root){
        if(!root) return;
        if(!Array.isArray(res[i])) res[i] = [];
        if(i & 1) res[i].unshift(root.val);
        else res[i].push(root.val);
        dfs(i+1, root.left);
        dfs(i+1, root.right);
    }
};
```

#### 40-由前序中序遍历构造二叉树

```js
let buildTree = (preorder, inorder) => {

  //当preorder和inorder均为空的时候说明已经到了空节点
  if (!preorder.length || !inorder.length) return null;

  //创建根节点 -> preorder[0]
  let node = new TreeNode(preorder[0]);

  //找到preoder[0]对应inorder中的位置
  let index = inorder.indexOf(preorder.shift());

  //左右子树递归
  node.left = buildTree(preorder, inorder.slice(0, index));
  node.right = buildTree(preorder, inorder.slice(index + 1));

  //返回根节点
  return node;
};
```

#### ———————————————————————————————————————

#### 41-不同路径

动态规划

```js
var uniquePaths = function (m, n) {
  let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 || j == 0) dp[i][j] = 1;//基本case
      else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};
```

#### 42-青蛙跳台阶

=爬楼梯

#### 43-打乱数组

等概率选择每个位置应该填哪个数。
具体来说，我们先在0 ~ n-1中随机选一个坐标，将它作为第一个，和第一个交换位置；
剩下的n-1个数里，继续随机一个1 ~ n-1的坐标，将它作为第二个，和第二个交换位置

```js
var Solution = function(nums) {
    this.nums = nums;
};

Solution.prototype.reset = function() {
    return this.nums;
};

Solution.prototype.shuffle = function() {
    const temp = this.nums.concat();
    for(let i=0;i<temp.length;i++){
        const idx = Math.floor(Math.random() * (temp.length-i)) + i;
        [temp[idx], temp[i]] = [temp[i], temp[idx]]
    }
    return temp;
};
```

#### 44-相交链表

双指针；我走你来时的路

```js
var getIntersectionNode = function (headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA,
        pB = headB;
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
};
```

#### 45-旋转图像

交换`matrix[i][j], matrix[j][i]`，最后将得到每组数组倒序排列

```js
var rotate = function(matrix) {
    let martrixLength = matrix.length
    for(let i=0; i < martrixLength; i++) {
        for(let j=i; j < martrixLength; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }
    return matrix.map(item => item.reverse())
};
```

#### 46-复原IP地址

```
有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
```

```js
var restoreIpAddresses = function (s) {
  let len = s.length
  let arr = []
  if (len < 4 || len > 12) return arr

  for (let i = 1; i < 4; i++) {
    for (let j = i + 1; j < i + 4; j++) {
      if (j >= len) break
      for (let k = j + 1; k < j + 4; k++) {
        if (k >= len) break
        let a = s.slice(0, i)
        let b = s.slice(i, j)
        let c = s.slice(j, k)
        let d = s.slice(k)
        if (d.length > 3) continue
        if (test(a, b, c, d)) arr.push(`${a}.${b}.${c}.${d}`)
      }
    }
  }
  return arr
};

var test = (a, b, c, d) => {
  let t = x => x === '0' || (x <= 255 && x.indexOf('0') !== 0)
  return t(a) && t(b) && t(c) && t(d)
}
```

#### 47-圆圈中最后剩下的数字

经典约瑟夫环

```
0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字
```

```js
var lastRemaining = function (n, m) {
  let ans = 0;
  for (let i = 2; i <= n; i++) {
    ans = (ans + m) % i;
  }
  return ans;
};
```

#### 48-K个一组翻转链表

```js
var reverseKGroup = function(head, k) {
    let cur = head;
    let count = 0;
    // 求k个待反转元素的首节点和尾节点
    while(cur != null && count != k){
        cur = cur.next;
        count++;
    }
    // 足够k个节点，去反转
    if(count == k){
        // 递归链接后续k个反转的链表头节点
        cur = reverseKGroup(cur,k);
        while(count != 0){
            count--;
            // 反转链表
            [head.next, cur, head] = [cur, head, head.next]
        }
        head = cur;
    }
    return head;
};
```

#### 49-斐波那契数列

```js
var fib = function(n) {
    let dp = new Array(n+1).fill(0)
    dp[0] = 0              //区别于爬楼梯
    dp[1] = 1
   for(let i=2; i< n+1; i++){
     dp[i] = dp[i-1]+ dp[i-2]  
   }
return dp[n]
};
```

#### 50-二叉树的右视图

深度优先搜索dfs，在搜索过程中，我们总是先访问右子树。那么对于每一层来说，我们在这层见到的第一个结点一定是最右边的结点

```js
var rightSideView = function(root) {
  if(!root) return []
  let arr = []
  dfs(root, 0, arr)
  return arr
};
function dfs (root, step, res) {
  if(root){
    if(res.length === step){
      res.push(root.val)           // 当数组长度等于当前 深度 时, 把当前的值加入数组
    }
    // console.log(step, '-------', res)
    dfs(root.right, step + 1, res) // 先从右边开始, 当右边没了, 再轮到左边
    dfs(root.left, step + 1, res)
  }
}
```

#### 51-最小栈

```html
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:

MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。
```

思路：定义两个栈stack和min_stack，stack正常push，min_stack只会push需要入栈和栈顶中较小的元素。getMin返回min_stack栈顶元素，top返回stack栈顶元素。

```js
var MinStack = function () {
    this.stack = [];
    this.min_stack = [Infinity];
};

//stack正常push，min_stack只会push需要入栈和栈顶中较小的元素
MinStack.prototype.push = function (x) {
    this.stack.push(x);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

//stack正常pop，min_stack正常pop
MinStack.prototype.pop = function () {
    this.stack.pop();
    this.min_stack.pop();
};

//返回stack栈顶元素
MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1];
};

//返回min_stack栈顶元素
MinStack.prototype.getMin = function () {
    return this.min_stack[this.min_stack.length - 1];
};
```

#### 52-打家劫舍

标签：动态规划
动态规划方程：dp[n] = MAX( dp[n-1], dp[n-2] + num )
由于不可以在相邻的房屋闯入，所以在当前位置 n 房屋可盗窃的最大值，要么就是 n-1 房屋可盗窃的最大值，要么就是 n-2 房屋可盗窃的最大值加上当前房屋的值，二者之间取最大值。

```js
var rob = function(nums) {
    const len = nums.length
    if(len == 0) return 0
    const dp = new Array(len + 1)
    dp[0] = 0
    dp[1] = nums[0]
    for(let i = 2; i <= len; i++){
        dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i-1])
    }
    return dp[len]
};
```

#### 53-两数相加

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。请将两个数相加，并以相同形式返回一个表示和的链表。

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg" alt="img" style="zoom:50%;" />

```js
var addTwoNumbers = function(l1, l2) {
    let addOne = 0
    let sum = new ListNode('0')             // 创建一个头链表用于保存结果
    let head = sum                          // 保存头链表的位置用于最后的链表返回
    while (addOne || l1 || l2) {            //在进位或者两个链表之中有一个存在的前提下执行下面的逻辑
        let val1 = l1 !== null ? l1.val : 0 //如果值不存在时，将其设置为0
        let val2 = l2 !== null ? l2.val : 0
        let r1 = val1 + val2 + addOne
        addOne = r1 >= 10 ? 1 : 0
        sum.next = new ListNode(r1 % 10)    //sum的下一个节点
        sum = sum.next 
        if (l1) l1 = l1.next 
        if (l2) l2 = l2.next 
    }
    return head.next
};
```

#### 54-移动零

```js
var moveZeroes = function(nums) {
    for (var i = 0, len = nums.length; i < len; i++)
        if (nums[i] === 0) nums.splice(i, 1), i--
        else if (i >= nums.length) nums[i] = 0
};
//初始数组长度 - 实时数组长度 = 删0的个数
//当i大于实时数组长度，补0直到初始数组长度
```

```js
var moveZeroes = function(nums) {
    len = nums.length
    for(let i=0;i<len;i++){
        if(nums[i] === 0){
            nums.splice(i, 1)
            nums.push(0);
            i--
            len--
        }
    }
};
```

#### 55-删除链表的倒数第N个结点

思路：新建dummy节点指向head，指针n1，n2指向head，循环n2指针到n的位置，然后在同时移动n1，n2，直到结尾，n1，n2的距离是n，此时n1的位置就是需要删除元素的位置

```js
var removeNthFromEnd = function (head, n) {
    let dummy = new ListNode();
    dummy.next = head;
    let n1 = dummy;
    let n2 = dummy;
    for (let i = 0; i <= n; i++) {//n2移动n+1次
        n2 = n2.next;
    }
    while (n2 !== null) {//同时移动n1，n2
        n1 = n1.next;
        n2 = n2.next;
    }
    n1.next = n1.next.next;//删除元素
    return dummy.next;
};
```

#### 56-最长公共前缀

```js
var longestCommonPrefix = function maxStr(arr) {
    return arr.reduce((res, item) => {
      let temp = ''

      for (let i = 0; i < res.length; i++) {
        if (res[i] === item[i]) {
          temp += res[i]
        } else {
          break
        }
      }
      return temp
    })
  }
```

#### 57-字符串相乘

```js
var multiply = function(num1, num2) {
    const n = num1.length, m = num2.length;
    const len = n + m;
    const arr = new Array(len).fill(0);
    for(let i = n - 1;i >= 0; i--) {
        for(let j = m - 1; j >= 0; j--) {
            let mul = (+num1[i]) * (+num2[j]) + arr[i + j + 1]; // 隐式转换
            arr[i + j + 1] = mul % 10;
            arr[i + j] += Math.floor(mul / 10);
        }
    }
    const start = arr.findIndex((num) => (+num));   // 找到第一个非 0 的下标
    return arr.slice(start).join('') || '0';    // 全0判断
};
```

#### 58-二叉搜索树中第K小的元素

其实就是中序遍历，找第k个即可

```js
var kthSmallest = function(root, k) {
    let ans;
    const inOrderTraverse = function(node) {
        if(node!=null && k>0) {
            inOrderTraverse(node.left);
            if(--k==0)
                ans = node.val;
            inOrderTraverse(node.right);
        }
    }
    inOrderTraverse(root);
    return ans;
};
```

#### 59-最小路径和

```js
var minPathSum = function(grid) {
    let row = grid.length, col = grid[0].length

    // calc boundary
    for(let i = 1; i < row; i++)
        // calc first col
        grid[i][0] += grid[i - 1][0]

    for(let j = 1; j < col; j++)
        // calc first row
        grid[0][j] += grid[0][j - 1]

    for(let i = 1; i < row; i++)
        for(let j = 1; j < col; j++)
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
    
    return grid[row - 1][col - 1]
};
```

#### 60-阿拉伯数字转中文数字

```js
    function numberToChinese(num){
        var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
        var chnUnitChar = ['', '十', '百', '千']
        var strIns = ''
        var chnStr = ''
        var unitPos = 0
        var zero = true
        while (num > 0) {
            var v = num % 10
            if (v === 0) {
            if (!zero) {
                zero = true
                chnStr = chnNumChar[v] + chnStr
            }
            } else {
            zero = false
            strIns = chnNumChar[v]
            strIns += chnUnitChar[unitPos]
            chnStr = strIns + chnStr
            if (chnStr[0] === '一' && chnStr[1] === '十') {
                chnStr = chnStr.replace('一十', '十')
            }
            }
            unitPos++
            num = Math.floor(num / 10)
        }
        return chnStr
    }
```

```js
let n = 123;
let arr = entrance(n);

console.log(arr); // 答案

function entrance(num) {
  let arr = num.toString().split('').reverse().join('');
  let curr = 0;
  let x = [,'万','亿'];
  let y = 0;
  let res = [];
  let answer = [];
  while(curr < arr.length) {
    res.push(NumToChina(arr.slice(curr,curr+4)));
    curr+=4;
  }
  for(let i = res.length - 1;i >=0;i--) {
    if(res[i] === '零' && res.length > 1) continue;
    answer.push(i !== 0 ? res[i]+x[i] : res[i]);
  }
  return answer.join('');
}

function NumToChina(n) {
  let unit = [,'十','百','千'];
  let number = ['零','一','二','三','四','五','六','七','八','九']
  let arr = n.toString().split('');
  let res = [];
  res.unshift(number[arr[0]]);
  for(let i =1;i<arr.length;i++) {
    if(arr[i] === '0' && arr[i-1] === '0') continue;
    if(arr[i] === '0') {
      res.unshift(number[arr[i]]);
    } else {
      res.unshift(unit[i]);
      res.unshift(number[arr[i]]);
    }
  }
  let len = res.length;
  if(res[len-1] === '零' && len !== 1) res.pop();
  if(arr.length === 2 && res[0] === '一') res.shift();
  return res.join('');
}
```

