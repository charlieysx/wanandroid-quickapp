## wanandroid-快应用(quickapp)

[快应用官网](https://www.quickapp.cn/)

#### wanandroid快应用截图

![Alt text](/img/1.jpeg)
![Alt text](/img/2.jpeg)
![Alt text](/img/3.jpeg)
![Alt text](/img/4.jpeg)


##### 先吐槽下
1.因为快应用刚出来，网上没有教程(至少我今天在写这个应用的时候，网上除了demo还是demo，而且demo是官网的demo)
2.官网虽然有文档，但是文档还不完善，很多地方都不知道怎么解决，写这个应用真的是靠自己慢慢摸索写出来的，本来还有几个功能，因为实在找不出解决方法放弃了（待慢慢研究）。。。

##### 注：前几步跟官方文档教程基本一致，可跳过。

#### 一、环境搭建
##### 1.安装nodejs
nodejs可以在[官网](https://nodejs.org/en/)下载
快应用文档说是不要使用8.0.*版本，推荐v6.11.3 LTS
一开始以为是8以上不能用，查了下我电脑的是8.2.0，本来打算退回去的，尝试之后发现没有报错可以正常使用。

##### 2.安装hap-toolkit
```
npm install -g hap-toolkit
```
这一步如果卡住了(我就是这样)，可以ctrl+c终止，然后输入以下命令设置淘宝镜像，之后再安装
```
npm config set registry https://registry.npm.taobao.org
```
安装完成输入命令
```
hap -V
```
正确输出版本信息说明安装成功。

#### 二、初始化项目
##### 1.执行以下命令初始化项目
```
hap init <你的项目名称>
```
命令执行后会在当前目录下生成名为  你的项目名称  的文件夹，作为项目根目录，目录结构如下：
```
├── node_modules
├── sign                      rpk包签名模块
│   └── debug                 调试环境
│       ├── certificate.pem   证书文件
│       └── private.pem       私钥文件
├── src
│   ├── Common                公用的资源文件和组件文件
│   │   └── logo.png          manifest.json中配置的icon
│   ├── Demo                  页面目录
│   |   └── index.ux          页面文件，文件名不必与父文件夹相同
│   ├── app.ux                APP文件（用于包括公用资源）
│   └── manifest.json         项目配置文件（如：应用描述、接口申明、页面路由等）
└── package.json              定义项目需要的各种模块及配置信息，npm install根据这个配置文件，自动下载所需的运行和开发环境
```
##### 2.编译项目
先安装依赖，在项目根目录执行以下命令
```
npm install
```
待安装完成，使用以下命令编译打包生成rpk包
```
npm run build
```
编译打包成功后，项目根目录下会生成文件夹：build、dist

* build：临时产出，包含编译后的页面js，图片等
* dist：最终产出，包含rpk文件。其实是将build目录下的资源打包压缩为一个文件，后缀名为rpk，这个rpk文件就是项目编译后的最终产出

使用以下命令可自动重新编译，
```
npm run watch
```

###### 注意：（我每次都遇到这个问题）
如果报错遇到Cannot find module '.../webpack.config.js'，请重新执行一次hap update --force。这是由于高版本的npm在npm install时，会校验并删除了node_modules下部分文件夹，导致报错。而hap update --force会重新复制hap-tools文件夹到node_modules中
#### 三、调试
##### 1.安装调试器
调试器是一个android应用，直接[下载](https://statres.quickapp.cn/quickapp/quickapp/201803/file/201803221213415527241.apk)安装
![Alt text](/img/tiaoshi.png)
安装完打开如图所示，此时按钮都不能点击，还需要再安装[平台预览版](https://statres.quickapp.cn/quickapp/quickapp/201803/file/20180322121456491785.apk)
两个应用安装完就可以安装快应用了

##### 2.安装运行rpk包
有两种方式：
* HTTP请求：开发者启动HTTP服务器，打开调试器，点击扫码安装配置HTTP服务器地址，下载rpk包，并唤起平台运行rpk包
* 本地安装：开发者将rpk包拷贝到手机文件系统，打开调试器，点击本地安装选择rpk包，并唤起平台运行rpk包

推荐第一种方式，调试比较方便。

http请求方式：
执行命令：
```
// 默认端口12306
npm run server

// 自定义端口,比如8080
npm run server -- --port 8080
```
执行成功会显示二维码，可用调试器扫描二维码安装，或点击调试器右上角设置http服务器地址再点击在线更新。

此时配合命令
```
npm run watch
```
即可边开发边预览效果

关于日志查看，官方文档介绍是使用Android Studio的Android Monitor输出来查看日志。这里提供另一种方法，执行以下命令
```
adb logcat -s JsConsole
// JsConsole是过滤信息，因为在as看到快应用日志输出都有JsConsole这个标记，所以直接使用这个查看快应用日志，就不会被手机其他日志干扰
```
这样就可以愉快地开发应用了，因为这些命令都是不能中断（以为中断就看不了信息了或调试不了了），所以需要打开多个终端，这里推荐用vscode+hap extension插件开发，直接可边开发边查看，不用切换屏幕等等，如图：
![Alt text](/img/vscode.png)
#### 四、开始开发
###### 一开始看demo代码，以为是跟vue差不多，开发起来应该挺简单的，开发过程才慢慢发现，其他它并不是真正的html+css，很多html、css代码都不支持，似乎它只是模拟而已，因为会把它转为原生组件，暂时就没能全部支持，所以开发过程还是挺难受的，动不动就报错没有这个属性没有那个属性。

###### 这里通过[wanandroid开发api](http://www.wanandroid.com/blog/show/2)来开发wanandroid应用
##### 1.修改manifest.json配置信息
```
{
  "package": "cn.codebear.wanandroid", //应用包名
  "name": "wanandroid", //应用名称
  "versionName": "1.0.0", //版本名称
  "versionCode": "1", //版本号
  "minPlatformVersion": "101", //支持的最小平台版本号
  "icon": "/Common/Image/logo.png", //应用logo
  "features": [ //接口列表
    { "name": "system.prompt" },
    { "name": "system.router" },
    { "name": "system.shortcut" },
    { "name": "system.fetch" },
    { "name": "system.webview" },
    { "name": "system.storage" }
  ],
  "permissions": [
    { "origin": "*" }
  ],
  "config": { //系统配置信息
    "logLevel": "debug"
  },
  "router": { //路由信息
    "entry": "Wanandroid",
    "pages": {
      "Wanandroid": {
        "component": "index"
      },
      "Webview": {
        "component": "index"
      }
    }
  },
  "display": { //UI显示相关配置
    "titleBar": true,
    "titleBarBackgroundColor": "#24b9ff",
    "titleBarTextColor": "#ffffff",
    "titleBarText": "首页",
    "pages": {
    }
  }
}
```
具体如何配置，官方文档写的挺详细，这里就不多说了。
##### 2.删除代码
把项目初始化时给的demo代码都删掉。
##### 3.创建wanandroid页面
在src目录下新建一个Wanandroid目录，目录下新建一个index.ux文件，命名不一定要index。这个作为应用的主页面。
代码如下
```
<template>
    <div class="wanandroid-page">
      <div class="flexible-tabs">
        <tabs onchange="changeTabactive" index="{{currentIndex}}">
          <tab-content class="flexible-tab-content">
            <div class="tab-content-section">
              <home></home>
            </div>
            <div class="tab-content-section">
              <classify></classify>
            </div>
          </tab-content>
        </tabs>
        <div class="flexible-tabbar">
          <div for="{{(index, item) in tabItems}}" class="tab-item" onclick="clickTabBar(index)">
            <image class="tab-icon" src="{{item.icon[currentIndex === index ? 1 : 0]}}"></image>
            <text class="{{currentIndex === index ? 'active' : 'tab-text'}}">{{item.text}}</text>
          </div>
        </div>
      </div>
    </div>
  </template>

  <import name="home" src="../Home/index"></import>
  <import name="classify" src="../Classify/index"></import>
  
    <script>
    import router from '@system.router'
  
    export default {
      data() {
        return {
          currentIndex: 0,
          tabItems: [
            {
              text: '首页',
              icon: ['../Common/Image/icon_home.png', '../Common/Image/icon_home_select.png']
            },
            {
              text: '体系',
              icon: ['../Common/Image/icon_classify.png', '../Common/Image/icon_classify_select.png']
            }
          ]
        }
      },
      changeTabactive (evt) {
        this.changeCurrent(evt.index)
      },
      clickTabBar (index) {
        this.changeCurrent(index)
      },
      changeCurrent(index) {
        this.$page.setTitleBar({ text: this.tabItems[index].text })
        this.currentIndex = index
      }
    }
  </script>
```
使用了tabs组件，本来是tab和tab-content配合使用的，发现用tab，点击一直会出现卡顿的现象，就改为tab用div实现。这个页面比较简单，就是一个底部tabs按钮和一个content显示内容，分别为home组件和classify组件。

##### 4.home组件
home组件显示首页内容，包括顶部的banner和底部的文章列表。
整个页面用list包裹，使其可以上下滑动，比较喜欢的一点是可以很方便设置header和footer。
list的item从上往下分别为banner、标题、文章列表、footer(加载更多提示)

banner使用官方的容器组件swiper来轮播展示，代码如下
```
<list-item type="banner">
	<swiper class="banner" autoplay="true" interval="4000">
		<stack class="banner" for="{{bannerlist}}">
			<image class="banner-image" src="{{$item.imagePath}}" onclick="openArticle($item.url, '', $item.title)"></image>
			<text class="banner-title">{{$item.title}}</text>
		</stack>
	</swiper>
</list-item>
```
文章使用for遍历显示
```

        <!-- 文章 -->
        <block for="articleList">
          <list-item type="article" class="article-item" onclick="openArticle($item.link, $item.projectLink, $item.title)">
            <div>
              <text class="tag" show="{{$item.fresh}}">新</text>
              <text class="text-title">{{$item.title}}</text>
            </div>
            <div class="article-tip">
                <text class="tip">分类: {{$item.superChapterName}}/{{$item.chapterName}}</text>
            </div>
            <div class="article-tip">
              <text class="tip">作者: {{$item.author}}</text>
              <text class="time">{{$item.niceDate}}</text>
            </div>
          </list-item>
        </block>
```
底部加载更多
```
 <!-- 加载更多，type属性自定义命名为loadMore -->
        <list-item type="loadMore" class="load-more">
          <progress type="circular" show="{{hasMoreData}}"></progress>
          <text show="{{hasMoreData}}">加载更多</text>
          <text show="{{!hasMoreData}}">没有更多了~</text>
        </list-item>
```

关于list的用法，直接查看官方文档即可，很详细[list教程](https://doc.quickapp.cn/tutorial/widgets/list-tutorial.html)
swiper的用法，直接使用，里面使用for循环显示图片等，设置autoplay为true，即可实现自动播放，这里貌似有一个坑，需要设置swiper的高度，否则高度似乎是0，不会随着里面的图片大小变化的，也可能是我写代码姿势不对。。。说到这里，要说一下text组件，在有些地方要给它设置一个合适的高度，不然会上下被裁剪。。。

##### 5.classify组件
这个组件显示的是类别和对应的文章列表，其实就是三个list，具体看代码，挺简单的。

##### 6.webview页面
还有一个页面就是显示webview，因为wanandroid没有接口返回文章内容，只有文章链接，所以需要用webview打开，直接使用官方提供的web组件，使用非常简单
```
<web src="{{ url }}" id="web"></web>
```
记得在manifest.json中声明接口{ "name": "system.webview" }，否则会提示缺乏权限。

##### 7.关于网络请求
在manifest.json中声明接口{"name": "system.fetch"}
代码中使用，这里给出获取banner的代码，其他可在项目中查看
```
<script>
  import fetch from '@system.fetch'
  ...
  getBanner() {
      fetch.fetch({
        url:"http://www.wanandroid.com/banner/json",
        success:function(data){
          this.bannerlist = JSON.parse(data.data).data;
        }.bind(this),
        fail: function(data, code) {
          console.log("handling fail, code=" + code);
        }
      })
    }
   ...
```

今天就自己摸索着写了这么多代码。
项目地址：https://github.com/CB-ysx/wanandroid-quickapp

#### 五、总结
开发这个应用，感觉还是挺方便的，挺快的（无论是启动还是开发），但是目前文档还不够完善，网上教程也几乎没有，自己摸索还是挺累的，很多组件都还不怎么会用。
总而言之，对于学前端的人（虽然我是android开发仔）来说，学习成本不会很高，有空就学学新东西，反正学的是自己的，技多不压身。

#### 六、补充
##### 1、refresh下拉刷新组件的使用
```
<refresh @refresh="refresh" refreshing="{{isRefreshing}}">
...
</refresh>

...
  export default {
    data: {
      isRefreshing: false
    },
    ...
    refresh(evt) {
      this.isRefreshing = evt.refreshing;
    },
    closeRefresh() {
      this.isRefreshing = false;
    }
  }
...
```
##### 2、list中list-item复用问题
使用list时，list-item相同type类型的item会复用，所以会导致一个问题，比如同一个list-item，非选中时背景为白色，选中时背景为蓝色，按一般的写法是这样：
```
<list-item>
  <text class="{{ currentIndex === index ? 'active' : 'normal' }}">text</text>
</list-item>

...
normal: {
  padding: 10px;
}
active: {
  padding: 10px;
  color: #ffffff;
  background-color: #24b9ff;
  border-radius: 5px;
}
...
```
如果在没有复用的情况下，这样写是没问题的，但item被复用时，加入item1被选中，此时背景为蓝色，也就是有了active这个类，在后面的item中，有可能被重新用到了，如果被用在非选中的item时，因为normal没有设置字体颜色和背景颜色，所以此时的item的背景颜色依然为蓝色，就会导致出现多个item看起来是选中状态。

解决方法：
* 第一种方法：给normal设置字体颜色和背景颜色
```
normal: {
  padding: 10px;
  color: #2e3135;
  background-color: #ffffff;
  border-radius: 5px;
}
```
* 第二种方法：使用两个不用type的item（不推荐，因为如果item比较复杂的话代码量会增多，而其他性能可能会受影响）
```
<list-item if="currentIndex === index" type="active">
  <text class="active">text</text>
</list-item>
<list-item else type="normal">
  <text class="normal">text</text>
</list-item>
```