###GUI
    图形用户界面（Graphical User Interface，简称 GUI，又称图形用户接口）是指采用图形方式显示的计算机操作用户界面
	与 CLI 相比，图形界面对于普通用户在视觉和操作上更加容易接受

####基于Node.js的GUI框架
	NW.JS（Node-Webkit）
	Electron
	
	使用HTML、CSS、JavaScript来构建 UI、处理与用户的交互，同时不约而同的使用了开源浏览器 Chromium
	使用 Node.js 来访问 浏览器 之外的内容，比如系统、文件、网络等等……


#####Electron
	使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用
	当前最新版本：2.0.8
	Node版本：8.9.3
	Chromium：61.0.3163.100

    构建项目
	npm init
	设置项目入口文件：
		“main”: “index.js”
		项目入口文件是 Electron 第一个加载的文件，是整个项目的入口

    主进程与渲染进程
        在 Electron 中，被 Electron 直接运行的脚本（package.json 中指定的 main 脚本）被称为主进程
        在 Electron 中用来展示界面的 web 页面都运行在一个独立的，属于它自己的渲染进程中
        我们可以通过主进程来创建 web 页面，但一个 web 页面被销毁的时候，对应的渲染进程也会被终止
        主进程管理所有的 web 页面和它们对应的渲染进程
        一个应用程序有且仅有一个主进程

	electron & node.js
		在 Electron 中，Electron 同时为 主进程 与 渲染进程暴露了 Node.js 的所有接口
		也就是说，我们可以在 Electron 的主进程 与 渲染进程 中使用 Node.js 的 API

		同时，在 Electron 中，也提供了大量的 API 去帮助我们开发桌面应用程序，我们可以通过 require('electron') 来引入它们
		需要注意的是，API 是区分进程类型的，也就是有的 API 只能在特定（主进程或渲染进程中进行使用）

		安装
			npm i electron
			require('electron')

		BrowserWindow 类
			创建和控制浏览器窗口

			new BrowserWindow( [options] )
				options：窗口选项

			api:
				https://electronjs.org/docs/api/browser-window




