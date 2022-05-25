module.exports = {
  "title": "Amir Lu",
  "description": "雨落无声情似雪，绕船夜听江水眠",
  "dest": "docs",
  "base": "/blog/",
  "locales": {
    '/': {
      lang: 'zh-CN'
    }
  },
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/avatar.png"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "plugins": [
    [
      '@vuepress/register-components',
    ],
    [
      //先安装在配置， npm install   --save
      //'haru1', 'blackCat', 'whiteCat', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ['miku'],
        clean: true, // 是否显示操作按钮
        messages: {
          welcome: '我是Amir Lu，欢迎你的关注 ',
          home: '心里的话，我想要带你回家。',
          theme: '好吧，希望你能喜欢我的其他小伙伴。',
          close: '再见哦'
        },
        width: 240,
        height: 352,
        modelStyle: {
          left: '30px',
          bottom: '-20px',
          opacity: '0.8'
        }
      }
    ],
    [
      //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
      "cursor-effects",
      {
        size: 3,                    // size of the particle, default: 2
        // shape: ['start'],  // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    [
      //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)好起来了！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)坏起来了！",
        recoverTime: 2000
      }
    ],
    [
      //vuepress复制粘贴提示插件P 先安装在配置 npm install vuepress-plugin-nuggets-style-copy --save
      "vuepress-plugin-nuggets-style-copy", {
        copyText: "复制代码",
        tip: {
          content: "复制成功!"
        }
      }
    ],
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "留言板",
        "icon": "reco-suggestion",
        "link": "/article/message-board.md"
      },
      {
        "text": "关于我",
        "icon": "reco-account",
        "items": [
          {
            "text": "个人信息",
            "link": "/article/about.md",
          },
          {
            "text": "掘金",
            "link": "https://juejin.cn/user/123614960552727",
            "icon": "reco-juejin"
          }
        ]
      }
    ],
    "subSidebar": "auto",
    "sidebar": {
      "/article/informal-essay/": [
        "",
        "timer"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "touch fish",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "ok5215280@gmail.com",
        "link": "https://momoyu.cc/"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "valineConfig": {
      "appId": 'Lt08OCjedmFHtvj8mRjiQYxW-gzGzoHsz',// your appId
      "appKey": 'Q1oaJOIF7mhhhDjc3PbxaQUR', // your appKey
    },
    "logo": "/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Kakki",
    "authorAvatar": "/logo.jpeg",
    "record": "Kakki",
    "startYear": "2022"
  },
  "markdown": {
    "lineNumbers": true
  }
}