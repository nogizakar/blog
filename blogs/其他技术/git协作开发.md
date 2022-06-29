#### 分支管理

##### 1. 常设分支

git版本库的两条主要的分支: `master`和`develop` .

**master分支**

- `master`分支由版本库初始化后自动创建,主要用于部署生产环境的分支,要确保`master`分支的稳定性
- `master`分支一般由`develop`以及`hotfix`分支合并,任何时间都不能直接修改代码
- `master`分支只能管理员可以进行`push`操作, 他人若要合并分支到`master`需要提`merge request`由管理员进行`code review`之后再合并

**develop**分支

- `develop`为开发分支, 始终保持最新开发完成以及`bug`修复后的代码
- 一般开发新的功能时, `feature`分支都是基于`develop`分支创建的

##### 2. 临时性分支

**功能分支 feature**

- 开发新功能时,从`develop`分支上切出`feature`分支
- 分支命名规范: `feature/`开头,后面跟有意义的新功能名或模块名,如: `feature/user_management`(用户管理需求)、`feature/power_manangement`(电源管理)
- 如果多人共用一个功能分支,那么本地代码`push`之前一定要经过自测,至少保证主流程走通,页面正常访问.

**测试分支 test**

- 当`feature/XX`分支开发完成后，合并代码到`test`分支并部署到测试环境，进入测试阶段
- 若测试的过程中存在`bug`需修复，由开发者在其功能分支`feature/XX`进行修复并合并到`test`分支回归测试
- 当测试通过后，需要将功能分支`feature/XX`合并到`develop`分支进行回归测试
- 测试分支`test`可能同时合并了多个开发分支`feature/XX`，不同的开发需求可能上线时间不一样，所以`test`分支不可以直接合并到到`develop`

**修复分支 hotfix**

- 如果线上出现紧急问题，需及时处理时，则需要修复分支`hotfix`进行`bug`修复
- 分支命名规范：`hotfix/xxx`，命名规则和`feature`类似
- 修复分支需从`master`主分支上创建，修复完成后，需要合并到`develop`和`master`分支



#### 常用操作

![img](https://www.runoob.com/wp-content/uploads/2015/02/git-command.jpg)

#### 分支操作

查看分支 `git branch` 单纯查看有哪些分支
创建分支，并切换到该分支上 `git checkout -b` 分支名 
创建分支 `git branch` 分支名 
切换分支 `git checkout` 分支名
合并分支 `git merge` 分支名，`git status`来查看冲突信息



#### 版本管理

* 使用命令git status，查看工作区状态

* 如果git status告诉你有文件被修改过，用git diff可以查看修改内容

* HEAD指向当前版本，使用命令git reset --hard commit_id可以切换版本

* 穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本

* 要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本
  