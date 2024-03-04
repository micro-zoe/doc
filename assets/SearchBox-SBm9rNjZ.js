import{g as w,j as y,k as O,f as N,t as M,l as L,m as S,_ as I,o as u,c as d,p as z,v as T,d as f,n as _,q as x,F as C,s as k,x as R,y as v,z as F}from"./app-CYuVcYeJ.js";const B=[{path:"/",title:"",pathLocale:"/",contents:[]},{path:"/zh/",title:"",pathLocale:"/",contents:[{header:"微前端",slug:"微前端",content:`微前端的概念是由ThoughtWorks在2016年提出的，它借鉴了微服务的架构理念，核心在于将一个庞大的前端应用拆分成多个独立灵活的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用融合为一个完整的应用，或者将原本运行已久、没有关联的几个应用融合为一个应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活。
它主要解决了两个问题： 1、随着项目迭代应用越来越庞大，难以维护。
2、跨团队或跨部门协作开发项目导致效率低下的问题。`},{header:"关于micro-app",slug:"关于micro-app",content:`在micro-app之前，业内已经有一些开源的微前端框架，比较流行的有2个：single-spa和qiankun。
single-spa是通过监听 url change 事件，在路由变化时匹配到渲染的子应用并进行渲染，这个思路也是目前实现微前端的主流方式。同时single-spa要求子应用修改渲染逻辑并暴露出三个方法：bootstrap、mount、unmount，分别对应初始化、渲染和卸载，这也导致子应用需要对入口文件进行修改。因为qiankun是基于single-spa进行封装，所以这些特点也被qiankun继承下来，并且需要对webpack配置进行一些修改。
micro-app并没有沿袭single-spa的思路，而是借鉴了WebComponent的思想，通过CustomElement结合自定义的ShadowDom，将微前端封装成一个类WebComponent组件，从而实现微前端的组件化渲染。并且由于自定义ShadowDom的隔离特性，micro-app不需要像single-spa和qiankun一样要求子应用修改渲染逻辑并暴露出方法，也不需要修改webpack配置，是目前市面上接入微前端成本最低的方案。`},{header:"概念图",slug:"概念图",content:""},{header:"micro-app的优势",slug:"micro-app的优势",content:""},{header:"1、使用简单",slug:"_1、使用简单",content:"我们将所有功能都封装到一个类WebComponent组件中，从而实现在基座应用中嵌入一行代码即可渲染一个微前端应用。"},{header:"2、功能强大",slug:"_2、功能强大",content:"micro-app提供了js沙箱、样式隔离、元素隔离、路由隔离、预加载、数据通信等一系列完善的功能。"},{header:"3、兼容所有框架",slug:"_3、兼容所有框架",content:"为了保证各个业务之间独立开发、独立部署的能力，micro-app做了诸多兼容，在任何前端框架中都可以正常运行。"}]},{path:"/zh/advanced.html",title:"高级功能",pathLocale:"/",contents:[{header:"高级功能",slug:"高级功能",content:""},{header:"1、自定义fetch",slug:"_1、自定义fetch",content:`通过自定义fetch替换框架自带的fetch，可以修改fetch配置(添加cookie或header信息等等)，或拦截HTML、JS、CSS等静态资源。
自定义的fetch必须是一个返回string类型的Promise。
import microApp from '@micro-zoe/micro-app' microApp.start({ /** * 自定义fetch * @param {string} url 静态资源地址 * @param {object} options fetch请求配置项 * @param {string|null} appName 应用名称 * @returns Promise<string> */ fetch (url, options, appName) { if (url === 'http://localhost:3001/error.js') { // 删除 http://localhost:3001/error.js 的内容 return Promise.resolve('') } const config = { // fetch 默认不带cookie，如果需要添加cookie需要配置credentials credentials: 'include', // 请求时带上cookie } return window.fetch(url, Object.assign(options, config)).then((res) => { return res.text() }) }
})
Note 如果跨域请求带cookie，那么Access-Control-Allow-Origin不能设置为*，必须指定域名，同时设置Access-Control-Allow-Credentials: true`}]},{path:"/zh/api.html",title:"",pathLocale:"/",contents:[{header:"start",slug:"start",content:"描述： micro-app注册函数，全局执行一次\n介绍：\nstart (options?: { tagName?: string, // 设置标签名称，默认为micro-app iframe?: boolean, // 全局开启iframe沙箱，默认为false inline?: boolean, // 全局开启内联script模式运行js，默认为false destroy?: boolean, // 全局开启destroy模式，卸载时强制删除缓存资源，默认为false // shadowDOM?: boolean, // 全局开启shadowDOM模式，默认为false ssr?: boolean, // 全局开启ssr模式，默认为false 'disable-scopecss'?: boolean, // 全局禁用样式隔离，默认为false 'disable-sandbox'?: boolean, // 全局禁用沙箱，默认为false 'keep-alive'?: boolean, // 全局开启保活模式，默认为false 'disable-memory-router'?: boolean, // 全局关闭虚拟路由系统，默认值false 'keep-router-state'?: boolean, // 子应用在卸载时保留路由状态，默认值false 'disable-patch-request'?: boolean, // 关闭子应用请求的自动补全功能，默认值false 'router-mode'?: string, // 设置路由模式，共四种：search、native、native-scope、pure，默认为search iframeSrc?: string, // 设置iframe沙箱中iframe的src地址，默认为子应用所在页面地址 // 全局生命周期 lifeCycles?: { created?(e?: CustomEvent): void beforemount?(e?: CustomEvent): void mounted?(e?: CustomEvent): void unmount?(e?: CustomEvent): void error?(e?: CustomEvent): void }, // 预加载，支持数组或函数 preFetchApps?: Array<{ name: string, url: string, disableScopecss?: boolean, disableSandbox?: boolean, // shadowDOM?: boolean }> | (() => Array<{ name: string, url: string, disableScopecss?: boolean, disableSandbox?: boolean, // shadowDOM?: boolean }>), // 插件系统，用于处理子应用的js文件 plugins?: { // 全局插件，作用于所有子应用的js文件 global?: Array<{ // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到主应用中，scopeProperties可以禁止这种情况) scopeProperties?: string[], // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上) escapeProperties?: string[], // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建 excludeChecker?: (url: string) => boolean // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染 ignoreChecker?: (url: string) => boolean // 可选，传递给loader的配置项 options?: any, // 可选，js处理函数，必须返回 code 值 loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => string, // 可选，html 处理函数，必须返回 code 值 processHtml?: (code: string, url: string, options: unknown) => string }> // 子应用插件 modules?: { // appName为应用的名称，这些插件只会作用于指定的应用 [name: string]: Array<{ // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到主应用中，scopeProperties可以禁止这种情况) scopeProperties?: string[], // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上) escapeProperties?: string[], // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建 excludeChecker?: (url: string) => boolean // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染 ignoreChecker?: (url: string) => boolean // 可选，传递给loader的配置项 options?: any, // 必填，js处理函数，必须返回code值 loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => string, // 可选，html 处理函数，必须返回 code 值 processHtml?: (code: string, url: string, options: unknown) => string }> } }, // 重定义fetch方法，可以用于拦截资源请求操作 fetch?: (url: string, options: Record<string, any>, appName: string | null) => Promise<string> // 设置全局静态资源 globalAssets?: { js?: string[], // js地址 css?: string[], // css地址 }, // 指定部分特殊的动态加载的微应用资源（css/js) 不被 micro-app 劫持处理 excludeAssetFilter?: (assetUrl: string) => boolean // 基座对子应用 document 的一些属性进行自定义代理扩展 customProxyDocumentProps?: Map<string | number | symbol, (value: unknown) => void>\n})\n使用方式：\n// index.js\nimport microApp from '@micro-zoe/micro-app' microApp.start()"},{header:"preFetch",slug:"prefetch",content:`描述： 预加载，在浏览器空闲时间，依照开发者传入的顺序，依次加载每个应用的静态资源
介绍：
preFetch([ { name: string, url: string, disableScopecss?: boolean, disableSandbox?: boolean, },
])
使用方式：
import { preFetch } from '@micro-zoe/micro-app' // 方式一
preFetch([ { name: 'my-app1', url: 'xxx' }, { name: 'my-app2', url: 'xxx' },
]) // 方式二
preFetch(() => [ { name: 'my-app1', url: 'xxx' }, { name: 'my-app2', url: 'xxx' },
])`},{header:"getActiveApps",slug:"getactiveapps",content:`描述： 获取正在运行的子应用，不包含已卸载和预加载的应用
版本限制： 0.5.2及以上版本
介绍：
/** * getActiveApps接受一个对象作为参数，详情如下： * @param excludeHiddenApp 是否过滤处于隐藏状态的keep-alive应用，默认false * @param excludePreRender 是否过滤预渲染的应用，默认false */
function getActiveApps({ excludeHiddenApp?: boolean, excludePreRender?: boolean,
}): string[]
使用方式：
import { getActiveApps } from '@micro-zoe/micro-app' // 获取所有正在运行的应用的名称
getActiveApps() // [子应用1name, 子应用2name, ...] // 获取所有正在运行的应用的名称，但不包括已经处于隐藏状态的keep-alive应用
getActiveApps({ excludeHiddenApp: true }) // 获取所有正在运行的应用的名称，但不包括预渲染应用
getActiveApps({ excludePreRender: true })`},{header:"getAllApps",slug:"getallapps",content:`描述： 获取所有子应用，包含已卸载和预加载的应用
版本限制： 0.5.2及以上版本
介绍：
function getAllApps(): string[]
使用方式：
import { getAllApps } from '@micro-zoe/micro-app' getAllApps() // [子应用name, 子应用name, ...]`},{header:"version",slug:"version",content:`描述： 查看版本号
方式1：
import { version } from '@micro-zoe/micro-app'
方式2： 通过micro-app元素上的version属性查看
document.querySelector('micro-app').version`},{header:"pureCreateElement",slug:"purecreateelement",content:`描述： 创建无绑定的纯净元素
使用方式：
import { pureCreateElement } from '@micro-zoe/micro-app' const pureDiv = pureCreateElement('div') document.body.appendChild(pureDiv)`},{header:"removeDomScope",slug:"removedomscope",content:`描述： 解除元素绑定，通常用于受子应用元素绑定影响，导致主应用元素错误绑定到子应用的情况
介绍：
/** * @param force 解除元素绑定，并且一定时间内(一个微任务Promise时间)阻止再次绑定。 */
function removeDomScope(force?: boolean): void
使用方式：
import { removeDomScope } from '@micro-zoe/micro-app' // 解除元素绑定
removeDomScope() // 解除元素绑定，并且一定时间内阻止再次绑定
removeDomScope(true)`},{header:"unmountApp",slug:"unmountapp",content:`描述： 手动卸载应用
版本限制： 0.6.1及以上版本
介绍：
// unmountApp 参数配置
interface unmountAppParams { /** * destroy: 是否强制卸载应用并删除缓存资源，默认值：false * 优先级: 高于 clearAliveState * 对于已经卸载的应用: 当子应用已经卸载或keep-alive应用已经推入后台，则清除应用状态及缓存资源 * 对于正在运行的应用: 当子应用正在运行，则卸载应用并删除状态及缓存资源 */ destroy?: boolean /** * clearAliveState: 是否清空应用的缓存状态，默认值：false * 解释: 如果子应用是keep-alive，则卸载并清空状态，并保留缓存资源，如果子应用不是keep-alive，则执行正常卸载流程，并保留缓存资源 * 补充: 无论keep-alive应用正在运行还是已经推入后台，都将执行卸载操作，清空应用缓存状态，并保留缓存资源 */ clearAliveState?: boolean
} function unmountApp(appName: string, options?: unmountAppParams): Promise<boolean>
使用方式：
// 正常流程
unmountApp(子应用名称).then(() => console.log('卸载成功')) // 卸载应用并清空缓存资源
unmountApp(子应用名称, { destroy: true }).then(() => console.log('卸载成功')) // 如果子应用是keep-alive应用，则卸载并清空状态，如果子应用不是keep-alive应用，则正常卸载
unmountApp(子应用名称, { clearAliveState: true }).then(() => console.log('卸载成功')) // 如果destroy和clearAliveState同时为true，则clearAliveState将失效
unmountApp(子应用名称, { destroy: true, clearAliveState: true }).then(() => console.log('卸载成功'))`},{header:"unmountAllApps",slug:"unmountallapps",content:`描述： 手动卸载所有应用
版本限制： 0.6.1及以上版本
介绍：
// unmountAllApps 参数配置
interface unmountAppParams { /** * destroy: 是否强制卸载应用并删除缓存资源，默认值：false * 优先级: 高于 clearAliveState * 对于已经卸载的应用: 当子应用已经卸载或keep-alive应用已经推入后台，则清除应用状态及缓存资源 * 对于正在运行的应用: 当子应用正在运行，则卸载应用并删除状态及缓存资源 */ destroy?: boolean /** * clearAliveState: 是否清空应用的缓存状态，默认值：false * 解释: 如果子应用是keep-alive，则卸载并清空状态，并保留缓存资源，如果子应用不是keep-alive，则执行正常卸载流程，并保留缓存资源 * 补充: 无论keep-alive应用正在运行还是已经推入后台，都将执行卸载操作，清空应用缓存状态，并保留缓存资源 */ clearAliveState?: boolean
} function unmountAllApps(options?: unmountAppParams): Promise<boolean>
使用方式：
// 正常流程
unmountAllApps().then(() => console.log('卸载成功')) // 卸载所有应用并清空缓存资源
unmountAllApps({ destroy: true }).then(() => console.log('卸载成功')) // 如果子应用是keep-alive应用，则卸载并清空状态，如果子应用不是keep-alive应用，则正常卸载
unmountAllApps({ clearAliveState: true }).then(() => console.log('卸载成功')) // 如果destroy和clearAliveState同时为true，则clearAliveState将失效
unmountAllApps({ destroy: true, clearAliveState: true }).then(() => console.log('卸载成功'))`},{header:"reload",slug:"reload",content:`描述： 重新渲染子应用
版本限制： 1.0.0及以上版本
介绍：
/** * @param appName 应用名称，必传 * @param destroy 重新渲染时是否彻底删除缓存值，可选 */
function reload(appName: string, destroy?: boolean): Promise<boolean>
使用方式：
import microApp from '@micro-zoe/micro-app' // 案例一：重新渲染子应用my-app
microApp.reload('my-app').then((result) => { if (result) { console.log('重新渲染成功') } else { console.log('重新渲染失败') }
}) // 案例二：重新渲染子应用my-app，并彻底删除缓存值
microApp.reload('my-app', true).then((result) => { if (result) { console.log('重新渲染成功') } else { console.log('重新渲染失败') }
})`},{header:"renderApp",slug:"renderapp",content:`描述： 手动渲染子应用
介绍：
interface RenderAppOptions { name: string, // 应用名称，必传 url: string, // 应用地址，必传 container: string | Element, // 应用容器或选择器，必传 iframe?: boolean, // 是否切换为iframe沙箱，可选 inline?: boolean, // 开启内联模式运行js，可选 'disable-scopecss'?: boolean, // 关闭样式隔离，可选 'disable-sandbox'?: boolean, // 关闭沙箱，可选 'disable-memory-router'?: boolean, // 关闭虚拟路由系统，可选 'default-page'?: string, // 指定默认渲染的页面，可选 'keep-router-state'?: boolean, // 保留路由状态，可选 'disable-patch-request'?: boolean, // 关闭子应用请求的自动补全功能，可选 'keep-alive'?: boolean, // 开启keep-alive模式，可选 destroy?: boolean, // 卸载时强制删除缓存资源，可选 fiber?: boolean, // 开启fiber模式，可选 baseroute?: string, // 设置子应用的基础路由，可选 ssr?: boolean, // 开启ssr模式，可选 // shadowDOM?: boolean, // 开启shadowDOM，可选 data?: Object, // 传递给子应用的数据，可选 onDataChange?: Function, // 获取子应用发送数据的监听函数，可选 // 注册子应用的生命周期 lifeCycles?: { created(e: CustomEvent): void, // 加载资源前触发 beforemount(e: CustomEvent): void, // 加载资源完成后，开始渲染之前触发 mounted(e: CustomEvent): void, // 子应用渲染结束后触发 unmount(e: CustomEvent): void, // 子应用卸载时触发 error(e: CustomEvent): void, // 子应用渲染出错时触发 beforeshow(e: CustomEvent): void, // 子应用推入前台之前触发（keep-alive模式特有） aftershow(e: CustomEvent): void, // 子应用推入前台之后触发（keep-alive模式特有） afterhidden(e: CustomEvent): void, // 子应用推入后台时触发（keep-alive模式特有） },
} /** * @param options RenderAppOptions 配置项 */
function renderApp(options: RenderAppOptions): Promise<boolean>
使用方式：
import microApp from '@micro-zoe/micro-app' // 案例一
microApp.renderApp({ name: 'my-app', url: 'http://localhost:3000', container: '#container',
}).then((result) => { if (result) { console.log('渲染成功') } else { console.log('渲染失败') }
}) // 案例二
microApp.renderApp({ name: 'my-app', url: 'http://localhost:3000', container: '#container', inline: true, data: { key: '初始化数据' }, lifeCycles: { mounted () { console.log('子应用已经渲染') }, unmount () { console.log('子应用已经卸载') }, }
})`},{header:"document.microAppElement",slug:"document-microappelement",content:`描述： 获取子应用所在的micro-app元素。
限制： 只能在子应用内部使用，基座中可以使用document.querySelector获取micro-app元素
使用方式：
document.microAppElement.appendChild(...)`},{header:"setData",slug:"setdata",content:`描述： 向指定的子应用发送数据
介绍：
setData(appName: String, data: Object)
使用方式：
import microApp from '@micro-zoe/micro-app' // 发送数据给子应用 my-app，setData第二个参数只接受对象类型
microApp.setData('my-app', {type: '新的数据'})`},{header:"getData",slug:"getdata",content:`描述： 获取指定的子应用data数据
介绍：
getData(appName: String): Object
使用方式：
import microApp from '@micro-zoe/micro-app' const childData = microApp.getData('my-app') // 返回my-app子应用的data数据`},{header:"addDataListener",slug:"adddatalistener",content:`描述： 监听指定子应用的数据变化
介绍：
/** * 绑定监听函数 * appName: 应用名称 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
microApp.addDataListener(appName: string, dataListener: Function, autoTrigger?: boolean)
使用方式：
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('来自子应用my-app的数据', data)
} microApp.addDataListener('my-app', dataListener)`},{header:"removeDataListener",slug:"removedatalistener",content:`描述： 解除主应用的数据监听函数
使用方式：
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('来自子应用my-app的数据', data)
} // 解绑监听my-app子应用的数据监听函数
microApp.removeDataListener('my-app', dataListener)`},{header:"clearDataListener",slug:"cleardatalistener",content:`描述： 清空主应用的所有数据监听函数
使用方式：
import microApp from '@micro-zoe/micro-app' // 清空所有监听appName子应用的数据监听函数
microApp.clearDataListener('my-app')`},{header:"getGlobalData",slug:"getglobaldata",content:`描述： 获取全局数据
使用方式：
import microApp from '@micro-zoe/micro-app' // 直接获取数据
const globalData = microApp.getGlobalData() // 返回全局数据`},{header:"addGlobalDataListener",slug:"addglobaldatalistener",content:`描述： 绑定数据监听函数
介绍：
/** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
microApp.addGlobalDataListener(dataListener: Function, autoTrigger?: boolean)
使用方式：
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('全局数据', data)
} microApp.addGlobalDataListener(dataListener)`},{header:"removeGlobalDataListener",slug:"removeglobaldatalistener",content:`描述： 解绑全局数据监听函数
使用方式：
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('全局数据', data)
} microApp.removeGlobalDataListener(dataListener)`},{header:"clearGlobalDataListener",slug:"clearglobaldatalistener",content:`描述： 清空主应用绑定的所有全局数据监听函数
使用方式：
import microApp from '@micro-zoe/micro-app' microApp.clearGlobalDataListener()`},{header:"setGlobalData",slug:"setglobaldata",content:`描述： 发送全局数据
使用方式：
import microApp from '@micro-zoe/micro-app' // setGlobalData只接受对象作为参数
microApp.setGlobalData({type: '全局数据'})`},{header:"pureCreateElement",slug:"purecreateelement-1",content:`描述： 创建无绑定的纯净元素，该元素可以逃离元素隔离的边界，不受子应用沙箱的控制
版本限制： 0.8.2及以上版本
使用方式：
const pureDiv = window.microApp.pureCreateElement('div') document.body.appendChild(pureDiv)`},{header:"removeDomScope",slug:"removedomscope-1",content:`描述： 解除元素绑定，通常用于受子应用元素绑定影响，导致主应用元素错误绑定到子应用的情况
版本限制： 0.8.2及以上版本
介绍：
/** * @param force 解除元素绑定，并且一定时间内(一个微任务Promise时间)阻止再次绑定。 */
function removeDomScope(force?: boolean): void
使用方式：
// 解除元素绑定
window.microApp.removeDomScope() // 解除元素绑定，并且一定时间内阻止再次绑定
window.microApp.removeDomScope(true)`},{header:"rawWindow",slug:"rawwindow",content:`描述： 获取真实的window
使用方式：
window.rawWindow`},{header:"rawDocument",slug:"rawdocument",content:`描述： 获取真实的document
使用方式：
window.rawDocument`},{header:"getData",slug:"getdata-1",content:`描述： 获取主应用下发的data数据
使用方式：
const data = window.microApp.getData() // 返回主应用下发的data数据`},{header:"addDataListener",slug:"adddatalistener-1",content:`描述： 绑定数据监听函数
介绍：
/** * 绑定监听函数，监听函数只有在数据变化时才会触发 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false * !!!重要说明: 因为子应用是异步渲染的，而主应用发送数据是同步的， * 如果在子应用渲染结束前主应用发送数据，则在绑定监听函数前数据已经发送，在初始化后不会触发绑定函数， * 但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。 */
window.microApp.addDataListener(dataListener: Function, autoTrigger?: boolean)
使用方式：
function dataListener (data) { console.log('来自主应用的数据', data)
} window.microApp.addDataListener(dataListener)`},{header:"removeDataListener",slug:"removedatalistener-1",content:`描述： 解绑数据监听函数
使用方式：
function dataListener (data) { console.log('来自主应用的数据', data)
} window.microApp.removeDataListener(dataListener)`},{header:"clearDataListener",slug:"cleardatalistener-1",content:`描述： 清空当前子应用的所有数据监听函数(全局数据函数除外)
使用方式：
window.microApp.clearDataListener()`},{header:"dispatch",slug:"dispatch",content:`描述： 向主应用发送数据
使用方式：
// dispatch只接受对象作为参数
window.microApp.dispatch({type: '子应用发送的数据'})`},{header:"getGlobalData",slug:"getglobaldata-1",content:`描述： 获取全局数据
使用方式：
const globalData = window.microApp.getGlobalData() // 返回全局数据`},{header:"addGlobalDataListener",slug:"addglobaldatalistener-1",content:`描述： 绑定数据监听函数
介绍：
/** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
window.microApp.addGlobalDataListener(dataListener: Function, autoTrigger?: boolean) 使用方式：
function dataListener (data) { console.log('全局数据', data)
} window.microApp.addGlobalDataListener(dataListener)`},{header:"removeGlobalDataListener",slug:"removeglobaldatalistener-1",content:`描述： 解绑全局数据监听函数
使用方式：
function dataListener (data) { console.log('全局数据', data)
} window.microApp.removeGlobalDataListener(dataListener)`},{header:"clearGlobalDataListener",slug:"clearglobaldatalistener-1",content:`描述： 清空当前子应用绑定的所有全局数据监听函数
使用方式：
window.microApp.clearGlobalDataListener()`},{header:"setGlobalData",slug:"setglobaldata-1",content:`描述： 发送全局数据
使用方式：
// setGlobalData只接受对象作为参数
window.microApp.setGlobalData({type: '全局数据'})`}]},{path:"/zh/browser-router.html",title:"",pathLocale:"/",contents:[{header:"",slug:"",content:"native模式下子应用完全基于浏览器路由系统进行渲染，此时需要更加复杂的路由配置，对主应用和子应用的路由都要进行一些改造。"},{header:"路由类型约束",slug:"路由类型约束",content:`native模式下主、子应用需要遵循以下约束： 1、主应用是hash路由，子应用也必须是hash路由
2、主应用是history路由，子应用可以是hash或history路由`},{header:"基础路由",slug:"基础路由",content:`作用：
通常主应用和子应用各有一套路由系统，为了防止冲突，主应用需要分配一个路由给子应用，称之为基础路由，子应用可以在这个路由下渲染，但不能超出这个路由的范围，这就是基础路由的作用。
使用方式
主应用中通过设置 <micro-app>的baseroute属性下发，子应用通过window.__MICRO_APP_BASE_ROUTE__获取此值并设置基础路由。
注意点： 1、如果主应用是history路由，子应用是hash路由，不需要设置基础路由baseroute
2、如果子应用只有一个页面，没有使用react-router，vue-router之类，也不需要设置基础路由baseroute
3、vue-router在hash模式下无法通过base设置基础路由，需要创建一个空的路由页面，将其它路由作为它的children，具体设置如下： import RootApp from './root-app.vue' const routes = [ { path: window.__MICRO_APP_BASE_ROUTE__ || '/', component: RootApp, children: [ // 其他的路由都写到这里 ], },
]
root-app.vue内容如下：
<template> <router-view />
</template>
示例 // router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ChildPage from './child-page' export default function AppRoute () { return ( <BrowserRouter> <Switch> // 非严格匹配，/child/* 都指向ChildPage组件 // /child 就是分配给子应用的基础路由baseroute <Route path='/child'> <ChildPage /> </Route> </Switch> </BrowserRouter> )
} // child-page.js
export function ChildPage () { return ( <div> <h1>子应用</h1> <micro-app name='child-app' url='http://localhost:3000/' baseroute='/child'></micro-app> </div> )
} import { BrowserRouter, Switch, Route } from 'react-router-dom' export default function AppRoute () { return ( // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取主应用下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串 <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}> ... </BrowserRouter> )
} // router.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import ChildPage from './child-page.vue' Vue.use(VueRouter) const routes = [ { // /child/* 都指向ChildPage组件 path: '/child/*', // vue-router@4.x path的写法为：'/child/:page*' name: 'child', component: ChildPage, },
] export default routes // child-page.vue
<template> <div> <h1>子应用</h1> <micro-app name='child-app' url='http://localhost:3000/' baseroute='/child'></micro-app> </div>
</template> import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router' const router = new VueRouter({ // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取主应用下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串 base: window.__MICRO_APP_BASE_ROUTE__ || '/', routes,
}) let app = new Vue({ router, render: h => h(App),
}).$mount('#app') 提示
vue-router@4.x设置base的方式请查看 https://next.router.vuejs.org/`},{header:"关于native模式的原理解析",slug:"关于native模式的原理解析",content:`子应用不会根据micro-app的url属性渲染对应的页面，而是根据浏览器地址渲染对应的页面。
举个栗子 🌰 :
浏览器地址为：http://localhost:3000/page1/，此时路由地址为page1。
主应用会匹配page1并渲染对应的组件，子应用也是一样，浏览器地址会同时影响到主应用和子应用，因为每个应用都有一套自己的路由系统，它们是可以共存的，不会冲突。
此时我们要渲染子应用http://www.xxx.com/的page1页面，那么micro-app的url属性填写的是http://www.xxx.com/，而不是http://www.xxx.com/page1/。
<micro-app url='http://www.xxx.com/'></micro-app>
子应用加载完成后会根据浏览器的地址page1匹配并渲染对应的页面。
同理，页面参数和hash也是以浏览器为准。
栗子2 🌰 :
场景：子应用是hash路由，我们要渲染子应用的page1页面
此时在micro-app的url属性上设置hash值是无效的，#/page1应该添加到浏览器地址上。
<!-- ❌ 这里的#/page1是无效的，应该添加到浏览器地址上 -->
<micro-app url='http://www.xxx.com/#/page1'></micro-app> <!-- ✔️ 这个url才是正确的 -->
<micro-app url='http://www.xxx.com/'></micro-app>
栗子3 🌰 :
场景：主应用是history路由，子应用是hash路由，我们要跳转主应用的my-app页面，页面中嵌入子应用，我们要展现子应用的page1页面。
那么浏览器地址应该为：域名/my-page#/page1，我们在主应用中跳转my-app页面的参数为：router.push('/my-page#/page1')
此时流程为：主应用匹配到/my-page路径并渲染my-app页面，因为my-app页面中嵌入了子应用，此时子应用开始加载并渲染，子应用在渲染时会匹配到#/page1并渲染page1页面。
micro-app配置如下：
<!-- 此时不需要设置baseroute -->
<micro-app url='http://www.xxx.com/index.html'></micro-app>
栗子4 🌰 :
场景：主应用是history路由，子应用也是history路由，我们要跳转主应用的my-app页面，my-app页面中嵌入子应用，我们要展现子应用的page1页面。
那么浏览器地址应该为：域名/my-page/page1，我们在主应用中跳转的参数为：router.push('/my-page/page1')
此时流程为：主应用匹配到/my-page路径并渲染my-app页面，因为my-app页面中嵌入了子应用，此时子应用开始加载并渲染，子应用在渲染时会匹配到/my-page/page1并渲染page1页面。
micro-app配置如下：
<!-- 子应用通过baseroute设置基础路由/my-page -->
<micro-app url='http://www.xxx.com/index.html' baseroute='/my-page'></micro-app>
提示
如果你看到这里还是无法正确设置路由，不妨试试其它路由模式`}]},{path:"/zh/changelog.html",title:"",pathLocale:"/",contents:[{header:"",slug:"",content:"micro-app 遵循 Semantic Versioning 2.0.0 语义化版本规范。"},{header:"发布周期",slug:"发布周期",content:`主版本号：含有破坏性更新和新特性，不在发布周期内。
次版本号：每月发布一个带有新特性的向下兼容的版本。
修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）`},{header:"1.0.0-rc.4",slug:"_1-0-0-rc-4",content:`2024-1-31 New 🆕 新增全局配置iframeSrc，用于动态设置iframe沙箱的src地址。
🆕 新增micro-app元素公有变量publicPath、baseRoute，用于支持chrome插件，PR 1052 by raoenhui。
🆕 新增了在iframe沙箱下对Document.prototype.createElementNS、Document.prototype.createDocumentFragment的拦截和处理。
🆕 新增了removeDomScope方法的配置项force，用于在一定时间内解除元素绑定，issue 995。
🆕 新增了with沙箱对于Document.prototype.createElementNS的直接处理，规避可能存在的元素泄漏风险。 Bug Fix 🐞 修复了父应用非根目录下微应用无法正常渲染的问题，PR 1037 by xuhongbo。
🐞 修复了iframe沙箱下antd Dropdown、Tooltip等组件渲染异常的问题，PR 1015 by keuby。
🐞 修复了micro-app url属性为相对地址时没有自动补全导致子应用渲染失败的问题，PR 1056。
🐞 修复了EventTarget在低版本浏览器中的兼容性问题，issue 1064，issue 1065。
🐞 修复了with沙箱在部分场景下强隔离变量scopeProperties通过key in window判断异常的问题。
🐞 修复了with沙箱在默认模式下用户自定义的强隔离变量scopeProperties在卸载时无法清空的问题。
🐞 修复了with沙箱子应用的window.onpopstate兜底到主应用导致多次执行的问题。
🐞 修复了craco子应用style元素插入顺序错误导致样式优先级混乱的问题，issue 1071。
🐞 修复了在部分场景下子应用重写Array.prototype.includes导致死循环的问题，PR 1067 by tinymins。
🐞 修复了在关闭虚拟路由系统时子应用域名与浏览器域名不一致的问题。 Update 🚀 虚拟路由系统升级，新增search、native、native-scope、pure模式，用于适配更多使用场景。
🚀 优化了对于iframe沙箱Node.parentNode的处理方式。
🚀 优化了iframe沙箱对于插件系统escapeProperties的支持。
🚀 更新了案例。`},{header:"1.0.0-rc.3",slug:"_1-0-0-rc-3",content:`2023-12-18 New 🆕 新增componentMode组件模式，micro-app支持单独运行js文件944。
🆕 新增方法getAppState，用于在基座中获取子应用的状态。
🆕 新增虚拟路由系统push, replace方法对Promise的支持。
🆕 新增对于CSS循环嵌套的支持956。 Bug Fix 🐞 修复了在非custom路由模式下设置baseroute导致子应用渲染失败的问题。
🐞 修复了isObject方法中参数为null导致错误的问题998。
🐞 修复了子应用onerror事件无法触发的问题992。
🐞 修复了iframe沙箱下子应用Node.ownerDocument指向错误的问题988。
🐞 修复了with沙箱下判断MicroDocument实例时目标为null导致报错的问题986。
🐞 修复了iframe沙箱下通过document.head.querySelector(...)查询元素异常的问题984。
🐞 修复了子应用html自带元素parentNode指向异常的问题。 Update 🚀 更新with沙箱运行逻辑，异步执行初始化操作，确保不同沙箱之间逻辑一致。
🚀 优化了utils方法中元素判断的方式998。
🚀 更新了案例。`},{header:"1.0.0-rc.2",slug:"_1-0-0-rc-2",content:`2023-10-30 New 🆕 新增了子应用全局变量__MICRO_APP_STATE__，用于标记当前应用的状态。
🆕 新增了子应用document变量__MICRO_APP_NAME__，用于标记document所属应用。
🆕 重写了原型方法Node.prototype.parentNode，用于处理特殊元素parentNode的指向问题。 Bug Fix 🐞 修复了在iframe沙箱下循环嵌套的问题。
🐞 修复了在iframe沙箱下开启inline模式导致通过getElementsByTagName获取script元素失败的问题。 Update 🚀 优化了内存占用，在iframe沙箱模式下默认开启inline模式。
🚀 更新了官网文档。`},{header:"1.0.0-rc.1",slug:"_1-0-0-rc-1",content:`2023-10-16 New 🆕 新增了Chrome浏览器插件Micro-App-DevTools，提高开发效率。 Update 🚀 完善单元测试功能。
🚀 更新了官网文档。`},{header:"1.0.0-rc.0",slug:"_1-0-0-rc-0",content:`2023-09-22 New 🆕 新增了子应用全局变量__MICRO_APP_SANDBOX_TYPE__，用于标记当前应用的沙箱类型。 Bug Fix 🐞 修复了在关闭沙箱后发送生命周期事件异常的问题。
🐞 修复了在部分场景下，多次执行microApp.start方法导致的死循环问题。
🐞 修复了afterhidden过早触发导致的container为空的问题。 Update 🚀 完善单元测试功能。
🚀 更新了官网文档。
🚀 发布1.0正式版。`},{header:"1.0.0-beta.7",slug:"_1-0-0-beta-7",content:`2023-09-20 New 🆕 新增了子应用内部状态before_mount，用于标记子应用在资源加载后和执行js前的中间状态。 Bug Fix 🐞 修复了在iframe沙箱模式下，子应用使用monaco-editor时代码输入框光标失效的问题。
🐞 修复了在window.mount为Promise时抛出的错误无法捕获的问题。
🐞 修复了在iframe沙箱模式下，子应用加载完成之前进行导航导致报错的问题。
🐞 修复了在with沙箱模式下，异步创建路由系统导致部分场景下location未定义的问题，issue #908。
🐞 修复了在micro-app子应用开始渲染到渲染完成之前通过路由API无法控制跳转的问题。 Update 🚀 完善单元测试功能。
🚀 更新了官网文档。`},{header:"1.0.0-beta.6",slug:"_1-0-0-beta-6",content:`2023-09-14 New 🆕 新增了虚拟路由多种模式功能，新增了三种路由模式：search、history、custom。
🆕 新增了在预渲染时可以选择不同路由模式进行渲染的功能。
🆕 新增了全局变量document.microAppElement，用于获取子应用所在的micro-app元素。 Bug Fix 🐞 修复了在with沙箱下子应用使用vuedraggable报错的问题。
🐞 修复了在iframe沙箱下子应用定义onpopstate、onhashchange会覆盖主应用方法的问题。
🐞 修复了window.addEventListener绑定非window对象时表现异常的问题。
🐞 修复了document.addEventListener绑定非document对象时表现异常的问题。
🐞 修复了在子应用初始化后icon link丢失的问题。
🐞 修复了通过rawDocument、rawWindow操作元素时，元素作用域绑定异常的问题。
🐞 修复了通过document.querySelector(":root")无法获取根元素的问题。 Update 🚀 删除了配置项disable-memory-router，虚拟路由不再支持关闭功能。
🚀 优化了with沙箱中特殊事件的处理方式，onpopstate、onhashchange等方法不再绑定到原生window。
🚀 优化了沙箱的架构设计及代码。
🚀 完成了部分1.0版本单元测试的功能。
🚀 更新了官网文档。`},{header:"1.0.0-beta.5",slug:"_1-0-0-beta-5",content:`2023-05-23 Bug Fix 🐞 修复了环境变量__MICRO_APP_BASE_APPLICATION__为undefined的问题。
🐞 修复了vite+react子应用接入失败的问题。
🐞 修复了通过修改name和url渲染keep-alive应用失败的问题。 Update 🚀 优化了部分开发案例。`},{header:"1.0.0-beta.4",slug:"_1-0-0-beta-4",content:`2023-04-27 New 🆕 新增了在iframe沙箱下支持关闭虚拟路由系统的功能。 Bug Fix 🐞 修复了在子应用还未渲染时通过虚拟路由控制子应用跳转导致浏览器URL地址修改的问题。
🐞 修复了在keep-alive应用隐藏后通过虚拟路由控制子应用跳转导致浏览器URL地址修改的问题。 Update 🚀 优化了部分开发案例。`},{header:"1.0.0-beta.3",slug:"_1-0-0-beta-3",content:`2023-04-13 Bug Fix 🐞 修复了在非内联模式下通过insertAdjacentElement插入script导致报错的问题。
🐞 修复了在关闭沙箱时module script远程资源被重复加载的问题。
🐞 修复了在加载资源过程中卸载keep-alive应用导致应用二次渲染失败的问题。
🐞 修复了在umd模式下卸载preRender app、hidden keep-alive app应用导致事件覆盖的问题。`},{header:"1.0.0-beta.2",slug:"_1-0-0-beta-2",content:`2023-04-06 New 🆕 新增了对insertAdjacentElement元素方法的处理。
🆕 新增了在iframe沙箱下对append、prepend元素方法的处理。 Bug Fix 🐞 修复了异步卸载子应用时Element.prototype.setAttribute方法可能被重置的问题。
🐞 修复了在多层嵌套时异步卸载子应用导致应用绑定作用域异常的问题。
🐞 修复了在iframe沙箱下无法设置document.title的问题。
🐞 修复了在开发环境下vite4样式隔离失效的问题。
🐞 修复了在with沙箱下循环嵌套子应用无法设置document.onclick的问题。 Update 🚀 优化了with沙箱Document事件系统的架构设计，增加兼容性。
🚀 优化了iframe沙箱Document、Element原型方法。
🚀 优化了iframe沙箱路由相关代码。
🚀 更新了vite4的开发案例。`},{header:"1.0.0-beta.1",slug:"_1-0-0-beta-1",content:`2023-03-23 Bug Fix 🐞 修复了主应用和子应用修改domain导致的iframe跨域问题。
🐞 修复了关闭沙箱导致onmount方法报错的问题。
🐞 修复了with沙箱环境下react的抽屉组件无法渲染的问题。
🐞 修复了with沙箱环境下重写ownerDocument导致的react事件重复触发的问题。 Update 🚀 更新了开发环境的案例。`},{header:"1.0.0-beta.0",slug:"_1-0-0-beta-0",content:`2023-03-17 New 🆕 新增了iframe沙箱功能，兼容vite等开发环境。
🆕 新增了虚拟路由系统的iframe沙箱模式。
🆕 新增了video、audio、source、embed等资源标签的自动补全功能。 Bug Fix 🐞 修复了通过unmountApp方法卸载预渲染应用报错的问题。
🐞 修复了主动卸载keep-alive、预渲染应用时全局事件缓存错误的问题。
🐞 修复了html静态元素无法标记和处理的问题。
🐞 修复了根元素下parentNode表现异常的问题。
🐞 修复了低版本浏览器不支持String.prototype.replaceAll的问题。
🐞 修复了忽略的脚本内获取 currentScript 出错的问题。
🐞 修复了数据通信在部分场景下快照备份数据监听函数报错的问题。 Update 🚀 优化了资源管理系统，支持多种沙箱之间动态切换，提升资源复用效率。
🚀 移除了esmodule配置，iframe沙箱环境下默认开启。
🚀 优化了预加载、预渲染相关功能，增加用户体验。
🚀 优化了umd模式下对子应用定时器的处理逻辑。`},{header:"1.0.0-alpha.10",slug:"_1-0-0-alpha-10",content:`2022-10-11 Bug Fix 🐞 修复了innerHTML创建的元素无法被拦截的问题。
🐞 修复了循环嵌套下，根元素的parentNode被多次重写导致parentNode指向错误的问题。 Update 🚀 优化了相关案例。`},{header:"1.0.0-alpha.9",slug:"_1-0-0-alpha-9",content:`2022-09-09 Bug Fix 🐞 修复了angular框架下，micro-app设置动态url导致应用多次渲染的问题。
🐞 修复了子应用title、meta元素丢失的问题。
🐞 修复了部分场景下scopeProperties可以逃逸的问题。
🐞 修复了关闭虚拟路由系统时keep-alive应用依然可以触发虚拟路由系统的问题。 Update 🚀 增加对document的缓存，优化沙箱性能。
🚀 更新了title元素的处理逻辑，子应用的title元素兜底到主应用，确保title全局唯一。`},{header:"1.0.0-alpha.8",slug:"_1-0-0-alpha-8",content:`2022-09-02 New 🆕 新增了预渲染的功能，提升首次渲染速度。
🆕 新增了rollup中__DEV__配置，优化开发体验。
🆕 更新了getActiveApps方法，增加参数excludePreRender。
🆕 更新了attachAllToURL方法，增加参数includePreRender。 Bug Fix 🐞 修复了在部分场景下，子应用卸载后删除元素导致removeChild方法被循环调用的问题。
🐞 修复了UMD模式下，二次渲染时document全局事件无法自动卸载的问题。
🐞 修复了keep-alive模式下，子应用隐藏后全局事件无法自动卸载导致元素作用域异常绑定的问题。 Update 🚀 优化了数据通讯系统，增加回调函数的返回值。
🚀 优化了预加载逻辑，减小对主应用性能的影响。`},{header:"1.0.0-alpha.7",slug:"_1-0-0-alpha-7",content:`2022-08-26 New 🆕 新增了reload方法，用于手动重新加载子应用。
🆕 新增了renderApp方法，用于手动渲染子应用。
🆕 新增了子应用全局事件onmount、onunmount，用于监听子应用的渲染与卸载。
🆕 新增了clear-data配置，用于在卸载时清空数据通讯中的缓存数据。 Bug Fix 🐞 修复了ElementUI下拉选框在局部刷新时选择框无法消失的问题。 Update 🚀 优化了destroy的逻辑，卸载时主动清空数据通讯中的缓存数据。
🚀 优化了数据通信系统，合并新旧值，增加强制更新API和防抖处理。`},{header:"1.0.0-alpha.6",slug:"_1-0-0-alpha-6",content:`2022-08-19 New 🆕 重构了资源管理系统，提升资源复用率。
🆕 新增了excludeAssetFilter配置，用于指定部分特殊的动态加载的微应用资源（css/js) 不被 micro-app 劫持处理。
🆕 新增了fiber配置，支持子应用以fiber模式运行，增加主应用的响应速度。 Bug Fix 🐞 修复了sourceMap地址丢失，导致调试困难的问题。
🐞 修复了document.defaultView可以获取真实window的问题。
🐞 修复了document.currentScript丢失的问题。
🐞 修复了动态script标签二次渲染时执行顺序错误的问题。
🐞 修复了angular13、14及vue-cli5 build后应用沙箱失效的问题。
🐞 修复了全局路由守卫参数与文档不一致的问题。
🐞 修复了micro-app在vue keep-alive环境下频繁渲染的问题。 Update 🚀 优化了预加载逻辑，提升预加载子应用的渲染速度。
🚀 优化了sandbox、create_app相关代码。`},{header:"1.0.0-alpha.5",slug:"_1-0-0-alpha-5",content:"2022-08-01 New 🆕 新增子应用全局钩子函数mount, unmount，简化接入步骤。 Update 🚀 更新了1.0版本文档"},{header:"1.0.0-alpha.4",slug:"_1-0-0-alpha-4",content:`2022-07-28 New 🆕 新增了配置disable-patch-request，用于阻止MicroApp对子应用fetch、XMLHttpRequest等请求方法的重写。 Bug Fix 🐞 修复了设置document.title, history.scrollRestoration时报Illegal invocation错误的问题。
🐞 修复了在umd模式部分场景下二次渲染时全局变量和全局事件丢失的问题。
🐞 修复了高德地图二次渲染时地图无法显示的问题。
🐞 修复了element-plus按需加载时，点击ElSelect组件空白区域无法收起的问题。
🐞 修复了umd模式下每次渲染时fetch、XMLHttpRequest等API被重写的问题。 Update 🚀 更新了umd模式下全局事件和全局变量的处理逻辑，不再主动卸载全局事件和删除全局变量。
🚀 更新了1.0版本文档`},{header:"1.0.0-alpha.3",slug:"_1-0-0-alpha-3",content:`2022-07-21 New 🆕 重写了主应用的pushState、replaceState方法，自动将子应用的路由信息同步到浏览器地址。
🆕 重写了子应用的Document对象，每个子应用拥有单独的Document实例。 Bug Fix 🐞 修复了Document原型方法绑定到ProxyDocument时报错的问题。 Update 🚀 优化了路由相关代码和逻辑。
🚀 更新了案例，增加适配场景`},{header:"1.0.0-alpha.2",slug:"_1-0-0-alpha-2",content:`2022-07-15 New 🆕 新增了attachToURL、attachAllToURL方法，用于将子应用的路由信息同步到浏览器地址。
🆕 新增了setBaseRouter、getBaseRouter方法，用于注册和使用主应用路由。
🆕 新增了ProxyDocument，为子应用创建一个虚拟的document对象。 Bug Fix 🐞 修复了ant-design-vue的弹窗类组件及其它特殊情况下，子应用元素逃逸到原生body上的问题。
🐞 修复了在未设置public_path时，子应用的资源地址补全失败的问题。
🐞 修复了子应用在调用fetch等API时，元素绑定没有解除的问题。
🐞 修复了在@keyframes名称带有特殊字符时样式隔离失败的问题。 Update 🚀 优化了路由相关代码和逻辑。
🚀 更新了案例。`},{header:"1.0.0-alpha.1",slug:"_1-0-0-alpha-1",content:`2022-07-06 New 🆕 新增了proxyRequest，用于拦截fetch、XMLHttpRequest、EventSource请求并进行处理。 Bug Fix 🐞 修复了通过create-react-app创建的react应用热更新时报错的问题。
🐞 修复了子应用执行pushState/replaceState时popStateEvent事件异常触发的问题。 Update 🚀 优化了资源加载相关代码和逻辑。`},{header:"1.0.0-alpha.0",slug:"_1-0-0-alpha-0",content:"2022-06-30 New 🆕 新增了独立的路由系统 - MemoryRouter，完善JS沙箱。 Bug Fix 🐞 修复了在循环嵌套时iconfont.js在部分场景下报错的问题。 Update 🚀 优化了预加载相关代码和逻辑，提高并行渲染能力。"},{header:"0.8.10",slug:"_0-8-10",content:"2022-08-19 New 🆕 新增了excludeAssetFilter配置，用于指定部分特殊的动态加载的微应用资源（css/js) 不被 micro-app 劫持处理。"},{header:"0.8.9",slug:"_0-8-9",content:"2022-08-15 Bug Fix 🐞 修复了在umd模式下异常清空全局变量的问题。"},{header:"0.8.8",slug:"_0-8-8",content:"2022-07-15 Bug Fix 🐞 修复systemjs的script标签src没有自动补全的问题"},{header:"0.8.6",slug:"_0-8-6",content:`2022-06-30 New 🆕 在 plugin 中增加 excludeChecker 和 ignoreChecker 用于主应用主动忽略子应用部分 script 和 link。
🆕 新增了processHtml，用于在插件中处理html。 Update 🚀 优化了资源加载相关代码和逻辑。
🚀 优化了单元测试相关代码。`},{header:"0.8.5",slug:"_0-8-5",content:"2022-02-14 New 🆕 插件的loader方法中新增包含script信息的info参数。"},{header:"0.8.4",slug:"_0-8-4",content:"2022-01-25 Bug Fix 🐞 修复了在火狐浏览器80及以上版本中，样式隔离执行速度过慢的问题。"},{header:"0.8.3",slug:"_0-8-3",content:"2022-01-20 Bug Fix 🐞 修复了在css中通过background-image引入svg时，样式隔离解析失败的问题。 Update 🚀 优化了样式隔离的逻辑，提高兼容和性能。"},{header:"0.8.2",slug:"_0-8-2",content:`2022-01-14 New 🆕 新增了子应用pureCreateElement方法，用于创建无绑定的纯净元素。
🆕 新增了子应用removeDomScope方法，用于解除元素绑定。 Bug Fix 🐞 修复了主应用通过远程连接引入Vue，加载vue子应用报错的问题，issue #234。 Update 🚀 优化了预加载相关代码和逻辑，减小对主应用项目的影响。`},{header:"0.8.1",slug:"_0-8-1",content:`2022-01-12 Bug Fix 🐞 修复了element-plus部分组件逃离元素隔离的问题, issue #223。
🐞 修复了在使用IE6、7 CSSHack时样式解析失败的问题, issue #232。 Update 🚀 优化了插件相关代码和逻辑, PR #224 by LinFeng1997。
🚀 优化了沙箱相关代码和逻辑。`},{header:"0.8.0",slug:"_0-8-0",content:`2022-01-07 New 🆕 新增了在样式隔离下的动态忽略规则。 Bug Fix 🐞 修复了在使用css变量时导致样式丢失的问题，issue #157、#121。
🐞 修复了在部分浏览器(如：safari)下，css表现有差异的问题。 Update 🚀 样式隔离重构，提升性能和兼容性。`},{header:"0.7.1",slug:"_0-7-1",content:`2021-12-31 Bug Fix 🐞 修复了link标签在非head时样式丢失的问题
🐞 修复了错误补全svg地址的问题，PR #207 by icksky。
🐞 修复了在部分浏览器下报WeakRef is not defined错误的问题。`},{header:"0.7.0",slug:"_0-7-0",content:`2021-12-29 New 🆕 新增Api，对外export MicroApp类。 Update 🚀 沙箱重构，性能优化。
🚀 优化了execScripts方法，不再使用Promise.all，防止单文件加载错误导致后续文件无法执行的问题。
🚀 优化了getActiveApps方法，增加对过滤keep-alive应用的支持。`},{header:"0.6.2",slug:"_0-6-2",content:"2021-12-19 Bug Fix 🐞 修复了在SSR环境下，抛出Image is not defined的报错问题。"},{header:"0.6.1",slug:"_0-6-1",content:`2021-12-17 New 🆕 新增了unmountApp, unmountAllApps方法，用于主动卸载应用。
🆕 新增了对disable-sandbox, disable-scopecss配置的支持。 Bug Fix 🐞 修复了通过new Image()创建的元素逃离沙箱的问题，issue #186，PR #187 by asiainfoliwei。
🐞 修复了通过cloneNode创建的元素逃离沙箱的问题。 Update 🚀 优化了元素隔离patch原型链方法相关代码。
🚀 优化了kee-alive和destory相关的处理逻辑。
🚀 优化了unmount生命周期的触发时机，移动到应用彻底卸载后执行。`},{header:"0.6.0",slug:"_0-6-0",content:"2021-12-10 New 🆕 新增了对keep-alive模式的支持。"},{header:"0.5.3",slug:"_0-5-3",content:`2021-12-02 New 🆕 新增了对ssr模式的全局配置的支持。 Bug Fix 🐞 修复了沙箱中注册的全局变量的映射key在部分场景下没有及时删除的问题。
🐞 修复了在不支持ESModule的项目中，引入polyfill/jsx-custom-event报错的问题。`},{header:"0.5.2",slug:"_0-5-2",content:"2021-11-25 Bug Fix 🐞 修复了index.d.ts中getActiveApps、getAllApps类型声明错误的问题。"},{header:"0.5.1",slug:"_0-5-1",content:`2021-11-25 New 🆕 新增了getActiveApps方法，用于获取正在运行的子应用。
🆕 新增了getAllApps方法，用于获取所有已经注册的子应用。 Bug Fix 🐞 修复了link、style元素格式化后顺序不一致导致的样式丢失的问题。`},{header:"0.5.0",slug:"_0-5-0",content:`2021-11-19 Bug Fix 🐞 修复了name带有特殊符号时样式失效的问题，删除name中的特殊符号。
🐞 修复了umd模式下，应用卸载并重新渲染时url冲突，旧应用没有卸载干净的问题。
🐞 修复了在关闭样式隔离时，样式延迟生效导致页面布局错乱的问题。
🐞 修复了多次重复向head中插入同一个style元素，导致样式失效的问题。 Update 🚀 优化了应用二次渲染时的性能及内存。
🚀 优化了样式隔离逻辑，无论是否关闭样式隔离，始终将link元素提取转换为style元素。`},{header:"0.4.3",slug:"_0-4-3",content:`2021-11-05 New 🆕 新增了EventCenterForMicroApp方法，用于沙箱关闭时实现通信功能(如vite) Bug Fix 🐞 修复了在不支持ShadowRoot的浏览器中的报错问题，issue #134
🐞 修复了元素查询时带有特殊字符导致报错的问题，issue #140`},{header:"0.4.2",slug:"_0-4-2",content:`2021-10-29 New 🆕 新增了数据通信中getGlobalData方法，用于主动获取全局数据
🆕 新增了对mount, unmount方法promise类型的支持
🆕 新增了destroy配置项，用于替换destory，但依然保持对低版本的兼容，issue #132 Bug Fix 🐞 修复了umd模式下，react16及以下版本二次渲染后路由跳转刷新页面的问题
🐞 修复了SSR子应用二次渲染时url不同导致渲染失败的问题
🐞 修复了 react-inlinesvg 无法正常渲染的问题，issue #56
🐞 修复了 safari 浏览器中，创建module脚本错误的问题
🐞 修复了子应用通过defineProperty重写document.onclick时报错的问题 Update 🚀 优化了MicroAppElement、沙箱等代码
🚀 优化了umd模式下，子应用初次渲染的速度
🚀 优化了动态创建的script元素src或textContent为空时的处理逻辑
🚀 优化了mounted生命周期的执行时机`},{header:"0.4.1",slug:"_0-4-1",content:`2021-10-22 Bug Fix 🐞 修复了umd模式下，应用二次渲染时样式丢失的问题
🐞 修复了资源地址为空时，补全错误的问题
🐞 修复了对iframe元素src属性的错误处理
🐞 修复了mounted生命周期在异步脚本中执行时机错误的问题
🐞 修复了在非沙箱环境下使用umd模式，开启destory后，卸载时注册的函数没有卸载的问题
🐞 修复了子应用带有preload时资源加载两次的问题 Update 🚀 优化了在非inline模式下，module类型script元素的执行方式
🚀 优化了报错日志信息，增加应用名称`},{header:"0.4.0",slug:"_0-4-0",content:`2021-10-15 New 🆕 新增了ignore属性，用于忽略部分部分元素
🆕 新增了全局变量 __MICRO_APP_BASE_APPLICATION__ 用于标记当前应用为主应用 Bug Fix 🐞 修复了对webpack5 & jsonp 的支持
🐞 修复了angular下动态设置url属性导致加载失败的问题
🐞 修复了在vite环境下，内存优化的支持
🐞 修复了script type 为特殊情况下的兜底处理，如application/json
🐞 修复了循环嵌套时没有完全卸载应用的问题 Update 🚀 优化了对ssr的支持方式
🚀 优化了动态module的创建和渲染
🚀 优化了对data、blob类型数据的处理`},{header:"0.3.3",slug:"_0-3-3",content:`2021-09-13 Bug Fix 🐞 修复了data属性赋值后插入文档时，初始化data值无法通过setAttribute拦截的问题
🐞 修复了渲染缓存micro-app元素时导致的micro-app-head, micro-app-body重复的问题`},{header:"0.3.2",slug:"_0-3-2",content:`2021-09-10 New 🆕 新增了baseroute配置项，用于替换baseurl
🆕 新增了__MICRO_APP_BASE_ROUTE__全局变量，用于替换__MICRO_APP_BASE_URL__ Update 🚀 废弃了baseurl和__MICRO_APP_BASE_URL__，但依然兼容旧版`},{header:"0.3.1",slug:"_0-3-1",content:"2021-09-08 Bug Fix 🐞 修复了micro-app元素先使用后定义导致start方法配置失效的问题"},{header:"0.3.0",slug:"_0-3-0",content:`2021-09-07 New 🆕 新增了对umd格式的支持
🆕 废弃eval方法，使用Function进行替换 Bug Fix 🐞 修复了子应用卸载部分内存无法释放的问题
🐞 修复了widnow\\document\\timer事件在umd模式下多次渲染的问题
🐞 修复了async和defer js文件没有缓存的问题
🐞 修复了子应用同时存在多个head、body元素时，元素操作异常的问题。 Update 🚀 优化了修改name&url属性切换应用的操作，部分场景下被替换的应用可以计入缓存
🚀 更新了全局数据通信卸载机制，主应用和子应用只能卸载自身的全局监听函数`},{header:"0.2.5",slug:"_0-2-5",content:`2021-08-23 New 🆕 新增了main-vue3-vite主应用案例 Bug Fix 🐞 修复了在vue3中name被删除导致的样式丢失的问题
🐞 修复了无法适配.node、.php、.net后缀文件的问题
🐞 修复了子应用卸载后依然可以通过副作用函数绑定name作用域的问题 Update 🚀 优化了cosole日志方法和使用方式
🚀 优化了vite适配方式`},{header:"0.2.4",slug:"_0-2-4",content:`2021-08-13 New 🆕 新增了start配置项globalAssets，用于设置全局共享资源 Bug Fix 🐞 修复了在子应用中请求html元素被拦截的问题
🐞 修复低版本nodejs对于rollup.config.js执行错误的问题 Update 🚀 代码优化`},{header:"0.2.3",slug:"_0-2-3",content:`2021-08-10 Bug Fix 🐞 修复了切换至预加载app时报app already exists错误
🐞 修复了地址补全对于a元素的错误处理 Update 🚀 文档更新
🚀 代码优化
🚀 更新单元测试`},{header:"0.2.2",slug:"_0-2-2",content:"2021-07-27 Bug Fix 🐞 修复了JSX.IntrinsicElements属性生命丢失的问题 Update 🚀 代码优化"},{header:"0.2.0",slug:"_0-2-0",content:`2021-07-16 Bug Fix 🐞 修复了styled-componets下样式失效的问题
🐞 修复了沙箱关闭时，插件系统失效的问题
🐞 修复了link地址没有协议前缀时补全相对地址失败的问题 Update 🚀 案例及文档更新`},{header:"0.1.0",slug:"_0-1-0",content:"2021-07-09 🎉 v0.1.0正式版发布。"}]},{path:"/zh/chat.html",title:"",pathLocale:"/",contents:[{header:"",slug:"",content:`Gitter群聊
GitHub讨论组
BUG反馈`}]},{path:"/zh/configure.html",title:"配置项",pathLocale:"/",contents:[{header:"配置项",slug:"配置项",content:"通过配置项，我们可以决定开启或关闭某些功能。"},{header:"name",slug:"name",content:`Desc: 应用名称
Type: string
Default: 必传参数
使用方式: <micro-app name='xx'></micro-app>
注意事项: 必须以字母开头，且不可以带特殊符号(中划线、下划线除外) 每个name都对应一个应用，当多个应用同时渲染时，name不可以重复。
当name的值发生变化时，会卸载当前应用并重新渲染。`},{header:"url",slug:"url",content:`Desc: 应用地址
Type: string
Default: 必传参数
使用方式: <micro-app name='xx' url='xx'></micro-app> url必须指向子应用的index.html，如：http://localhost:3000/ 或 http://localhost:3000/index.html
MicroApp会根据url地址自动补全子应用的静态资源，如js、css、图片等
当url的值发生变化时，会卸载当前应用并根据新的url值重新渲染。`},{header:"iframe",slug:"iframe",content:`Desc: 开启iframe沙箱
Default: false
使用方式: <micro-app iframe></micro-app> MicroApp有两种沙箱方案：with沙箱和iframe沙箱。
默认开启with沙箱，如果with沙箱无法正常运行，可以尝试切换到iframe沙箱，比如vite。`},{header:"inline",slug:"inline",content:`Desc: 使用内联script
Default: false
使用方式: <micro-app name='xx' url='xx' inline></micro-app> 默认情况下，子应用的js会被提取并在后台运行，这会导致调试困难。
开启inline后，被提取的js会作为script标签插入应用中运行，在开发环境中更方便调试。
Note
开启inline后会稍微损耗性能，建议在开发环境中使用。`},{header:"destroy",slug:"destroy",content:`Desc: 卸载时强制删除缓存资源
Default: false
使用方式: <micro-app name='xx' url='xx' destroy></micro-app> 默认情况下，子应用被卸载后不会删除缓存的静态资源和数据，以便在重新渲染时获得更好的性能。
开启destroy，子应用在卸载后会清空缓存资源和数据，当重新渲染时将和初次渲染的行为保持一致。`},{header:"clear-data",slug:"clear-data",content:`Desc: 卸载时清空数据通讯中的缓存数据
Default: false
使用方式: <micro-app name='xx' url='xx' clear-data></micro-app> 默认情况下，子应用被卸载后数据通讯中的缓存数据会被保留，如果你希望清空这些数据，设置clear-data即可。
子应用卸载时会同时清空主应用发送给当前子应用，和当前子应用发送给主应用的数据。
destroy也有同样的效果。`},{header:"disable-scopecss",slug:"disable-scopecss",content:`Desc: 关闭样式隔离
Default: false
使用方式: <micro-app name='xx' url='xx' disable-scopecss></micro-app> 关闭样式隔离可以提升页面渲染速度，在此之前，请确保各应用之间样式不会相互污染。`},{header:"disable-sandbox",slug:"disable-sandbox",content:`Desc: 关闭js沙箱
Default: false
使用方式: <micro-app name='xx' url='xx' disable-sandbox></micro-app> 关闭沙箱可能会导致一些不可预料的问题，通常情况不建议这样做。
Note
关闭沙箱后以下功能将失效: 样式隔离
元素隔离
路由隔离
__MICRO_APP_ENVIRONMENT__、__MICRO_APP_PUBLIC_PATH__等全局变量
baseroute`},{header:"ssr",slug:"ssr",content:`Desc: 开启ssr模式
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' ssr></micro-app>
版本要求: 0.5.3及以上版本 当子应用是ssr应用时，需要设置ssr属性，此时micro-app会根据ssr模式加载子应用。`},{header:"keep-alive",slug:"keep-alive",content:`Desc: 开启keep-alive模式
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' keep-alive></micro-app>
版本要求: 0.6.0及以上版本 开启keep-alive后，应用卸载时会进入缓存，而不是销毁它们，以便保留应用的状态和提升重复渲染的性能。
keep-alive的优先级小于destroy，当两者同时存在时，keep-alive将失效。`},{header:"default-page",slug:"default-page",content:`Desc: 指定默认渲染的页面
Type: string
Default: ''
使用方式: <micro-app name='xx' url='xx' default-page='页面地址'></micro-app> 默认情况下，子应用渲染后会展示首页，设置default-page可以指定子应用渲染的页面。`},{header:"router-mode",slug:"router-mode",content:`Desc: 路由模式
Type: string
Default: search
使用方式: <micro-app name='xx' url='xx' router-mode='search/native/native-scope/pure'></micro-app> 路由分为四种模式：search、native、native-scope、pure，每种模式对应不同的功能，以满足尽可能多的项目需求，详情参考虚拟路由系统。`},{header:"baseroute",slug:"baseroute",content:`Desc: 设置子应用的基础路由
Type: string
Default: ''
使用方式: <micro-app name='xx' url='xx' baseroute='/my-page/'></micro-app> 在微前端环境下，子应用可以从window.__MICRO_APP_BASE_ROUTE__上获取baseroute的值，用于设置基础路由。
只有路由模式是native或native-scope我们才需要设置baseroute，详情参考虚拟路由系统。`},{header:"keep-router-state",slug:"keep-router-state",content:`Desc: 保留路由状态
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' keep-router-state></micro-app> 默认情况下，子应用卸载后重新渲染，将和首次加载一样渲染子应用的页面。
设置keep-router-state可以保留子应用路由状态，在卸载后重新渲染时将恢复卸载前的页面（页面中的状态不保留）。
注意： 如果关闭了虚拟路由系统，keep-router-state也将失效。
当设置了default-page时keep-router-state将失效，因为它的优先级小于default-page`},{header:"disable-memory-router",slug:"disable-memory-router",content:`Desc: 关闭虚拟路由系统
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' disable-memory-router></micro-app> 默认情况下，子应用将运行在虚拟路由系统中，和主应用的路由系统进行隔离，避免相互影响。
子应用的路由信息会作为query参数同步到浏览器地址上，如下： 设置disable-memory-router后，子应用将基于浏览器的路由系统进行渲染，拥有更加简洁优雅的的浏览器地址，详情参考虚拟路由系统。`},{header:"disable-patch-request",slug:"disable-patch-request",content:`Desc: 关闭子应用请求的自动补全功能
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' disable-patch-request></micro-app> 默认情况下，MicroApp对子应用的fetch、XMLHttpRequest、EventSource进行重写，当请求相对地址时会使用子应用域名自动补全
如：fetch('/api/data') 补全为 fetch(子应用域名 + '/api/data')
如果不需要这样的补全，可以配置disable-patch-request进行关闭，此时相对地址会兜底到主应用域名。
如：fetch('/api/data') 兜底为 fetch(主应用域名 + '/api/data')`},{header:"fiber",slug:"fiber",content:`Desc: 开启fiber模式
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' fiber></micro-app> 默认情况下，子应用js是同步执行的，这会阻塞主应用的渲染线程，当开启fiber后，micro-app会降低子应用的优先级，通过异步执行子应用的js文件，以减小对主应用的影响，快速响应用户操作。
Note
开启fiber后会降低子应用的渲染速度。`},{header:"全局配置",slug:"全局配置",content:`全局配置会影响每一个子应用，请小心使用！
使用方式
import microApp from '@micro-zoe/micro-app' microApp.start({ iframe: true, // 全局开启iframe沙箱，默认为false inline: true, // 全局开启内联script模式运行js，默认为false destroy: true, // 全局开启destroy模式，卸载时强制删除缓存资源，默认为false ssr: true, // 全局开启ssr模式，默认为false 'disable-scopecss': true, // 全局禁用样式隔离，默认为false 'disable-sandbox': true, // 全局禁用沙箱，默认为false 'keep-alive': true, // 全局开启保活模式，默认为false 'disable-memory-router': true, // 全局关闭虚拟路由系统，默认值false 'keep-router-state': true, // 子应用在卸载时保留路由状态，默认值false 'disable-patch-request': true, // 关闭子应用请求的自动补全功能，默认值false iframeSrc: location.origin, // 设置iframe沙箱中iframe的src地址，默认为子应用所在页面地址
})
如果希望在某个应用中不使用全局配置，可以单独配置关闭：
<micro-app name='xx' url='xx' iframe='false' inline='false' destroy='false' ssr='false' disable-scopecss='false' disable-sandbox='false' keep-alive='false' disable-memory-router='false' keep-router-state='false' disable-patch-request='false'
></micro-app>`},{header:"其它配置",slug:"其它配置",content:""},{header:"global",slug:"global",content:`当多个子应用使用相同的js或css资源，在link、script设置global属性会将文件提取为公共文件，共享给其它应用。
设置global属性后文件第一次加载会放入公共缓存，其它子应用加载相同的资源时直接从缓存中读取内容，从而提升渲染速度。
使用方式
<link rel="stylesheet" href="xx.css" global>
<script src="xx.js" global><\/script>`},{header:"globalAssets",slug:"globalassets",content:`globalAssets用于设置全局共享资源，它和预加载的思路相同，在浏览器空闲时加载资源并放入缓存，提高渲染效率。
当子应用加载相同地址的js或css资源时，会直接从缓存中提取数据，从而提升渲染速度。
使用方式
// index.js
import microApp from '@micro-zoe/micro-app' microApp.start({ globalAssets: { js: ['js地址1', 'js地址2', ...], // js地址 css: ['css地址1', 'css地址2', ...], // css地址 }
})`},{header:"exclude(过滤元素)",slug:"exclude-过滤元素",content:`当子应用不需要加载某个js或css，可以通过在link、script、style设置exclude属性，当micro-app遇到带有exclude属性的元素会进行删除。
使用方式
<link rel="stylesheet" href="xx.css" exclude>
<script src="xx.js" exclude><\/script>
<style exclude></style>`},{header:"ignore(忽略元素)",slug:"ignore-忽略元素",content:`当link、script、style元素具有ignore属性，micro-app不会处理它，元素将原封不动进行渲染。
使用场景例如：jsonp
jsonp会创建一个script元素加载数据，正常情况script会被拦截导致jsonp请求失败，此时可以给script元素添加ignore属性，跳过拦截。
// 修改jsonp方法，在创建script元素后添加ignore属性
const script = document.createElement('script')
script.setAttribute('ignore', 'true')`}]},{path:"/zh/data.html",title:"数据通信",pathLocale:"/",contents:[{header:"数据通信",slug:"数据通信",content:`micro-app提供了一套灵活的数据通信机制，方便主应用和子应用之间的数据传输。
主应用和子应用之间的通信是绑定的，主应用只能向指定的子应用发送数据，子应用只能向主应用发送数据，这种方式可以有效的避免数据污染，防止多个子应用之间相互影响。
同时我们也提供了全局通信，方便跨应用之间的数据通信。`},{header:"一、子应用获取来自主应用的数据",slug:"一、子应用获取来自主应用的数据",content:"有两种方式获取来自主应用的数据："},{header:"方式1：直接获取数据",slug:"方式1-直接获取数据",content:"const data = window.microApp.getData() // 返回主应用下发的data数据"},{header:"方式2：绑定监听函数",slug:"方式2-绑定监听函数",content:`/** * 绑定监听函数，监听函数只有在数据变化时才会触发 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false * !!!重要说明: 因为子应用是异步渲染的，而主应用发送数据是同步的， * 如果在子应用渲染结束前主应用发送数据，则在绑定监听函数前数据已经发送，在初始化后不会触发绑定函数， * 但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。 */
window.microApp.addDataListener(dataListener: (data: Object) => any, autoTrigger?: boolean) // 解绑监听函数
window.microApp.removeDataListener(dataListener: (data: Object) => any) // 清空当前子应用的所有绑定函数(全局数据函数除外)
window.microApp.clearDataListener()
使用方式：
// 监听函数
function dataListener (data) { console.log('来自主应用的数据', data)
} // 监听数据变化
window.microApp.addDataListener(dataListener) // 监听数据变化，初始化时如果有数据则主动触发一次
window.microApp.addDataListener(dataListener, true) // 解绑监听函数
window.microApp.removeDataListener(dataListener) // 清空当前子应用的所有绑定函数(全局数据函数除外)
window.microApp.clearDataListener()`},{header:"二、子应用向主应用发送数据",slug:"二、子应用向主应用发送数据",content:`// dispatch只接受对象作为参数
window.microApp.dispatch({type: '子应用发送给主应用的数据'})
dispatch只接受对象作为参数，它发送的数据都会被缓存下来。
micro-app会遍历新旧值中的每个key判断值是否有变化，如果所有数据都相同则不会发送（注意：只会遍历第一层key），如果数据有变化则将新旧值进行合并后发送。
例如：
// 第一次发送数据，记入缓存值 {name: 'jack'}，然后发送 window.microApp.dispatch({name: 'jack'})
// 第二次发送数据，将新旧值合并为 {name: 'jack', age: 20}，记入缓存值，然后发送 window.microApp.dispatch({age: 20})
// 第三次发送数据，新旧值合并为 {name: 'jack', age: 20}，与缓存值相同，不再发送
window.microApp.dispatch({age: 20})`},{header:"dispatch是异步执行的，多个dispatch会在下一帧合并为一次执行",slug:"dispatch是异步执行的-多个dispatch会在下一帧合并为一次执行",content:`例如：
window.microApp.dispatch({name: 'jack'})
window.microApp.dispatch({age: 20}) // 上面的数据会在下一帧合并为对象{name: 'jack', age: 20}一次性发送给主应用`},{header:"dispatch第二个参数为回调函数，它会在数据发送结束后执行",slug:"dispatch第二个参数为回调函数-它会在数据发送结束后执行",content:`例如：
window.microApp.dispatch({city: 'HK'}, () => { console.log('数据已经发送完成')
})`},{header:"当数据监听函数有返回值时，会作为dispatch回调函数的入参",slug:"当数据监听函数有返回值时-会作为dispatch回调函数的入参",content:`例如：
主应用：
import microApp from '@micro-zoe/micro-app' microApp.addDataListener('my-app', (data) => { console.log('来自子应用my-app的数据', data) return '返回值1'
}) microApp.addDataListener('my-app', (data) => { console.log('来自子应用my-app的数据', data) return '返回值2'
})
子应用：
// 返回值会放入数组中传递给dispatch的回调函数
window.microApp.dispatch({city: 'HK'}, (res: any[]) => { console.log(res) // ['返回值1', '返回值2']
})`},{header:"forceDispatch：强制发送",slug:"forcedispatch-强制发送",content:`forceDispatch方法拥有和dispatch一样的参数和行为，唯一不同的是forceDispatch会强制发送数据，无论数据是否变化。
例如：
// 强制发送数据，无论缓存中是否已经存在 name: 'jack' 的值
window.microApp.forceDispatch({name: 'jack'}, () => { console.log('数据已经发送完成')
})`},{header:"三、主应用向子应用发送数据",slug:"三、主应用向子应用发送数据",content:"主应用向子应用发送数据有两种方式："},{header:"方式1: 通过data属性发送数据",slug:"方式1-通过data属性发送数据",content:`在React中我们需要引入一个polyfill。
在<micro-app>元素所在的文件顶部添加polyfill(注释也要复制)。
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
开始使用
<micro-app name='my-app' url='xx' data={this.state.dataForChild} // data只接受对象类型，采用严格对比(===)，当传入新的data对象时会重新发送
/> vue中和绑定普通属性方式一致。
<template> <micro-app name='my-app' url='xx' :data='dataForChild' // data只接受对象类型，数据变化时会重新发送 />
</template> <script>
export default { data () { return { dataForChild: {type: '发送给子应用的数据'} } }
}
<\/script>`},{header:"方式2: 手动发送数据",slug:"方式2-手动发送数据",content:`手动发送数据需要通过name指定接受数据的子应用，此值和<micro-app>元素中的name一致。
import microApp from '@micro-zoe/micro-app' // 发送数据给子应用 my-app，setData第二个参数只接受对象类型
microApp.setData('my-app', {type: '新的数据'})
setData第一个参数为子应用名称，第二个参数为传递的数据，它发送的数据都会被缓存下来。
micro-app会遍历新旧值中的每个key判断值是否有变化，如果所有数据都相同则不会发送（注意：只会遍历第一层key），如果数据有变化则将新旧值进行合并后发送。
例如：
// 第一次发送数据，记入缓存值 {name: 'jack'}，然后发送 microApp.setData('my-app', {name: 'jack'})
// 第二次发送数据，将新旧值合并为 {name: 'jack', age: 20}，记入缓存值，然后发送 microApp.setData('my-app', {age: 20})
// 第三次发送数据，新旧值合并为 {name: 'jack', age: 20}，与缓存值相同，不再发送
microApp.setData('my-app', {age: 20})`},{header:"setData是异步执行的，多个setData会在下一帧合并为一次执行",slug:"setdata是异步执行的-多个setdata会在下一帧合并为一次执行",content:`例如：
microApp.setData('my-app', {name: 'jack'})
microApp.setData('my-app', {age: 20}) // 上面的数据会在下一帧合并为对象{name: 'jack', age: 20}一次性发送给子应用my-app`},{header:"setData第三个参数为回调函数，它会在数据发送结束后执行",slug:"setdata第三个参数为回调函数-它会在数据发送结束后执行",content:`例如：
microApp.setData('my-app', {city: 'HK'}, () => { console.log('数据已经发送完成')
})`},{header:"当数据监听函数有返回值时，会作为setData回调函数的入参",slug:"当数据监听函数有返回值时-会作为setdata回调函数的入参",content:`例如：
子应用：
window.microApp.addDataListener((data) => { console.log('来自主应用的数据', data) return '返回值1'
}) window.microApp.addDataListener((data) => { console.log('来自主应用的数据', data) return '返回值2'
})
主应用：
// 返回值会放入数组中传递给setData的回调函数
microApp.setData('my-app', {city: 'HK'}, (res: any[]) => { console.log(res) // ['返回值1', '返回值2']
})`},{header:"forceSetData：强制发送",slug:"forcesetdata-强制发送",content:`forceSetData方法拥有和setData一样的参数和行为，唯一不同的是forceSetData会强制发送数据，无论数据是否变化。
例如：
// 强制发送数据，无论缓存中是否已经存在 name: 'jack' 的值
microApp.forceSetData('my-app', {name: 'jack'}, () => { console.log('数据已经发送完成')
})`},{header:"四、主应用获取来自子应用的数据",slug:"四、主应用获取来自子应用的数据",content:"主应用获取来自子应用的数据有三种方式："},{header:"方式1：直接获取数据",slug:"方式1-直接获取数据-1",content:"import microApp from '@micro-zoe/micro-app' const childData = microApp.getData(appName) // 返回子应用的data数据"},{header:"方式2: 监听自定义事件 (datachange)",slug:"方式2-监听自定义事件-datachange",content:`在React中我们需要引入一个polyfill。
在<micro-app>元素所在的文件顶部添加polyfill(注释也要复制)。
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
开始使用
<micro-app name='my-app' url='xx' // 数据在event.detail.data字段中，子应用每次发送数据都会触发datachange onDataChange={(e) => console.log('来自子应用的数据：', e.detail.data)}
/> vue中监听方式和普通事件一致。
<template> <micro-app name='my-app' url='xx' // 数据在事件对象的detail.data字段中，子应用每次发送数据都会触发datachange @datachange='handleDataChange' />
</template> <script>
export default { methods: { handleDataChange (e) { console.log('来自子应用的数据：', e.detail.data) } }
}
<\/script> 注意：datachange绑定函数的返回值不会作为子应用dispatch回调函数的入参，它的返回值没有任何作用。`},{header:"方式3: 绑定监听函数",slug:"方式3-绑定监听函数",content:`绑定监听函数需要通过name指定子应用，此值和<micro-app>元素中的name一致。
import microApp from '@micro-zoe/micro-app' /** * 绑定监听函数 * appName: 应用名称 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
microApp.addDataListener(appName: string, dataListener: (data: Object) => any, autoTrigger?: boolean) // 解绑监听指定子应用的函数
microApp.removeDataListener(appName: string, dataListener: (data: Object) => any) // 清空所有监听指定子应用的函数
microApp.clearDataListener(appName: string)
使用方式：
import microApp from '@micro-zoe/micro-app' // 监听函数
function dataListener (data) { console.log('来自子应用my-app的数据', data)
} // 监听来自子应用my-app的数据
microApp.addDataListener('my-app', dataListener) // 解绑监听my-app子应用的函数
microApp.removeDataListener('my-app', dataListener) // 清空所有监听my-app子应用的函数
microApp.clearDataListener('my-app')`},{header:"五、清空数据",slug:"五、清空数据",content:"由于通信的数据会被缓存，即便子应用被卸载也不会清空，这可能会导致一些困扰，此时可以主动清空缓存数据来解决。"},{header:"方式一：配置项 - clear-data",slug:"方式一-配置项-clear-data",content:`使用方式: <micro-app clear-data></micro-app> 当设置了clear-data，子应用卸载时会同时清空主应用发送给当前子应用，和当前子应用发送给主应用的数据。
destroy也有同样的效果。`},{header:"方式二：手动清空 - clearData",slug:"方式二-手动清空-cleardata",content:`import microApp from '@micro-zoe/micro-app' // 清空主应用发送给子应用 my-app 的数据
microApp.clearData('my-app')`},{header:"方式一：手动清空 - clearData",slug:"方式一-手动清空-cleardata",content:`// 清空当前子应用发送给主应用的数据
window.microApp.clearData()`},{header:"全局数据通信",slug:"全局数据通信",content:"全局数据通信会向主应用和所有子应用发送数据，在跨应用通信的场景中适用。"},{header:"发送全局数据",slug:"发送全局数据",content:`import microApp from '@micro-zoe/micro-app' // setGlobalData只接受对象作为参数
microApp.setGlobalData({type: '全局数据'}) // setGlobalData只接受对象作为参数
window.microApp.setGlobalData({type: '全局数据'}) setGlobalData只接受对象作为参数，它发送的数据都会被缓存下来。
micro-app会遍历新旧值中的每个key判断值是否有变化，如果所有数据都相同则不会发送（注意：只会遍历第一层key），如果数据有变化则将新旧值进行合并后发送。
例如： // 第一次发送数据，记入缓存值 {name: 'jack'}，然后发送 microApp.setGlobalData({name: 'jack'})
// 第二次发送数据，将新旧值合并为 {name: 'jack', age: 20}，记入缓存值，然后发送 microApp.setGlobalData({age: 20})
// 第三次发送数据，新旧值合并为 {name: 'jack', age: 20}，与缓存值相同，不再发送
microApp.setGlobalData({age: 20}) // 第一次发送数据，记入缓存值 {name: 'jack'}，然后发送 window.microApp.setGlobalData({name: 'jack'})
// 第二次发送数据，将新旧值合并为 {name: 'jack', age: 20}，记入缓存值，然后发送 window.microApp.setGlobalData({age: 20})
// 第三次发送数据，新旧值合并为 {name: 'jack', age: 20}，与缓存值相同，不再发送
window.microApp.setGlobalData({age: 20})`},{header:"setGlobalData是异步执行的，多个setGlobalData会在下一帧合并为一次执行",slug:"setglobaldata是异步执行的-多个setglobaldata会在下一帧合并为一次执行",content:`例如： microApp.setGlobalData({name: 'jack'})
microApp.setGlobalData({age: 20}) // 上面的数据会在下一帧合并为对象{name: 'jack', age: 20}一次性发送给主应用 window.microApp.setGlobalData({name: 'jack'})
window.microApp.setGlobalData({age: 20}) // 上面的数据会在下一帧合并为对象{name: 'jack', age: 20}一次性发送给主应用`},{header:"setGlobalData第二个参数为回调函数，它会在数据发送结束后执行",slug:"setglobaldata第二个参数为回调函数-它会在数据发送结束后执行",content:`例如： microApp.setGlobalData({city: 'HK'}, () => { console.log('数据已经发送完成')
}) window.microApp.setGlobalData({city: 'HK'}, () => { console.log('数据已经发送完成')
})`},{header:"当全局数据的监听函数有返回值时，会作为setGlobalData回调函数的入参",slug:"当全局数据的监听函数有返回值时-会作为setglobaldata回调函数的入参",content:`例如： microApp.addGlobalDataListener((data) => { console.log('全局数据', data) return '返回值1'
}) microApp.addGlobalDataListener((data) => { console.log('全局数据', data) return '返回值2'
})
// 返回值会放入数组中传递给setGlobalData的回调函数
microApp.setGlobalData({city: 'HK'}, (res: any[]) => { console.log(res) // ['返回值1', '返回值2']
}) window.microApp.addGlobalDataListener((data) => { console.log('全局数据', data) return '返回值1'
}) window.microApp.addGlobalDataListener((data) => { console.log('全局数据', data) return '返回值2'
})
// 返回值会放入数组中传递给setGlobalData的回调函数
window.microApp.setGlobalData({city: 'HK'}, (res: any[]) => { console.log(res) // ['返回值1', '返回值2']
})`},{header:"forceSetGlobalData：强制发送",slug:"forcesetglobaldata-强制发送",content:`forceSetGlobalData方法拥有和setGlobalData一样的参数和行为，唯一不同的是forceSetGlobalData会强制发送数据，无论数据是否变化。
例如： // 强制发送数据，无论缓存中是否已经存在 name: 'jack' 的值
microApp.forceSetGlobalData({name: 'jack'}, () => { console.log('数据已经发送完成')
}) // 强制发送数据，无论缓存中是否已经存在 name: 'jack' 的值
window.microApp.forceSetGlobalData({name: 'jack'}, () => { console.log('数据已经发送完成')
})`},{header:"获取全局数据",slug:"获取全局数据",content:`import microApp from '@micro-zoe/micro-app' // 直接获取数据
const globalData = microApp.getGlobalData() // 返回全局数据 function dataListener (data) { console.log('全局数据', data)
} /** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
microApp.addGlobalDataListener(dataListener: (data: Object) => any, autoTrigger?: boolean) // 解绑监听函数
microApp.removeGlobalDataListener(dataListener: (data: Object) => any) // 清空主应用绑定的所有全局数据监听函数
microApp.clearGlobalDataListener() // 直接获取数据
const globalData = window.microApp.getGlobalData() // 返回全局数据 function dataListener (data) { console.log('全局数据', data)
} /** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
window.microApp.addGlobalDataListener(dataListener: (data: Object) => any, autoTrigger?: boolean) // 解绑监听函数
window.microApp.removeGlobalDataListener(dataListener: (data: Object) => any) // 清空当前子应用绑定的所有全局数据监听函数
window.microApp.clearGlobalDataListener()`},{header:"清空全局数据",slug:"清空全局数据",content:`import microApp from '@micro-zoe/micro-app' // 清空全局数据
microApp.clearGlobalData() // 清空全局数据
window.microApp.clearGlobalData()`},{header:"关闭沙箱后的通信方式",slug:"关闭沙箱后的通信方式",content:`沙箱关闭后，子应用默认的通信功能失效，此时可以通过手动注册通信对象实现一致的功能。
注册方式：在主应用中为子应用初始化通信对象
import { EventCenterForMicroApp } from '@micro-zoe/micro-app' // 注意：每个子应用根据appName单独分配一个通信对象
window.eventCenterForAppxx = new EventCenterForMicroApp(appName)
子应用就可以通过注册的eventCenterForAppxx对象进行通信，其api和window.microApp一致，主应用通信方式没有任何变化。
子应用通信方式：
// 直接获取数据
const data = window.eventCenterForAppxx.getData() // 返回data数据 function dataListener (data) { console.log('来自主应用的数据', data)
} /** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
window.eventCenterForAppxx.addDataListener(dataListener: (data: Object) => any, autoTrigger?: boolean) // 解绑监听函数
window.eventCenterForAppxx.removeDataListener(dataListener: (data: Object) => any) // 清空当前子应用的所有绑定函数(全局数据函数除外)
window.eventCenterForAppxx.clearDataListener() // 子应用向主应用发送数据，只接受对象作为参数
window.eventCenterForAppxx.dispatch({type: '子应用发送的数据'})`}]},{path:"/zh/deploy.html",title:"",pathLocale:"/",contents:[{header:"前言",slug:"前言",content:`我们强烈建议你保持开发环境和线上环境路径(即webpack的publicPath)的一致性，以避免在部署后出现问题，无论是主应用还是子应用。
比如一个应用，在部署时作为文件夹 my-app 放入服务器根目录，那么配置如下： // webpack.config.js
module.exports = { output: { path: 'my-app', publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '', // bad ❌ publicPath: '/my-app/', // good 👍 }
} // vue.config.js
module.exports = { outputDir: 'my-app', publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '', // bad ❌ publicPath: '/my-app/', // good 👍
}`},{header:"示例",slug:"示例",content:`正常来说只要开发环境和线上环境资源路径一致，并在部署后设置好nginx的跨域即可，在开发环境正常运行的项目，部署到服务器后，理论上也可以正常运行。
但在实际开发中经常会出现地址404、资源丢失等问题，这通常是因为服务器配置错误或者micro-app元素url属性地址错误导致。
我们以micro-app-demo为例介绍部署相关内容，以供大家参考，因为micro-app-demo覆盖了history路由、hash路由、ssr、根路径、二级路径等大部分场景，是一个典型的案例。`},{header:"代码仓库目录结构：",slug:"代码仓库目录结构",content:`.
├── child_apps
│ ├── angular11 // 子应用 angular11 (history路由)
│ ├── nextjs11 // 子应用 nextjs11 (history路由)
│ ├── nuxtjs2 // 子应用 nuxtjs2 (history路由) │ ├── react16 // 子应用 react16 (history路由)
│ ├── react17 // 子应用 react17 (hash路由)
│ ├── sidebar // 子应用 sidebar，公共侧边栏
│ ├── vite-vue3 // 子应用 vite (hash路由)
│ ├── vue2 // 子应用 vue2 (history路由)
│ └── vue3 // 子应用 vue3 (history路由)
├── main_apps
│ ├── angular11 // 主应用 angular11 (history路由)
│ ├── nextjs11 // 主应用 nextjs11 (history路由)
│ ├── nuxtjs2 // 主应用 nuxtjs2 (history路由)
│ ├── react16 // 主应用 react16 (history路由)
│ ├── react17 // 主应用 react17 (history路由)
│ ├── vite-vue3 // 主应用 vite (history路由)
│ ├── vue2 // 主应用 vue2 (history路由)
│ └── vue3 // 主应用 vue3 (history路由)
├── package.json
└── yarn.lock`},{header:"部署到服务器的目录结构：",slug:"部署到服务器的目录结构",content:`root(服务器根目录)
├── child
│ ├── angular11 // 子应用 angular11
│ ├── react16 // 子应用 react16
│ ├── react17 // 子应用 react17
│ ├── sidebar // 子应用 sidebar
│ ├── vite // 子应用 vite
│ ├── vue2 // 子应用 vue2
│ ├── vue3 // 子应用 vue3
│ ├── nextjs11 // 子应用 nextjs11，为每个主应用单独打包，端口号：5001~5009
│ └── nuxtjs2 // 子应用 nuxtjs2，为每个主应用单独打包，端口号：6001~6009
│ ├── main-angular11 // 主应用 angular11
├── main-react16 // 主应用 react16
├── main-react17 // 主应用 react17
├── main-vite // 主应用 vite
├── main-vue2 // 主应用 vue2
├── main-vue3 // 主应用 vue3
├── main-nextjs11 // 主应用 nextjs11，监听端口号：5000
├── main-nuxtjs2 // 主应用 nuxtjs2，监听端口号：7000`},{header:"nginx配置如下：",slug:"nginx配置如下",content:`以下配置仅供参考，具体项目根据实际情况调整。
# micro-zoe.com 相关配置
server { listen 80; server_name www.micro-zoe.com micro-zoe.com; location / { root /root/mygit/micro-zoe; index index.php index.html index.htm; # add_header Cache-Control; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } } # 主应用main-angular11 location /main-angular11 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-angular11/index.html; } # 主应用main-react16 location /main-react16 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-react16/index.html; } # 主应用main-react17 location /main-react17 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-react17/index.html; } # 主应用main-vite location /main-vite { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-vite/index.html; } # 主应用main-vue2 location /main-vue2 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-vue2/index.html; } # 主应用main-vue3 location /main-vue3 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-vue3/index.html; } # 子应用child-angular11 location /child/angular11 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/angular11/index.html; } # 子应用child-react16 location /child/react16 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/react16/index.html; } # 子应用child-react17 location /child/react17 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/react17/index.html; } # 子应用child-sidebar location /child/sidebar { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/sidebar/index.html; } # 子应用child-vite location /child/vite { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/vite/index.html; } # 子应用child-vue2 location /child/vue2 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/vue2/index.html; } # 子应用child-vue3 location /child/vue3 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/vue3/index.html; } error_page 404 /404.html; location = /40x.html { } error_page 500 502 503 504 /50x.html; location = /50x.html { }
} # 主应用nextjs11部署后监听5000端口，设置代理指向5000端口，则可以通过 nextjs11.micro-zoe.com 访问主应用
server { listen 80; server_name nextjs11.micro-zoe.com; root html; index index.html index.htm; location / { proxy_pass http://127.0.0.1:5000; proxy_set_header Host $host:80; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # add_header Cache-Control; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } } error_page 404 /404.html; location = /40x.html { } error_page 500 502 503 504 /50x.html; location = /50x.html { }
} # 主应用nuxtjs2部署后监听7000端口，设置代理指向7000端口，则可以通过 nuxtjs2.micro-zoe.com 访问主应用
server { listen 80; server_name nuxtjs2.micro-zoe.com; root html; index index.html index.htm; location / { proxy_pass http://127.0.0.1:7000; proxy_set_header Host $host:80; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # add_header Cache-Control; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } } error_page 404 /404.html; location = /40x.html { } error_page 500 502 503 504 /50x.html; location = /50x.html { }
}`},{header:"线上效果如下：",slug:"线上效果如下",content:`main-vue2：http://www.micro-zoe.com/main-vue2/
main-nextjs11：http://nextjs11.micro-zoe.com/
main-nuxtjs2：http://nuxtjs2.micro-zoe.com/`}]},{path:"/zh/dom-scope.html",title:"元素隔离",pathLocale:"/",contents:[{header:"元素隔离",slug:"元素隔离",content:`元素隔离的概念来自ShadowDom，即ShadowDom中的元素可以和外部的元素重复但不会冲突，micro-app模拟实现了类似ShadowDom的功能，元素不会逃离<micro-app>元素边界，子应用只能对自身的元素进行增、删、改、查的操作。
举个栗子🌰 :
主应用和子应用都有一个元素<div id='root'></div>，此时子应用通过document.querySelector('#root')获取到的是自己内部的#root元素，而不是主应用的。
主应用可以获取子应用的元素吗？
可以的！
这一点和ShadowDom不同，在微前端下主应用拥有统筹全局的作用，所以我们没有对主应用操作子应用元素的行为进行限制。`},{header:"解除元素绑定",slug:"解除元素绑定",content:`默认情况下，当子应用操作元素时会绑定元素作用域，而解绑过程是异步的，这可能会导致操作元素异常，此时有两种方式可以解决这个问题。
方式一：执行removeDomScope
removeDomScope方法可以解除元素绑定，通常用于受子应用元素绑定影响，导致主应用元素错误绑定到子应用的情况。
具体方式如下： import { removeDomScope } from '@micro-zoe/micro-app' // 解除元素绑定，并且一定时间内(一个微任务Promise时间)阻止再次绑定
removeDomScope(true) const div = window.document.createElement('div')
// 插入到主应用body中
document.body.appendChild(div) // 解除元素绑定，并且一定时间内(一个微任务Promise时间)阻止再次绑定
window.microApp.removeDomScope(true) const div = window.rawDocument.createElement('div')
// 插入到主应用body中
document.body.appendChild(div) 方式二：使用setTimeout // 等待解绑结束后操作元素
setTimeout(() => { const div = window.document.createElement('div') // 插入到主应用body中 document.body.appendChild(div) }, 0) // 记录主应用document
const rawDocument = window.rawDocument // 等待解绑结束后操作元素
setTimeout(() => { const div = rawDocument.createElement('div') // 插入到主应用body中 rawDocument.body.appendChild(div) }, 0)`}]},{path:"/zh/env.html",title:"环境变量",pathLocale:"/",contents:[{header:"环境变量",slug:"环境变量",content:""},{header:"__MICRO_APP_ENVIRONMENT__",slug:"micro-app-environment",content:`描述：判断应用是否在微前端环境中
在子应用中通过 window.__MICRO_APP_ENVIRONMENT__ 判断是否在微前端环境中。
if (window.__MICRO_APP_ENVIRONMENT__) { console.log('我在微前端环境中')
}`},{header:"__MICRO_APP_NAME__",slug:"micro-app-name",content:`描述：应用名称
在子应用中通过 window.__MICRO_APP_NAME__ 获取应用的name值，即<micro-app>标签的name值。`},{header:"__MICRO_APP_PUBLIC_PATH__",slug:"micro-app-public-path",content:`描述：子应用的静态资源前缀
用于设置webpack动态public-path，将子应用的静态资源补全为 http 开头的绝对地址。
步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
if (window.__MICRO_APP_ENVIRONMENT__) { __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用的入口文件的最顶部引入public-path.js
import './public-path'`},{header:"__MICRO_APP_BASE_ROUTE__",slug:"micro-app-base-route",content:`描述：子应用的基础路由
详情见路由-基础路由一章。`},{header:"__MICRO_APP_BASE_APPLICATION__",slug:"micro-app-base-application",content:`描述：判断应用是否是主应用
在执行microApp.start()后此值才会生效
if (window.__MICRO_APP_BASE_APPLICATION__) { console.log('我是主应用')
}`}]},{path:"/zh/jump.html",title:"",pathLocale:"/",contents:[{header:"",slug:"",content:"每个应用的路由实例都是不同的，应用的路由实例只能控制自身，无法影响其它应用，包括主应用无法通过控制自身路由影响到子应用。 常见的问题如：开发者想通过主应用的侧边栏跳转，从而控制子应用的页面，这其实是做不到的，只有子应用的路由实例可以控制自身的页面。 要实现应用之间的跳转有两种方式："},{header:"方式一、window.history",slug:"方式一、window-history",content:`通过history.pushState或history.replaceState进行跳转。
例如：
window.history.pushState(history.state, '', 'page2') // 主动触发一次popstate事件
window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
对于hash路由也同样适用
window.history.pushState(history.state, '', '#/page2') // 主动触发一次popstate事件
window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
注意事项 popstate事件是全局发送的，所有正在运行的应用都会接受到新的路由地址并进行匹配，要防止兜底到应用的404页面。
window.history并非适用于所有场景，一些框架如vue-router4，angular会出现问题，此时建议使用下面的方式2、3。`},{header:"方式二、通过数据通信控制跳转",slug:"方式二、通过数据通信控制跳转",content:`适用场景: 主应用控制子应用跳转
子应用中监听数据变化
// 监听主应用下发的数据变化
window.microApp.addDataListener((data) => { // 当主应用下发跳转指令时进行跳转 if (data.path) { router.push(data.path) }
})
主应用下发跳转指令
import microApp from '@micro-zoe/micro-app' microApp.setData('子应用name', { path: '/new-path/' })`},{header:"方式三、传递路由实例方法",slug:"方式三、传递路由实例方法",content:`适用场景: 子应用控制主应用跳转
主应用下发pushState函数： import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import microApp, { removeDomScope } from '@micro-zoe/micro-app' export default () => { const history = useHistory() function pushState (path) { removeDomScope() history.push(path) } useEffect(() => { // 👇 主应用向子应用下发一个名为pushState的方法 microApp.setData(子应用名称, { pushState }) }, []) return ( <div> <micro-app name='子应用名称' url='url'></micro-app> </div> )
} <template> <micro-app name='子应用名称' url='url' :data='microAppData' ></micro-app>
</template> <script>
import { removeDomScope } from '@micro-zoe/micro-app' export default { data () { return { microAppData: { pushState: (path) => { removeDomScope() this.$router.push(path) } } } },
}
<\/script> 子应用使用pushState控制主应用跳转：
window.microApp.getData().pushState(path)`}]},{path:"/zh/keep-alive.html",title:"keep-alive",pathLocale:"/",contents:[{header:"keep-alive",slug:"keep-alive",content:`在应用之间切换时，我们有时会想保留这些应用的状态，以便恢复用户的操作行为和提升重复渲染的性能，此时开启keep-alive模式可以达到这样的效果。
开启keep-alive后，应用卸载时不会销毁，而是推入后台运行。`},{header:"使用方式",slug:"使用方式",content:"<micro-app name='xx' url='xx' keep-alive></micro-app>"},{header:"生命周期",slug:"生命周期",content:`keep-alive模式与普通模式最大的不同是生命周期，因为它不会被真正的卸载，也就不会触发 unmount 事件。
生命周期如下：`},{header:"主应用",slug:"主应用",content:""},{header:"1. created",slug:"_1-created",content:"<micro-app>标签初始化后，加载资源前触发。"},{header:"2. beforemount",slug:"_2-beforemount",content:"加载资源完成后，开始渲染之前触发(只在初始化时执行一次)。"},{header:"3. mounted",slug:"_3-mounted",content:"子应用渲染结束后触发(只在初始化时执行一次)。"},{header:"4. error",slug:"_4-error",content:"子应用渲染出错时触发，只有会导致渲染终止的错误才会触发此生命周期。"},{header:"5. afterhidden",slug:"_5-afterhidden",content:"子应用推入后台时触发。"},{header:"6. beforeshow",slug:"_6-beforeshow",content:"子应用推入前台之前触发(初始化时不执行)。"},{header:"7. aftershow",slug:"_7-aftershow",content:"子应用推入前台之后触发(初始化时不执行)。"},{header:"监听生命周期",slug:"监听生命周期",content:`因为React不支持自定义事件，所以我们需要引入一个polyfill。
在<micro-app>标签所在的文件顶部添加polyfill，注释也要复制。
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
开始使用
<micro-app name='xx' url='xx' onCreated={() => console.log('micro-app元素被创建')} onBeforemount={() => console.log('即将被渲染，只在初始化时执行一次')} onMounted={() => console.log('已经渲染完成，只在初始化时执行一次')} onAfterhidden={() => console.log('已推入后台')} onBeforeshow={() => console.log('即将推入前台，初始化时不执行')} onAftershow={() => console.log('已经推入前台，初始化时不执行')} onError={() => console.log('渲染出错')}
/> vue中监听方式和普通事件一致。
<template> <micro-app name='xx' url='xx' @created='created' @beforemount='beforemount' @mounted='mounted' @afterhidden='afterhidden' @beforeshow='beforeshow' @aftershow='aftershow' @error='error' />
</template> <script>
export default { methods: { created () { console.log('micro-app元素被创建'), }, beforemount () { console.log('即将被渲染，只在初始化时执行一次'), }, mounted () { console.log('已经渲染完成，只在初始化时执行一次'), }, afterhidden () { console.log('已推入后台'), }, beforeshow () { console.log('即将推入前台，初始化时不执行'), }, aftershow () { console.log('已经推入前台，初始化时不执行'), }, error () { console.log('渲染出错'), } }
}
<\/script>`},{header:"子应用",slug:"子应用",content:`keep-alive模式下，在子应用卸载、重新渲染时，micro-app都会向子应用发送名为appstate-change的自定义事件，子应用可以通过监听该事件获取当前状态，状态值可以通过事件对象属性e.detail.appState获取。
e.detail.appState的值有三个：afterhidden、beforeshow、aftershow，分别对应卸载、即将渲染、已经渲染。
// 监听keep-alive模式下的应用状态
window.addEventListener('appstate-change', function (e) { if (e.detail.appState === 'afterhidden') { console.log('已卸载') } else if (e.detail.appState === 'beforeshow') { console.log('即将重新渲染') } else if (e.detail.appState === 'aftershow') { console.log('已经重新渲染') }
})
应用初始化时不会触发appstate-change事件。`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、如何恢复页面滚动位置？",slug:"_1、如何恢复页面滚动位置",content:"micro-app不会记录页面滚动位置，应用再次渲染时也不会进行恢复，需要开发者进行记录和恢复。"},{header:"2、子应用内部页面切换后状态丢失",slug:"_2、子应用内部页面切换后状态丢失",content:"micro-app的keep-alive是应用级别的，它只会保留当前正在活动的页面状态，如果想要缓存具体的页面或组件，需要使用子应用框架的能力，如：vue的keep-alive。"}]},{path:"/zh/life-cycles.html",title:"生命周期",pathLocale:"/",contents:[{header:"生命周期",slug:"生命周期",content:"micro-app通过CustomEvent定义生命周期，在组件渲染过程中会触发相应的生命周期事件。"},{header:"生命周期列表",slug:"生命周期列表",content:""},{header:"1. created",slug:"_1-created",content:"<micro-app>标签初始化后，加载资源前触发。"},{header:"2. beforemount",slug:"_2-beforemount",content:"加载资源完成后，开始渲染之前触发。"},{header:"3. mounted",slug:"_3-mounted",content:"子应用渲染结束后触发。"},{header:"4. unmount",slug:"_4-unmount",content:"子应用卸载时触发。"},{header:"5. error",slug:"_5-error",content:"子应用渲染出错时触发，只有会导致渲染终止的错误才会触发此生命周期。"},{header:"监听生命周期",slug:"监听生命周期",content:`因为React不支持自定义事件，所以我们需要引入一个polyfill。
在<micro-app>标签所在的文件顶部添加polyfill，注释也要复制。
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
开始使用
<micro-app name='xx' url='xx' onCreated={() => console.log('micro-app元素被创建')} onBeforemount={() => console.log('即将被渲染')} onMounted={() => console.log('已经渲染完成')} onUnmount={() => console.log('已经卸载')} onError={() => console.log('渲染出错')}
/> vue中监听方式和普通事件一致。
<template> <micro-app name='xx' url='xx' @created='created' @beforemount='beforemount' @mounted='mounted' @unmount='unmount' @error='error' />
</template> <script>
export default { methods: { created () { console.log('micro-app元素被创建') }, beforemount () { console.log('即将被渲染') }, mounted () { console.log('已经渲染完成') }, unmount () { console.log('已经卸载') }, error () { console.log('渲染出错') } }
}
<\/script> 我们可以手动监听生命周期事件。
const myApp = document.querySelector('micro-app[name=my-app]') myApp.addEventListener('created', () => { console.log('created')
}) myApp.addEventListener('beforemount', () => { console.log('beforemount')
}) myApp.addEventListener('mounted', () => { console.log('mounted')
}) myApp.addEventListener('unmount', () => { console.log('unmount')
}) myApp.addEventListener('error', () => { console.log('error')
})`},{header:"全局监听",slug:"全局监听",content:`全局监听会在每个应用的生命周期执行时都会触发。
import microApp from '@micro-zoe/micro-app' microApp.start({ lifeCycles: { created (e) { console.log('created') }, beforemount (e) { console.log('beforemount') }, mounted (e) { console.log('mounted') }, unmount (e) { console.log('unmount') }, error (e) { console.log('error') } }
})`},{header:"全局事件",slug:"全局事件",content:"在子应用的加载过程中，micro-app会向子应用发送一系列事件，包括渲染、卸载等事件。"},{header:"渲染事件",slug:"渲染事件",content:`通过向window注册onmount函数，可以监听子应用的渲染事件。
/** * 应用渲染时执行 * @param data 初始化数据 */
window.onmount = (data) => { console.log('子应用已经渲染', data)
}`},{header:"卸载事件",slug:"卸载事件",content:`通过向window注册onunmount函数，可以监听子应用的卸载事件。
/** * 应用卸载时执行 */
window.onunmount = () => { // 执行卸载相关操作 console.log('子应用已经卸载')
}
还可以通过window.addEventListener监听子应用的卸载事件unmount。
window.addEventListener('unmount', function () { // 执行卸载相关操作 console.log('子应用已经卸载')
})`}]},{path:"/zh/micro-app-devtools.html",title:"📖简介",pathLocale:"/",contents:[{header:"📖简介",slug:"📖简介",content:`Micro-App-DevTools是基于京东零售推出的一款为micro-app框架而开发的chrome插件，旨在方便开发者对微前端进行数据查看以及调试,提升工作效率。
Github 地址为：https://github.com/micro-zoe/micro-app-chrome-plugin，欢迎 Star 一下`},{header:"如何使用",slug:"如何使用",content:"下载插件地址，（提示：无需解压），在chrome中输入chrome://extensions打开扩展程序，将已下载的插件拖入。"},{header:"功能",slug:"功能",content:"打开控制台，选中Micro app"},{header:"1、Environment环境",slug:"_1、environment环境",content:`可查看Micro app的Environment环境如下
'__MICRO_APP_ENVIRONMENT__': '判断应用是否在微前端环境中'
'__MICRO_APP_VERSION__': '微前端版本号'
'__MICRO_APP_NAME__': '应用名称'
'__MICRO_APP_PUBLIC_PATH__': '子应用的静态资源前缀'
'__MICRO_APP_BASE_ROUTE__': '子应用的基础路由'`},{header:"2、Communicate通讯",slug:"_2、communicate通讯",content:`查看父子应用通讯
数据通信面板`},{header:"功能一、获取父应用数据",slug:"功能一、获取父应用数据",content:"点击按钮获取当前被嵌入页面基座应用的JSON格式数据"},{header:"功能二、子应用开发环境模拟",slug:"功能二、子应用开发环境模拟",content:`点击按钮跳转至功能一中子应用开发环境模拟页面，此处模仿内嵌子应用，使用说明如下所示：
在子应用开发环境模拟页面中输入子页面URL等信息 a、子页面URL：此处输入被基座应用嵌入的子应用链接 b、父应用数据：此处输入JSON格式的父应用需要传给子应用的数据 c、子应用嵌入代码：此处显示子应用嵌入的代码 以上即完成微前端的嵌入，效果如下：`},{header:"快捷打开方式一",slug:"快捷打开方式一",content:'点击右上角图标出现目录,选择"打开子应用开发环境模拟"'},{header:"快捷打开方式二",slug:"快捷打开方式二",content:"点击鼠标右键，选择micro-app下，二级菜单点子应用开发环境模拟"},{header:"3、View子应用视图",slug:"_3、view子应用视图",content:"查看子应用相关视图信息"},{header:"查看子应用范围",slug:"查看子应用范围",content:"点击按钮即可获取当前被嵌入页面基座应用的视图"},{header:"快捷打开方式",slug:"快捷打开方式",content:"点击鼠标右键，选择micro-app下，二级菜单点击查看子应用范围"},{header:"4、Route路由",slug:"_4、route路由",content:"查看子应用路由信息"},{header:"功能一、获取子应用路由",slug:"功能一、获取子应用路由",content:"点击查看子应用URL按钮即可获取当前页面下所有子应用的路由地址"},{header:"功能二、复制及打开子应用路由链接",slug:"功能二、复制及打开子应用路由链接",content:"点击复制按钮复制子应用路由，点击打开按钮直接在浏览器打开子应用链接地址"},{header:"🤝 参与共建",slug:"🤝-参与共建",content:`如果您对这个项目感兴趣，欢迎提pull request参与贡献，也欢迎 Star 支持一下 ^_^
欢迎小伙伴们加入Micro-App-DevTools微信群交流^ ^`}]},{path:"/zh/nest.html",title:"多层嵌套",pathLocale:"/",contents:[{header:"多层嵌套",slug:"多层嵌套",content:`micro-app支持多层嵌套，即子应用可以嵌入其它子应用，但为了防止标签名冲突，子应用中需要做一些修改。
在子应用中设置tagName：
microApp.start({ tagName: 'micro-app-xxx', // 标签名称必须以 \`micro-app-\` 开头
})
在子应用中使用新定义的标签进行渲染，如：
<micro-app-xxx name='xx' url='xx'></micro-app-xxx>
注意
无论嵌套多少层，name都要保证全局唯一。`}]},{path:"/zh/plugins.html",title:"插件系统",pathLocale:"/",contents:[{header:"插件系统",slug:"插件系统",content:`微前端的使用场景非常复杂，没有完美的沙箱方案，所以我们提供了一套插件系统，它赋予开发者灵活处理静态资源的能力，对有问题的资源文件进行修改。
插件系统的主要作用就是对js进行修改，每一个js文件都会经过插件系统，我们可以对这些js进行拦截和处理，它通常用于修复js中的错误或向子应用注入一些全局变量。`},{header:"适用场景",slug:"适用场景",content:"通常我们无法控制js的表现，比如在沙箱中，顶层的变量是无法泄漏为全局变量的（如 var xx = , function xxx 定义变量，无法通过window.xx 访问），导致js报错，此时开发者可以通过插件对js进行修改处理。"},{header:"使用方式",slug:"使用方式",content:"import microApp from '@micro-zoe/micro-app' microApp.start({ plugins: { // 全局插件，作用于所有子应用的js文件 global?: Array<{ // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到主应用中，scopeProperties可以禁止这种情况) scopeProperties?: string[], // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上) escapeProperties?: string[], // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建 excludeChecker?: (url: string) => boolean // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染 ignoreChecker?: (url: string) => boolean // 可选，传递给loader的配置项 options?: any, // 必填，js处理函数，必须返回code值 loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => code, // 可选，html 处理函数，必须返回 code 值 processHtml?: (code: string, url: string, options: unknown) => code }> // 子应用插件 modules?: { // appName为应用的名称，这些插件只会作用于指定的应用 [appName: string]: Array<{ // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到主应用中，scopeProperties可以禁止这种情况) scopeProperties?: string[], // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上) escapeProperties?: string[], // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建 excludeChecker?: (url: string) => boolean // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染 ignoreChecker?: (url: string) => boolean // 可选，传递给loader的配置项 options?: any, // 可选，js处理函数，必须返回code值 loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => code, // 可选，html 处理函数，必须返回 code 值 processHtml?: (code: string, url: string, options: unknown) => code }> } }\n})"},{header:"案例",slug:"案例",content:`import microApp from '@micro-zoe/micro-app' microApp.start({ plugins: { global: [ { scopeProperties: ['key', 'key', ...], // 可选 escapeProperties: ['key', 'key', ...], // 可选 excludeChecker: (url) => ['/foo.js', '/bar.css'].some(item => url.includes(item)), // 可选 options: 配置项, // 可选 loader(code, url, options, info) { // 可选 console.log('全局插件') return code }, processHtml(code, url, options, info) { // 可选 console.log('每个子应用 HTML 都会传入') return code }, } ], modules: { 'appName1': [{ loader(code, url, options, info) { if (url === 'xxx.js') { code = code.replace('var abc =', 'window.abc =') } return code } }], 'appName2': [{ scopeProperties: ['key', 'key', ...], // 可选 escapeProperties: ['key', 'key', ...], // 可选 ignoreChecker: (url) => ['/foo.js', '/bar.css'].some(item => url.includes(item)), // 可选 options: 配置项, // 可选 loader(code, url, options, info) { // 可选 console.log('只适用于appName2的插件') return code }, processHtml(code, url, options, info) { // 可选 console.log('只适用于 appName2 的 HTML 处理') return code }, }] } }
})`},{header:"1、地图插件",slug:"_1、地图插件",content:"微前端 Micro-app 地图插件，适配高德、百度、腾讯地图 🎉🎉🎉"},{header:"使用",slug:"使用",content:`Installation安装地图插件 # with npm npm install @micro-zoe/micro-plugin-map --save-dev # with yarn yarn add @micro-zoe/micro-plugin-map --dev
Usage
we use the package like this step:
1、主用，在入口处安装对应地图的sdk 高德sdk https://webapi.amap.com/maps?v=2.0&key=xxxxxx
腾讯sdk https://map.qq.com/api/gljs?v=1.exp&key=xxxxxx
百度sdk https://api.map.baidu.com/api?type=webgl&v=1.0&ak=xxxxxx 2、在主应用中，使用该包 import microApp from '@micro-zoe/micro-app' import microPluginMap from '@micro-zoe/micro-plugin-map' // 设置为全局插件，作用于所有子应用 microApp.start({ plugins: { global: [microPluginMap], } }) // 或者设置为某个子应用的插件，只作用于当前子应用 microApp.start({ plugins: { modules: { 'appName': [microPluginMap], } } })`},{header:"注意",slug:"注意",content:"目前插件目前仅在with沙箱下适用 插件以umd同步的方式引入sdk，异步加载的方式暂不支持 高德地图的不存在跨域问题，可以不用进行任何操作，高德地图若设置了使用白名单，需将白名单范围囊括主应用域名 腾讯地图，使用时候只是常规的跨越，用此插件进行常规使用即可，腾讯地图若设置了使用白名单，需将白名单范围囊括主应用域名 百度地图，使用时有跨域问题，可用此插件进行处理，百度地图若设置了使用白名单，需将白名单范围囊括主应用域名"},{header:"源码",slug:"源码",content:"micro-plugin-map 源码地址：https://github.com/micro-zoe/micro-plugin-map"}]},{path:"/zh/prefetch.html",title:"预加载",pathLocale:"/",contents:[{header:"预加载",slug:"预加载",content:`预加载是指在子应用尚未渲染时提前加载静态资源，从而提升子应用的首次渲染速度。
为了不影响主应用的性能，预加载会在浏览器空闲时间执行。`},{header:"语法",slug:"语法",content:"microApp.preFetch(apps: app[] | () => app[], delay?: number)"},{header:"参数",slug:"参数",content:`apps
第一个参数为一个数组或一个返回数组的函数，数组传入的配置如下：
app: { name: string, // 应用名称，必传 url: string, // 应用地址，必传 iframe: boolean, // 是否使用iframe沙箱，vite应用必传，其它应用可选 inline: boolean, // 是否使用内联模式运行js，可选 'disable-scopecss': boolean, // 是否关闭样式隔离，可选 'disable-sandbox': boolean, // 是否关闭沙盒，可选 level: number, // 预加载等级，可选（分为三个等级：1、2、3，1表示只加载资源，2表示加载并解析，3表示加载解析并渲染，默认为2） 'default-page': string, // 指定默认渲染的页面，level为3时才会生效，可选 'disable-patch-request': boolean, // 关闭子应用请求的自动补全功能，level为3时才会生效，可选
}
delay 可选
第二个参数为延迟执行的时间，以毫秒为单位，默认值：3000。
在预加载中，我们会使用requestIdleCallback包裹每个预加载的操作，以减小对主应用的影响，但这不是完美无缺的，所以我们增加了一个延迟，在延迟时间结束后才开始预加载操作，进一步降低对主应用影响的可能性。
如果主应用仍然受到了影响，可以增加延迟时间。
修改delay的默认值：
我们可以在start方法中修改delay的默认值：
import microApp from '@micro-zoe/micro-app' microApp.start({ prefetchDelay: 5000, // 修改delay默认值为5000ms
})`},{header:"进阶",slug:"进阶",content:`预加载JS资源分为三个步骤，对应上述参数 - level： 1、加载静态资源
2、将载静态资源解析成可执行代码
3、执行代码并在后台渲染 level分为1、2、3三个层级，默认值为2，表示加载静态资源并解析。
level值越高，则预加载的程度越深，子应用首次渲染速度越快，但占用的内存也更高，反之亦然，用户可以根据项目实际情况进行选择。
我们可以在start方法中修改level的默认值：
import microApp from '@micro-zoe/micro-app' microApp.start({ prefetchLevel: 1, // 修改level默认值为1
})
提示
level或prefetchLevel为3时，预加载子应用的虚拟路由系统无法关闭。`},{header:"使用方式",slug:"使用方式",content:`import microApp from '@micro-zoe/micro-app' // 方式一：设置数组
microApp.preFetch([ { name: 'my-app1', url: 'xxx' }, // 加载资源并解析 { name: 'my-app2', url: 'xxx', level: 1 }, // 只加载资源 { name: 'my-app3', url: 'xxx', level: 3 }, // 加载资源、解析并渲染 { name: 'my-app4', url: 'xxx', level: 3, 'default-page': '/page2' }, // 加载资源、解析并渲染子应用的page2页面
]) // 方式二：设置一个返回数组的函数
microApp.preFetch(() => [ { name: 'my-app1', url: 'xxx' }, // 加载资源并解析 { name: 'my-app2', url: 'xxx', level: 1 }, // 只加载资源 { name: 'my-app3', url: 'xxx', level: 3 }, // 加载资源、解析并渲染 { name: 'my-app4', url: 'xxx', level: 3, 'default-page': '/page2' }, // 加载资源、解析并渲染子应用的page2页面
]) // 方式三：在start中设置预加载数组
microApp.start({ preFetchApps: [ { name: 'my-app1', url: 'xxx' }, // 加载资源并解析 { name: 'my-app2', url: 'xxx', level: 1 }, // 只加载资源 { name: 'my-app3', url: 'xxx', level: 3 }, // 加载资源、解析并渲染 { name: 'my-app4', url: 'xxx', level: 3, 'default-page': '/page2' }, // 加载资源、解析并渲染子应用的page2页面 ],
}) // 方式四：在start中设置一个返回预加载数组的函数
microApp.start({ preFetchApps: () => [ { name: 'my-app1', url: 'xxx' }, // 加载资源并解析 { name: 'my-app2', url: 'xxx', level: 1 }, // 只加载资源 { name: 'my-app3', url: 'xxx', level: 3 }, // 加载资源、解析并渲染 { name: 'my-app4', url: 'xxx', level: 3, 'default-page': '/page2' }, // 加载资源、解析并渲染子应用的page2页面 ],
}) // 设置延迟时间，5秒钟之后执行预加载
microApp.preFetch([ { name: 'my-app1', url: 'xxx' }, // 加载资源并解析
], 5000)`},{header:"vite应用",slug:"vite应用",content:`当子应用是vite时，除了name和url外，还要设置第三个参数iframe为true，开启iframe沙箱。
例如：
// 预加载vite子应用
microApp.preFetch([ { name: 'my-vite-app', url: 'xxx', iframe: true },
])`},{header:"补充",slug:"补充",content:`正常情况下，预加载只需要设置name和url，其它参数不需要设置。
但我们还是建议预加载的配置和<micro-app>元素上的配置保持一致。
例如：<micro-app>元素设置了disable-scopecss关闭样式隔离，那么预加载也最好保持一致
<micro-app name='my-app' url='xxx' disable-scopecss></micro-app>
microApp.preFetch([ { name: 'my-app', url: 'xxx', 'disable-scopecss': true },
])`}]},{path:"/zh/questions.html",title:"",pathLocale:"/",contents:[{header:"1、我需要用到微前端吗？",slug:"_1、我需要用到微前端吗",content:`在此之前建议你先阅读Why Not Iframe。
相比于iframe，微前端拥有更好的用户体验，同时它也要求开发者对于前端框架和路由原理具有一定的理解。
微前端的本质是将两个不相关的页面强行合并为一，这其中不可避免会出现各种冲突，虽然微前端框架解决了几乎所有的冲突，但偶尔也会有特殊情况出现，这需要开发者具有处理特殊情况的能力和心态。
微前端不是万能的，它的实现原理注定无法像iframe一样简单稳定。
如果你不知道自己是否需要用微前端，那么大概率是不需要。`},{header:"2、子应用一定要支持跨域吗？",slug:"_2、子应用一定要支持跨域吗",content:`是的！
如果是开发环境，可以在webpack-dev-server中设置headers支持跨域。
devServer: { headers: { 'Access-Control-Allow-Origin': '*', },
},
如果是线上环境，可以通过配置nginx支持跨域。`},{header:"3、兼容性如何",slug:"_3、兼容性如何",content:`micro-app依赖于CustomElements和Proxy两个较新的API。
对于不支持CustomElements的浏览器，可以通过引入polyfill进行兼容，详情可参考：webcomponents/polyfills。
但是Proxy暂时没有做兼容，所以对于不支持Proxy的浏览器无法运行micro-app。
浏览器兼容性可以查看：Can I Use
总体如下： PC端：除了IE浏览器，其它浏览器基本兼容。
移动端：ios10+、android5+`},{header:"4、micro-app 报错 an app named xx already exists",slug:"_4、micro-app-报错-an-app-named-xx-already-exists",content:"这是name名称冲突导致的，请确保每个子应用的name值是唯一的。"},{header:"5、主应用的样式影响到子应用",slug:"_5、主应用的样式影响到子应用",content:`虽然我们将子应用的样式进行隔离，但主应用的样式依然会影响到子应用，如果发生冲突，推荐通过约定前缀或CSS Modules方式解决。
如果你使用的是ant-design等组件库，一般会提供添加前缀进行样式隔离的功能。`},{header:"6、子应用在沙箱环境中如何获取到外部真实window？",slug:"_6、子应用在沙箱环境中如何获取到外部真实window",content:`目前有3种方式在子应用中获取外部真实window 1、new Function("return window")() 或 Function("return window")()
2、(0, eval)('window')
3、window.rawWindow`},{header:"7、错误信息：xxx undefined",slug:"_7、错误信息-xxx-undefined",content:`包括： xxx is not defined
xxx is not a function
Cannot read properties of undefined 原因：
在微前端的沙箱环境中，顶层变量不会泄漏为全局变量。
例如在正常情况下，通过 var name 或 function name () {} 定义的顶层变量会泄漏为全局变量，通过window.name或name就可以全局访问。
但是在沙箱环境下这些顶层变量无法泄漏为全局变量，window.name或name为undefined，导致出现问题。
解决方式：
方式一：手动修改
将 var name 或 function name () {} 修改为 window.name = xx
方式二：通过插件系统修改子应用代码
比如常见的加载webpack打包的dll文件失败的问题，因为dll文件的内容和js地址相对固定，可以直接进行全局查找和修改。
microApp.start({ plugins: { modules: { 应用名称: [{ loader(code, url) { if (url === 'xxx.js') { code = code.replace('var xx_dll=', 'window.xx_dll=') } return code } }] } }
})`},{header:"8、jsonp请求如何处理？",slug:"_8、jsonp请求如何处理",content:"参考ignore"},{header:"9、子应用通过a标签下载文件失败",slug:"_9、子应用通过a标签下载文件失败",content:`原因： 当跨域时(主应用和文件在不同域名下)，无法通过a标签的download属性实现下载。
解决方式：
方式1： 转换为blob形式下载
<a href='xxx.png' download="filename.png" @click='downloadFile'>下载</a>
// 通过blob下载文件
function downloadFile (e) { // 微前端环境下转换为blob下载，子应用单独运行时依然使用a标签下载 if (window.__MICRO_APP_ENVIRONMENT__) { e.preventDefault() // 注意href必须是绝对地址 fetch(e.target.href).then((res) => { res.blob().then((blob) => { const blobUrl = window.URL.createObjectURL(blob) // 转化为blobURL后再通过a标签下载 const a = document.createElement('a') a.href = blobUrl a.download = 'filename.png' a.click() window.URL.revokeObjectURL(blobUrl) }) }) }
}
方式2： 将文件放到主应用域名下，判断微前端环境下a标签href属性设置为主应用的文件地址`},{header:"10、iconfont 图标冲突了如何处理？",slug:"_10、iconfont-图标冲突了如何处理",content:`产生原因
解决方案 主应用和子应用 unicode 使用同一编码导致图标冲突
选择冲突图标，在iconfont中修改对应的unicode编码并重新生成文件进行替换 主应用和子应用 class/fontFamily 冲突
修改冲突应用下使用iconfont的的相关类名和对应的font-face下fontFamily 主应用和子应用 class/fontFamily 冲突 解决示例
@font-face {
- font-family: "iconfont";
+ font-family: "iconfont1"; src: url('iconfont.woff2?t=1704871404008') format('woff2'), url('iconfont.woff?t=1704871404008') format('woff'), url('iconfont.ttf?t=1704871404008') format('truetype');
} -.iconfont {
+.iconfont1 { font-family: "iconfont" !important; font-size: 16px; font-style: normal; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
} .right:before { content: "\\e7eb";
}
- <i className="iconfont right"></i>
+ <i className="iconfont1 right"></i>`}]},{path:"/zh/router.html",title:"虚拟路由系统",pathLocale:"/",contents:[{header:"虚拟路由系统",slug:"虚拟路由系统",content:`MicroApp通过拦截浏览器路由事件以及自定义的location、history，实现了一套虚拟路由系统，子应用运行在这套虚拟路由系统中，和主应用的路由进行隔离，避免相互影响。
虚拟路由系统还提供了丰富的功能，帮助用户提升开发效率和使用体验。`},{header:"路由模式",slug:"路由模式",content:`虚拟路由系统分为四种模式：search、native、native-scope、pure search是默认模式，通常不需要特意设置，search模式下子应用的路由信息会作为query参数同步到浏览器地址上，如下： 使用方式：
设置单个子应用：
<micro-app name='xx' url='xx' router-mode='search'></micro-app>
全局设置：
import microApp from '@micro-zoe/micro-app' microApp.start({ 'router-mode': 'search',
}) native模式下子应用完全基于浏览器路由系统进行渲染，比search模式拥有更加简洁优雅的的浏览器地址，但相应的需要更加复杂的路由配置，详情参考browser-router
使用方式：
设置单个子应用：
<micro-app name='xx' url='xx' router-mode='native'></micro-app>
全局设置：
import microApp from '@micro-zoe/micro-app' microApp.start({ 'router-mode': 'native',
}) native-scope模式的功能和用法和native模式一样，唯一不同点在于native-scope模式下子应用的域名指向自身而非主应用。
使用方式：
设置单个子应用：
<micro-app name='xx' url='xx' router-mode='native-scope'></micro-app>
全局设置：
import microApp from '@micro-zoe/micro-app' microApp.start({ 'router-mode': 'native-scope',
}) pure模式下子应用独立于浏览器进行渲染，即不会修改浏览器地址，也不会受其影响，其表现和iframe类似。
使用方式：
设置单个子应用：
<micro-app name='xx' url='xx' router-mode='pure'></micro-app>
全局设置：
import microApp from '@micro-zoe/micro-app' microApp.start({ 'router-mode': 'pure',
})`},{header:"配置项",slug:"配置项",content:""},{header:"1、关闭虚拟路由系统",slug:"_1、关闭虚拟路由系统",content:`实际上虚拟路由系统是无法关闭的，这里的配置只是为了向下兼容旧版本，它的表现和native路由模式一致。
使用方式：
1、设置单个子应用
<micro-app name='xx' url='xx' disable-memory-router></micro-app>
2、全局设置
import microApp from '@micro-zoe/micro-app' // 在start中增加配置
microApp.start({ 'disable-memory-router': true, // 关闭虚拟路由
})`},{header:"2、保留路由状态",slug:"_2、保留路由状态",content:`默认情况下，子应用卸载后重新渲染，将和首次加载一样渲染子应用的首页。
设置keep-router-state可以保留子应用路由状态，在卸载后重新渲染时将恢复卸载前的页面（页面中的状态不保留）。
使用方式：
1、保留某个子应用的路由状态
<micro-app name='xx' url='xx' keep-router-state></micro-app>
2、保留所有子应用的路由状态
import microApp from '@micro-zoe/micro-app' // 在start中增加配置
microApp.start({ 'keep-router-state': true, // 保留路由状态
})
注意： 如果关闭了虚拟路由系统，keep-router-state也将失效。
当设置了default-page时keep-router-state将失效，因为它的优先级小于default-page`},{header:"导航",slug:"导航",content:`通过虚拟路由系统，我们可以方便的进行跨应用的跳转，如： 主应用控制子应用跳转
子应用控制主应用跳转
子应用控制其它子应用跳转 由于nextjs的路由系统非常特殊，当子应用是nextjs时无法直接控制跳转，参考通过数据通信控制跳转`},{header:"router.push",slug:"router-push",content:`介绍： 控制子应用跳转，并向路由堆栈添加一条新的记录
/** * @param {string} name 必填，子应用的name * @param {string} path 必填，子应用除域名外的全量地址(也可以带上域名) * @param {boolean} replace 可选，是否使用replace模式，不新增堆栈记录，默认为false */
router.push({ name: '子应用名称', path: '页面地址', replace: 是否使用replace模式 })
示例：
import microApp from '@micro-zoe/micro-app' // 不带域名的地址，控制子应用my-app跳转/page1
microApp.router.push({name: 'my-app', path: '/page1'}) // 带域名的地址，控制子应用my-app跳转/page1
microApp.router.push({name: 'my-app', path: 'http://localhost:3000/page1'}) // 带查询参数，控制子应用my-app跳转/page1?id=9527
microApp.router.push({name: 'my-app', path: '/page1?id=9527'}) // 带hash，控制子应用my-app跳转/page1#hash
microApp.router.push({name: 'my-app', path: '/page1#hash'}) // 使用replace模式，等同于 router.replace({name: 'my-app', path: '/page1'})
microApp.router.push({name: 'my-app', path: '/page1', replace: true })`},{header:"router.replace",slug:"router-replace",content:`介绍： 控制子应用跳转，但不会向路由堆栈添加新的记录，而是替换最新的堆栈记录。
/** * @param {string} name 必填，子应用的name * @param {string} path 必填，子应用除域名外的全量地址(也可以带上域名) * @param {boolean} replace 可选，是否使用replace模式，默认为true */
router.replace({ name: '子应用名称', path: '页面地址', replace: 是否使用replace模式 })
示例：
import microApp from '@micro-zoe/micro-app' // 不带域名的地址
microApp.router.replace({name: 'my-app', path: '/page1'}) // 带域名的地址
microApp.router.replace({name: 'my-app', path: 'http://localhost:3000/page1'}) // 带查询参数
microApp.router.replace({name: 'my-app', path: '/page1?id=9527'}) // 带hash
microApp.router.replace({name: 'my-app', path: '/page1#hash'}) // 关闭replace模式，等同于 router.push({name: 'my-app', path: '/page1'})
microApp.router.replace({name: 'my-app', path: '/page1', replace: false })`},{header:"router.go",slug:"router-go",content:`介绍： 它的功能和window.history.go(n)一致，表示在历史堆栈中前进或后退多少步。
/** * @param {number} n 前进或后退多少步 */
router.go(n)
示例：
import microApp from '@micro-zoe/micro-app' // 返回一条记录
microApp.router.go(-1) // 前进 3 条记录
microApp.router.go(3)`},{header:"router.back",slug:"router-back",content:`介绍： 它的功能和window.history.back()一致，表示在历史堆栈中后退一步。
router.back()
示例：
import microApp from '@micro-zoe/micro-app' // 返回一条记录
microApp.router.back()`},{header:"router.forward",slug:"router-forward",content:`介绍： 它的功能和window.history.forward()一致，表示在历史堆栈中前进一步。
router.forward()
示例：
import microApp from '@micro-zoe/micro-app' // 前进一条记录
microApp.router.forward() 子应用的路由API和主应用保持一致，不同点是microApp挂载在window上。`},{header:"子应用控制主应用跳转",slug:"子应用控制主应用跳转",content:`默认情况下，子应用无法直接控制主应用的跳转，为此我们提供了一个API，将主应用的路由对象传递给子应用。
主应用
import microApp from '@micro-zoe/micro-app' // 注册主应用路由
microApp.router.setBaseAppRouter(主应用的路由对象)
子应用
// 获取主应用路由
const baseRouter = window.microApp.router.getBaseAppRouter() // 控制主应用跳转
baseRouter.主应用路由的方法(...)`},{header:"控制其他子应用跳转",slug:"控制其他子应用跳转",content:""},{header:"router.push",slug:"router-push-1",content:`介绍： 控制其它子应用跳转，并向路由堆栈添加一条新的记录
/** * @param {string} name 必填，子应用的name * @param {string} path 必填，子应用除域名外的全量地址(也可以带上域名) * @param {boolean} replace 可选，是否使用replace模式，不新增堆栈记录，默认为false */
router.push({ name: '子应用名称', path: '页面地址', replace: 是否使用replace模式 })
示例：
// 不带域名的地址，控制子应用my-app跳转/page1
window.microApp.router.push({name: 'my-app', path: '/page1'}) // 带域名的地址，控制子应用my-app跳转/page1
window.microApp.router.push({name: 'my-app', path: 'http://localhost:3000/page1'}) // 带查询参数，控制子应用my-app跳转/page1?id=9527
window.microApp.router.push({name: 'my-app', path: '/page1?id=9527'}) // 带hash，控制子应用my-app跳转/page1#hash
window.microApp.router.push({name: 'my-app', path: '/page1#hash'}) // 使用replace模式，等同于 router.replace({name: 'my-app', path: '/page1'})
window.microApp.router.push({name: 'my-app', path: '/page1', replace: true })`},{header:"router.replace",slug:"router-replace-1",content:`介绍： 控制其它子应用跳转，但不会向路由堆栈添加新的记录，而是替换最新的堆栈记录。
/** * @param {string} name 必填，子应用的name * @param {string} path 必填，子应用除域名外的全量地址(也可以带上域名) * @param {boolean} replace 可选，是否使用replace模式，默认为true */
router.replace({ name: '子应用名称', path: '页面地址', replace: 是否使用replace模式 })
示例：
// 不带域名的地址
window.microApp.router.replace({name: 'my-app', path: '/page1'}) // 带域名的地址
window.microApp.router.replace({name: 'my-app', path: 'http://localhost:3000/page1'}) // 带查询参数
window.microApp.router.replace({name: 'my-app', path: '/page1?id=9527'}) // 带hash
window.microApp.router.replace({name: 'my-app', path: '/page1#hash'}) // 关闭replace模式，等同于 router.push({name: 'my-app', path: '/page1'})
window.microApp.router.replace({name: 'my-app', path: '/page1', replace: false })`},{header:"router.go",slug:"router-go-1",content:`介绍： 它的功能和window.history.go(n)一致，表示在历史堆栈中前进或后退多少步。
/** * @param {number} n 前进或后退多少步 */
router.go(n)
示例：
// 返回一条记录
window.microApp.router.go(-1) // 前进 3 条记录
window.microApp.router.go(3)`},{header:"router.back",slug:"router-back-1",content:`介绍： 它的功能和window.history.back()一致，表示在历史堆栈中后退一步。
router.back()
示例：
// 返回一条记录
window.microApp.router.back()`},{header:"router.forward",slug:"router-forward-1",content:`介绍： 它的功能和window.history.forward()一致，表示在历史堆栈中前进一步。
router.forward()
示例：
// 前进一条记录
window.microApp.router.forward()`},{header:"设置默认页面",slug:"设置默认页面",content:`子应用加载后会默认渲染首页，但我们常常希望子应用加载后渲染指定的页面，此时可以设置defaultPage指定子应用渲染的页面。
方式一：设置default-page属性
<micro-app default-page='页面地址'></micro-app>
示例：
<!-- 不带域名的地址 -->
<micro-app name='my-app' url='http://localhost:3000/' default-page='/page1'></micro-app> <!-- 带域名的地址 -->
<micro-app name='my-app' url='http://localhost:3000/' default-page='http://localhost:3000/page1'></micro-app> <!-- 带查询参数 -->
<micro-app name='my-app' url='http://localhost:3000/' default-page='/page1?id=9527'></micro-app> <!-- 带hash -->
<micro-app name='my-app' url='http://localhost:3000/' default-page='/page1#hash'></micro-app>
方式二：通过router API设置
/** * 设置子应用默认页面 * @param {string} name 必填，子应用的name * @param {string} path 必填，页面地址 */
router.setDefaultPage({ name: '子应用名称', path: '页面地址' }) /** * 删除子应用默认页面 * @param {string} name 必填，子应用的name */
router.removeDefaultPage(name: '子应用名称') /** * 获取子应用默认页面 * @param {string} name 必填，子应用的name */
router.getDefaultPage(name: '子应用名称')
示例：
import microApp from '@micro-zoe/micro-app' // 不带域名的地址
microApp.router.setDefaultPage({name: 'my-app', path: '/page1'}) // 带域名的地址
microApp.router.setDefaultPage({name: 'my-app', path: 'http://localhost:3000/page1'}) // 带查询参数
microApp.router.setDefaultPage({name: 'my-app', path: '/page1?id=9527'}) // 带hash
microApp.router.setDefaultPage({name: 'my-app', path: '/page1#hash'}) // 删除子应用my-app的默认页面
router.removeDefaultPage('my-app') // 获取子应用my-app的默认页面
const defaultPage = router.getDefaultPage('my-app')`},{header:"导航守卫",slug:"导航守卫",content:"导航守卫用于监听子应用的路由变化，类似于vue-router的全局守卫，不同点是MicroApp的导航守卫无法取消跳转。"},{header:"全局前置守卫",slug:"全局前置守卫",content:`介绍： 监听所有或某个子应用的路由变化，在子应用页面渲染前执行。
使用范围： 主应用
/** * @param {object} to 即将要进入的路由 * @param {object} from 正要离开的路由 * @param {string} name 子应用的name * @return cancel function 解绑路由监听函数 */
router.beforeEach((to, from, name) => {} | { name: (to, from) => {} })
示例：
import microApp from '@micro-zoe/micro-app' // 监听所有子应用的路由变化
microApp.router.beforeEach((to, from, appName) => { console.log('全局前置守卫 beforeEach: ', to, from, appName)
}) // 监听某个子应用的路由变化
microApp.router.beforeEach({ 子应用1name (to, from) { console.log('指定子应用的前置守卫 beforeEach ', to, from) }, 子应用2name (to, from) { console.log('指定子应用的前置守卫 beforeEach ', to, from) }
}) // beforeEach会返回一个解绑函数
const cancelCallback = microApp.router.beforeEach((to, from, appName) => { console.log('全局前置守卫 beforeEach: ', to, from, appName)
}) // 解绑路由监听
cancelCallback()`},{header:"全局后置守卫",slug:"全局后置守卫",content:`介绍： 监听所有或某个子应用的路由变化，在子应用页面渲染后执行。
使用范围： 主应用
/** * @param {object} to 已经进入的路由 * @param {object} from 已经离开的路由 * @param {string} name 子应用的name * @return cancel function 解绑路由监听函数 */
router.afterEach((to, from, name) => {} | { name: (to, from) => {} })
示例：
import microApp from '@micro-zoe/micro-app' // 监听所有子应用的路由变化
microApp.router.afterEach((to, from, appName) => { console.log('全局后置守卫 afterEach: ', to, from, appName)
}) // 监听某个子应用的路由变化
microApp.router.afterEach({ 子应用1name (to, from) { console.log('指定子应用的后置守卫 afterEach ', to, from) }, 子应用2name (to, from) { console.log('指定子应用的后置守卫 beforeEach ', to, from) }
}) // afterEach会返回一个解绑函数
const cancelCallback = microApp.router.afterEach((to, from, appName) => { console.log('全局后置守卫 afterEach: ', to, from, appName)
}) // 解绑路由监听
cancelCallback()`},{header:"获取路由信息",slug:"获取路由信息",content:`介绍： 获取子应用的路由信息，返回值与子应用的location相同
/** * @param {string} name 必填，子应用的name */
router.current.get(name)
示例： import microApp from '@micro-zoe/micro-app' // 获取子应用my-app的路由信息，返回值与子应用的location相同
const routeInfo = microApp.router.current.get('my-app') // 获取子应用my-app的路由信息，返回值与子应用的location相同
const routeInfo = window.microApp.router.current.get('my-app')`},{header:"编解码",slug:"编解码",content:`介绍： 子应用同步到浏览器的路由信息是经过特殊编码的(encodeURIComponent + 特殊字符转译)，如果用户想要编码或解码子应用的路由信息，可以使用编解码的API。 /** * 编码 * @param {string} path 必填，页面地址 */
router.encode(path: string) /** * 解码 * @param {string} path 必填，页面地址 */
router.decode(path: string)
示例： import microApp from '@micro-zoe/micro-app' // 返回 %2Fpage1%2F
const encodeResult = microApp.router.encode('/page1/') // 返回 /page1/
const encodeResult = microApp.router.decode('%2Fpage1%2F') // 返回 %2Fpage1%2F
const encodeResult = window.microApp.router.encode('/page1/') // 返回 /page1/
const encodeResult = window.microApp.router.decode('%2Fpage1%2F')`},{header:"同步路由信息",slug:"同步路由信息",content:`在一些特殊情况下，主应用的跳转会导致浏览器地址上子应用信息丢失，此时可以主动调用方法，将子应用的路由信息同步到浏览器地址上。
介绍： 主动将子应用的路由信息同步到浏览器地址上
使用范围： 主应用
/** * 将指定子应用的路由信息同步到浏览器地址上 * 如果应用未渲染或已经卸载，则方法无效 * @param {string} name 子应用的名称 */
router.attachToURL(name: string) /** * 将所有正在运行的子应用路由信息同步到浏览器地址上 * 它接受一个对象作为参数，详情如下： * @param {boolean} includeHiddenApp 是否包含已经隐藏的keep-alive应用，默认为false * @param {boolean} includePreRender 是否包含预渲染应用，默认为false */
router.attachAllToURL({ includeHiddenApp?: boolean, includePreRender?: boolean,
})
示例：
import microApp from '@micro-zoe/micro-app' // 将my-app的路由信息同步到浏览器地址上
microApp.router.attachToURL('my-app') // 将所有正在运行的子应用路由信息同步到浏览器地址上，不包含处于隐藏状态的keep-alive应用和预渲染应用
microApp.router.attachAllToURL() // 将所有正在运行的子应用路由信息同步到浏览器地址上，包含处于隐藏状态的keep-alive应用
microApp.router.attachAllToURL({ includeHiddenApp: true }) // 将所有正在运行的子应用路由信息同步到浏览器地址上，包含预渲染应用
microApp.router.attachAllToURL({ includePreRender: true })`}]},{path:"/zh/sandbox.html",title:"JS沙箱",pathLocale:"/",contents:[{header:"JS沙箱",slug:"js沙箱",content:""},{header:"沙箱介绍",slug:"沙箱介绍",content:`我们使用Proxy拦截了用户全局操作的行为，防止对window的访问和修改，避免全局变量污染。micro-app中的每个子应用都运行在沙箱环境，以获取相对纯净的运行空间。
沙箱是默认开启的，正常情况下不建议关闭，以避免出现不可预知的问题。
如何关闭沙箱请查看：disableSandbox`},{header:"注意事项",slug:"注意事项",content:""},{header:"1、子应用在沙箱环境中如何获取到真实window",slug:"_1、子应用在沙箱环境中如何获取到真实window",content:`目前有3种方式在子应用中获取外部真实window 1、new Function("return window")() 或 Function("return window")()
2、(0, eval)('window')
3、window.rawWindow`},{header:"2、子应用抛出错误信息：xxx 未定义",slug:"_2、子应用抛出错误信息-xxx-未定义",content:`包括： xxx is not defined
xxx is not a function
Cannot read properties of undefined 原因：
在沙箱环境中，顶层变量不会泄漏为全局变量。
例如在正常情况下，通过 var name 或 function name () {} 定义的顶层变量会泄漏为全局变量，通过window.name或name就可以全局访问。
但是在沙箱环境下这些顶层变量无法泄漏为全局变量，window.name或name的值为undefined，导致出现问题。
解决方式：
方式一：手动修改
将 var name 或 function name () {} 修改为 window.name = xx
方式二：通过插件系统修改子应用代码
比如常见的加载webpack打包的dll文件失败的问题，因为dll文件的内容和js地址相对固定，可以直接进行全局查找和修改。
microApp.start({ plugins: { modules: { 应用名称: [{ loader(code, url) { if (url === 'xxx.js') { code = code.replace('var xx_dll=', 'window.xx_dll=') } return code } }] } }
})`},{header:"3、基座如何对子应用 document 的一些属性进行自定义代理扩展",slug:"_3、基座如何对子应用-document-的一些属性进行自定义代理扩展",content:`场景：
微前端模式下，通常由基座负责设置站点标题，不希望受到子应用的干扰。
但是因为 microApp 对 documet 的代理处理过程，并没有处理 document.title，所以子应用中可能通过 document.title = 'xxx' 意外改变了基座的站点标题。
解决方式：
通过 customProxyDocumentProps 对 document 的属性进行自定义代理扩展
通过给title设置一个空函数，来忽略 document.title 执行
microApp.start({ customProxyDocumentProperties: new Map([ ['title', (value) => {}] ]),
})`}]},{path:"/zh/scopecss.html",title:"样式隔离",pathLocale:"/",contents:[{header:"样式隔离",slug:"样式隔离",content:""},{header:"一、样式隔离",slug:"一、样式隔离",content:`MicroApp的样式隔离是默认开启的，开启后会以<micro-app>标签作为样式作用域，利用标签的name属性为每个样式添加前缀，将子应用的样式影响禁锢在当前标签区域。
.test { color: red;
} /* 转换为 */
micro-app[name=xxx] .test { color: red;
}
但主应用的样式依然会对子应用产生影响，如果发生样式污染，推荐通过约定前缀或CSS Modules方式解决。`},{header:"二、禁用样式隔离",slug:"二、禁用样式隔离",content:"禁用样式隔离分四个层次："},{header:"1、在所有应用中禁用",slug:"_1、在所有应用中禁用",content:`这主要通过start方法进行全局配置，设置后所有应用的样式隔离都会停止。
import microApp from '@micro-zoe/micro-app' microApp.start({ disableScopecss: true, // 默认值false
})
如果希望在某个应用中不受全局配置控制，可以设置disableScopecss='false'
<micro-app name='xx' url='xx' disableScopecss='false'></micro-app>`},{header:"2、在某一个应用中禁用",slug:"_2、在某一个应用中禁用",content:`设置后，当前应用的所有css都不会进行样式隔离。
<micro-app name='xx' url='xx' disableScopecss 或 disable-scopecss></micro-app>`},{header:"3、在某一个文件中禁用",slug:"_3、在某一个文件中禁用",content:`可以在你的css文件中使用以下格式的注释来禁用样式隔离：
/*! scopecss-disable */
.test1 { color: red;
}
/*! scopecss-enable */
你也可以对指定的选择器禁用样式隔离:
/*! scopecss-disable .test1, .test2 */
.test1 { color: red;
}
.test2 { color: yellow;
}
.test3 { color: green;
}
/*! scopecss-enable */
如果想在整个文件范围内禁用样式隔离，将 /*! scopecss-disable */ 注释放在文件顶部：
/*! scopecss-disable */
...`},{header:"4、在某一行中禁用",slug:"_4、在某一行中禁用",content:`在文件中使用以下格式的注释在某一特定的行上禁用样式隔离：
/*! scopecss-disable-next-line */
.test1 { color: red;
} .test2 { /*! scopecss-disable-next-line */ background: url(/test.png);
}
Note
上述注释规则都以叹号开头(d/*! */)，这是因为在build时大部分项目会将css中的注释删除以压缩体积，叹号开头是cssnano的一种规则，可以防止在build时注释被删除discardcomments。
我们以cssnano为例，是因为它是PostCSS中使用最广泛的压缩插件，如果你使用了另外的压缩工具，请根据实际情况调整，防止build后的注释被删除。`},{header:"三、shadowDOM",slug:"三、shadowdom",content:`shadowDOM具有更好的隔离性，但一些框架(如React)对shadowDOM的兼容性不好，请谨慎使用。
开启shadowDOM后，默认的样式隔离将失效。
开启方式：shadowDOM`}]},{path:"/zh/start.html",title:"快速开始",pathLocale:"/",contents:[{header:"快速开始",slug:"快速开始",content:"我们分别列出主应用和子应用需要进行的修改，具体介绍micro-app的使用方式。"},{header:"主应用",slug:"主应用",content:`1、安装依赖
npm i @micro-zoe/micro-app --save
2、初始化micro-app
// index.js
import microApp from '@micro-zoe/micro-app' microApp.start()
3、嵌入子应用 export function MyPage () { return ( <div> <h1>子应用👇</h1> // name：应用名称, url：应用地址 <micro-app name='my-app' url='http://localhost:3000/'></micro-app> </div> )
} <template> <div> <h1>子应用👇</h1> <!-- name：应用名称, url：应用地址 --> <micro-app name='my-app' url='http://localhost:3000/'></micro-app> </div>
</template>`},{header:"子应用",slug:"子应用",content:`1、在webpack-dev-server的headers中设置跨域支持。
devServer: { headers: { 'Access-Control-Allow-Origin': '*', }
},
完成以上步骤即完成微前端的接入。
Note name：必传参数，必须以字母开头，且不可以带特殊符号(中划线、下划线除外)
url：必传参数，必须指向子应用的index.html，如：http://localhost:3000/ 或 http://localhost:3000/index.html
子应用必须支持跨域，跨域配置参考这里`}]},{path:"/zh/static-source.html",title:"资源系统",pathLocale:"/",contents:[{header:"资源系统",slug:"资源系统",content:""},{header:"资源路径自动补全",slug:"资源路径自动补全",content:`是指对子应用相对地址的资源路径进行补全，以确保所有资源正常加载，它是micro-app默认提供的功能。
如：子应用中引用图片/myapp/test.png，在最终渲染时会补全为http://localhost:8080/myapp/test.png
资源路径补全分为两个方面：
1、针对资源标签
如 link、script、img
2、针对css的远程资源
如 background-image、@font-face 自动补全有时会失效，因为一些框架和库在特定场景下创建的元素无法被拦截和处理，或者当关闭样式隔离和沙箱时，也会导致自动补全失效。
此时推荐使用下面publicPath方案解决。`},{header:"publicPath",slug:"publicpath",content:`如果自动补全失败，可以采用运行时publicPath方案解决。
这是由webpack提供的功能，会在运行时动态设置webpack.publicPath，详细配置参考webpack文档 publicPath
如果你已经设置了publicPath为带域名的绝对地址(如：https://xxx)，则忽略此章节`},{header:"设置方式",slug:"设置方式",content:`步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) { // eslint-disable-next-line __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用入口文件的最顶部引入public-path.js
// entry
import './public-path'`},{header:"资源共享",slug:"资源共享",content:`当多个子应用拥有相同的js或css资源，可以指定这些资源在多个子应用之间共享，在子应用加载时直接从缓存中提取数据，从而提高渲染效率和性能。
设置资源共享的方式有两种：`},{header:"方式一、globalAssets",slug:"方式一、globalassets",content:`globalAssets用于设置全局共享资源，它和预加载的思路相同，在浏览器空闲时加载资源并放入缓存。
当子应用加载相同地址的js或css资源时，会直接从缓存中提取数据，从而提升渲染速度。
使用方式
// index.js
import microApp from '@micro-zoe/micro-app' microApp.start({ globalAssets: { js: ['js地址1', 'js地址2', ...], // js地址 css: ['css地址1', 'css地址2', ...], // css地址 }
})`},{header:"方式二、global 属性",slug:"方式二、global-属性",content:`在link、script设置global属性会将文件提取为公共文件，共享给其它应用。
设置global属性后文件第一次加载会放入公共缓存，其它子应用加载相同的资源时直接从缓存中读取内容，从而提升渲染速度。
使用方式
<link rel="stylesheet" href="xx.css" global>
<script src="xx.js" global><\/script>`},{header:"资源过滤",slug:"资源过滤",content:""},{header:"方式一：excludeAssetFilter",slug:"方式一-excludeassetfilter",content:`在start中注册excludeAssetFilter过滤函数，可以指定部分特殊的动态加载的微应用资源（css/js) 不被 micro-app 劫持处理。
// index.js
import microApp from '@micro-zoe/micro-app' microApp.start({ excludeAssetFilter (assetUrl) { if (assetUrl === 'xxx') { return true // 返回true则micro-app不会劫持处理当前文件 } return false }
})`},{header:"方式二：配置 exclude 属性",slug:"方式二-配置-exclude-属性",content:`在link、script、style等元素上设置exclude属性过滤这些资源，当micro-app遇到带有exclude属性的元素会进行删除。
使用方式
<link rel="stylesheet" href="xx.css" exclude>
<script src="xx.js" exclude><\/script>
<style exclude></style>`}]},{path:"/zh/transfer.html",title:"0.x迁移到1.0",pathLocale:"/",contents:[{header:"0.x迁移到1.0",slug:"_0-x迁移到1-0",content:"从0.x版本迁移到1.0只针对于旧项目，如果在迁移中发现问题，请及时反馈。"},{header:"迁移步骤",slug:"迁移步骤",content:`1、安装最新版本
npm i @micro-zoe/micro-app@latest --save
2、在start中增加配置
// index.js
import microApp from '@micro-zoe/micro-app' microApp.start({ 'disable-memory-router': true, // 关闭虚拟路由系统 'disable-patch-request': true, // 关闭对子应用请求的拦截
})`},{header:"vite迁移",slug:"vite迁移",content:`这里只针对子应用是vite的情况，主应用为vite不需要特殊处理。
如果你已经接入vite子应用且正常运行，不建议进行迁移操作，除非遇到问题。`},{header:"迁移步骤：",slug:"迁移步骤-1",content:""},{header:"步骤1：删除子应用vite.config.js中的配置",slug:"步骤1-删除子应用vite-config-js中的配置",content:""},{header:"步骤2：开启iframe沙箱",slug:"步骤2-开启iframe沙箱",content:`删除之前的两个配置项：inline、disableSandbox，然后开启iframe沙箱。
<micro-app name='名称' url='地址' iframe></micro-app>`},{header:"步骤3：删除主应用中的自定义插件",slug:"步骤3-删除主应用中的自定义插件",content:""},{header:"步骤4：删除手动注册的通信对象",slug:"步骤4-删除手动注册的通信对象",content:"删除手动注册的通信对象，改用默认的通信方式进行数据通信，参考数据通信章节。"}]},{path:"/v0/zh/",title:"",pathLocale:"/",contents:[{header:"微前端",slug:"微前端",content:`微前端的概念是由ThoughtWorks在2016年提出的，它借鉴了微服务的架构理念，核心在于将一个庞大的前端应用拆分成多个独立灵活的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用融合为一个完整的应用，或者将原本运行已久、没有关联的几个应用融合为一个应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活。
它主要解决了两个问题： 1、随着项目迭代应用越来越庞大，难以维护。
2、跨团队或跨部门协作开发项目导致效率低下的问题。`},{header:"关于micro-app",slug:"关于micro-app",content:`在micro-app之前，业内已经有一些开源的微前端框架，比较流行的有2个：single-spa和qiankun。
single-spa是通过监听 url change 事件，在路由变化时匹配到渲染的子应用并进行渲染，这个思路也是目前实现微前端的主流方式。同时single-spa要求子应用修改渲染逻辑并暴露出三个方法：bootstrap、mount、unmount，分别对应初始化、渲染和卸载，这也导致子应用需要对入口文件进行修改。因为qiankun是基于single-spa进行封装，所以这些特点也被qiankun继承下来，并且需要对webpack配置进行一些修改。
micro-app并没有沿袭single-spa的思路，而是借鉴了WebComponent的思想，通过CustomElement结合自定义的ShadowDom，将微前端封装成一个类WebComponent组件，从而实现微前端的组件化渲染。并且由于自定义ShadowDom的隔离特性，micro-app不需要像single-spa和qiankun一样要求子应用修改渲染逻辑并暴露出方法，也不需要修改webpack配置，是目前市面上接入微前端成本最低的方案。`},{header:"概念图",slug:"概念图",content:""},{header:"micro-app的优势",slug:"micro-app的优势",content:""},{header:"1、使用简单",slug:"_1、使用简单",content:`我们将所有功能都封装到一个类WebComponent组件中，从而实现在基座应用中嵌入一行代码即可渲染一个微前端应用。
同时micro-app还提供了js沙箱、样式隔离、元素隔离、预加载、数据通信、静态资源补全等一系列完善的功能。`},{header:"2、零依赖",slug:"_2、零依赖",content:"micro-app没有任何依赖，这赋予它小巧的体积和更高的扩展性。"},{header:"3、兼容所有框架",slug:"_3、兼容所有框架",content:"为了保证各个业务之间独立开发、独立部署的能力，micro-app做了诸多兼容，在任何技术框架中都可以正常运行。"}]},{path:"/v0/zh/advanced.html",title:"高级功能",pathLocale:"/",contents:[{header:"高级功能",slug:"高级功能",content:""},{header:"1、自定义fetch",slug:"_1、自定义fetch",content:`通过自定义fetch替换框架自带的fetch，可以修改fetch配置(添加cookie或header信息等等)，或拦截HTML、JS、CSS等静态资源。
自定义的fetch必须是一个返回string类型的Promise。
import microApp from '@micro-zoe/micro-app' microApp.start({ /** * 自定义fetch * @param {string} url 静态资源地址 * @param {object} options fetch请求配置项 * @param {string|null} appName 应用名称 * @returns Promise<string> */ fetch (url, options, appName) { if (url === 'http://localhost:3001/error.js') { // 删除 http://localhost:3001/error.js 的内容 return Promise.resolve('') } const config = { // fetch 默认不带cookie，如果需要添加cookie需要配置credentials credentials: 'include', // 请求时带上cookie } return window.fetch(url, Object.assign(options, config)).then((res) => { return res.text() }) }
})
Note
如果跨域请求带cookie，那么Access-Control-Allow-Origin不能设置为*，这一点需要注意`},{header:"2、性能&内存优化",slug:"_2、性能-内存优化",content:`micro-app支持两种渲染微前端的模式，默认模式和umd模式。 默认模式： 子应用在初次渲染和后续渲染时会顺序执行所有js，以保证多次渲染的一致性。
umd模式： 子应用暴露出mount、unmount方法，此时只在初次渲染时执行所有js，后续渲染只会执行这两个方法，在多次渲染时具有更好的性能和内存表现。 我的项目是否需要切换为umd模式?
如果子应用渲染和卸载不频繁，那么使用默认模式即可，如果子应用渲染和卸载非常频繁建议使用umd模式。
切换为umd模式：子应用在window上注册mount和unmount方法 // index.js
import React from "react"
import ReactDOM from "react-dom"
import App from './App' // 👇 将渲染操作放入 mount 函数 -- 必填
export function mount () { ReactDOM.render(<App />, document.getElementById("root"))
} // 👇 将卸载操作放入 unmount 函数 -- 必填
export function unmount () { ReactDOM.unmountComponentAtNode(document.getElementById("root"))
} // 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) { window[\`micro-app-\${window.__MICRO_APP_NAME__}\`] = { mount, unmount }
} else { // 非微前端环境直接渲染 mount()
} 这里只介绍配合vue-router3.x的用法
// main.js
import Vue from 'vue'
import router from './router'
import App from './App.vue' let app = null
// 👇 将渲染操作放入 mount 函数 -- 必填
function mount () { app = new Vue({ router, render: h => h(App), }).$mount('#app')
} // 👇 将卸载操作放入 unmount 函数 -- 必填
function unmount () { app.$destroy() app.$el.innerHTML = '' app = null
} // 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) { window[\`micro-app-\${window.__MICRO_APP_NAME__}\`] = { mount, unmount }
} else { // 非微前端环境直接渲染 mount()
} 这里只介绍配合vue-router4.x的用法
// main.js
import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import routes from './router'
import App from './App.vue' let app = null
let router = null
let history = null
// 👇 将渲染操作放入 mount 函数 -- 必填
function mount () { history = VueRouter.createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || '/') router = VueRouter.createRouter({ history, routes, }) app = createApp(App) app.use(router) app.mount('#app')
} // 👇 将卸载操作放入 unmount 函数 -- 必填
function unmount () { app.unmount() history.destroy() app = null router = null history = null
} // 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) { window[\`micro-app-\${window.__MICRO_APP_NAME__}\`] = { mount, unmount }
} else { // 非微前端环境直接渲染 mount()
} 以angular11为例。
// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; declare global { interface Window { microApp: any __MICRO_APP_NAME__: string __MICRO_APP_ENVIRONMENT__: string }
} let app = null;
// 👇 将渲染操作放入 mount 函数 -- 必填
async function mount () { app = await platformBrowserDynamic() .bootstrapModule(AppModule) .catch(err => console.error(err))
} // 👇 将卸载操作放入 unmount 函数 -- 必填
function unmount () { // angular在部分场景下执行destroy时会删除根元素app-root，此时可删除app.destroy()以避免这个问题 app.destroy(); app = null;
} // 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) { window[\`micro-app-\${window.__MICRO_APP_NAME__}\`] = { mount, unmount }
} else { // 非微前端环境直接渲染 mount();
} 因为vite作为子应用时关闭了沙箱，导致__MICRO_APP_ENVIRONMENT__和__MICRO_APP_NAME__两个变量失效，所以需要自行判断是否微前端环境以及手动填写应用name值。
这里以 vue3 + vue-router4 为例：
// main.js
import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import routes from './router'
import App from './App.vue' let app = null
let router = null
let history = null
// 👇 将渲染操作放入 mount 函数 -- 必填
function mount () { history = VueRouter.createWebHashHistory() router = VueRouter.createRouter({ history, routes, }) app = createApp(App) app.use(router) app.mount('#app')
} // 👇 将卸载操作放入 unmount 函数 -- 必填
function unmount () { app.unmount() history.destroy() app = null router = null history = null
} // 微前端环境下，注册mount和unmount方法
if (如果是微前端环境) { // 应用的name值，即 <micro-app> 元素的name属性值 window[\`micro-app-\${应用的name值}\`] = { mount, unmount }
} else { // 非微前端环境直接渲染 mount()
} // entry.js // 👇 将渲染操作放入 mount 函数 -- 必填
function mount () { ...
} // 👇 将卸载操作放入 unmount 函数 -- 必填
function unmount () { ...
} // 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) { window[\`micro-app-\${window.__MICRO_APP_NAME__}\`] = { mount, unmount }
} else { // 非微前端环境直接渲染 mount()
}`},{header:"自定义名称",slug:"自定义名称",content:`通常注册函数的形式为 window['micro-app-\${window.__MICRO_APP_NAME__}'] = {}，但也支持自定义名称，window['自定义的名称'] = {}
自定义的值需要在<micro-app>标签中通过library属性指定。
<micro-app name='xxx' url='xxx' library='自定义的名称' 👈
></micro-app>
Note mount和unmount方法都是必须的
nextjs, nuxtjs等ssr框架作为子应用时暂不支持umd模式
因为注册了unmount函数，所以卸载监听事件 window.addEventListener('unmount', () => {}) 就不需要了
umd模式下，因为初次渲染和后续渲染逻辑不同，可能会出现一些问题，如：#138`}]},{path:"/v0/zh/api.html",title:"",pathLocale:"/",contents:[{header:"start",slug:"start",content:"描述： micro-app注册函数，全局执行一次\n介绍：\nstart (options?: { tagName?: string, // 标签名称，默认为micro-app shadowDOM?: boolean, // 是否开启shadowDOM，默认为false destroy?: boolean, // 是否在子应用卸载时强制销毁所有缓存资源，默认为false inline?: boolean, // 是否使用内联script方式执行js，默认为false disableScopecss?: boolean, // 是否全局禁用样式隔离，默认为false disableSandbox?: boolean, // 是否全局禁用沙箱，默认为false ssr?: boolean, // 是否全局启用ssr模式，默认为false // 全局生命周期 lifeCycles?: { created?(e?: CustomEvent): void beforemount?(e?: CustomEvent): void mounted?(e?: CustomEvent): void unmount?(e?: CustomEvent): void error?(e?: CustomEvent): void }, // 预加载，支持数组或函数 preFetchApps?: Array<{ name: string, url: string, disableScopecss?: boolean, disableSandbox?: boolean, shadowDOM?: boolean }> | (() => Array<{ name: string, url: string, disableScopecss?: boolean, disableSandbox?: boolean, shadowDOM?: boolean }>), // 插件系统，用于处理子应用的js文件 plugins?: { // 全局插件，作用于所有子应用的js文件 global?: Array<{ // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到基座应用中，scopeProperties可以禁止这种情况) scopeProperties?: string[], // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上) escapeProperties?: string[], // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建 excludeChecker?: (url: string) => boolean // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染 ignoreChecker?: (url: string) => boolean // 可选，传递给loader的配置项 options?: any, // 可选，js处理函数，必须返回 code 值 loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => string, // 可选，html 处理函数，必须返回 code 值 processHtml?: (code: string, url: string, options: unknown) => string }> // 子应用插件 modules?: { // appName为应用的名称，这些插件只会作用于指定的应用 [name: string]: Array<{ // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到基座应用中，scopeProperties可以禁止这种情况) scopeProperties?: string[], // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上) escapeProperties?: string[], // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建 excludeChecker?: (url: string) => boolean // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染 ignoreChecker?: (url: string) => boolean // 可选，传递给loader的配置项 options?: any, // 必填，js处理函数，必须返回code值 loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => string, // 可选，html 处理函数，必须返回 code 值 processHtml?: (code: string, url: string, options: unknown) => string }> } }, // 重定义fetch方法，可以用于拦截资源请求操作 fetch?: (url: string, options: Record<string, any>, appName: string | null) => Promise<string> // 设置全局静态资源 globalAssets?: { js?: string[], // js地址 css?: string[], // css地址 },\n})\n使用方式：\n// index.js\nimport microApp from '@micro-zoe/micro-app' microApp.start()"},{header:"preFetch",slug:"prefetch",content:`描述： 预加载，在浏览器空闲时间，依照开发者传入的顺序，依次加载每个应用的静态资源
介绍：
preFetch([ { name: string, url: string, disableScopecss?: boolean, disableSandbox?: boolean, },
])
使用方式：
import { preFetch } from '@micro-zoe/micro-app' // 方式一
preFetch([ { name: 'my-app1', url: 'xxx' }, { name: 'my-app2', url: 'xxx' },
]) // 方式二
preFetch(() => [ { name: 'my-app1', url: 'xxx' }, { name: 'my-app2', url: 'xxx' },
])`},{header:"getActiveApps",slug:"getactiveapps",content:`描述： 获取正在运行的子应用，不包含已卸载和预加载的应用
版本限制： 0.5.2及以上版本
介绍：
/** * @param excludeHiddenApp 是否过滤处于隐藏状态的keep-alive应用，默认false */
function getActiveApps(excludeHiddenApp?: boolean): string[]
使用方式：
import { getActiveApps } from '@micro-zoe/micro-app' getActiveApps() // [子应用name, 子应用name, ...] getActiveApps(true) // 处于隐藏状态的keep-alive将会被过滤`},{header:"getAllApps",slug:"getallapps",content:`描述： 获取所有子应用，包含已卸载和预加载的应用
版本限制： 0.5.2及以上版本
介绍：
function getAllApps(): string[]
使用方式：
import { getAllApps } from '@micro-zoe/micro-app' getAllApps() // [子应用name, 子应用name, ...]`},{header:"version",slug:"version",content:`描述： 查看版本号
方式1：
import { version } from '@micro-zoe/micro-app'
方式2： 通过micro-app元素上的version属性查看
document.querySelector('micro-app').version`},{header:"pureCreateElement",slug:"purecreateelement",content:`描述： 创建无绑定的纯净元素
使用方式：
import { pureCreateElement } from '@micro-zoe/micro-app' const pureDiv = pureCreateElement('div') document.body.appendChild(pureDiv)`},{header:"removeDomScope",slug:"removedomscope",content:`描述： 解除元素绑定，通常用于受子应用元素绑定影响，导致基座元素错误绑定到子应用的情况
使用方式：
import { removeDomScope } from '@micro-zoe/micro-app' // 重置作用域
removeDomScope()`},{header:"EventCenterForMicroApp",slug:"eventcenterformicroapp",content:`描述： 创建子应用通信对象，用于沙箱关闭时(如：vite)与子应用进行通信
使用方式：
import { EventCenterForMicroApp } from '@micro-zoe/micro-app' // 每个子应用根据appName单独分配一个通信对象
window.eventCenterForAppName = new EventCenterForMicroApp(appName)
详情查看：关闭沙箱后的通信方式`},{header:"unmountApp",slug:"unmountapp",content:`描述： 手动卸载应用
版本限制： 0.6.1及以上版本
介绍：
// unmountApp 参数配置
interface unmountAppParams { /** * destroy: 是否强制卸载应用并删除缓存资源，默认值：false * 优先级: 高于 clearAliveState * 对于已经卸载的应用: 当子应用已经卸载或keep-alive应用已经推入后台，则清除应用状态及缓存资源 * 对于正在运行的应用: 当子应用正在运行，则卸载应用并删除状态及缓存资源 */ destroy?: boolean; /** * clearAliveState: 是否清空应用的缓存状态，默认值：false * 解释: 如果子应用是keep-alive，则卸载并清空状态，并保留缓存资源，如果子应用不是keep-alive，则执行正常卸载流程，并保留缓存资源 * 补充: 无论keep-alive应用正在运行还是已经推入后台，都将执行卸载操作，清空应用缓存状态，并保留缓存资源 */ clearAliveState?: boolean;
} function unmountApp(appName: string, options?: unmountAppParams): Promise<void>
使用方式：
// 正常流程
unmountApp(子应用名称).then(() => console.log('卸载成功')) // 卸载应用并清空缓存资源
unmountApp(子应用名称, { destroy: true }).then(() => console.log('卸载成功')) // 如果子应用是keep-alive应用，则卸载并清空状态，如果子应用不是keep-alive应用，则正常卸载
unmountApp(子应用名称, { clearAliveState: true }).then(() => console.log('卸载成功')) // 如果destroy和clearAliveState同时为true，则clearAliveState将失效
unmountApp(子应用名称, { destroy: true, clearAliveState: true }).then(() => console.log('卸载成功'))`},{header:"unmountAllApps",slug:"unmountallapps",content:`描述： 手动卸载所有应用
版本限制： 0.6.1及以上版本
介绍：
// unmountAllApps 参数配置
interface unmountAppParams { /** * destroy: 是否强制卸载应用并删除缓存资源，默认值：false * 优先级: 高于 clearAliveState * 对于已经卸载的应用: 当子应用已经卸载或keep-alive应用已经推入后台，则清除应用状态及缓存资源 * 对于正在运行的应用: 当子应用正在运行，则卸载应用并删除状态及缓存资源 */ destroy?: boolean; /** * clearAliveState: 是否清空应用的缓存状态，默认值：false * 解释: 如果子应用是keep-alive，则卸载并清空状态，并保留缓存资源，如果子应用不是keep-alive，则执行正常卸载流程，并保留缓存资源 * 补充: 无论keep-alive应用正在运行还是已经推入后台，都将执行卸载操作，清空应用缓存状态，并保留缓存资源 */ clearAliveState?: boolean;
} function unmountAllApps(options?: unmountAppParams): Promise<void>
使用方式：
// 正常流程
unmountAllApps().then(() => console.log('卸载成功')) // 卸载所有应用并清空缓存资源
unmountAllApps({ destroy: true }).then(() => console.log('卸载成功')) // 如果子应用是keep-alive应用，则卸载并清空状态，如果子应用不是keep-alive应用，则正常卸载
unmountAllApps({ clearAliveState: true }).then(() => console.log('卸载成功')) // 如果destroy和clearAliveState同时为true，则clearAliveState将失效
unmountAllApps({ destroy: true, clearAliveState: true }).then(() => console.log('卸载成功'))`},{header:"setData",slug:"setdata",content:`描述： 向指定的子应用发送数据
介绍：
setData(appName: String, data: Object)
使用方式：
import microApp from '@micro-zoe/micro-app' // 发送数据给子应用 my-app，setData第二个参数只接受对象类型
microApp.setData('my-app', {type: '新的数据'})`},{header:"getData",slug:"getdata",content:`描述： 获取指定的子应用data数据
介绍：
getData(appName: String): Object
使用方式：
import microApp from '@micro-zoe/micro-app' const childData = microApp.getData('my-app') // 返回my-app子应用的data数据`},{header:"addDataListener",slug:"adddatalistener",content:`描述： 监听指定子应用的数据变化
介绍：
/** * 绑定监听函数 * appName: 应用名称 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
microApp.addDataListener(appName: string, dataListener: Function, autoTrigger?: boolean)
使用方式：
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('来自子应用my-app的数据', data)
} microApp.addDataListener('my-app', dataListener)`},{header:"removeDataListener",slug:"removedatalistener",content:`描述： 解除基座绑定的指定子应用的数据监听函数
使用方式：
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('来自子应用my-app的数据', data)
} // 解绑监听my-app子应用的数据监听函数
microApp.removeDataListener('my-app', dataListener)`},{header:"clearDataListener",slug:"cleardatalistener",content:`描述： 清空基座绑定的指定子应用的所有数据监听函数
使用方式：
import microApp from '@micro-zoe/micro-app' // 清空所有监听appName子应用的数据监听函数
microApp.clearDataListener('my-app')`},{header:"getGlobalData",slug:"getglobaldata",content:`描述： 获取全局数据
使用方式：
import microApp from '@micro-zoe/micro-app' // 直接获取数据
const globalData = microApp.getGlobalData() // 返回全局数据`},{header:"addGlobalDataListener",slug:"addglobaldatalistener",content:`描述： 绑定数据监听函数
介绍：
/** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
microApp.addGlobalDataListener(dataListener: Function, autoTrigger?: boolean)
使用方式：
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('全局数据', data)
} microApp.addGlobalDataListener(dataListener)`},{header:"removeGlobalDataListener",slug:"removeglobaldatalistener",content:`描述： 解绑全局数据监听函数
使用方式：
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('全局数据', data)
} microApp.removeGlobalDataListener(dataListener)`},{header:"clearGlobalDataListener",slug:"clearglobaldatalistener",content:`描述： 清空基座应用绑定的所有全局数据监听函数
使用方式：
import microApp from '@micro-zoe/micro-app' microApp.clearGlobalDataListener()`},{header:"setGlobalData",slug:"setglobaldata",content:`描述： 发送全局数据
使用方式：
import microApp from '@micro-zoe/micro-app' // setGlobalData只接受对象作为参数
microApp.setGlobalData({type: '全局数据'})`},{header:"pureCreateElement",slug:"purecreateelement-1",content:`描述： 创建无绑定的纯净元素，该元素可以逃离元素隔离的边界，不受子应用沙箱的控制
版本限制： 0.8.2及以上版本
使用方式：
const pureDiv = window.microApp.pureCreateElement('div') document.body.appendChild(pureDiv)`},{header:"removeDomScope",slug:"removedomscope-1",content:`描述： 解除元素绑定，通常用于受子应用元素绑定影响，导致基座元素错误绑定到子应用的情况
版本限制： 0.8.2及以上版本
使用方式：
// 重置作用域
window.microApp.removeDomScope()`},{header:"rawWindow",slug:"rawwindow",content:`描述： 获取真实的window
使用方式：
window.rawWindow`},{header:"rawDocument",slug:"rawdocument",content:`描述： 获取真实的document
使用方式：
window.rawDocument`},{header:"getData",slug:"getdata-1",content:`描述： 获取基座下发的data数据
使用方式：
const data = window.microApp.getData() // 返回基座下发的data数据`},{header:"addDataListener",slug:"adddatalistener-1",content:`描述： 绑定数据监听函数
介绍：
/** * 绑定监听函数，监听函数只有在数据变化时才会触发 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false * !!!重要说明: 因为子应用是异步渲染的，而基座发送数据是同步的， * 如果在子应用渲染结束前基座应用发送数据，则在绑定监听函数前数据已经发送，在初始化后不会触发绑定函数， * 但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。 */
window.microApp.addDataListener(dataListener: Function, autoTrigger?: boolean)
使用方式：
function dataListener (data) { console.log('来自基座应用的数据', data)
} window.microApp.addDataListener(dataListener)`},{header:"removeDataListener",slug:"removedatalistener-1",content:`描述： 解绑数据监听函数
使用方式：
function dataListener (data) { console.log('来自基座应用的数据', data)
} window.microApp.removeDataListener(dataListener)`},{header:"clearDataListener",slug:"cleardatalistener-1",content:`描述： 清空当前子应用的所有数据监听函数(全局数据函数除外)
使用方式：
window.microApp.clearDataListener()`},{header:"dispatch",slug:"dispatch",content:`描述： 向基座应用发送数据
使用方式：
// dispatch只接受对象作为参数
window.microApp.dispatch({type: '子应用发送的数据'})`},{header:"getGlobalData",slug:"getglobaldata-1",content:`描述： 获取全局数据
使用方式：
const globalData = window.microApp.getGlobalData() // 返回全局数据`},{header:"addGlobalDataListener",slug:"addglobaldatalistener-1",content:`描述： 绑定数据监听函数
介绍：
/** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
window.microApp.addGlobalDataListener(dataListener: Function, autoTrigger?: boolean) 使用方式：
function dataListener (data) { console.log('全局数据', data)
} window.microApp.addGlobalDataListener(dataListener)`},{header:"removeGlobalDataListener",slug:"removeglobaldatalistener-1",content:`描述： 解绑全局数据监听函数
使用方式：
function dataListener (data) { console.log('全局数据', data)
} window.microApp.removeGlobalDataListener(dataListener)`},{header:"clearGlobalDataListener",slug:"clearglobaldatalistener-1",content:`描述： 清空当前子应用绑定的所有全局数据监听函数
使用方式：
window.microApp.clearGlobalDataListener()`},{header:"setGlobalData",slug:"setglobaldata-1",content:`描述： 发送全局数据
使用方式：
// setGlobalData只接受对象作为参数
window.microApp.setGlobalData({type: '全局数据'})`}]},{path:"/v0/zh/changelog.html",title:"更新日志",pathLocale:"/",contents:[{header:"更新日志",slug:"更新日志",content:"micro-app 遵循 Semantic Versioning 2.0.0 语义化版本规范。"},{header:"发布周期",slug:"发布周期",content:`主版本号：含有破坏性更新和新特性，不在发布周期内。
次版本号：每月发布一个带有新特性的向下兼容的版本。
修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）`},{header:"1.0.0-alpha.6",slug:"_1-0-0-alpha-6",content:"2022-08-18 New 🆕 Bug Fix 🐞 修复了router全局守卫参数和文档不一致的问题。 Update 🚀"},{header:"1.0.0-alpha.5",slug:"_1-0-0-alpha-5",content:"2022-08-01 New 🆕 新增子应用全局钩子函数mount, unmount，简化接入步骤。 Update 🚀 更新了1.0版本文档。"},{header:"1.0.0-alpha.4",slug:"_1-0-0-alpha-4",content:`2022-07-30 New 🆕 新增了配置disable-patch-request，用于阻止MicroApp对子应用fetch、XMLHttpRequest等请求方法的重写。 Bug Fix 🐞 修复了设置document.title, history.scrollRestoration时报Illegal invocation错误的问题。
🐞 修复了在umd模式部分场景下二次渲染时全局变量和全局事件丢失的问题。
🐞 修复了高德地图二次渲染时地图无法显示的问题。
🐞 修复了element-plus按需加载时，点击ElSelect组件空白区域无法收起的问题。
🐞 修复了umd模式下每次渲染时fetch、XMLHttpRequest等API被重写的问题。 Update 🚀 更新了umd模式下全局事件和全局变量的处理逻辑，不再主动卸载全局事件和删除全局变量。
🚀 更新了1.0版本文档`},{header:"1.0.0-alpha.3",slug:"_1-0-0-alpha-3",content:`2022-07-21 New 🆕 重写了基座的pushState、replaceState方法，自动将子应用的路由信息同步到浏览器地址。
🆕 重写了子应用的Document对象，每个子应用拥有单独的Document实例。 Bug Fix 🐞 修复了Document原型方法绑定到ProxyDocument时报错的问题。 Update 🚀 优化了路由相关代码和逻辑。
🚀 更新了案例，增加适配场景`},{header:"1.0.0-alpha.2",slug:"_1-0-0-alpha-2",content:`2022-07-15 New 🆕 新增了attachToURL、attachAllToURL方法，用于将子应用的路由信息同步到浏览器地址。
🆕 新增了setBaseRouter、getBaseRouter方法，用于注册和使用基座路由。
🆕 新增了ProxyDocument，为子应用创建一个虚拟的document对象。 Bug Fix 🐞 修复了ant-design-vue的弹窗类组件及其它特殊情况下，子应用元素逃逸到原生body上的问题。
🐞 修复了在未设置public_path时，子应用的资源地址补全失败的问题。
🐞 修复了子应用在调用fetch等API时，元素绑定没有解除的问题。
🐞 修复了在@keyframes名称带有特殊字符时样式隔离失败的问题。 Update 🚀 优化了路由相关代码和逻辑。
🚀 更新了案例。`},{header:"1.0.0-alpha.1",slug:"_1-0-0-alpha-1",content:`2022-07-06 New 🆕 新增了proxyRequest，用于拦截fetch、XMLHttpRequest、EventSource请求并进行处理。 Bug Fix 🐞 修复了通过create-react-app创建的react应用热更新时报错的问题。
🐞 修复了子应用执行pushState/replaceState时popStateEvent事件异常触发的问题。 Update 🚀 优化了资源加载相关代码和逻辑。`},{header:"0.8.6",slug:"_0-8-6",content:`2022-06-30 New 🆕 在 plugin 中增加 excludeChecker 和 ignoreChecker 用于主应用主动忽略子应用部分 script 和 link。
🆕 新增了processHtml，用于在插件中处理html。 Update 🚀 优化了资源加载相关代码和逻辑。
🚀 优化了单元测试相关代码。`},{header:"1.0.0-alpha.0",slug:"_1-0-0-alpha-0",content:"2022-06-30 New 🆕 新增了独立的路由系统 - MemoryRouter，完善JS沙箱。 Bug Fix 🐞 修复了在循环嵌套时iconfont.js在部分场景下报错的问题。 Update 🚀 优化了预加载相关代码和逻辑，提高并行渲染能力。"},{header:"0.8.5",slug:"_0-8-5",content:"2022-02-14 New 🆕 插件的loader方法中新增包含script信息的info参数。"},{header:"0.8.4",slug:"_0-8-4",content:"2022-01-25 Bug Fix 🐞 修复了在火狐浏览器80及以上版本中，样式隔离执行速度过慢的问题。"},{header:"0.8.3",slug:"_0-8-3",content:"2022-01-20 Bug Fix 🐞 修复了在css中通过background-image引入svg时，样式隔离解析失败的问题。 Update 🚀 优化了样式隔离的逻辑，提高兼容和性能。"},{header:"0.8.2",slug:"_0-8-2",content:`2022-01-14 New 🆕 新增了子应用pureCreateElement方法，用于创建无绑定的纯净元素。
🆕 新增了子应用removeDomScope方法，用于解除元素绑定。 Bug Fix 🐞 修复了基座通过远程连接引入Vue，加载vue子应用报错的问题，issue #234。 Update 🚀 优化了预加载相关代码和逻辑，减小对基座项目的影响。`},{header:"0.8.1",slug:"_0-8-1",content:`2022-01-12 Bug Fix 🐞 修复了element-plus部分组件逃离元素隔离的问题, issue #223。
🐞 修复了在使用IE6、7 CSSHack时样式解析失败的问题, issue #232。 Update 🚀 优化了插件相关代码和逻辑, PR #224 by LinFeng1997。
🚀 优化了沙箱相关代码和逻辑。`},{header:"0.8.0",slug:"_0-8-0",content:`2022-01-07 New 🆕 新增了在样式隔离下的动态忽略规则。 Bug Fix 🐞 修复了在使用css变量时导致样式丢失的问题，issue #157、#121。
🐞 修复了在部分浏览器(如：safari)下，css表现有差异的问题。 Update 🚀 样式隔离重构，提升性能和兼容性。`},{header:"0.7.1",slug:"_0-7-1",content:`2021-12-31 Bug Fix 🐞 修复了link标签在非head时样式丢失的问题
🐞 修复了错误补全svg地址的问题，PR #207 by icksky。
🐞 修复了在部分浏览器下报WeakRef is not defined错误的问题。`},{header:"0.7.0",slug:"_0-7-0",content:`2021-12-29 New 🆕 新增Api，对外export MicroApp类。 Update 🚀 沙箱重构，性能优化。
🚀 优化了execScripts方法，不再使用Promise.all，防止单文件加载错误导致后续文件无法执行的问题。
🚀 优化了getActiveApps方法，增加对过滤keep-alive应用的支持。`},{header:"0.6.2",slug:"_0-6-2",content:"2021-12-19 Bug Fix 🐞 修复了在SSR环境下，抛出Image is not defined的报错问题。"},{header:"0.6.1",slug:"_0-6-1",content:`2021-12-17 New 🆕 新增了unmountApp, unmountAllApps方法，用于主动卸载应用。
🆕 新增了对disable-sandbox, disable-scopecss配置的支持。 Bug Fix 🐞 修复了通过new Image()创建的元素逃离沙箱的问题，issue #186，PR #187 by asiainfoliwei。
🐞 修复了通过cloneNode创建的元素逃离沙箱的问题。 Update 🚀 优化了元素隔离patch原型链方法相关代码。
🚀 优化了kee-alive和destory相关的处理逻辑。
🚀 优化了unmount生命周期的触发时机，移动到应用彻底卸载后执行。`},{header:"0.6.0",slug:"_0-6-0",content:"2021-12-10 New 🆕 新增了对keep-alive模式的支持。"},{header:"0.5.3",slug:"_0-5-3",content:`2021-12-02 New 🆕 新增了对ssr模式的全局配置的支持。 Bug Fix 🐞 修复了沙箱中注册的全局变量的映射key在部分场景下没有及时删除的问题。
🐞 修复了在不支持ESModule的项目中，引入polyfill/jsx-custom-event报错的问题。`},{header:"0.5.2",slug:"_0-5-2",content:"2021-11-25 Bug Fix 🐞 修复了index.d.ts中getActiveApps、getAllApps类型声明错误的问题。"},{header:"0.5.1",slug:"_0-5-1",content:`2021-11-25 New 🆕 新增了getActiveApps方法，用于获取正在运行的子应用。
🆕 新增了getAllApps方法，用于获取所有已经注册的子应用。 Bug Fix 🐞 修复了link、style元素格式化后顺序不一致导致的样式丢失的问题。`},{header:"0.5.0",slug:"_0-5-0",content:`2021-11-19 Bug Fix 🐞 修复了name带有特殊符号时样式失效的问题，删除name中的特殊符号。
🐞 修复了umd模式下，应用卸载并重新渲染时url冲突，旧应用没有卸载干净的问题。
🐞 修复了在关闭样式隔离时，样式延迟生效导致页面布局错乱的问题。
🐞 修复了多次重复向head中插入同一个style元素，导致样式失效的问题。 Update 🚀 优化了应用二次渲染时的性能及内存。
🚀 优化了样式隔离逻辑，无论是否关闭样式隔离，始终将link元素提取转换为style元素。`},{header:"0.4.3",slug:"_0-4-3",content:`2021-11-05 New 🆕 新增了EventCenterForMicroApp方法，用于沙箱关闭时实现通信功能(如vite) Bug Fix 🐞 修复了在不支持ShadowRoot的浏览器中的报错问题，issue #134
🐞 修复了元素查询时带有特殊字符导致报错的问题，issue #140`},{header:"0.4.2",slug:"_0-4-2",content:`2021-10-29 New 🆕 新增了数据通信中getGlobalData方法，用于主动获取全局数据
🆕 新增了对mount, unmount方法promise类型的支持
🆕 新增了destroy配置项，用于替换destory，但依然保持对低版本的兼容，issue #132 Bug Fix 🐞 修复了umd模式下，react16及以下版本二次渲染后路由跳转刷新页面的问题
🐞 修复了SSR子应用二次渲染时url不同导致渲染失败的问题
🐞 修复了 react-inlinesvg 无法正常渲染的问题，issue #56
🐞 修复了 safari 浏览器中，创建module脚本错误的问题
🐞 修复了子应用通过defineProperty重写document.onclick时报错的问题 Update 🚀 优化了MicroAppElement、沙箱等代码
🚀 优化了umd模式下，子应用初次渲染的速度
🚀 优化了动态创建的script元素src或textContent为空时的处理逻辑
🚀 优化了mounted生命周期的执行时机`},{header:"0.4.1",slug:"_0-4-1",content:`2021-10-22 Bug Fix 🐞 修复了umd模式下，应用二次渲染时样式丢失的问题
🐞 修复了资源地址为空时，补全错误的问题
🐞 修复了对iframe元素src属性的错误处理
🐞 修复了mounted生命周期在异步脚本中执行时机错误的问题
🐞 修复了在非沙箱环境下使用umd模式，开启destory后，卸载时注册的函数没有卸载的问题
🐞 修复了子应用带有preload时资源加载两次的问题 Update 🚀 优化了在非inline模式下，module类型script元素的执行方式
🚀 优化了报错日志信息，增加应用名称`},{header:"0.4.0",slug:"_0-4-0",content:`2021-10-15 New 🆕 新增了ignore属性，用于忽略部分部分元素
🆕 新增了全局变量 __MICRO_APP_BASE_APPLICATION__ 用于标记当前应用为基座应用 Bug Fix 🐞 修复了对webpack5 & jsonp 的支持
🐞 修复了angular下动态设置url属性导致加载失败的问题
🐞 修复了在vite环境下，内存优化的支持
🐞 修复了script type 为特殊情况下的兜底处理，如application/json
🐞 修复了循环嵌套时没有完全卸载应用的问题 Update 🚀 优化了对ssr的支持方式
🚀 优化了动态module的创建和渲染
🚀 优化了对data、blob类型数据的处理`},{header:"0.3.3",slug:"_0-3-3",content:`2021-09-13 Bug Fix 🐞 修复了data属性赋值后插入文档时，初始化data值无法通过setAttribute拦截的问题
🐞 修复了渲染缓存micro-app元素时导致的micro-app-head, micro-app-body重复的问题`},{header:"0.3.2",slug:"_0-3-2",content:`2021-09-10 New 🆕 新增了baseroute配置项，用于替换baseurl
🆕 新增了__MICRO_APP_BASE_ROUTE__全局变量，用于替换__MICRO_APP_BASE_URL__ Update 🚀 废弃了baseurl和__MICRO_APP_BASE_URL__，但依然兼容旧版`},{header:"0.3.1",slug:"_0-3-1",content:"2021-09-08 Bug Fix 🐞 修复了micro-app元素先使用后定义导致start方法配置失效的问题"},{header:"0.3.0",slug:"_0-3-0",content:`2021-09-07 New 🆕 新增了对umd格式的支持
🆕 废弃eval方法，使用Function进行替换 Bug Fix 🐞 修复了子应用卸载部分内存无法释放的问题
🐞 修复了widnow\\document\\timer事件在umd模式下多次渲染的问题
🐞 修复了async和defer js文件没有缓存的问题
🐞 修复了子应用同时存在多个head、body元素时，元素操作异常的问题。 Update 🚀 优化了修改name&url属性切换应用的操作，部分场景下被替换的应用可以计入缓存
🚀 更新了全局数据通信卸载机制，基座应用和子应用只能卸载自身的全局监听函数`},{header:"0.2.5",slug:"_0-2-5",content:`2021-08-23 New 🆕 新增了main-vue3-vite基座应用案例 Bug Fix 🐞 修复了在vue3中name被删除导致的样式丢失的问题
🐞 修复了无法适配.node、.php、.net后缀文件的问题
🐞 修复了子应用卸载后依然可以通过副作用函数绑定name作用域的问题 Update 🚀 优化了cosole日志方法和使用方式
🚀 优化了vite适配方式`},{header:"0.2.4",slug:"_0-2-4",content:`2021-08-13 New 🆕 新增了start配置项globalAssets，用于设置全局共享资源 Bug Fix 🐞 修复了在子应用中请求html元素被拦截的问题
🐞 修复低版本nodejs对于rollup.config.js执行错误的问题 Update 🚀 代码优化`},{header:"0.2.3",slug:"_0-2-3",content:`2021-08-10 Bug Fix 🐞 修复了切换至预加载app时报app already exists错误
🐞 修复了地址补全对于a元素的错误处理 Update 🚀 文档更新
🚀 代码优化
🚀 更新单元测试`},{header:"0.2.2",slug:"_0-2-2",content:"2021-07-27 Bug Fix 🐞 修复了JSX.IntrinsicElements属性生命丢失的问题 Update 🚀 代码优化"},{header:"0.2.0",slug:"_0-2-0",content:`2021-07-16 Bug Fix 🐞 修复了styled-componets下样式失效的问题
🐞 修复了沙箱关闭时，插件系统失效的问题
🐞 修复了link地址没有协议前缀时补全相对地址失败的问题 Update 🚀 案例及文档更新`},{header:"0.1.0",slug:"_0-1-0",content:"2021-07-09 🎉 v0.1.0正式版发布。"}]},{path:"/v0/zh/chat.html",title:"",pathLocale:"/",contents:[{header:"",slug:"",content:`Gitter群聊
GitHub讨论组
BUG反馈`}]},{path:"/v0/zh/configure.html",title:"配置项",pathLocale:"/",contents:[{header:"配置项",slug:"配置项",content:"通过配置项，我们可以决定开启或关闭某些功能。"},{header:"name",slug:"name",content:`Desc: 应用名称
Type: string
Default: 必传参数
使用方式: <micro-app name='xx'></micro-app>
注意事项: 必须以字母开头，且不可以带有除中划线和下划线外的特殊符号 每个name都对应一个应用，当多个应用同时渲染时，name不可以重复。
当name的值发生变化时，会卸载当前应用并重新渲染。`},{header:"url",slug:"url",content:`Desc: 应用地址
Type: string
Default: 必传参数
使用方式: <micro-app name='xx' url='xx'></micro-app> 基座应用和子应用本质是在同一个页面，这里的url只是html地址，子应用的路由还是基于浏览器地址。
当url的值发生变化时，会卸载当前应用并根据新的url值重新渲染。`},{header:"baseroute",slug:"baseroute",content:`Desc: 子应用的基础路由
Type: string
Default: ''
使用方式: <micro-app name='xx' url='xx' baseroute='/my-page/'></micro-app> 在微前端环境下，子应用可以从window.__MICRO_APP_BASE_ROUTE__上获取baseroute的值，用于设置基础路由。
如果基座应用是history路由，子应用是hash路由，则不需要设置baseroute。`},{header:"inline",slug:"inline",content:`Desc: 是否使用内联script
Default: false
使用方式: <micro-app name='xx' url='xx' inline></micro-app> 默认情况下，子应用的js会被提取并在后台运行，这会导致调试困难。
开启inline后，被提取的js会作为script标签插入应用中运行，在开发环境中更方便调试。
Note
开启inline后会稍微损耗性能，建议在开发环境中使用。`},{header:"destroy",slug:"destroy",content:`Desc: 卸载时是否强制删除缓存资源
Default: false
使用方式: <micro-app name='xx' url='xx' destroy></micro-app> 默认情况下，子应用被卸载后会缓存静态资源，以便在重新渲染时获得更好的性能。
开启destroy，子应用在卸载后会清空缓存资源，再次渲染时重新请求数据。`},{header:"disableScopecss",slug:"disablescopecss",content:`Desc: 禁用样式隔离
Default: false
使用方式: <micro-app name='xx' url='xx' disableScopecss 或 disable-scopecss></micro-app> 禁用样式隔离可以提升页面渲染速度，在此之前，请确保各应用之间样式不会相互污染。`},{header:"disableSandbox",slug:"disablesandbox",content:`Desc: 禁用js沙箱
Default: false
使用方式: <micro-app name='xx' url='xx' disableSandbox 或 disable-sandbox></micro-app> 禁用沙箱可能会导致一些不可预料的问题，通常情况不建议这样做。
Note
禁用沙箱后以下功能将失效: 样式隔离
元素隔离
静态资源路径补全
__MICRO_APP_ENVIRONMENT__、__MICRO_APP_PUBLIC_PATH__等全局变量
baseroute`},{header:"ssr",slug:"ssr",content:`Desc: 是否开启ssr模式
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' ssr></micro-app>
版本要求: 0.5.3及以上版本 当子应用是ssr应用时，需要设置ssr属性，此时micro-app会根据ssr模式加载子应用。`},{header:"keep-alive",slug:"keep-alive",content:`Desc: 是否开启keep-alive模式
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' keep-alive></micro-app>
版本要求: 0.6.0及以上版本 开启keep-alive后，应用卸载时会进入缓存，而不是销毁它们，以便保留应用的状态和提升重复渲染的性能。
keep-alive的优先级小于destroy，当两者同时存在时，keep-alive将失效。`},{header:"shadowDOM",slug:"shadowdom",content:`Desc: 是否开启shadowDOM
Type: string(boolean)
Default: false
使用方式: <micro-app name='xx' url='xx' shadowDOM></micro-app> shadowDOM具有更强的样式隔离能力，开启后，<micro-app>标签会成为一个真正的WebComponent。
但shadowDOM在React框架及一些UI库中的兼容不是很好，经常会出现一些不可预料的问题，除非你很清楚它会带来的问题并有信心解决，否则不建议使用。`},{header:"全局配置",slug:"全局配置",content:`全局配置会影响每一个子应用，请小心使用！
使用方式
import microApp from '@micro-zoe/micro-app' microApp.start({ inline: true, // 默认值false destroy: true, // 默认值false disableScopecss: true, // 默认值false disableSandbox: true, // 默认值false shadowDOM: true, // 默认值false ssr: true, // 默认值false
})
如果希望在某个应用中不使用全局配置，可以单独配置关闭：
<micro-app name='xx' url='xx' inline='false' destroy='false' disableScopecss='false' disableSandbox='false' shadowDOM='false' ssr='false'
></micro-app>`},{header:"其它配置",slug:"其它配置",content:""},{header:"global",slug:"global",content:`当多个子应用使用相同的js或css资源，在link、script设置global属性会将文件提取为公共文件，共享给其它应用。
设置global属性后文件第一次加载会放入公共缓存，其它子应用加载相同的资源时直接从缓存中读取内容，从而提升渲染速度。
使用方式
<link rel="stylesheet" href="xx.css" global>
<script src="xx.js" global><\/script>`},{header:"globalAssets",slug:"globalassets",content:`globalAssets用于设置全局共享资源，它和预加载的思路相同，在浏览器空闲时加载资源并放入缓存，提高渲染效率。
当子应用加载相同地址的js或css资源时，会直接从缓存中提取数据，从而提升渲染速度。
使用方式
// index.js
import microApp from '@micro-zoe/micro-app' microApp.start({ globalAssets: { js: ['js地址1', 'js地址2', ...], // js地址 css: ['css地址1', 'css地址2', ...], // css地址 }
})`},{header:"exclude(过滤元素)",slug:"exclude-过滤元素",content:`当子应用不需要加载某个js或css，可以通过在link、script、style设置exclude属性，当micro-app遇到带有exclude属性的元素会进行删除。
使用方式
<link rel="stylesheet" href="xx.css" exclude>
<script src="xx.js" exclude><\/script>
<style exclude></style>`},{header:"ignore(忽略元素)",slug:"ignore-忽略元素",content:`当link、script、style元素具有ignore属性，micro-app不会处理它，元素将原封不动进行渲染。
使用场景例如：jsonp
jsonp会创建一个script元素加载数据，正常情况script会被拦截导致jsonp请求失败，此时可以给script元素添加ignore属性，跳过拦截。
// 修改jsonp方法，在创建script元素后添加ignore属性
const script = document.createElement('script')
script.setAttribute('ignore', 'true')`}]},{path:"/v0/zh/data.html",title:"数据通信",pathLocale:"/",contents:[{header:"数据通信",slug:"数据通信",content:`micro-app提供了一套灵活的数据通信机制，方便基座应用和子应用之间的数据传输。
正常情况下，基座应用和子应用之间的通信是绑定的，基座应用只能向指定的子应用发送数据，子应用只能向基座发送数据，这种方式可以有效的避免数据污染，防止多个子应用之间相互影响。
同时我们也提供了全局通信，方便跨应用之间的数据通信。`},{header:"一、子应用获取来自基座应用的数据",slug:"一、子应用获取来自基座应用的数据",content:`micro-app会向子应用注入名称为microApp的全局对象，子应用通过这个对象和基座应用进行数据交互。
有两种方式获取来自基座应用的数据：`},{header:"方式1：直接获取数据",slug:"方式1-直接获取数据",content:"const data = window.microApp.getData() // 返回基座下发的data数据"},{header:"方式2：绑定监听函数",slug:"方式2-绑定监听函数",content:`function dataListener (data) { console.log('来自基座应用的数据', data)
} /** * 绑定监听函数，监听函数只有在数据变化时才会触发 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false * !!!重要说明: 因为子应用是异步渲染的，而基座发送数据是同步的， * 如果在子应用渲染结束前基座应用发送数据，则在绑定监听函数前数据已经发送，在初始化后不会触发绑定函数， * 但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。 */
window.microApp.addDataListener(dataListener: Function, autoTrigger?: boolean) // 解绑监听函数
window.microApp.removeDataListener(dataListener: Function) // 清空当前子应用的所有绑定函数(全局数据函数除外)
window.microApp.clearDataListener()`},{header:"二、子应用向基座应用发送数据",slug:"二、子应用向基座应用发送数据",content:`// dispatch只接受对象作为参数
window.microApp.dispatch({type: '子应用发送的数据'})`},{header:"三、基座应用向子应用发送数据",slug:"三、基座应用向子应用发送数据",content:"基座应用向子应用发送数据有两种方式："},{header:"方式1: 通过data属性发送数据",slug:"方式1-通过data属性发送数据",content:`在React中我们需要引入一个polyfill。
在<micro-app>元素所在的文件顶部添加polyfill(注释也要复制)。
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
开始使用
<micro-app name='my-app' url='xx' data={this.state.dataForChild} // data只接受对象类型，采用严格对比(===)，当传入新的data对象时会重新发送
/> vue中和绑定普通属性方式一致。
<template> <micro-app name='my-app' url='xx' :data='dataForChild' // data只接受对象类型，数据变化时会重新发送 />
</template> <script>
export default { data () { return { dataForChild: {type: '发送给子应用的数据'} } }
}
<\/script>`},{header:"方式2: 手动发送数据",slug:"方式2-手动发送数据",content:`手动发送数据需要通过name指定接受数据的子应用，此值和<micro-app>元素中的name一致。
import microApp from '@micro-zoe/micro-app' // 发送数据给子应用 my-app，setData第二个参数只接受对象类型
microApp.setData('my-app', {type: '新的数据'})`},{header:"四、基座应用获取来自子应用的数据",slug:"四、基座应用获取来自子应用的数据",content:"基座应用获取来自子应用的数据有三种方式："},{header:"方式1：直接获取数据",slug:"方式1-直接获取数据-1",content:"import microApp from '@micro-zoe/micro-app' const childData = microApp.getData(appName) // 返回子应用的data数据"},{header:"方式2: 监听自定义事件 (datachange)",slug:"方式2-监听自定义事件-datachange",content:`在React中我们需要引入一个polyfill。
在<micro-app>元素所在的文件顶部添加polyfill(注释也要复制)。
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
开始使用
<micro-app name='my-app' url='xx' // 数据在event.detail.data字段中，子应用每次发送数据都会触发datachange onDataChange={(e) => console.log('来自子应用的数据：', e.detail.data)}
/> vue中监听方式和普通事件一致。
<template> <micro-app name='my-app' url='xx' // 数据在事件对象的detail.data字段中，子应用每次发送数据都会触发datachange @datachange='handleDataChange' />
</template> <script>
export default { methods: { handleDataChange (e) { console.log('来自子应用的数据：', e.detail.data) } }
}
<\/script>`},{header:"方式3: 绑定监听函数",slug:"方式3-绑定监听函数",content:`绑定监听函数需要通过name指定子应用，此值和<micro-app>元素中的name一致。
import microApp from '@micro-zoe/micro-app' function dataListener (data) { console.log('来自子应用my-app的数据', data)
} /** * 绑定监听函数 * appName: 应用名称 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
microApp.addDataListener(appName: string, dataListener: Function, autoTrigger?: boolean) // 解绑监听my-app子应用的函数
microApp.removeDataListener(appName: string, dataListener: Function) // 清空所有监听appName子应用的函数
microApp.clearDataListener(appName: string)`},{header:"全局数据通信",slug:"全局数据通信",content:"全局数据通信会向基座应用和所有子应用发送数据，在跨应用通信的场景中适用。"},{header:"发送全局数据",slug:"发送全局数据",content:`import microApp from '@micro-zoe/micro-app' // setGlobalData只接受对象作为参数
microApp.setGlobalData({type: '全局数据'}) // setGlobalData只接受对象作为参数
window.microApp.setGlobalData({type: '全局数据'})`},{header:"获取全局数据",slug:"获取全局数据",content:`import microApp from '@micro-zoe/micro-app' // 直接获取数据
const globalData = microApp.getGlobalData() // 返回全局数据 function dataListener (data) { console.log('全局数据', data)
} /** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
microApp.addGlobalDataListener(dataListener: Function, autoTrigger?: boolean) // 解绑监听函数
microApp.removeGlobalDataListener(dataListener: Function) // 清空基座应用绑定的所有全局数据监听函数
microApp.clearGlobalDataListener() // 直接获取数据
const globalData = window.microApp.getGlobalData() // 返回全局数据 function dataListener (data) { console.log('全局数据', data)
} /** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
window.microApp.addGlobalDataListener(dataListener: Function, autoTrigger?: boolean) // 解绑监听函数
window.microApp.removeGlobalDataListener(dataListener: Function) // 清空当前子应用绑定的所有全局数据监听函数
window.microApp.clearGlobalDataListener()`},{header:"关闭沙箱后的通信方式",slug:"关闭沙箱后的通信方式",content:`沙箱关闭后，子应用默认的通信功能失效，此时可以通过手动注册通信对象实现一致的功能。
注册方式：在基座应用中为子应用初始化通信对象
import { EventCenterForMicroApp } from '@micro-zoe/micro-app' // 注意：每个子应用根据appName单独分配一个通信对象
window.eventCenterForAppxx = new EventCenterForMicroApp(appName)
子应用就可以通过注册的eventCenterForAppxx对象进行通信，其api和window.microApp一致，基座通信方式没有任何变化。
子应用通信方式：
// 直接获取数据
const data = window.eventCenterForAppxx.getData() // 返回data数据 function dataListener (data) { console.log('来自基座应用的数据', data)
} /** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false */
window.eventCenterForAppxx.addDataListener(dataListener: Function, autoTrigger?: boolean) // 解绑监听函数
window.eventCenterForAppxx.removeDataListener(dataListener: Function) // 清空当前子应用的所有绑定函数(全局数据函数除外)
window.eventCenterForAppxx.clearDataListener() // 子应用向基座应用发送数据，只接受对象作为参数
window.eventCenterForAppxx.dispatch({type: '子应用发送的数据'})
提示 data只接受对象类型
数据变化时会进行严格对比(===)，相同的data对象不会触发更新。
在子应用卸载时，子应用中所有的数据绑定函数会自动解绑，基座应用中的数据解绑需要开发者手动处理。`}]},{path:"/v0/zh/deploy.html",title:"部署",pathLocale:"/",contents:[{header:"部署",slug:"部署",content:""},{header:"前言",slug:"前言",content:`我们强烈建议你保持开发环境和线上环境路径(即webpack的publicPath)的一致性，以避免在部署后出现问题，无论是基座应用还是子应用。
比如一个应用，在部署时作为文件夹 my-app 放入服务器根目录，那么配置如下： // webpack.config.js
module.exports = { output: { path: 'my-app', publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '', // bad ❌ publicPath: '/my-app/', // good 👍 }
} // vue.config.js
module.exports = { outputDir: 'my-app', publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '', // bad ❌ publicPath: '/my-app/', // good 👍
}`},{header:"示例",slug:"示例",content:`正常来说只要开发环境和线上环境资源路径一致，并在部署后设置好nginx的跨域即可，在开发环境正常运行的项目，部署到服务器后，理论上也可以正常运行。
但在实际开发中经常会出现地址404、资源丢失等问题，这通常是因为服务器配置错误或者micro-app元素url属性地址错误导致。
我们以micro-app-demo为例介绍部署相关内容，以供大家参考，因为micro-app-demo覆盖了history路由、hash路由、ssr、根路径、二级路径等大部分场景，是一个典型的案例。`},{header:"代码仓库目录结构：",slug:"代码仓库目录结构",content:`.
├── child_apps
│ ├── angular11 // 子应用 angular11 (history路由)
│ ├── nextjs11 // 子应用 nextjs11 (history路由)
│ ├── nuxtjs2 // 子应用 nuxtjs2 (history路由) │ ├── react16 // 子应用 react16 (history路由)
│ ├── react17 // 子应用 react17 (hash路由)
│ ├── sidebar // 子应用 sidebar，公共侧边栏
│ ├── vite-vue3 // 子应用 vite (hash路由)
│ ├── vue2 // 子应用 vue2 (history路由)
│ └── vue3 // 子应用 vue3 (history路由)
├── main_apps
│ ├── angular11 // 主应用 angular11 (history路由)
│ ├── nextjs11 // 主应用 nextjs11 (history路由)
│ ├── nuxtjs2 // 主应用 nuxtjs2 (history路由)
│ ├── react16 // 主应用 react16 (history路由)
│ ├── react17 // 主应用 react17 (history路由)
│ ├── vite-vue3 // 主应用 vite (history路由)
│ ├── vue2 // 主应用 vue2 (history路由)
│ └── vue3 // 主应用 vue3 (history路由)
├── package.json
└── yarn.lock`},{header:"部署到服务器的目录结构：",slug:"部署到服务器的目录结构",content:`root(服务器根目录)
├── child
│ ├── angular11 // 子应用 angular11
│ ├── react16 // 子应用 react16
│ ├── react17 // 子应用 react17
│ ├── sidebar // 子应用 sidebar
│ ├── vite // 子应用 vite
│ ├── vue2 // 子应用 vue2
│ ├── vue3 // 子应用 vue3
│ ├── nextjs11 // 子应用 nextjs11，为每个基座应用单独打包，端口号：5001~5009
│ └── nuxtjs2 // 子应用 nuxtjs2，为每个基座应用单独打包，端口号：6001~6009
│ ├── main-angular11 // 主应用 angular11
├── main-react16 // 主应用 react16
├── main-react17 // 主应用 react17
├── main-vite // 主应用 vite
├── main-vue2 // 主应用 vue2
├── main-vue3 // 主应用 vue3
├── main-nextjs11 // 主应用 nextjs11，监听端口号：5000
├── main-nuxtjs2 // 主应用 nuxtjs2，监听端口号：7000`},{header:"nginx配置如下：",slug:"nginx配置如下",content:`以下配置仅供参考，具体项目根据实际情况调整。
# micro-zoe.com 相关配置
server { listen 80; server_name www.micro-zoe.com micro-zoe.com; location / { root /root/mygit/micro-zoe; index index.php index.html index.htm; # add_header Cache-Control; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } } # 主应用main-angular11 location /main-angular11 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-angular11/index.html; } # 主应用main-react16 location /main-react16 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-react16/index.html; } # 主应用main-react17 location /main-react17 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-react17/index.html; } # 主应用main-vite location /main-vite { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-vite/index.html; } # 主应用main-vue2 location /main-vue2 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-vue2/index.html; } # 主应用main-vue3 location /main-vue3 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /main-vue3/index.html; } # 子应用child-angular11 location /child/angular11 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/angular11/index.html; } # 子应用child-react16 location /child/react16 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/react16/index.html; } # 子应用child-react17 location /child/react17 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/react17/index.html; } # 子应用child-sidebar location /child/sidebar { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/sidebar/index.html; } # 子应用child-vite location /child/vite { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/vite/index.html; } # 子应用child-vue2 location /child/vue2 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/vue2/index.html; } # 子应用child-vue3 location /child/vue3 { root /root/mygit/micro-zoe; add_header Access-Control-Allow-Origin *; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } try_files $uri $uri/ /child/vue3/index.html; } error_page 404 /404.html; location = /40x.html { } error_page 500 502 503 504 /50x.html; location = /50x.html { }
} # 主应用nextjs11部署后监听5000端口，设置代理指向5000端口，则可以通过 nextjs11.micro-zoe.com 访问主应用
server { listen 80; server_name nextjs11.micro-zoe.com; root html; index index.html index.htm; location / { proxy_pass http://127.0.0.1:5000; proxy_set_header Host $host:80; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # add_header Cache-Control; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } } error_page 404 /404.html; location = /40x.html { } error_page 500 502 503 504 /50x.html; location = /50x.html { }
} # 主应用nuxtjs2部署后监听7000端口，设置代理指向7000端口，则可以通过 nuxtjs2.micro-zoe.com 访问主应用
server { listen 80; server_name nuxtjs2.micro-zoe.com; root html; index index.html index.htm; location / { proxy_pass http://127.0.0.1:7000; proxy_set_header Host $host:80; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # add_header Cache-Control; if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){ add_header Cache-Control max-age=7776000; add_header Access-Control-Allow-Origin *; } } error_page 404 /404.html; location = /40x.html { } error_page 500 502 503 504 /50x.html; location = /50x.html { }
}`},{header:"线上效果如下：",slug:"线上效果如下",content:`main-vue2：http://www.micro-zoe.com/main-vue2/
main-nextjs11：http://nextjs11.micro-zoe.com/
main-nuxtjs2：http://nuxtjs2.micro-zoe.com/`}]},{path:"/v0/zh/dom-scope.html",title:"元素隔离",pathLocale:"/",contents:[{header:"元素隔离",slug:"元素隔离",content:`元素隔离的概念来自ShadowDom，即ShadowDom中的元素可以和外部的元素重复但不会冲突，micro-app模拟实现了类似ShadowDom的功能，元素不会逃离<micro-app>元素边界，子应用只能对自身的元素进行增、删、改、查的操作。
举个栗子🌰 :
基座应用和子应用都有一个元素<div id='root'></div>，此时子应用通过document.querySelector('#root')获取到的是自己内部的#root元素，而不是基座应用的。
基座应用可以获取子应用的元素吗？
可以的！
这一点和ShadowDom不同，在微前端下基座拥有统筹全局的作用，所以我们没有对基座应用操作子应用元素的行为进行限制。`},{header:"解除元素绑定",slug:"解除元素绑定",content:`默认情况下，当子应用操作元素时会绑定元素作用域，而解绑过程是异步的，这可能会导致操作元素异常，此时有两种方式可以解决这个问题。
方式一：执行removeDomScope
执行removeDomScope方法后，元素作用域会重置为基座应用。 import { removeDomScope } from '@micro-zoe/micro-app' // 重置作用域
removeDomScope() // 全局获取id为root的元素
window.document.getElementById('root') // 注意不要使用window.rawWindow
const _window = new Function('return window')() // 重置作用域
window.microApp.removeDomScope() // 全局获取id为root的元素
_window.document.getElementById('root') 方式二：使用setTimeout // 等待解绑结束后操作元素
setTimeout(() => { window.document.getElementById('root') // 全局获取id为root的元素
}, 0) // 注意不要使用window.rawWindow
const _window = new Function('return window')() // 等待解绑结束后操作元素
setTimeout(() => { _window.document.getElementById('root') // 全局获取id为root的元素
}, 0)`}]},{path:"/v0/zh/env.html",title:"环境变量",pathLocale:"/",contents:[{header:"环境变量",slug:"环境变量",content:""},{header:"__MICRO_APP_ENVIRONMENT__",slug:"micro-app-environment",content:`描述：判断应用是否在微前端环境中
在子应用中通过 window.__MICRO_APP_ENVIRONMENT__ 判断是否在微前端环境中。
if (window.__MICRO_APP_ENVIRONMENT__) { console.log('我在微前端环境中')
}`},{header:"__MICRO_APP_NAME__",slug:"micro-app-name",content:`描述：应用名称
在子应用中通过 window.__MICRO_APP_NAME__ 获取应用的name值，即<micro-app>标签的name值。`},{header:"__MICRO_APP_PUBLIC_PATH__",slug:"micro-app-public-path",content:`描述：子应用的静态资源前缀
用于设置webpack动态public-path，将子应用的静态资源补全为 http 开头的绝对地址。
步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
if (window.__MICRO_APP_ENVIRONMENT__) { __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用的入口文件的最顶部引入public-path.js
import './public-path'`},{header:"__MICRO_APP_BASE_ROUTE__",slug:"micro-app-base-route",content:`描述：子应用的基础路由
详情见路由-基础路由一章。`},{header:"__MICRO_APP_BASE_APPLICATION__",slug:"micro-app-base-application",content:`描述：判断应用是否是基座应用
在执行microApp.start()后此值才会生效
if (window.__MICRO_APP_BASE_APPLICATION__) { console.log('我是基座应用')
}`}]},{path:"/v0/zh/jump.html",title:"应用之间跳转",pathLocale:"/",contents:[{header:"应用之间跳转",slug:"应用之间跳转",content:"每个应用的路由实例都是不同的，应用的路由实例只能控制自身，无法影响其它应用，包括基座应用无法通过控制自身路由影响到子应用。 常见的问题如：开发者想通过基座应用的侧边栏跳转，从而控制子应用的页面，这其实是做不到的，只有子应用的路由实例可以控制自身的页面。 要实现应用之间的跳转有两种方式："},{header:"方式一、window.history",slug:"方式一、window-history",content:`通过history.pushState或history.replaceState进行跳转。
例如：
window.history.pushState(history.state, '', 'page2') // 主动触发一次popstate事件
window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
对于hash路由也同样适用
window.history.pushState(history.state, '', '#/page2') // 主动触发一次popstate事件
window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
注意事项 popstate事件是全局发送的，所有正在运行的应用都会接受到新的路由地址并进行匹配，要防止兜底到应用的404页面。
window.history并非适用于所有场景，一些框架如vue-router4，angular会出现问题，此时建议使用下面的方式2、3。`},{header:"方式二、通过数据通信控制跳转",slug:"方式二、通过数据通信控制跳转",content:`适用场景: 基座控制子应用跳转
子应用中监听数据变化
// 监听基座下发的数据变化
window.microApp.addDataListener((data) => { // 当基座下发跳转指令时进行跳转 if (data.path) { router.push(data.path) }
})
基座下发跳转指令
import microApp from '@micro-zoe/micro-app' microApp.setData('子应用name', { path: '/new-path/' })`},{header:"方式三、传递路由实例方法",slug:"方式三、传递路由实例方法",content:`适用场景: 子应用控制基座跳转
基座下发pushState函数： import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import microApp, { removeDomScope } from '@micro-zoe/micro-app' export default () => { const history = useHistory() function pushState (path) { removeDomScope() history.push(path) } useEffect(() => { // 👇 基座向子应用下发一个名为pushState的方法 microApp.setData(子应用名称, { pushState }) }, []) return ( <div> <micro-app name='子应用名称' url='url'></micro-app> </div> )
} <template> <micro-app name='子应用名称' url='url' :data='microAppData' ></micro-app>
</template> <script>
import { removeDomScope } from '@micro-zoe/micro-app' export default { data () { return { microAppData: { pushState: (path) => { removeDomScope() this.$router.push(path) } } } },
}
<\/script> 子应用使用pushState控制基座跳转：
window.microApp.getData().pushState(path)`}]},{path:"/v0/zh/keep-alive.html",title:"keep-alive",pathLocale:"/",contents:[{header:"keep-alive",slug:"keep-alive",content:`0.6.0及以上版本支持
在应用之间切换时，你有时会想保留这些应用的状态，以便恢复用户的操作行为和提升重复渲染的性能，此时开启keep-alive模式可以达到这样的效果。
开启keep-alive后，应用卸载时不会销毁，而是推入后台运行。`},{header:"使用方式",slug:"使用方式",content:"<micro-app name='xx' url='xx' keep-alive></micro-app>"},{header:"生命周期",slug:"生命周期",content:`keep-alive模式与普通模式最大的不同是生命周期，因为它不会被真正的卸载，也就不会触发 unmount 事件。
在基座和子应用中的生命周期如下：`},{header:"基座应用",slug:"基座应用",content:""},{header:"1. created",slug:"_1-created",content:"<micro-app>标签初始化后，加载资源前触发。"},{header:"2. beforemount",slug:"_2-beforemount",content:"加载资源完成后，开始渲染之前触发(只在初始化时执行一次)。"},{header:"3. mounted",slug:"_3-mounted",content:"子应用渲染结束后触发(只在初始化时执行一次)。"},{header:"4. error",slug:"_4-error",content:"子应用渲染出错时触发，只有会导致渲染终止的错误才会触发此生命周期。"},{header:"5. afterhidden",slug:"_5-afterhidden",content:"子应用卸载时触发。"},{header:"6. beforeshow",slug:"_6-beforeshow",content:"子应用再次渲染之前触发(初始化时不执行)。"},{header:"7. aftershow",slug:"_7-aftershow",content:"子应用再次渲染之后触发(初始化时不执行)。"},{header:"监听生命周期",slug:"监听生命周期",content:`因为React不支持自定义事件，所以我们需要引入一个polyfill。
在<micro-app>标签所在的文件顶部添加polyfill，注释也要复制。
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
开始使用
<micro-app name='xx' url='xx' onCreated={() => console.log('micro-app元素被创建')} onBeforemount={() => console.log('即将被渲染，只在初始化时执行一次')} onMounted={() => console.log('已经渲染完成，只在初始化时执行一次')} onAfterhidden={() => console.log('已卸载')} onBeforeshow={() => console.log('即将重新渲染，初始化时不执行')} onAftershow={() => console.log('已经重新渲染，初始化时不执行')} onError={() => console.log('渲染出错')}
/> vue中监听方式和普通事件一致。
<template> <micro-app name='xx' url='xx' @created='created' @beforemount='beforemount' @mounted='mounted' @afterhidden='afterhidden' @beforeshow='beforeshow' @aftershow='aftershow' @error='error' />
</template> <script>
export default { methods: { created () { console.log('micro-app元素被创建'), }, beforemount () { console.log('即将被渲染，只在初始化时执行一次'), }, mounted () { console.log('已经渲染完成，只在初始化时执行一次'), }, afterhidden () { console.log('已卸载'), }, beforeshow () { console.log('即将重新渲染，初始化时不执行'), }, aftershow () { console.log('已经重新渲染，初始化时不执行'), }, error () { console.log('渲染出错'), } }
}
<\/script>`},{header:"子应用",slug:"子应用",content:`keep-alive模式下，在子应用卸载、重新渲染时，micro-app都会向子应用发送名为appstate-change的自定义事件，子应用可以通过监听该事件获取当前状态，状态值可以通过事件对象属性e.detail.appState获取。
e.detail.appState的值有三个：afterhidden、beforeshow、aftershow，分别对应卸载、即将渲染、已经渲染。
// 监听keep-alive模式下的应用状态
window.addEventListener('appstate-change', function (e) { if (e.detail.appState === 'afterhidden') { console.log('已卸载') } else if (e.detail.appState === 'beforeshow') { console.log('即将重新渲染') } else if (e.detail.appState === 'aftershow') { console.log('已经重新渲染') }
})
应用初始化时不会触发appstate-change事件。`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、再次渲染时url和页面不匹配",slug:"_1、再次渲染时url和页面不匹配",content:`keep-alive的应用在卸载时会保留页面状态，再次渲染时直接恢复，当应用再次渲染时的url与离开时不一致，则出现url和页面不匹配的问题。
如果这个问题对你造成了困扰，可以通过监听appstate-change事件，在beforeshow时进行修复，根据url跳转对应的页面。`},{header:"2、如何恢复页面滚动位置？",slug:"_2、如何恢复页面滚动位置",content:"micro-app不会记录页面滚动位置，应用再次渲染时也不会进行恢复，需要开发者进行记录和恢复。"},{header:"3、子应用内部页面切换后状态丢失",slug:"_3、子应用内部页面切换后状态丢失",content:"micro-app的keep-alive是应用级别的，它只会保留当前正在活动的页面状态，以保证应用被卸载和重新渲染时的状态保留，如果想要缓存具体的页面或组件，需要使用子应用框架的能力，如：vue的keep-alive。"}]},{path:"/v0/zh/life-cycles.html",title:"生命周期",pathLocale:"/",contents:[{header:"生命周期",slug:"生命周期",content:"micro-app通过CustomEvent定义生命周期，在组件渲染过程中会触发相应的生命周期事件。"},{header:"生命周期列表",slug:"生命周期列表",content:""},{header:"1. created",slug:"_1-created",content:"<micro-app>标签初始化后，加载资源前触发。"},{header:"2. beforemount",slug:"_2-beforemount",content:"加载资源完成后，开始渲染之前触发。"},{header:"3. mounted",slug:"_3-mounted",content:"子应用渲染结束后触发。"},{header:"4. unmount",slug:"_4-unmount",content:"子应用卸载时触发。"},{header:"5. error",slug:"_5-error",content:"子应用渲染出错时触发，只有会导致渲染终止的错误才会触发此生命周期。"},{header:"监听生命周期",slug:"监听生命周期",content:`因为React不支持自定义事件，所以我们需要引入一个polyfill。
在<micro-app>标签所在的文件顶部添加polyfill，注释也要复制。
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
开始使用
<micro-app name='xx' url='xx' onCreated={() => console.log('micro-app元素被创建')} onBeforemount={() => console.log('即将被渲染')} onMounted={() => console.log('已经渲染完成')} onUnmount={() => console.log('已经卸载')} onError={() => console.log('渲染出错')}
/> vue中监听方式和普通事件一致。
<template> <micro-app name='xx' url='xx' @created='created' @beforemount='beforemount' @mounted='mounted' @unmount='unmount' @error='error' />
</template> <script>
export default { methods: { created () { console.log('micro-app元素被创建') }, beforemount () { console.log('即将被渲染') }, mounted () { console.log('已经渲染完成') }, unmount () { console.log('已经卸载') }, error () { console.log('渲染出错') } }
}
<\/script> 我们可以手动监听生命周期事件。
const myApp = document.querySelector('micro-app[name=my-app]') myApp.addEventListener('created', () => { console.log('created')
}) myApp.addEventListener('beforemount', () => { console.log('beforemount')
}) myApp.addEventListener('mounted', () => { console.log('mounted')
}) myApp.addEventListener('unmount', () => { console.log('unmount')
}) myApp.addEventListener('error', () => { console.log('error')
})`},{header:"全局监听",slug:"全局监听",content:`全局监听会在每个应用的生命周期执行时都会触发。
import microApp from '@micro-zoe/micro-app' microApp.start({ lifeCycles: { created (e) { console.log('created') }, beforemount (e) { console.log('beforemount') }, mounted (e) { console.log('mounted') }, unmount (e) { console.log('unmount') }, error (e) { console.log('error') } }
})`},{header:"子应用卸载",slug:"子应用卸载",content:`对于子应用只有两个生命周期，挂载和卸载。
挂载：子应用的js被执行则为挂载，所以不需要特殊的监听，一般在入口js文件中进行挂载相关操作。
卸载：子应用被卸载时会接受到一个名为unmount的事件，开发者可以在此进行卸载相关操作。
// 子应用卸载
window.addEventListener('unmount', function () { // 执行卸载相关操作
})`}]},{path:"/v0/zh/nest.html",title:"多层嵌套",pathLocale:"/",contents:[{header:"多层嵌套",slug:"多层嵌套",content:`micro-app支持多层嵌套，即子应用可以嵌入其它子应用，但为了防止标签名冲突，子应用中需要做一些修改。
在子应用中设置tagName：
microApp.start({ tagName: 'micro-app-xxx', // 标签名称必须以 \`micro-app-\` 开头
})
在子应用中使用新定义的标签进行渲染，如：
<micro-app-xxx name='xx' url='xx'></micro-app-xxx>
注意
无论嵌套多少层，name都要保证全局唯一。`}]},{path:"/v0/zh/plugins.html",title:"插件系统",pathLocale:"/",contents:[{header:"插件系统",slug:"插件系统",content:`微前端的使用场景非常复杂，没有完美的沙箱方案，所以我们提供了一套插件系统，它赋予开发者灵活处理静态资源的能力，对有问题的资源文件进行修改。
插件系统的主要作用就是对js进行修改，每一个js文件都会经过插件系统，我们可以对这些js进行拦截和处理，它通常用于修复js中的错误或向子应用注入一些全局变量。`},{header:"适用场景",slug:"适用场景",content:"通常我们无法控制js的表现，比如在沙箱中，顶层的变量是无法泄漏为全局变量的（如 var xx = , function xxx 定义变量，无法通过window.xx 访问），导致js报错，此时开发者可以通过插件对js进行修改处理。"},{header:"使用方式",slug:"使用方式",content:"import microApp from '@micro-zoe/micro-app' microApp.start({ plugins: { // 全局插件，作用于所有子应用的js文件 global?: Array<{ // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到基座应用中，scopeProperties可以禁止这种情况) scopeProperties?: string[], // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上) escapeProperties?: string[], // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建 excludeChecker?: (url: string) => boolean // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染 ignoreChecker?: (url: string) => boolean // 可选，传递给loader的配置项 options?: any, // 必填，js处理函数，必须返回code值 loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => code, // 可选，html 处理函数，必须返回 code 值 processHtml?: (code: string, url: string, options: unknown) => code }> // 子应用插件 modules?: { // appName为应用的名称，这些插件只会作用于指定的应用 [appName: string]: Array<{ // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到基座应用中，scopeProperties可以禁止这种情况) scopeProperties?: string[], // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上) escapeProperties?: string[], // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建 excludeChecker?: (url: string) => boolean // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染 ignoreChecker?: (url: string) => boolean // 可选，传递给loader的配置项 options?: any, // 可选，js处理函数，必须返回code值 loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => code, // 可选，html 处理函数，必须返回 code 值 processHtml?: (code: string, url: string, options: unknown) => code }> } }\n})"},{header:"案例",slug:"案例",content:`import microApp from '@micro-zoe/micro-app' microApp.start({ plugins: { global: [ { scopeProperties: ['key', 'key', ...], // 可选 escapeProperties: ['key', 'key', ...], // 可选 excludeChecker: (url) => ['/foo.js', '/bar.css'].some(item => url.includes(item)), // 可选 options: 配置项, // 可选 loader(code, url, options, info) { // 可选 console.log('全局插件') return code }, processHtml(code, url, options, info) { // 可选 console.log('每个子应用 HTML 都会传入') return code }, } ], modules: { 'appName1': [{ loader(code, url, options, info) { if (url === 'xxx.js') { code = code.replace('var abc =', 'window.abc =') } return code } }], 'appName2': [{ scopeProperties: ['key', 'key', ...], // 可选 escapeProperties: ['key', 'key', ...], // 可选 ignoreChecker: (url) => ['/foo.js', '/bar.css'].some(item => url.includes(item)), // 可选 options: 配置项, // 可选 loader(code, url, options, info) { // 可选 console.log('只适用于appName2的插件') return code }, processHtml(code, url, options, info) { // 可选 console.log('只适用于 appName2 的 HTML 处理') return code }, }] } }
})`},{header:"插件列表",slug:"插件列表",content:""},{header:"1、地图插件",slug:"_1、地图插件",content:"微前端 Micro-app 地图插件，适配高德、百度、腾讯地图 🎉🎉🎉"},{header:"使用",slug:"使用",content:`Installation安装地图插件 # with npm npm install @micro-zoe/micro-plugin-map --save-dev # with yarn yarn add @micro-zoe/micro-plugin-map --dev
Usage
we use the package like this step:
1、主用，在入口处安装对应地图的sdk 高德sdk https://webapi.amap.com/maps?v=2.0&key=xxxxxx
腾讯sdk https://map.qq.com/api/gljs?v=1.exp&key=xxxxxx
百度sdk https://api.map.baidu.com/api?type=webgl&v=1.0&ak=xxxxxx 2、在主应用中，使用该包 import microApp from '@micro-zoe/micro-app' import microPluginMap from '@micro-zoe/micro-plugin-map' // 设置为全局插件，作用于所有子应用 microApp.start({ plugins: { global: [microPluginMap], } }) // 或者设置为某个子应用的插件，只作用于当前子应用 microApp.start({ plugins: { modules: { 'appName': [microPluginMap], } } })`},{header:"注意",slug:"注意",content:"目前插件目前仅在with沙箱下适用 插件以umd同步的方式引入sdk，异步加载的方式暂不支持 高德地图的不存在跨域问题，可以不用进行任何操作，高德地图若设置了使用白名单，需将白名单范围囊括主应用域名 腾讯地图，使用时候只是常规的跨越，用此插件进行常规使用即可，腾讯地图若设置了使用白名单，需将白名单范围囊括主应用域名 百度地图，使用时有跨域问题，可用此插件进行处理，百度地图若设置了使用白名单，需将白名单范围囊括主应用域名"},{header:"源码",slug:"源码",content:"micro-plugin-map 源码地址：https://github.com/micro-zoe/micro-plugin-map"}]},{path:"/v0/zh/prefetch.html",title:"预加载",pathLocale:"/",contents:[{header:"预加载",slug:"预加载",content:`预加载是指在应用尚未渲染时提前加载资源并缓存，从而提升首屏渲染速度。
预加载并不是同步执行的，它会在浏览器空闲时间，依照开发者传入的顺序，依次加载每个应用的静态资源，以确保不会影响基座应用的性能。`},{header:"microApp.preFetch(Array<app> | Function => Array<app>)",slug:"microapp-prefetch-array-app-function-array-app",content:`preFetch接受app数组或一个返回app数组的函数，app的值如下：
app: { name: string, // 应用名称，必传 url: string, // 应用地址，必传 disableScopecss?: boolean // 是否关闭样式隔离，非必传 disableSandbox?: boolean // 是否关闭沙盒，非必传
}`},{header:"使用方式",slug:"使用方式",content:`import microApp from '@micro-zoe/micro-app' // 方式一
microApp.preFetch([ { name: 'my-app', url: 'xxx' }
]) // 方式二
microApp.preFetch(() => [ { name: 'my-app', url: 'xxx' }
]) // 方式三
microApp.start({ preFetchApps: [ { name: 'my-app', url: 'xxx' } ], // 函数类型 // preFetchApps: () => [ // { name: 'my-app', url: 'xxx' } // ],
})
Note 预加载入参：disableScopecss、disableSandbox 必须和 <micro-app>配置项保持一致。如果产生冲突，以先执行的一方为准。
如果子应用开启了shadowDOM，则预加载中的disableScopecss需要设置为true`}]},{path:"/v0/zh/questions.html",title:"常见问题",pathLocale:"/",contents:[{header:"常见问题",slug:"常见问题",content:""},{header:"1、我需要用到微前端吗？",slug:"_1、我需要用到微前端吗",content:`在此之前建议你先阅读Why Not Iframe。
相比于iframe，微前端拥有更好的用户体验，同时它也要求开发者对于前端框架和路由原理具有一定的理解。
微前端的本质是将两个不相关的页面强行合并为一，这其中不可避免会出现各种冲突，虽然微前端框架解决了几乎所有的冲突，但偶尔也会有特殊情况出现，这需要开发者具有处理特殊情况的能力和心态。
微前端不是万能的，它的实现原理注定无法像iframe一样简单稳定。
如果你不知道自己是否需要用微前端，那么大概率是不需要。`},{header:"2、子应用一定要支持跨域吗？",slug:"_2、子应用一定要支持跨域吗",content:`是的！
如果是开发环境，可以在webpack-dev-server中设置headers支持跨域。
devServer: { headers: { 'Access-Control-Allow-Origin': '*', },
},
如果是线上环境，可以通过配置nginx支持跨域。`},{header:"3、兼容性如何",slug:"_3、兼容性如何",content:`micro-app依赖于CustomElements和Proxy两个较新的API。
对于不支持CustomElements的浏览器，可以通过引入polyfill进行兼容，详情可参考：webcomponents/polyfills。
但是Proxy暂时没有做兼容，所以对于不支持Proxy的浏览器无法运行micro-app。
浏览器兼容性可以查看：Can I Use
总体如下： PC端：除了IE浏览器，其它浏览器基本兼容。
移动端：ios10+、android5+`},{header:"4、微应用无法渲染但没有报错",slug:"_4、微应用无法渲染但没有报错",content:"请检查路由配置是否正确，详情查看路由一章，或者下面第5条：jsonpFunction是否冲突"},{header:"5、webpack-jsonpfunction-冲突导致渲染失败",slug:"_5、webpack-jsonpfunction-冲突导致渲染失败",content:`这种情况常见于多个应用都是通过create-react-app等类似脚手架创建的项目，或一个应用多次重复渲染。
因为相同的jsonpFunction名称会导致资源加载混乱。
解决方式：修改子应用的webpack配置 // webpack.config.js
module.exports = { output: { ... jsonpFunction: \`webpackJsonp_custom_app_name\`, globalObject: 'window', },
} // webpack.config.js
module.exports = { output: { ... chunkLoadingGlobal: 'webpackJsonp_custom_app_name', globalObject: 'window', },
}`},{header:"6、开发时每次保存文件时报错 (热更新导致报错)",slug:"_6、开发时每次保存文件时报错-热更新导致报错",content:"在一些场景下，热更新会导致保存时报错，请关闭热更新来解决这个问题，同时我们也在尝试更好的解决方案。"},{header:"7、vue3的问题",slug:"_7、vue3的问题",content:`1、样式失效
通过禁用样式隔离解决。
2、图片等静态资源无法正常加载
vue3中需要配置publicPath补全资源路径，详情请查看publicPath`},{header:"8、开发环境中渲染angular子应用报错",slug:"_8、开发环境中渲染angular子应用报错",content:`目前需要关闭angular的热更新来解决这个问题，同时我们也在尝试更好的解决方案。
"scripts": { "start": "ng serve --live-reload false",
},`},{header:"9、micro-app 报错 an app named xx already exists",slug:"_9、micro-app-报错-an-app-named-xx-already-exists",content:"这是name名称冲突导致的，请确保每个子应用的name值是唯一的。"},{header:"10、基座应用的样式影响到子应用",slug:"_10、基座应用的样式影响到子应用",content:`虽然我们将子应用的样式进行隔离，但基座应用的样式依然会影响到子应用，如果发生冲突，推荐通过约定前缀或CSS Modules方式解决。
如果你使用的是ant-design等组件库，一般会提供添加前缀进行样式隔离的功能。`},{header:"11、子应用在沙箱环境中如何获取到外部真实window？",slug:"_11、子应用在沙箱环境中如何获取到外部真实window",content:`目前有3种方式在子应用中获取外部真实window 1、new Function("return window")() 或 Function("return window")()
2、(0, eval)('window')
3、window.rawWindow`},{header:"12、错误信息：xxx 未定义",slug:"_12、错误信息-xxx-未定义",content:`包括： xxx is not defined
xxx is not a function
Cannot read properties of undefined 原因：
在微前端的沙箱环境中，顶层变量不会泄漏为全局变量。
例如在正常情况下，通过 var name 或 function name () {} 定义的顶层变量会泄漏为全局变量，通过window.name或name就可以全局访问。
但是在沙箱环境下这些顶层变量无法泄漏为全局变量，window.name或name为undefined，导致出现问题。
解决方式：
方式一：手动修改
将 var name 或 function name () {} 修改为 window.name = xx
方式二：通过插件系统修改子应用代码
比如常见的加载webpack打包的dll文件失败的问题，因为dll文件的内容和js地址相对固定，可以直接进行全局查找和修改。
microApp.start({ plugins: { modules: { 应用名称: [{ loader(code, url) { if (url === 'xxx.js') { code = code.replace('var xx_dll=', 'window.xx_dll=') } return code } }] } }
})`},{header:"13、子应用加载sockjs-node失败",slug:"_13、子应用加载sockjs-node失败",content:`这个问题常见于create-react-app创建的子应用，推荐通过插件系统来解决。
microApp.start({ plugins: { modules: { '子应用name': [{ loader(code) { if (code.indexOf('sockjs-node') > -1) { code = code.replace('window.location.port', '子应用端口').replace('window.location.hostname', '子应用host，如果和基座相同则不需要替换hostname') } return code } }], } }
})
实际情况可能更加复杂，上面只是一种解决思路。`},{header:"14、子应用请求接口失败",slug:"_14、子应用请求接口失败",content:`1、请确保接口请求没有跨域问题，因为子应用被加载到基座渲染，所以请求接口是从基座发送。 2、请求的接口为相对地址，会以基座域名进行补全，导致报错。
如：fetch('/api/data')，在请求时会自动被浏览器补全为fetch(基座域名 + '/api/data')
为了避免这个问题，子应用需要使用完整的地址：fetch(子应用域名 + '/api/data')`},{header:"15、子应用反向代理失败",slug:"_15、子应用反向代理失败",content:`解决方式： 子应用使用完整的地址发送请求
如：fetch('/api/data') 改为 fetch(子应用域名 + '/api/data')
如果还是报跨域问题，则是服务端做了限制，此时需要撤除上述操作，并将子应用的代理放到基座应用中。`},{header:"16、子应用多次渲染后内存越来越大",slug:"_16、子应用多次渲染后内存越来越大",content:"参考内存优化一章"},{header:"17、子应用之间如何跳转",slug:"_17、子应用之间如何跳转",content:"参考应用之间如何跳转一章"},{header:"18、jsonp请求如何处理？",slug:"_18、jsonp请求如何处理",content:"参考ignore"},{header:"19、子应用通过a标签下载文件失败",slug:"_19、子应用通过a标签下载文件失败",content:`原因： 当跨域时(基座和文件在不同域名下)，无法通过a标签的download属性实现下载。
解决方式：
方式1： 转换为blob形式下载
<a href='xxx.png' download="filename.png" @click='downloadFile'>下载</a>
// 通过blob下载文件
function downloadFile (e) { // 微前端环境下转换为blob下载，子应用单独运行时依然使用a标签下载 if (window.__MICRO_APP_ENVIRONMENT__) { e.preventDefault() // 注意href必须是绝对地址 fetch(e.target.href).then((res) => { res.blob().then((blob) => { const blobUrl = window.URL.createObjectURL(blob) // 转化为blobURL后再通过a标签下载 const a = document.createElement('a') a.href = blobUrl a.download = 'filename.png' a.click() window.URL.revokeObjectURL(blobUrl) }) }) }
}
方式2： 将文件放到基座域名下，判断微前端环境下a标签href属性设置为基座的文件地址`}]},{path:"/v0/zh/route.html",title:"路由",pathLocale:"/",contents:[{header:"路由",slug:"路由",content:"微前端的渲染离不开路由，而路由配置是最容易出问题的地方。"},{header:"路由配置",slug:"路由配置",content:""},{header:"路由类型约束",slug:"路由类型约束",content:`1、基座是hash路由，子应用也必须是hash路由
2、基座是history路由，子应用可以是hash或history路由`},{header:"基础路由",slug:"基础路由",content:`作用：
通常基座应用和子应用各有一套路由系统，为了防止冲突，基座需要分配一个路由给子应用，称之为基础路由，子应用可以在这个路由下渲染，但不能超出这个路由的范围，这就是基础路由的作用。
使用方式
基座应用中通过设置 <micro-app>的baseroute属性下发，子应用通过window.__MICRO_APP_BASE_ROUTE__获取此值并设置基础路由。
注意点： 1、如果基座是history路由，子应用是hash路由，不需要设置基础路由baseroute
2、如果子应用只有一个页面，没有使用react-router，vue-router之类，也不需要设置基础路由baseroute
3、vue-router在hash模式下无法通过base设置基础路由，需要创建一个空的路由页面，将其它路由作为它的children，具体设置如下： import RootApp from './root-app.vue' const routes = [ { path: window.__MICRO_APP_BASE_ROUTE__ || '/', component: RootApp, children: [ // 其他的路由都写到这里 ], },
]
root-app.vue内容如下：
<template> <router-view />
</template>
示例 // router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ChildPage from './child-page' export default function AppRoute () { return ( <BrowserRouter> <Switch> // 非严格匹配，/child/* 都指向ChildPage组件 // /child 就是分配给子应用的基础路由baseroute <Route path='/child'> <ChildPage /> </Route> </Switch> </BrowserRouter> )
} // child-page.js
export function ChildPage () { return ( <div> <h1>子应用</h1> <micro-app name='child-app' url='http://localhost:3000/' baseroute='/child'></micro-app> </div> )
} import { BrowserRouter, Switch, Route } from 'react-router-dom' export default function AppRoute () { return ( // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串 <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}> ... </BrowserRouter> )
} // router.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import ChildPage from './child-page.vue' Vue.use(VueRouter) const routes = [ { // /child/* 都指向ChildPage组件 path: '/child/*', // vue-router@4.x path的写法为：'/child/:page*' name: 'child', component: ChildPage, },
] export default routes // child-page.vue
<template> <div> <h1>子应用</h1> <micro-app name='child-app' url='http://localhost:3000/' baseroute='/child'></micro-app> </div>
</template> import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router' const router = new VueRouter({ // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串 base: window.__MICRO_APP_BASE_ROUTE__ || '/', routes,
}) let app = new Vue({ router, render: h => h(App),
}).$mount('#app') 提示
vue-router@4.x设置base的方式请查看 https://next.router.vuejs.org/`},{header:"url属性和子应用路由的关系",slug:"url属性和子应用路由的关系",content:`答：没有关系！
micro-app的url属性只是html的地址，它的作用就是加载html资源。`},{header:"子应用不会根据micro-app的url属性渲染对应的页面，而是根据浏览器地址渲染对应的页面。",slug:"子应用不会根据micro-app的url属性渲染对应的页面-而是根据浏览器地址渲染对应的页面。",content:`举个栗子 🌰 :
浏览器地址为：http://localhost:3000/page1/，此时路由地址为page1。
基座应用会匹配page1并渲染对应的组件，子应用也是一样，浏览器地址会同时影响到基座应用和子应用，因为每个应用都有一套自己的路由系统，它们是可以共存的，不会冲突。
此时我们要渲染子应用http://www.xxx.com/的page1页面，那么micro-app的url属性填写的是http://www.xxx.com/，而不是http://www.xxx.com/page1/。
<micro-app url='http://www.xxx.com/'></micro-app>
子应用加载完成后会根据浏览器的地址page1匹配并渲染对应的页面。
同理，页面参数和hash也是以浏览器为准。
栗子2 🌰 :
子应用是hash路由，我们要渲染子应用的page1页面，那么在micro-app的url属性上设置hash值是无效的，#/page1应该添加到浏览器地址上。
<!-- ❌ 这里的#/page1是无效的，应该添加到浏览器地址上 -->
<micro-app url='http://www.xxx.com/#/page1'></micro-app> <!-- ✔️ 这个url才是正确的 -->
<micro-app url='http://www.xxx.com/'></micro-app>
栗子3 🌰 :
基座应用是history路由，子应用是hash路由，我们要跳转基座应用的my-app页面，页面中嵌入子应用，我们要展现子应用的page1页面。
那么浏览器地址应该为：域名/my-page#/page1，我们在基座中跳转my-app页面的参数为：router.push('/my-page#/page1')
此时流程为：基座应用匹配到/my-page路径并渲染my-app页面，因为my-app页面中嵌入了子应用，此时子应用开始加载并渲染，子应用在渲染时会匹配到#/page1并渲染page1页面。
micro-app配置如下：
<!-- 此时不需要设置baseroute -->
<micro-app url='http://www.xxx.com/index.html'></micro-app>
栗子4 🌰 :
基座应用是history路由，子应用也是history路由，我们要跳转基座应用的my-app页面，my-app页面中嵌入子应用，我们要展现子应用的page1页面。
那么浏览器地址应该为：域名/my-page/page1，我们在基座中跳转的参数为：router.push('/my-page/page1')
此时流程为：基座应用匹配到/my-page路径并渲染my-app页面，因为my-app页面中嵌入了子应用，此时子应用开始加载并渲染，子应用在渲染时会匹配到/my-page/page1并渲染page1页面。
micro-app配置如下：
这就是在快速开始一章中提到的案例。
<!-- 子应用通过baseroute设置基础路由，路由 /page1 变为 /my-page/page1 -->
<micro-app url='http://www.xxx.com/index.html' baseroute='/my-page'></micro-app>
提示
如果你看到这里还是无法正确设置路由，那么将基座应用设置为history路由，子应用设置为hash路由，可以一劳永逸解决所有问题，此时不需要设置baseroute，也不需要修改基座和子应用的任何路由设置。`}]},{path:"/v0/zh/sandbox.html",title:"JS沙箱",pathLocale:"/",contents:[{header:"JS沙箱",slug:"js沙箱",content:""},{header:"沙箱介绍",slug:"沙箱介绍",content:`我们使用Proxy拦截了用户全局操作的行为，防止对window的访问和修改，避免全局变量污染。micro-app中的每个子应用都运行在沙箱环境，以获取相对纯净的运行空间。
沙箱是默认开启的，正常情况下不建议关闭，以避免出现不可预知的问题。
如何关闭沙箱请查看：disableSandbox`},{header:"注意事项",slug:"注意事项",content:""},{header:"1、子应用在沙箱环境中如何获取到真实window",slug:"_1、子应用在沙箱环境中如何获取到真实window",content:`目前有3种方式在子应用中获取外部真实window 1、new Function("return window")() 或 Function("return window")()
2、(0, eval)('window')
3、window.rawWindow`},{header:"2、子应用抛出错误信息：xxx 未定义",slug:"_2、子应用抛出错误信息-xxx-未定义",content:`包括： xxx is not defined
xxx is not a function
Cannot read properties of undefined 原因：
在沙箱环境中，顶层变量不会泄漏为全局变量。
例如在正常情况下，通过 var name 或 function name () {} 定义的顶层变量会泄漏为全局变量，通过window.name或name就可以全局访问。
但是在沙箱环境下这些顶层变量无法泄漏为全局变量，window.name或name的值为undefined，导致出现问题。
解决方式：
方式一：手动修改
将 var name 或 function name () {} 修改为 window.name = xx
方式二：通过插件系统修改子应用代码
比如常见的加载webpack打包的dll文件失败的问题，因为dll文件的内容和js地址相对固定，可以直接进行全局查找和修改。
microApp.start({ plugins: { modules: { 应用名称: [{ loader(code, url) { if (url === 'xxx.js') { code = code.replace('var xx_dll=', 'window.xx_dll=') } return code } }] } }
})`}]},{path:"/v0/zh/scopecss.html",title:"样式隔离",pathLocale:"/",contents:[{header:"样式隔离",slug:"样式隔离",content:""},{header:"一、样式隔离",slug:"一、样式隔离",content:`MicroApp的样式隔离是默认开启的，开启后会以<micro-app>标签作为样式作用域，利用标签的name属性为每个样式添加前缀，将子应用的样式影响禁锢在当前标签区域。
.test { color: red;
} /* 转换为 */
micro-app[name=xxx] .test { color: red;
}
但基座应用的样式依然会对子应用产生影响，如果发生样式污染，推荐通过约定前缀或CSS Modules方式解决。`},{header:"二、禁用样式隔离",slug:"二、禁用样式隔离",content:"禁用样式隔离分四个层次："},{header:"1、在所有应用中禁用",slug:"_1、在所有应用中禁用",content:`这主要通过start方法进行全局配置，设置后所有应用的样式隔离都会停止。
import microApp from '@micro-zoe/micro-app' microApp.start({ disableScopecss: true, // 默认值false
})
如果希望在某个应用中不受全局配置控制，可以设置disableScopecss='false'
<micro-app name='xx' url='xx' disableScopecss='false'></micro-app>`},{header:"2、在某一个应用中禁用",slug:"_2、在某一个应用中禁用",content:`设置后，当前应用的所有css都不会进行样式隔离。
<micro-app name='xx' url='xx' disableScopecss 或 disable-scopecss></micro-app>`},{header:"3、在某一个文件中禁用",slug:"_3、在某一个文件中禁用",content:`可以在你的css文件中使用以下格式的注释来禁用样式隔离：
/*! scopecss-disable */
.test1 { color: red;
}
/*! scopecss-enable */
你也可以对指定的选择器禁用样式隔离:
/*! scopecss-disable .test1, .test2 */
.test1 { color: red;
}
.test2 { color: yellow;
}
.test3 { color: green;
}
/*! scopecss-enable */
如果想在整个文件范围内禁用样式隔离，将 /*! scopecss-disable */ 注释放在文件顶部：
/*! scopecss-disable */
...`},{header:"4、在某一行中禁用",slug:"_4、在某一行中禁用",content:`在文件中使用以下格式的注释在某一特定的行上禁用样式隔离：
/*! scopecss-disable-next-line */
.test1 { color: red;
} .test2 { /*! scopecss-disable-next-line */ background: url(/test.png);
}
Note
上述注释规则都以叹号开头(d/*! */)，这是因为在build时大部分项目会将css中的注释删除以压缩体积，叹号开头是cssnano的一种规则，可以防止在build时注释被删除discardcomments。
我们以cssnano为例，是因为它是PostCSS中使用最广泛的压缩插件，如果你使用了另外的压缩工具，请根据实际情况调整，防止build后的注释被删除。`},{header:"三、shadowDOM",slug:"三、shadowdom",content:`shadowDOM具有更好的隔离性，但一些框架(如React)对shadowDOM的兼容性不好，请谨慎使用。
开启shadowDOM后，默认的样式隔离将失效。
开启方式：shadowDOM`}]},{path:"/v0/zh/start.html",title:"快速开始",pathLocale:"/",contents:[{header:"快速开始",slug:"快速开始",content:"我们分别列出基座应用和子应用需要进行的修改，具体介绍micro-app的使用方式。"},{header:"基座应用",slug:"基座应用",content:`1、安装依赖
npm i @micro-zoe/micro-app --save
2、在入口处引入
// index.js
import microApp from '@micro-zoe/micro-app' microApp.start()
3、分配一个路由给子应用 // router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MyPage from './my-page' export default function AppRoute () { return ( <BrowserRouter> <Switch> // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面 <Route path='/my-page'> <MyPage /> </Route> </Switch> </BrowserRouter> )
} // router.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPage from './my-page.vue' Vue.use(VueRouter) const routes = [ { // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面 path: '/my-page/*', // vue-router@4.x path的写法为：'/my-page/:page*' name: 'my-page', component: MyPage, },
] export default routes 4、在MyPage页面中嵌入子应用 // my-page.js
export function MyPage () { return ( <div> <h1>子应用</h1> // name(必传)：应用名称 // url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html // baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 \`/my-page\` <micro-app name='app1' url='http://localhost:3000/' baseroute='/my-page'></micro-app> </div> )
} <!-- my-page.vue -->
<template> <div> <h1>子应用</h1> <!-- name(必传)：应用名称 url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 \`/my-page\` --> <micro-app name='app1' url='http://localhost:3000/' baseroute='/my-page'></micro-app> </div>
</template>`},{header:"子应用",slug:"子应用",content:`1、设置基础路由(如果基座应用是history路由，子应用是hash路由，这一步可以省略) // router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom' export default function AppRoute () { return ( // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串 <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}> ... </BrowserRouter> )
} // main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router' const router = new VueRouter({ // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串 base: window.__MICRO_APP_BASE_ROUTE__ || '/', routes,
}) let app = new Vue({ router, render: h => h(App),
}).$mount('#app') 2、在webpack-dev-server的headers中设置跨域支持。
devServer: { headers: { 'Access-Control-Allow-Origin': '*', }
},
完成以上步骤微前端即可正常渲染。
Note name必须以字母开头，且不可以带有除中划线和下划线外的特殊符号
url只是html地址，子应用的页面渲染还是基于浏览器地址的，关于这点请查看路由一章
baseroute的作用请查看路由配置
子应用必须支持跨域访问，跨域配置参考这里`}]},{path:"/v0/zh/static-source.html",title:"静态资源",pathLocale:"/",contents:[{header:"静态资源",slug:"静态资源",content:""},{header:"资源路径自动补全",slug:"资源路径自动补全",content:`是指对子应用相对地址的资源路径进行补全，以确保所有资源正常加载，它是micro-app默认提供的功能。
如：子应用中引用图片/myapp/test.png，在最终渲染时会补全为http://localhost:8080/myapp/test.png
资源路径补全分为两个方面：
1、针对资源标签
如 link、script、img
2、针对css的远程资源
如 background-image、@font-face 自动补全有时会失效，因为一些框架和库在特定场景下创建的元素无法被拦截和处理，或者当关闭样式隔离和沙箱时，也会导致自动补全失效。
此时推荐使用下面publicPath方案解决。`},{header:"publicPath",slug:"publicpath",content:`如果自动补全失败，可以采用运行时publicPath方案解决。
这是由webpack提供的功能，会在运行时动态设置webpack.publicPath，详细配置参考webpack文档 publicPath
如果你已经设置了publicPath为带域名的绝对地址(如：https://xxx)，则忽略此章节`},{header:"设置方式",slug:"设置方式",content:`步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) { // eslint-disable-next-line __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用入口文件的最顶部引入public-path.js
// entry
import './public-path'`},{header:"资源共享",slug:"资源共享",content:`当多个子应用拥有相同的js或css资源，可以指定这些资源在多个子应用之间共享，在子应用加载时直接从缓存中提取数据，从而提高渲染效率和性能。
设置资源共享的方式有两种：`},{header:"方式一、globalAssets",slug:"方式一、globalassets",content:`globalAssets用于设置全局共享资源，它和预加载的思路相同，在浏览器空闲时加载资源并放入缓存。
当子应用加载相同地址的js或css资源时，会直接从缓存中提取数据，从而提升渲染速度。
使用方式
// index.js
import microApp from '@micro-zoe/micro-app' microApp.start({ globalAssets: { js: ['js地址1', 'js地址2', ...], // js地址 css: ['css地址1', 'css地址2', ...], // css地址 }
})`},{header:"方式二、global 属性",slug:"方式二、global-属性",content:`在link、script设置global属性会将文件提取为公共文件，共享给其它应用。
设置global属性后文件第一次加载会放入公共缓存，其它子应用加载相同的资源时直接从缓存中读取内容，从而提升渲染速度。
使用方式
<link rel="stylesheet" href="xx.css" global>
<script src="xx.js" global><\/script>`},{header:"资源过滤",slug:"资源过滤",content:`当子应用不需要加载某个js或css，可以通过在link、script、style设置exclude属性过滤这些资源，当micro-app遇到带有exclude属性的元素会进行删除。
使用方式
<link rel="stylesheet" href="xx.css" exclude>
<script src="xx.js" exclude><\/script>
<style exclude></style>`}]},{path:"/zh/framework/angular.html",title:"Angular",pathLocale:"/",contents:[{header:"Angular",slug:"angular",content:"本篇以angular 11作为案例介绍angular的接入方式，其它版本angular接入方式会在后续补充，如果你在使用时出现问题，请在github上提issue告知我们。"},{header:"作为主应用",slug:"作为主应用",content:""},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、初始化micro-app",slug:"_2、初始化micro-app",content:`// main.ts
import microApp from '@micro-zoe/micro-app' microApp.start()`},{header:"3、增加对WebComponent的支持",slug:"_3、增加对webcomponent的支持",content:`在app/app.module.ts中添加 CUSTOM_ELEMENTS_SCHEMA 到 @NgModule.schemas
// app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; @NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA],
})`},{header:"4、在页面中嵌入子应用",slug:"_4、在页面中嵌入子应用",content:`<!-- app/my-page/my-page.component.html -->
<div> <h1>子应用</h1> <!-- name：应用名称, url：应用地址 --> <micro-app name='my-app' url='http://localhost:3000/'></micro-app>
</div>
Note name：必传参数，必须以字母开头，且不可以带特殊符号(中划线、下划线除外)
url：必传参数，必须指向子应用的index.html，如：http://localhost:3000/ 或 http://localhost:3000/index.html`},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、在主应用中引入zone.js",slug:"_1、在主应用中引入zone-js",content:`如果主应用非angular，那么主应用需要引入zone.js才能正确加载angular子应用。
步骤1、安装依赖
npm i zone.js --save
步骤2、在主应用中引入zone.js
import 'zone.js'`},{header:"2、设置跨域支持",slug:"_2、设置跨域支持",content:`angular官方脚手架创建的项目在开发环境下默认支持跨域访问，不需要特殊处理。
其它项目在webpack-dev-server中添加headers。
headers: { 'Access-Control-Allow-Origin': '*',
}`},{header:"3、监听卸载事件",slug:"_3、监听卸载事件",content:`子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。
// main.ts
let app: void | NgModuleRef<AppModule>
platformBrowserDynamic() .bootstrapModule(AppModule) .then((res: NgModuleRef<AppModule>) => { app = res }) // 监听卸载操作
window.unmount = () => { app && app.destroy(); app = undefined;
}
完成以上步骤微前端即可正常渲染。`},{header:"可选设置",slug:"可选设置",content:"以下配置是针对子应用的，它们是可选的，建议根据实际情况选择设置。"},{header:"1、开启umd模式，优化内存和性能",slug:"_1、开启umd模式-优化内存和性能",content:`MicroApp支持两种渲染微前端的模式，默认模式和umd模式。 默认模式： 子应用在初次渲染和后续渲染时会顺序执行所有js，以保证多次渲染的一致性。
umd模式： 子应用暴露出mount、unmount方法，此时只在初次渲染时执行所有js，后续渲染只会执行这两个方法，在多次渲染时具有更好的性能和内存表现。 如果子应用渲染和卸载不频繁，那么使用默认模式即可，如果子应用渲染和卸载非常频繁建议使用umd模式。
// main.ts
import { NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; declare global { interface Window { microApp: any mount: CallableFunction unmount: CallableFunction __MICRO_APP_ENVIRONMENT__: string }
} let app: void | NgModuleRef<AppModule>
// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => { platformBrowserDynamic() .bootstrapModule(AppModule) .then((res: NgModuleRef<AppModule>) => { app = res }) .catch(err => console.error(err))
} // 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => { // angular在部分场景下执行destroy时会删除根元素app-root，导致在此渲染时报错，此时可删除app.destroy()来避免这个问题 app && app.destroy(); app = undefined;
} // 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) { window.mount();
}`},{header:"2、设置 webpack.jsonpFunction",slug:"_2、设置-webpack-jsonpfunction",content:`如果微前端正常运行，则可以忽略这一步。
如果子应用资源加载混乱导致渲染失败，可以尝试设置jsonpFunction来解决，因为相同的jsonpFunction名称会导致资源污染。
这种情况常见于主应用和子应用都是通过create-react-app等脚手架创建的react项目，vue项目中并不常见。
解决方式：修改子应用的webpack配置 // webpack.config.js
module.exports = { output: { ... jsonpFunction: \`webpackJsonp_自定义名称\`, globalObject: 'window', },
} // webpack.config.js
module.exports = { output: { ... chunkLoadingGlobal: 'webpackJsonp_自定义名称', globalObject: 'window', },
}`},{header:"3、设置 publicPath",slug:"_3、设置-publicpath",content:`如果子应用出现静态资源地址404(js、css、图片)，建议设置publicPath来尝试解决这个问题。
publicPath是webpack提供的功能，它可以补全静态资源的地址，详情参考webpack文档 publicPath
步骤1: 在子应用src目录下创建名称为public-path.ts的文件，并添加如下内容
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) { // eslint-disable-next-line __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用入口文件的最顶部引入public-path.ts
// entry
import './public-path'`},{header:"4、切换到iframe沙箱",slug:"_4、切换到iframe沙箱",content:`MicroApp有两种沙箱方案：with沙箱和iframe沙箱。
默认开启with沙箱，如果with沙箱无法正常运行，可以尝试切换到iframe沙箱。`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、通过micro-app数据通信修改angular组件数据后视图不更新",slug:"_1、通过micro-app数据通信修改angular组件数据后视图不更新",content:`原因： 因为在angular区域外调用了内部的代码(主应用和子应用属于不同的angular区域)，angular无法知道状态发生了变化。
解决方式： 通过ngZone.run()触发更改检测，具体方式如下：`},{header:"2、主应用是react、nextjs应用，引入zone.js后导致micro-app元素生命周期异常",slug:"_2、主应用是react、nextjs应用-引入zone-js后导致micro-app元素生命周期异常",content:"目前无法解决，请暂停使用生命周期函数。"}]},{path:"/zh/framework/introduce.html",title:"",pathLocale:"/",contents:[{header:"",slug:"",content:`上面的文档中，我们从功能的角度介绍如何接入微前端，这导致整体的逻辑不连贯。
在手把手系列中，我们会侧重于前端框架本身，详细介绍它们作为主应用和子应用如何接入微前端。
我们列举比较流行的前端框架，指出各框架的注意事项，规避各种可能出现的问题。
目前有： react
vue
vite
angular
nextjs
nuxtjs 提示
以上框架可以任意组合，换句话说任何一个框架都可以作为主应用嵌入其它类型的子应用，任何一个框架也可以作为子应用被其它框架嵌入，包括上面没有列举出的其它库，如 svelte、umi ...
我们只列举了部分框架，如果有其它框架需求，请在github上提issue告知我们。`}]},{path:"/zh/framework/nextjs.html",title:"Nextjs",pathLocale:"/",contents:[{header:"Nextjs",slug:"nextjs",content:"本篇以nextjs 11作为案例介绍nextjs的接入方式，其它版本nextjs接入方式会在后续补充，如果你在使用时出现问题，请在github上提issue告知我们。"},{header:"作为主应用",slug:"作为主应用",content:""},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、初始化micro-app",slug:"_2、初始化micro-app",content:`因为webComponent只能运行在浏览器环境，所以我们在pages/_app.jsx的useEffect中进行初始化。
// pages/_app.jsx
import { useEffect } from 'react'
import microApp from '@micro-zoe/micro-app' function MyApp({ Component, pageProps }) { useEffect(() => { // 初始化micro-app microApp.start() }, []) return <Component {...pageProps} />
} export default MyApp`},{header:"3、在页面中嵌入子应用",slug:"_3、在页面中嵌入子应用",content:`因为micro-app只能运行在浏览器环境，所以在useEffect中通过变量控制子应用显示。
// pages/my-page.js
import { useState, useEffect } from 'react' const MyPage = () => { const [show, changeShow] = useState(false) useEffect(() => { changeShow(true) }, []) return ( <div> <h1>子应用</h1> { // name：应用名称, url：应用地址 show && (<micro-app name='my-app' url='http://localhost:3000/'></micro-app>) } </div> )
} export default MyPage
Note name：必传参数，必须以字母开头，且不可以带特殊符号(中划线、下划线除外)
url：必传参数，必须指向子应用的index.html，如：http://localhost:3000/ 或 http://localhost:3000/index.html`},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、在主应用中添加ssr配置",slug:"_1、在主应用中添加ssr配置",content:`当子应用是ssr应用时，主应用需要在micro-app元素上添加ssr属性，此时micro-app会根据ssr模式加载子应用。
<micro-app name='xx' url='xx' ssr></micro-app>`},{header:"2、设置跨域支持",slug:"_2、设置跨域支持",content:`通过自定义服务设置跨域访问，详情参考 custom-server
步骤1、在根目录创建server.js
server.js的内容如下：
// server.js
const express = require('express')
const next = require('next')
const config = require('./next.config') const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler() app.prepare().then(() => { const server = express() // 设置跨域支持 server.all('*', (req, res) => { res.setHeader('access-control-allow-origin', '*') return handle(req, res) }) server.listen(port, (err) => { if (err) throw err console.log(\`> Ready on http://localhost:\${port}/\`) })
})
步骤2、修改package.json中的scripts，如下：
"scripts": { "dev": "node server.js", "build": "next build", "start": "cross-env NODE_ENV=production node server.js"
}`},{header:"3、设置assetPrefix 和 publicRuntimeConfig",slug:"_3、设置assetprefix-和-publicruntimeconfig",content:`在next.config.js中设置assetPrefix，为静态资源添加路径前缀，避免子应用的静态资源使用相对地址时加载失败的情况。
// next.config.js
const basePath = '基础路由' // 默认为 '/'
// 静态资源路径前缀
const assetPrefix = process.env.NODE_ENV === 'production' ? \`线上域名\${basePath}\` : \`http://localhost:\${process.env.PORT || 3000}\${basePath}\` module.exports = { basePath, assetPrefix, // 添加 assetPrefix 地址到 publicRuntimeConfig publicRuntimeConfig: { assetPrefix, },
}
assetPrefix只对js、css等静态资源生效，对本地图片无效。
为此我们将assetPrefix作为参数传入publicRuntimeConfig，开发者需要手动通过publicRuntimeConfig补全图片地址。
方式如下：
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig() const Page = () => { return ( <div> <img src={\`\${publicRuntimeConfig.assetPrefix}/local-img.png\`} /> </div> )
} export default Page`},{header:"4、监听卸载",slug:"_4、监听卸载",content:`子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。
// 监听卸载操作
window.addEventListener('unmount', function () { // 执行卸载相关操作
})
Note
nextjs默认支持css module功能，如果你使用了此功能，建议关闭样式隔离以提升性能：<micro-app name='xx' url='xx' disableScopecss></micro-app>`},{header:"5、切换到iframe沙箱",slug:"_5、切换到iframe沙箱",content:`MicroApp有两种沙箱方案：with沙箱和iframe沙箱。
默认开启with沙箱，如果with沙箱无法正常运行，可以尝试切换到iframe沙箱。`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、使用next/image组件加载图片失败",slug:"_1、使用next-image组件加载图片失败",content:`解决方式：
在部分nextjs版本中(如：nextjs 11)，使用next/image组件无法正确引入图片，此时推荐使用img元素代替。`},{header:"2、无法预加载ssr子应用",slug:"_2、无法预加载ssr子应用",content:"原因： 因为ssr应用每个路由地址加载的html、js、css等静态资源都不同，所以无法对ssr子应用使用预加载。"},{header:"3、控制台报错Cannot read properties of null (reading 'tagName')",slug:"_3、控制台报错cannot-read-properties-of-null-reading-tagname",content:`原因： 当主应用和子应用都是nextjs应用时，next/head组件冲突。
解决方式： 去掉子应用中next/head组件。`},{header:"4、webpack.jsonpFunction冲突，导致加载子应用失败",slug:"_4、webpack-jsonpfunction冲突-导致加载子应用失败",content:`原因： 当主应用和子应用都是官方脚手架创建的项目，容易造成webpack.jsonpFunction冲突。
解决方式： 修改子应用的webpack配置。
jsonpFunction是webpack4中的名称，在webpack5中名称为chunkLoadingGlobal，请根据自己项目的webpack版本设置。
在next.config.js中配置webpack：
// next.config.js
module.exports = { webpack: (config) => { Object.assign(config.output, { chunkLoadingGlobal: 'webpackJsonp_自定义名称', // webpack5 // jsonpFunction: 'webpackJsonp_自定义名称', // webpack4 globalObject: 'window', }) return config },
}
提示
nextjs相关问题可以在nextjs专属讨论贴下反馈。`}]},{path:"/zh/framework/nuxtjs.html",title:"Nuxtjs",pathLocale:"/",contents:[{header:"Nuxtjs",slug:"nuxtjs",content:"本篇以nuxtjs 2作为案例介绍nuxtjs的接入方式，其它版本nuxtjs接入方式会在后续补充，如果你在使用时出现问题，请在github上提issue告知我们。"},{header:"作为主应用",slug:"作为主应用",content:""},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、初始化micro-app",slug:"_2、初始化micro-app",content:`因为webComponent只能运行在浏览器环境，所以我们需要在浏览器环境执行micro-app的初始化。
如果没有layouts文件，则创建文件layouts/default.vue，如果已经有layouts文件，直接复用即可，layouts相关信息参考：layouts
// layouts/default.vue
<template> <Nuxt />
</template> <script>
import microApp from '@micro-zoe/micro-app' export default { name: 'default', mounted () { microApp.start() }
}
<\/script>`},{header:"3、在页面中嵌入子应用",slug:"_3、在页面中嵌入子应用",content:`因为micro-app只能运行在浏览器环境，所以在mounted钩子中通过变量控制子应用显示。
<template> <div> <h1>子应用</h1> <!-- name：应用名称, url：应用地址 --> <micro-app v-if='show' name='my-app' url='http://localhost:3000/'></micro-app> </div>
</template> <script>
export default { name: 'my-page', data () { return { show: false, } }, mounted () { this.show = true },
}
<\/script>`},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、在主应用中添加ssr配置",slug:"_1、在主应用中添加ssr配置",content:`当子应用是ssr应用时，主应用需要在micro-app元素上添加ssr属性，此时micro-app会根据ssr模式加载子应用。
<micro-app name='xx' url='xx' ssr></micro-app>`},{header:"2、设置跨域支持",slug:"_2、设置跨域支持",content:`通过自定义服务设置跨域访问。
步骤1、在根目录创建server.js
server.js的内容如下：
// server.js
const express = require('express')
const { Nuxt, Builder } = require('nuxt') const app = express() const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000 // Import and set Nuxt options
const config = require('./nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production' const nuxt = new Nuxt(config) // Start build process in dev mode
if (config.dev) { const builder = new Builder(nuxt) builder.build()
} // 设置跨域支持
app.all('*', (req, res, next) => { res.header("Access-Control-Allow-Origin", '*') next()
}) // Give nuxt middleware to express
app.use(nuxt.render) // Start express server
app.listen(port, host, () => { console.log(\`Ready on http://localhost:\${port}/\`)
})
步骤2、修改package.json中的scripts，如下：
"scripts": { "dev": "node server.js", "build": "nuxt build", "start": "cross-env NODE_ENV=production node server.js",
}`},{header:"3、通过env注入运行时变量assetPrefix",slug:"_3、通过env注入运行时变量assetprefix",content:`assetPrefix为静态资源路径前缀，开发者需要手动通过assetPrefix补全图片地址，避免子应用的图片在使用相对地址时加载失败的情况。
// nuxt.config.js
const basePath = '基础路由' // 默认为 '/'
// 静态资源路径前缀
const assetPrefix = process.env.NODE_ENV === 'production' ? \`线上域名\${basePath}\` : \`http://localhost:\${process.env.PORT || 3000}\${basePath}\` module.exports = { // 将 assetPrefix 写入环境变量，通过 process.env.assetPrefix 访问 env: { assetPrefix, }, // 设置基础路由 router: { base: basePath, },
}
使用方式如下：
<template> <div> <img :src="localImg" /> </div>
</template> <script>
import Vue from 'vue' export default Vue.extend({ data () { return { // 补全图片地址 localImg: process.env.assetPrefix + '/local-img.png', } }
})
<\/script>`},{header:"4、监听卸载",slug:"_4、监听卸载",content:`子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。
// 监听卸载操作
window.addEventListener('unmount', function () { // 执行卸载相关操作
})`},{header:"5、切换到iframe沙箱",slug:"_5、切换到iframe沙箱",content:`MicroApp有两种沙箱方案：with沙箱和iframe沙箱。
默认开启with沙箱，如果with沙箱无法正常运行，可以尝试切换到iframe沙箱。`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、控制台抛出警告[Vue warn]: Unknown custom element: <micro-app>",slug:"_1、控制台抛出警告-vue-warn-unknown-custom-element-micro-app",content:`解决方式： 在nuxt.config.js中添加配置，设置ignoredElements忽略micro-app元素。
// nuxt.config.js
module.exports = { vue: { config: { ignoredElements: [ 'micro-app', ], } },
}
提示
nuxtjs相关问题可以在nuxtjs专属讨论贴下反馈。`},{header:"2、无法预加载ssr子应用",slug:"_2、无法预加载ssr子应用",content:"原因： 因为ssr应用每个路由地址加载的html、js、css等静态资源都不同，所以无法对ssr子应用使用预加载。"}]},{path:"/zh/framework/react.html",title:"React",pathLocale:"/",contents:[{header:"React",slug:"react",content:"本篇以React 16、17作为案例介绍react的接入方式，其它版本react的接入方式以此类推。我们默认开发者掌握了各版本react的开发技巧，如示例中useEffect，在不支持hooks的版本中转换为componentDidMount。"},{header:"作为主应用",slug:"作为主应用",content:""},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、初始化micro-app",slug:"_2、初始化micro-app",content:`// index.js
import microApp from '@micro-zoe/micro-app' microApp.start()`},{header:"3、在页面中嵌入子应用",slug:"_3、在页面中嵌入子应用",content:`export function MyPage () { return ( <div> <h1>子应用👇</h1> // name：应用名称, url：应用地址 <micro-app name='my-app' url='http://localhost:3000/'></micro-app> </div> )
}
Note name：必传参数，必须以字母开头，且不可以带特殊符号(中划线、下划线除外)
url：必传参数，必须指向子应用的index.html，如：http://localhost:3000/ 或 http://localhost:3000/index.html`},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、设置跨域支持",slug:"_1、设置跨域支持",content:`使用create-react-app脚手架创建的项目，在 config/webpackDevServer.config.js 文件中添加headers。
其它项目在webpack-dev-server中添加headers。
headers: { 'Access-Control-Allow-Origin': '*',
}`},{header:"2、注册卸载函数",slug:"_2、注册卸载函数",content:`子应用卸载时会自动执行window.unmount，在此可以进行卸载相关操作。
// index.js
window.unmount = () => { ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}
完成以上步骤微前端即可正常渲染。`},{header:"可选设置",slug:"可选设置",content:"以下配置是针对子应用的，它们是可选的，建议根据实际情况选择设置。"},{header:"1、开启umd模式，优化内存和性能",slug:"_1、开启umd模式-优化内存和性能",content:`MicroApp支持两种渲染微前端的模式，默认模式和umd模式。 默认模式： 子应用在初次渲染和后续渲染时会顺序执行所有js，以保证多次渲染的一致性。
umd模式： 子应用暴露出mount、unmount方法，此时只在初次渲染时执行所有js，后续渲染只会执行这两个方法，在多次渲染时具有更好的性能和内存表现。 如果子应用渲染和卸载不频繁，那么使用默认模式即可，如果子应用渲染和卸载非常频繁建议使用umd模式。
// index.js
import React from "react"
import ReactDOM from "react-dom"
import App from './App' // 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => { ReactDOM.render(<App />, document.getElementById("root"))
} // 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => { ReactDOM.unmountComponentAtNode(document.getElementById("root"))
} // 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) { window.mount()
}`},{header:"2、设置 webpack.jsonpFunction",slug:"_2、设置-webpack-jsonpfunction",content:`如果微前端正常运行，可以忽略这一步。
如果子应用资源加载混乱导致渲染失败，可以尝试设置jsonpFunction来解决，因为相同的jsonpFunction名称会导致资源污染。
这种情况常见于主应用和子应用都是通过create-react-app等脚手架创建的项目。
解决方式：修改子应用的webpack配置 // webpack.config.js
module.exports = { output: { ... jsonpFunction: \`webpackJsonp_自定义名称\`, globalObject: 'window', },
} // webpack.config.js
module.exports = { output: { ... chunkLoadingGlobal: 'webpackJsonp_自定义名称', globalObject: 'window', },
}`},{header:"3、设置 publicPath",slug:"_3、设置-publicpath",content:`如果子应用出现静态资源地址404(js、css、图片)，建议设置publicPath来尝试解决这个问题。
publicPath是webpack提供的功能，它可以补全静态资源的地址，详情参考webpack文档 publicPath
步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) { // eslint-disable-next-line __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用入口文件的最顶部引入public-path.js
// entry
import './public-path'`},{header:"4、切换到iframe沙箱",slug:"_4、切换到iframe沙箱",content:`MicroApp有两种沙箱方案：with沙箱和iframe沙箱。
默认开启with沙箱，如果with沙箱无法正常运行，可以尝试切换到iframe沙箱。`},{header:"常见问题",slug:"常见问题",content:"无"}]},{path:"/zh/framework/vite.html",title:"Vite",pathLocale:"/",contents:[{header:"Vite",slug:"vite",content:"本篇介绍了vite的接入方式，如果在使用时出现问题，请在github上联系我们。"},{header:"作为主应用",slug:"作为主应用",content:"vite作为主应用时没有特殊之处，具体方式参考各框架接入文档。"},{header:"作为子应用",slug:"作为子应用",content:"vite作为子应用只需切换到iframe沙箱，其它操作参考各框架接入文档。"},{header:"切换到iframe沙箱",slug:"切换到iframe沙箱",content:"<micro-app name='xxx' url='xxx' iframe></micro-app>"},{header:"常见问题",slug:"常见问题",content:""},{header:"1、子应用中操作location异常",slug:"_1、子应用中操作location异常",content:`原因： vite构建script的type为module，导致无法拦截location操作。
解决方式： 使用MicroApp提供的location进行操作
如：
window.microApp.location.host
window.microApp.location.origin
window.microApp.location.href = 'xxx'
window.microApp.location.pathname = 'xxx'`}]},{path:"/zh/framework/vue.html",title:"Vue",pathLocale:"/",contents:[{header:"Vue",slug:"vue",content:"本篇以Vue 2、3作为案例介绍vue的接入方式。"},{header:"作为主应用",slug:"作为主应用",content:""},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、初始化micro-app",slug:"_2、初始化micro-app",content:`// main.js
import microApp from '@micro-zoe/micro-app' microApp.start()`},{header:"3、嵌入子应用",slug:"_3、嵌入子应用",content:`<template> <div> <h1>子应用👇</h1> <!-- name：应用名称, url：应用地址 --> <micro-app name='my-app' url='http://localhost:3000/'></micro-app> </div>
</template>
Note name：必传参数，必须以字母开头，且不可以带特殊符号(中划线、下划线除外)
url：必传参数，必须指向子应用的index.html，如：http://localhost:3000/ 或 http://localhost:3000/index.html`},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、设置跨域支持",slug:"_1、设置跨域支持",content:`module.exports = { devServer: { headers: { 'Access-Control-Allow-Origin': '*', } }
} vite默认开启跨域支持，不需要额外配置。`},{header:"2、注册卸载函数",slug:"_2、注册卸载函数",content:`子应用卸载时会自动执行window.unmount，在此可以进行卸载相关操作。 // main.js
const app = new Vue(...) // 卸载应用
window.unmount = () => { app.$destroy()
} // main.js
const app = createApp(App)
app.mount('#app') // 卸载应用
window.unmount = () => { app.unmount()
} 完成以上步骤微前端即可正常渲染。`},{header:"可选设置",slug:"可选设置",content:"以下配置是针对子应用的，它们是可选的，建议根据实际情况选择设置。"},{header:"1、开启umd模式，优化内存和性能",slug:"_1、开启umd模式-优化内存和性能",content:`MicroApp支持两种渲染微前端的模式，默认模式和umd模式。 默认模式： 子应用在初次渲染和后续渲染时会顺序执行所有js，以保证多次渲染的一致性。
umd模式： 子应用暴露出mount、unmount方法，此时只在初次渲染时执行所有js，后续渲染只会执行这两个方法，在多次渲染时具有更好的性能和内存表现。 如果子应用渲染和卸载不频繁，那么使用默认模式即可，如果子应用渲染和卸载非常频繁建议使用umd模式。 // main.js
import Vue from 'vue'
import router from './router'
import App from './App.vue' let app = null
// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => { app = new Vue({ router, render: h => h(App), }).$mount('#app')
} // 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => { app.$destroy() app.$el.innerHTML = '' app = null
} // 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) { window.mount()
} // main.js
import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import routes from './router'
import App from './App.vue' let app = null
let router = null
let history = null
// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => { history = VueRouter.createWebHistory() router = VueRouter.createRouter({ history, routes, }) app = createApp(App) app.use(router) app.mount('#app')
} // 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => { app.unmount() history.destroy() app = null router = null history = null
} // 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) { window.mount()
}`},{header:"2、设置 webpack.jsonpFunction",slug:"_2、设置-webpack-jsonpfunction",content:`如果微前端正常运行，则可以忽略这一步。
如果子应用资源加载混乱导致渲染失败，可以尝试设置jsonpFunction来解决，因为相同的jsonpFunction名称会导致资源污染。
这种情况常见于主应用和子应用都是通过create-react-app脚手架创建的react项目，vue项目中并不常见。
解决方式：修改子应用的webpack配置 // vue.config.js
module.exports = { configureWebpack: { output: { jsonpFunction: \`webpackJsonp_自定义名称\`, globalObject: 'window', } },
} // webpack.config.js
module.exports = { output: { ... jsonpFunction: \`webpackJsonp_自定义名称\`, globalObject: 'window', },
} // webpack.config.js
module.exports = { output: { ... chunkLoadingGlobal: 'webpackJsonp_自定义名称', globalObject: 'window', },
}`},{header:"3、设置 publicPath",slug:"_3、设置-publicpath",content:`如果子应用出现静态资源地址404(js、css、图片)，建议设置publicPath来尝试解决这个问题。
publicPath是webpack提供的功能，它可以补全静态资源的地址，详情参考webpack文档 publicPath
步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) { // eslint-disable-next-line __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用入口文件的最顶部引入public-path.js
// entry
import './public-path'`},{header:"4、切换到iframe沙箱",slug:"_4、切换到iframe沙箱",content:`MicroApp有两种沙箱方案：with沙箱和iframe沙箱。
默认开启with沙箱，如果with沙箱无法正常运行，可以尝试切换到iframe沙箱。`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、主应用中抛出警告，micro-app未定义",slug:"_1、主应用中抛出警告-micro-app未定义",content:`报错信息： vue2: [Vue warn]: Unknown custom element: <micro-app>
vue3: [Vue warn]: Failed to resolve component: micro-app 参考issue： vue-next@1414
解决方式： 在主应用中添加如下配置 在入口文件main.js中设置ignoredElements，详情查看：https://cn.vuejs.org/v2/api/#ignoredElements
// main.js
import Vue from 'vue' Vue.config.ignoredElements = [ 'micro-app',
] 在vue.config.js中添加chainWebpack配置，如下：
// vue.config.js
module.exports = { chainWebpack: config => { config.module .rule('vue') .use('vue-loader') .tap(options => { options.compilerOptions = { ...(options.compilerOptions || {}), isCustomElement: (tag) => /^micro-app/.test(tag), }; return options }) }
} 在vite.config.js中通过vue插件设置isCustomElement，如下：
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' export default defineConfig({ plugins: [ vue({ template: { compilerOptions: { isCustomElement: tag => /^micro-app/.test(tag) } } }) ],
})`}]},{path:"/v0/zh/framework/angular.html",title:"Angular",pathLocale:"/",contents:[{header:"Angular",slug:"angular",content:"本篇以angular 11作为案例介绍angular的接入方式，其它版本angular接入方式会在后续补充，如果你在使用时出现问题，请在github上提issue告知我们。"},{header:"作为基座应用",slug:"作为基座应用",content:`我们强烈建议基座应用采用history模式，hash路由的基座应用只能加载hash路由的子应用，history模式的基座应用对这两种子应用都支持。
在以下案例中，我们默认基座的路由为history模式。`},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、在入口处引入",slug:"_2、在入口处引入",content:`// entry
import microApp from '@micro-zoe/micro-app' microApp.start()`},{header:"3、增加对WebComponent的支持",slug:"_3、增加对webcomponent的支持",content:`在app/app.module.ts中添加 CUSTOM_ELEMENTS_SCHEMA 到 @NgModule.schemas
// app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; @NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA],
})`},{header:"4、分配一个路由给子应用",slug:"_4、分配一个路由给子应用",content:`// app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPage } from './my-page/my-page.component'; const routes: Routes = [ { // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面 path: 'my-page', children: [{ path: '**', component: MyPage }] },
]; @NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule],
}) export class AppRoutingModule { }`},{header:"4、在页面中嵌入子应用",slug:"_4、在页面中嵌入子应用",content:"<!-- app/my-page/my-page.component.html -->\n<div> <h1>子应用</h1> <!-- name(必传)：应用名称 url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page` --> <micro-app name='app1' url='http://localhost:3000/' baseroute='/my-page'></micro-app>\n</div>"},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、在基座应用中引入zone.js",slug:"_1、在基座应用中引入zone-js",content:`如果基座应用非angular，那么基座应用需要引入zone.js才能正确加载angular子应用。
步骤1、安装依赖
npm i zone.js --save
步骤2、在基座应用中引入zone.js
import 'zone.js'`},{header:"2、设置跨域支持",slug:"_2、设置跨域支持",content:`angular官方脚手架创建的项目在开发环境下默认支持跨域访问，不需要特殊处理。
其它项目在webpack-dev-server中添加headers。
headers: { 'Access-Control-Allow-Origin': '*',
}`},{header:"3、关闭热更新",slug:"_3、关闭热更新",content:`"scripts": { "start": "ng serve --live-reload false",
},`},{header:"4、设置基础路由(如果基座是history路由，子应用是hash路由，这一步可以省略)",slug:"_4、设置基础路由-如果基座是history路由-子应用是hash路由-这一步可以省略",content:`// app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common'; const routes: Routes = [...]; @NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule], // 👇 设置基础路由 providers: [{ provide: APP_BASE_HREF, // @ts-ignore __MICRO_APP_BASE_ROUTE__ 为micro-app传入的基础路由 useValue: window.__MICRO_APP_BASE_ROUTE__ || '/', }]
}) export class AppRoutingModule { }`},{header:"5、设置 publicPath",slug:"_5、设置-publicpath",content:`这一步借助了webpack的功能，避免子应用的静态资源使用相对地址时加载失败的情况，详情参考webpack文档 publicPath
如果子应用不是webpack构建的，这一步可以省略。
步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) { // eslint-disable-next-line __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用入口文件的最顶部引入public-path.js
// entry
import './public-path'`},{header:"6、监听卸载",slug:"_6、监听卸载",content:`子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。
// main.ts let app = null;
platformBrowserDynamic() .bootstrapModule(AppModule) .then((res: NgModuleRef<AppModule>) => { app = res }) // 监听卸载操作
window.addEventListener('unmount', function () { app.destroy(); app = null;
})`},{header:"实战案例",slug:"实战案例",content:`以上介绍了angular如何接入微前端，但在实际使用中会涉及更多功能，如数据通信、路由跳转、打包部署，为此我们提供了一套案例，用于展示angular作为基座嵌入(或作为子应用被嵌入) react、vue、angular、vite、nextjs、nuxtjs等框架，在案例中我们使用尽可能少的代码实现尽可能多的功能。
案例地址：https://github.com/micro-zoe/micro-app-demo-0.x`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、基座是react、nextjs应用，引入zone.js后导致micro-app元素生命周期异常",slug:"_1、基座是react、nextjs应用-引入zone-js后导致micro-app元素生命周期异常",content:"解决方式： 在micro-app元素上设置destroy"},{header:"2、@angular/material组件库样式失效",slug:"_2、-angular-material组件库样式失效",content:`解决方式： 关闭样式隔离
<micro-app name='xx' url='xx' disableScopecss></micro-app>`},{header:"3、通过micro-app数据通信修改angular组件数据后视图不更新",slug:"_3、通过micro-app数据通信修改angular组件数据后视图不更新",content:`原因： 因为在angular区域外调用了内部的代码(基座和子应用属于不同的angular区域)，angular无法知道状态发生了变化。
解决方式： 通过ngZone.run()触发更改检测，具体方式如下：`}]},{path:"/v0/zh/framework/introduce.html",title:"",pathLocale:"/",contents:[{header:"",slug:"",content:`上面的文档中，我们从功能的角度介绍如何接入微前端，这导致整体的逻辑不连贯。
在手把手系列中，我们会侧重于前端框架本身，详细介绍它们作为基座应用和子应用如何接入微前端。
我们列举比较流行的前端框架，指出各框架的注意事项，规避各种可能出现的问题。
目前有： react (version 16, 17)
vue (version 2, 3)
vite (version 2)
angular (version 11)
nextjs (version 11)
nuxtjs (version 2) 提示
以上框架可以任意组合，换句话说任何一个框架都可以作为基座嵌入其它类型的子应用，任何一个框架也可以作为子应用被其它框架嵌入，包括上面没有列举出的其它库，如 svelte、umi ...
我们只列举了部分框架，如果有其它框架需求，请在github上提issue告知我们。`}]},{path:"/v0/zh/framework/nextjs.html",title:"Nextjs",pathLocale:"/",contents:[{header:"Nextjs",slug:"nextjs",content:"本篇以nextjs 11作为案例介绍nextjs的接入方式，其它版本nextjs接入方式会在后续补充，如果你在使用时出现问题，请在github上提issue告知我们。"},{header:"作为基座应用",slug:"作为基座应用",content:""},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、引入micro-app",slug:"_2、引入micro-app",content:`因为webComponent只能运行在浏览器环境，所以我们在pages/_app.jsx的useEffect中进行初始化。
// pages/_app.jsx
import { useEffect } from 'react'
import microApp from '@micro-zoe/micro-app' function MyApp({ Component, pageProps }) { useEffect(() => { // 初始化micro-app microApp.start() /** * BUG FIX * 在nextjs 11下，子应用内部跳转，基座无法监听，导致点击浏览器前进、后退按钮，无法回退到正确的子应用页面 * 通过监听popstate事件，在地址变化时重新替换为next路由来解决这个问题 */ window.addEventListener('popstate', () => { const { href, origin } = window.location router.replace(href.replace(origin, '')) }) }, []) return <Component {...pageProps} />
} export default MyApp`},{header:"3、设置动态路由",slug:"_3、设置动态路由",content:`通过pages/my-page/[[...]].js设置动态路由，以确保/my-page/* 都指向当前页面。
详情参考：optional-catch-all-routes`},{header:"4、在页面中嵌入子应用",slug:"_4、在页面中嵌入子应用",content:`如上所述，micro-app只能运行在浏览器环境，所以在useEffect中通过变量控制子应用显示。
// pages/my-page/[[...]].js
import { useState, useEffect } from 'react' const MyPage = () => { const [show, changeShow] = useState(false) useEffect(() => { changeShow(true) }, []) return ( <div> <h1>子应用</h1> { show && ( <micro-app name='app1' // name(必传)：应用名称 url='http://localhost:3000/' // url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html baseroute='/my-page' // baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 \`/my-page\` ></micro-app> ) } </div> )
} export default MyPage`},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、在基座应用中添加ssr配置",slug:"_1、在基座应用中添加ssr配置",content:`当子应用是ssr应用时，基座需要在micro-app元素上添加ssr属性，此时micro-app会根据ssr模式加载子应用。
<micro-app name='xx' url='xx' ssr></micro-app>
基座应用不需要设置baseroute属性，因为ssr子应用无法使用。`},{header:"2、设置跨域支持",slug:"_2、设置跨域支持",content:`通过自定义服务设置跨域访问，详情参考 custom-server
步骤1、在根目录创建server.js
server.js的内容如下：
// server.js
const express = require('express')
const next = require('next')
const config = require('./next.config') const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler() app.prepare().then(() => { const server = express() // 设置跨域支持 server.all('*', (req, res) => { res.setHeader('access-control-allow-origin', '*') return handle(req, res) }) server.listen(port, (err) => { if (err) throw err console.log(\`> Ready on http://localhost:\${port}\${config.basePath}/\`) })
})
步骤2、修改package.json中的scripts，如下：
"scripts": { "dev": "node server.js", "build": "next build", "start": "cross-env NODE_ENV=production node server.js"
}`},{header:"3、设置基础路由",slug:"_3、设置基础路由",content:`nextjs的基础路由只能在next.config.js中通过basePath写死，无法像SPA应用一样灵活配置。
// next.config.js
const basePath = '基础路由，与基座分配的路由地址一致',
module.exports = { basePath,
}`},{header:"4、设置assetPrefix 和 publicRuntimeConfig",slug:"_4、设置assetprefix-和-publicruntimeconfig",content:`在next.config.js中设置assetPrefix，为静态资源添加路径前缀，避免子应用的静态资源使用相对地址时加载失败的情况。
// next.config.js
// 基础路由
const basePath = '基础路由，与基座分配的路由地址一致',
// 静态资源路径前缀
const assetPrefix = process.env.NODE_ENV === 'production' ? \`线上域名\${basePath}\` : \`http://localhost:\${process.env.PORT || 3000}\${basePath}\` module.exports = { basePath, assetPrefix, // 添加 assetPrefix 地址到 publicRuntimeConfig publicRuntimeConfig: { assetPrefix, },
}
assetPrefix只对js、css等静态资源生效，对本地图片无效。
为此我们将assetPrefix作为参数传入publicRuntimeConfig，开发者需要手动通过publicRuntimeConfig补全图片地址。
方式如下：
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig() const Page = () => { return ( <div> <img src={\`\${publicRuntimeConfig.assetPrefix}/local-img.png\`} /> </div> )
} export default Page`},{header:"5、监听卸载",slug:"_5、监听卸载",content:`子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。
// 监听卸载操作
window.addEventListener('unmount', function () { // 执行卸载相关操作
})
Note
nextjs默认支持css module功能，如果你使用了此功能，建议关闭样式隔离以提升性能：<micro-app name='xx' url='xx' disableScopecss></micro-app>`},{header:"实战案例",slug:"实战案例",content:`以上介绍了nextjs如何接入微前端，但在实际使用中会涉及更多功能，如数据通信、路由跳转、打包部署，为此我们提供了一套案例，用于展示nextjs作为基座嵌入(或作为子应用被嵌入) react、vue、angular、vite、nextjs、nuxtjs等框架，在案例中我们使用尽可能少的代码实现尽可能多的功能。
案例地址：https://github.com/micro-zoe/micro-app-demo-0.x`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、使用next/image组件加载图片失败",slug:"_1、使用next-image组件加载图片失败",content:`解决方式：
在部分nextjs版本中(如：nextjs 11)，使用next/image组件无法正确引入图片，此时推荐使用img元素代替。`},{header:"2、无法预加载ssr子应用",slug:"_2、无法预加载ssr子应用",content:"原因： 因为ssr应用每个路由地址加载的html、js、css等静态资源都不同，所以无法对ssr子应用使用预加载。"},{header:"3、控制台报错Cannot read properties of null (reading 'tagName')",slug:"_3、控制台报错cannot-read-properties-of-null-reading-tagname",content:`原因： 当基座和子应用都是nextjs应用时，next/head组件冲突。
解决方式： 去掉子应用中next/head组件。`},{header:"4、webpack.jsonpFunction冲突，导致加载子应用失败",slug:"_4、webpack-jsonpfunction冲突-导致加载子应用失败",content:`原因： 当基座和子应用都是官方脚手架创建的项目，容易造成webpack.jsonpFunction冲突。
解决方式： 修改子应用的webpack配置。
jsonpFunction是webpack4中的名称，在webpack5中名称为chunkLoadingGlobal，请根据自己项目的webpack版本设置。
在next.config.js中配置webpack：
// next.config.js
module.exports = { webpack: (config) => { Object.assign(config.output, { chunkLoadingGlobal: 'webpackJsonp_child_app', // webpack5 // jsonpFunction: 'webpackJsonp_child_app', // webpack4 globalObject: 'window', }) return config },
}
提示
nextjs相关问题可以在nextjs专属讨论贴下反馈。`}]},{path:"/v0/zh/framework/nuxtjs.html",title:"Nuxtjs",pathLocale:"/",contents:[{header:"Nuxtjs",slug:"nuxtjs",content:"本篇以nuxtjs 2作为案例介绍nuxtjs的接入方式，其它版本nuxtjs接入方式会在后续补充，如果你在使用时出现问题，请在github上提issue告知我们。"},{header:"作为基座应用",slug:"作为基座应用",content:""},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、引入micro-app",slug:"_2、引入micro-app",content:`因为webComponent只能运行在浏览器环境，所以我们需要在浏览器环境执行micro-app的初始化。
如果没有layouts文件，则创建文件layouts/default.vue，如果已经有layouts文件，直接复用即可，layouts相关信息参考：layouts
// layouts/default.vue
<template> <Nuxt />
</template> <script>
import microApp from '@micro-zoe/micro-app' export default { name: 'default', mounted () { microApp.start() }
}
<\/script>`},{header:"3、设置动态路由",slug:"_3、设置动态路由",content:`通过pages/my-page/_.vue设置动态路由，以确保/my-page/* 都指向当前页面。
详情参考：dynamic-routes`},{header:"4、在页面中嵌入子应用",slug:"_4、在页面中嵌入子应用",content:`如上所述，micro-app只能运行在浏览器环境，所以在mounted钩子中通过变量控制子应用显示。
<template> <div> <h1>子应用</h1> <!-- name(必传)：应用名称 url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 \`/my-page\` --> <micro-app v-if='show' name='app1' url='http://localhost:3000/' baseroute='/my-page'></micro-app> </div>
</template> <script>
export default { name: 'my-page', data () { return { show: false, } }, mounted () { this.show = true },
}
<\/script>`},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、在基座应用中添加ssr配置",slug:"_1、在基座应用中添加ssr配置",content:`当子应用是ssr应用时，基座需要在micro-app元素上添加ssr属性，此时micro-app会根据ssr模式加载子应用。
<micro-app name='xx' url='xx' ssr></micro-app>
基座应用不需要设置baseroute属性，因为ssr子应用无法使用。`},{header:"2、设置跨域支持",slug:"_2、设置跨域支持",content:`通过自定义服务设置跨域访问。
步骤1、在根目录创建server.js
server.js的内容如下：
// server.js
const express = require('express')
const { Nuxt, Builder } = require('nuxt') const app = express() const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000 // Import and set Nuxt options
const config = require('./nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production' const nuxt = new Nuxt(config) // Start build process in dev mode
if (config.dev) { const builder = new Builder(nuxt) builder.build()
} // 设置跨域支持
app.all('*', (req, res, next) => { res.header("Access-Control-Allow-Origin", '*') next()
}) // Give nuxt middleware to express
app.use(nuxt.render) // Start express server
app.listen(port, host, () => { console.log(\`Ready on http://localhost:\${port}\${config.router.base}\`)
})
步骤2、修改package.json中的scripts，如下：
"scripts": { "dev": "node server.js", "build": "nuxt build", "start": "cross-env NODE_ENV=production node server.js",
}`},{header:"3、设置基础路由",slug:"_3、设置基础路由",content:`nuxtjs的基础路由只能在nuxt.config.js中通过router.base写死，无法像SPA应用一样灵活配置。
// nuxt.config.js
const basePath = '基础路由，与基座分配的路由地址一致', module.exports = { // 设置基础路由 router: { base: basePath, },
}`},{header:"4、通过env注入运行时变量assetPrefix",slug:"_4、通过env注入运行时变量assetprefix",content:`assetPrefix为静态资源路径前缀，开发者需要手动通过assetPrefix补全图片地址，避免子应用的图片在使用相对地址时加载失败的情况。
// nuxt.config.js
// 基础路由
const basePath = '基础路由，与基座分配的路由地址一致',
// 静态资源路径前缀
const assetPrefix = process.env.NODE_ENV === 'production' ? \`线上域名\${basePath}\` : \`http://localhost:\${process.env.PORT || 3000}\${basePath}\` module.exports = { // 将 assetPrefix 写入环境变量，通过 process.env.assetPrefix 访问 env: { assetPrefix, }, // 设置基础路由 router: { base: basePath, },
}
使用方式如下：
<template> <div> <img :src="localImg" /> </div>
</template> <script>
import Vue from 'vue' export default Vue.extend({ data () { return { // 补全图片地址 localImg: process.env.assetPrefix + '/local-img.png', } }
})
<\/script>`},{header:"5、监听卸载",slug:"_5、监听卸载",content:`子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。
// 监听卸载操作
window.addEventListener('unmount', function () { // 执行卸载相关操作
})`},{header:"实战案例",slug:"实战案例",content:`以上介绍了nuxtjs如何接入微前端，但在实际使用中会涉及更多功能，如数据通信、路由跳转、打包部署，为此我们提供了一套案例，用于展示nuxtjs作为基座嵌入(或作为子应用被嵌入) react、vue、angular、vite、nextjs、nuxtjs等框架，在案例中我们使用尽可能少的代码实现尽可能多的功能。
案例地址：https://github.com/micro-zoe/micro-app-demo-0.x`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、控制台抛出警告[Vue warn]: Unknown custom element: <micro-app>",slug:"_1、控制台抛出警告-vue-warn-unknown-custom-element-micro-app",content:`解决方式： 在nuxt.config.js中添加配置，设置ignoredElements忽略micro-app元素。
// nuxt.config.js
module.exports = { vue: { config: { ignoredElements: [ 'micro-app', ], } },
}
提示
nuxtjs相关问题可以在nuxtjs专属讨论贴下反馈。`}]},{path:"/v0/zh/framework/react.html",title:"React",pathLocale:"/",contents:[{header:"React",slug:"react",content:"本篇以React 16、17作为案例介绍react的接入方式，其它版本react的接入方式以此类推。我们默认开发者掌握了各版本react的开发技巧，如示例中useEffect，在不支持hooks的版本中转换为componentDidMount。"},{header:"作为基座应用",slug:"作为基座应用",content:`我们强烈建议基座应用采用history模式，hash路由的基座应用只能加载hash路由的子应用，history模式的基座应用对这两种子应用都支持。
在以下案例中，我们默认基座的路由为history模式。`},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、在入口处引入",slug:"_2、在入口处引入",content:`// entry
import microApp from '@micro-zoe/micro-app' microApp.start()`},{header:"3、分配一个路由给子应用",slug:"_3、分配一个路由给子应用",content:`// router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MyPage from './my-page' export default function AppRoute () { return ( <BrowserRouter> <Switch> // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面 <Route path='/my-page'> <MyPage /> </Route> </Switch> </BrowserRouter> )
}`},{header:"4、在页面中嵌入子应用",slug:"_4、在页面中嵌入子应用",content:"export function MyPage () { return ( <div> <h1>子应用</h1> <micro-app name='app1' // name(必传)：应用名称 url='http://localhost:3000/' // url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html baseroute='/my-page' // baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page` ></micro-app> </div> )\n}"},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、设置跨域支持",slug:"_1、设置跨域支持",content:`使用create-react-app脚手架创建的项目，在 config/webpackDevServer.config.js 文件中添加headers。
其它项目在webpack-dev-server中添加headers。
headers: { 'Access-Control-Allow-Origin': '*',
}`},{header:"2、设置基础路由(如果基座是history路由，子应用是hash路由，这一步可以省略)",slug:"_2、设置基础路由-如果基座是history路由-子应用是hash路由-这一步可以省略",content:`// router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom' export default function AppRoute () { return ( // 👇 设置基础路由，如果没有设置baseroute属性，则window.__MICRO_APP_BASE_ROUTE__为空字符串 <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}> ... </BrowserRouter> )
}`},{header:"3、设置 publicPath",slug:"_3、设置-publicpath",content:`这一步借助了webpack的功能，避免子应用的静态资源使用相对地址时加载失败的情况，详情参考webpack文档 publicPath
如果子应用不是webpack构建的，这一步可以省略。
步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) { // eslint-disable-next-line __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用入口文件的最顶部引入public-path.js
// entry
import './public-path'`},{header:"4、监听卸载",slug:"_4、监听卸载",content:`子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。
window.addEventListener('unmount', function () { ReactDOM.unmountComponentAtNode(document.getElementById('root'))
})`},{header:"实战案例",slug:"实战案例",content:`以上介绍了react如何接入微前端，但在实际使用中会涉及更多功能，如数据通信、路由跳转、打包部署，为此我们提供了一套案例，用于展示react作为基座嵌入(或作为子应用被嵌入) react、vue、angular、vite、nextjs、nuxtjs等框架，在案例中我们使用尽可能少的代码实现尽可能多的功能。
案例地址：https://github.com/micro-zoe/micro-app-demo-0.x`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、create-react-app创建的子应用，被嵌入微前端后sockjs-node报错",slug:"_1、create-react-app创建的子应用-被嵌入微前端后sockjs-node报错",content:`报错信息： WebSocket connection to 'ws://localhost:3000/sockjs-node' failed
原因： 子应用的sockjs-node会根据当前页面的端口号进行通信，嵌入微前端后，端口号为基座的，而非子应用的，导致报错。
虽然这个问题不影响应用的正常运行，但还是要进行处理。
解决方式： 使用插件系统补全子应用sockjs-node的端口号。
microApp.start({ plugins: { modules: { 子应用名称: [{ loader(code) { if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) { code = code.replace('window.location.port', 子应用端口) } return code } }], } }
})`}]},{path:"/v0/zh/framework/vite.html",title:"Vite",pathLocale:"/",contents:[{header:"Vite",slug:"vite",content:`警告
在正式版中接入vite子应用需要关闭沙箱，这会导致很多问题，暂时不建议接入。
在1.0公测版中我们推出了为vite打造的沙箱方案，对于新接入的项目，推荐使用新的方案，具体详情请跳转1.0公测版文档。`},{header:"作为基座应用",slug:"作为基座应用",content:"vite作为基座应用时没有特殊之处，具体方式参考各框架接入文档。"},{header:"作为子应用",slug:"作为子应用",content:`当子应用是vite应用时需要做特别的适配，适配vite的代价是巨大的，我们必须关闭沙箱功能，因为沙箱在module script下不支持，这导致大部分功能失效，包括：环境变量、样式隔离、元素隔离、资源路径补全、baseroute 等。
在嵌入vite子应用时，micro-app的功能只负责渲染，其它的行为由应用自行决定，这包括如何防止样式、JS变量、元素的冲突。
在module模式下，引入的资源大多为相对地址，兼容主要做的事情就是将地址补全。`},{header:"👇 子应用的修改",slug:"👇-子应用的修改",content:`1、修改vite.config.js
import { join } from 'path'
import { writeFileSync } from 'fs' // vite.config.js
export default defineConfig({ base: \`\${process.env.NODE_ENV === 'production' ? 'http://my-site.com' : ''}/basename/\`, plugins: [ // 自定义插件 (function () { let basePath = '' return { name: "vite:micro-app", apply: 'build', configResolved(config) { basePath = \`\${config.base}\${config.build.assetsDir}/\` }, writeBundle (options, bundle) { for (const chunkName in bundle) { if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) { const chunk = bundle[chunkName] if (chunk.fileName && chunk.fileName.endsWith('.js')) { chunk.code = chunk.code.replace(/(from|import\\()(\\s*['"])(\\.\\.?\\/)/g, (all, $1, $2, $3) => { return all.replace($3, new URL($3, basePath)) }) const fullPath = join(options.dir, chunk.fileName) writeFileSync(fullPath, chunk.code) } } } }, } })(), ],
})
2、修改容器元素id
因为vite子应用没有元素隔离的保护，建议修改容器元素的id值，以确保与其它元素不冲突。
1、修改index.html中容器元素的id值
<!-- index.html -->
<body> <div id="my-vite-app"></div>
</body>
2、使用新的id渲染
// main.js
createApp(App).mount('#my-vite-app')
当多个vite子应用同时渲染时，必须修改容器元素的id值，确保每个子应用容器元素id的唯一性，否则无法正常渲染。
3、路由
推荐基座使用history路由，vite子应用使用hash路由，避免一些可能出现的问题。
子应用如果是vue3，在初始化时路由时，createWebHashHistory不要传入参数，如下：
import { createRouter, createWebHashHistory } from 'vue-router' const router = createRouter({ history: createWebHashHistory(), routes,
})
4、静态资源
图片等静态资源需要使用绝对地址，可以使用 new URL('../assets/logo.png', import.meta.url).href 等方式获取资源的全链接地址。`},{header:"👇 基座应用的修改",slug:"👇-基座应用的修改",content:`注意这里的基座应用是指嵌入了vite子应用的基座，它可以是任何框架，和上面作为基座应用一节无关。
1、关闭沙箱并使用内联script模式
<micro-app name='child-name' url='http://localhost:3001/basename/' inline // 使用内联script模式 disableSandbox // 关闭沙箱
>
2、处理子应用静态资源
写一个简易的插件，对开发环境的子应用进行处理，补全静态资源路径。
import microApp from '@micro-zoe/micro-app' microApp.start({ plugins: { modules: { // appName即应用的name值 appName: [{ loader(code) { if (process.env.NODE_ENV === 'development') { // 这里 basename 需要和子应用vite.config.js中base的配置保持一致 code = code.replace(/(from|import)(\\s*['"])(\\/basename\\/)/g, all => { return all.replace('/basename/', '子应用域名/basename/') }) } return code } }] } }
})`},{header:"👇 数据通信",slug:"👇-数据通信",content:`沙箱关闭后，子应用默认的通信功能失效，此时可以通过手动注册通信对象实现一致的功能。
注册方式：在基座应用中为子应用初始化通信对象
import { EventCenterForMicroApp } from '@micro-zoe/micro-app' // 注意：每个vite子应用根据appName单独分配一个通信对象
window.eventCenterForViteApp1 = new EventCenterForMicroApp(appName)
vite子应用就可以通过注册的eventCenterForViteApp1对象进行通信，其api和window.microApp一致，基座通信方式没有任何变化。
子应用通信方式：
/** * 绑定监听函数 * dataListener: 绑定函数 * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false */
window.eventCenterForViteApp1.addDataListener(dataListener: (data: Object) => void, autoTrigger?: boolean) // 解绑指定函数
window.eventCenterForViteApp1.removeDataListener(dataListener) // 清空当前子应用的所有绑定函数(全局数据函数除外)
window.eventCenterForViteApp1.clearDataListener() // 主动获取数据
window.eventCenterForViteApp1.getData() // 子应用向基座应用发送数据
window.eventCenterForViteApp1.dispatch({type: '子应用发送的数据'})
注意 请确保vite版本>=2.5.0
适配vite本质上是适配module脚本，其它非vite构建的module脚本也可以采用相同的思路处理。`},{header:"实战案例",slug:"实战案例",content:`以上介绍了vite如何接入微前端，但在实际使用中会涉及更多功能，如数据通信、路由跳转、打包部署，为此我们提供了一套案例，用于展示vite作为基座嵌入(或作为子应用被嵌入) react、vue、angular、vite、nextjs、nuxtjs等框架，在案例中我们使用尽可能少的代码实现尽可能多的功能。
案例地址：https://github.com/micro-zoe/micro-app-demo-0.x`}]},{path:"/v0/zh/framework/vue.html",title:"Vue",pathLocale:"/",contents:[{header:"Vue",slug:"vue",content:"本篇以Vue 2、3作为案例介绍vue的接入方式，其它版本vue的接入方式以此类推，我们默认开发者掌握了各版本vue的开发技巧，比如示例中vue2的代码如何转换为vue1。"},{header:"作为基座应用",slug:"作为基座应用",content:`我们强烈建议基座应用采用history模式，hash路由的基座应用只能加载hash路由的子应用，history模式的基座应用对这两种子应用都支持。
在以下案例中，我们默认基座的路由为history模式。`},{header:"1、安装依赖",slug:"_1、安装依赖",content:"npm i @micro-zoe/micro-app --save"},{header:"2、在入口处引入",slug:"_2、在入口处引入",content:`// entry
import microApp from '@micro-zoe/micro-app' microApp.start()`},{header:"3、分配一个路由给子应用",slug:"_3、分配一个路由给子应用",content:`// router.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPage from './my-page.vue' Vue.use(VueRouter) const routes = [ { // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面 path: '/my-page/*', name: 'my-page', component: MyPage, },
] export default routes // router.js
import { createRouter, createWebHistory } from 'vue-router'
import MyPage from './my-page.vue' const routes = [ { // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面 path: '/my-page/:page*', name: 'my-page', component: MyPage, },
] const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes
}) export default router`},{header:"4、在页面中嵌入子应用",slug:"_4、在页面中嵌入子应用",content:"<!-- my-page.vue -->\n<template> <div> <h1>子应用</h1> <!-- name(必传)：应用名称 url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page` --> <micro-app name='app1' url='http://localhost:3000/' baseroute='/my-page'></micro-app> </div>\n</template>"},{header:"作为子应用",slug:"作为子应用",content:""},{header:"1、设置跨域支持",slug:"_1、设置跨域支持",content:`在vue.config.js中添加配置
devServer: { headers: { 'Access-Control-Allow-Origin': '*', }
}`},{header:"2、设置基础路由(如果基座是history路由，子应用是hash路由，这一步可以省略)",slug:"_2、设置基础路由-如果基座是history路由-子应用是hash路由-这一步可以省略",content:`// main.js
import VueRouter from 'vue-router'
import routes from './router' const router = new VueRouter({ mode: 'history', // 👇 __MICRO_APP_BASE_ROUTE__ 为micro-app传入的基础路由 base: window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL, routes,
}) // main.js
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router' const router = createRouter({ // 👇 __MICRO_APP_BASE_ROUTE__ 为micro-app传入的基础路由 history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL), routes,
})`},{header:"3、设置 publicPath",slug:"_3、设置-publicpath",content:`这一步借助了webpack的功能，避免子应用的静态资源使用相对地址时加载失败的情况，详情参考webpack文档 publicPath
如果子应用不是webpack构建的，这一步可以省略。
步骤1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) { // eslint-disable-next-line __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
步骤2: 在子应用入口文件的最顶部引入public-path.js
// entry
import './public-path'`},{header:"4、监听卸载",slug:"_4、监听卸载",content:`子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。 // main.js
const app = new Vue(...) // 监听卸载操作
window.addEventListener('unmount', function () { app.$destroy()
}) // main.js
const app = createApp(App)
app.mount('#app') // 监听卸载操作
window.addEventListener('unmount', function () { app.unmount()
})`},{header:"实战案例",slug:"实战案例",content:`以上介绍了vue如何接入微前端，但在实际使用中会涉及更多功能，如数据通信、路由跳转、打包部署，为此我们提供了一套案例，用于展示vue作为基座嵌入(或作为子应用被嵌入) react、vue、angular、vite、nextjs、nuxtjs等框架，在案例中我们使用尽可能少的代码实现尽可能多的功能。
案例地址：https://github.com/micro-zoe/micro-app-demo-0.x`},{header:"常见问题",slug:"常见问题",content:""},{header:"1、基座应用中抛出警告，micro-app未定义",slug:"_1、基座应用中抛出警告-micro-app未定义",content:`报错信息： vue2: [Vue warn]: Unknown custom element: <micro-app>
vue3: [Vue warn]: Failed to resolve component: micro-app 参考issue： vue-next@1414
解决方式： 在基座应用中添加如下配置 在入口文件main.js中设置ignoredElements，详情查看：https://cn.vuejs.org/v2/api/#ignoredElements
// main.js
import Vue from 'vue' Vue.config.ignoredElements = [ 'micro-app',
] 在vue.config.js中添加chainWebpack配置，如下：
// vue.config.js
module.exports = { chainWebpack: config => { config.module .rule('vue') .use('vue-loader') .tap(options => { options.compilerOptions = { ...(options.compilerOptions || {}), isCustomElement: (tag) => /^micro-app/.test(tag), }; return options }) }
} 在vite.config.js中通过vue插件设置isCustomElement，如下：
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' export default defineConfig({ plugins: [ vue({ template: { compilerOptions: { isCustomElement: tag => /^micro-app/.test(tag) } } }) ],
})`},{header:"2、当基座和子应用都是vue-router4，点击浏览器返回按钮页面丢失",slug:"_2、当基座和子应用都是vue-router4-点击浏览器返回按钮页面丢失",content:`原因： vue-router4没有对路由堆栈state做唯一性标记，导致基座和子应用相互影响，vue-router3及其它框架路由没有类似问题。
测试版本： vue-router@4.0.12
相关issue： 155
解决方式： 在子应用中添加如下设置
if (window.__MICRO_APP_ENVIRONMENT__) { // 如果__MICRO_APP_BASE_ROUTE__为 \`/基座应用基础路由/子应用基础路由/\`，则应去掉\`/基座应用基础路由\` // 如果对这句话不理解，可以参考案例：https://github.com/micro-zoe/micro-app-demo-0.x const realBaseRoute = window.__MICRO_APP_BASE_ROUTE__ router.beforeEach(() => { if (typeof window.history.state?.current === 'string') { window.history.state.current = window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '') } }) router.afterEach(() => { if (typeof window.history.state === 'object') { window.history.state.current = realBaseRoute + (window.history.state.current || '') } })
}`},{header:"3、vue-router在hash模式无法通过base设置基础路由",slug:"_3、vue-router在hash模式无法通过base设置基础路由",content:`解决方式： 创建一个空的路由页面，将其它路由作为它的children，具体设置如下：
import RootApp from './root-app.vue' const routes = [ { path: window.__MICRO_APP_BASE_ROUTE__ || '/', component: RootApp, children: [ // 其他的路由都写到这里 ], },
]
root-app.vue内容如下：
<template> <router-view />
</template>`}]},{path:"/404.html",title:"",pathLocale:"/",contents:[]}],U="update-vuepress-plugin-full-text-search2-search-index";var j=w(B),$=y(()=>{const e=new Map;for(const t of j.value)e.set(t.path,t);return e});import.meta.webpackHot&&(__VUE_HMR_RUNTIME__[U]=e=>{j.value=e});function V(e){const t=w([]);let p=null;return O(e,()=>{p&&clearTimeout(p),p=setTimeout(a,100)}),t;function a(){const c=e.value.toLowerCase().trim();if(!c){t.value=[];return}const r=new Map,n=new Set;for(const o of j.value)for(const s of G(o,c)){n.add(s.parentPageTitle);let i=r.get(s.parentPageTitle);i||(i=[],r.set(s.parentPageTitle,i)),i.push(s)}const l=[...n].sort((o,s)=>{const i=r.get(o);return r.get(s).length-i.length});t.value=[...r].flatMap(([,o])=>o).sort((o,s)=>o.parentPagePriority-s.parentPagePriority||l.indexOf(o.parentPageTitle)-l.indexOf(s.parentPageTitle)||o.priority-s.priority)}}function*G(e,t){const p=A(e.title,t);if(p){yield{path:e.path,parentPageTitle:b(e),title:e.title,display:p,page:e,content:null,parentPagePriority:1,priority:1};return}for(const a of e.contents){const c=A(a.header,t);if(c){yield{path:e.path+(a.slug?`#${a.slug}`:""),parentPageTitle:b(e),title:e.title,display:c,page:e,content:null,parentPagePriority:10,priority:2};continue}const r=A(a.content,t);r&&(yield{path:e.path+(a.slug?`#${a.slug}`:""),parentPageTitle:b(e),title:e.title,display:[{type:"header",str:`${a.header}
`},...r],page:e,content:null,parentPagePriority:10,priority:10})}}function b(e){const t=e.path.split("/");let p="/";return t[1]&&(p=`/${t[1]}/`),($.value.get(p)||e).title}function A(e,t){const p=[];let a=0;const c=e.toLowerCase().replace(/\s/gu," ");let r=0,n=c.indexOf(t,r);if(n<0)return null;for(;n>=0;){const o=n+t.length;if(l(e.slice(r,n),"normal"),l(e.slice(n,o),"highlight"),r=o,n=c.indexOf(t,r),a>100)break}return l(e.slice(r),"normal"),p.filter(o=>o.str);function l(o,s){let i=o;s==="normal"&&i.length>100&&a===0&&(i=`… ${i.slice(-10)}`);let h=!1;if(a+i.length>100){if(p.some(g=>g.type==="ellipsis"))return;i=i.slice(0,Math.max(100-a,1)),h=!0}p.push({type:s,str:i}),a+=i.length,h&&(p.push({type:"ellipsis",str:" …"}),a+=2)}}var H={"/":{placeholder:"搜索"}};const q=H,W=N({name:"SearchBox",props:{locales:{type:Object,required:!1,default:()=>q}},setup(e){const{locales:t}=M(e),p=w(""),a=w(!1),c=w(-1),r=V(p),n=y(()=>p.value&&a.value&&r.value.length),l=L(),o=S(),s=y(()=>t.value[o.value]??{});function i(){if(!n.value)return;let m=c.value-1;m<0&&(m=r.value.length-1),g(m)}function h(){if(!n.value)return;let m=c.value+1;m>=r.value.length&&(m=0),g(m)}function g(m){c.value=m}function D(){c.value=-1}function E(m){if(!n.value)return;const P=r.value[m];P&&l.push(P.path)}return{query:p,focused:a,focusIndex:c,suggestions:r,activeSuggestion:n,onUp:i,onDown:h,focus:g,unfocus:D,go:E,locale:s}}}),J={class:"search-box",role:"search"},X=["placeholder"],K=["onMousedown","onMouseenter"],Z=["href"],Y={key:0,class:"parent-page-title"},Q={class:"suggestion-row"},ee={class:"page-title"},te={class:"suggestion-content"};function ne(e,t,p,a,c,r){return u(),d("div",J,[z(f("input",{ref:"input","onUpdate:modelValue":t[0]||(t[0]=n=>e.query=n),"aria-label":"Search",class:_({focused:e.focused}),placeholder:e.locale.placeholder??"Search",autocomplete:"off",spellcheck:"false",onFocus:t[1]||(t[1]=()=>e.focused=!0),onBlur:t[2]||(t[2]=()=>e.focused=!1),onKeyup:[t[3]||(t[3]=x(n=>e.go(e.focusIndex),["enter"])),t[4]||(t[4]=x((...n)=>e.onUp&&e.onUp(...n),["up"])),t[5]||(t[5]=x((...n)=>e.onDown&&e.onDown(...n),["down"]))]},null,42,X),[[T,e.query]]),e.activeSuggestion?(u(),d("ul",{key:0,class:"suggestions",onMouseleave:t[7]||(t[7]=(...n)=>e.unfocus&&e.unfocus(...n))},[(u(!0),d(C,null,k(e.suggestions,(n,l)=>(u(),d("li",{key:l,class:_(["suggestion",{focused:l===e.focusIndex}]),onMousedown:o=>e.go(l),onMouseenter:o=>e.focus(l)},[f("a",{href:n.path,onClick:t[6]||(t[6]=F(()=>{},["prevent"]))},[n.parentPageTitle&&(!e.suggestions[l-1]||e.suggestions[l-1].parentPageTitle!==n.parentPageTitle)?(u(),d("div",Y,v(n.parentPageTitle),1)):R("",!0),f("div",Q,[f("div",ee,v(n.title||n.path),1),f("div",te,[(u(!0),d(C,null,k(n.display,(o,s)=>(u(),d("span",{key:s,class:_(o.type)},v(o.str),3))),128))])])],8,Z)],42,K))),128))],32)):R("",!0)])}const ae=I(W,[["render",ne],["__scopeId","data-v-fd6cd4d5"],["__file","SearchBox.vue"]]);export{ae as default};
