import{_ as i,r as t,o as r,c as u,d as n,e as s,b as a,w as p,a as o}from"./app-Js4EkCke.js";const d={},k=n("h1",{id:"常见问题",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#常见问题"},[n("span",null,"常见问题")])],-1),v=n("h2",{id:"_1、我需要用到微前端吗",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1、我需要用到微前端吗"},[n("span",null,"1、我需要用到微前端吗？")])],-1),m={href:"https://www.yuque.com/kuitos/gky7yw/gesexv",target:"_blank",rel:"noopener noreferrer"},h=o(`<p>相比于iframe，微前端拥有更好的用户体验，同时它也要求开发者对于前端框架和路由原理具有一定的理解。</p><p>微前端的本质是将两个不相关的页面强行合并为一，这其中不可避免会出现各种冲突，虽然微前端框架解决了几乎所有的冲突，但偶尔也会有特殊情况出现，这需要开发者具有处理特殊情况的能力和心态。</p><p>微前端不是万能的，它的实现原理注定无法像iframe一样简单稳定。</p><p>如果你不知道自己是否需要用微前端，那么大概率是不需要。</p><h2 id="_2、子应用一定要支持跨域吗" tabindex="-1"><a class="header-anchor" href="#_2、子应用一定要支持跨域吗"><span>2、子应用一定要支持跨域吗？</span></a></h2><p>是的！</p><p>如果是开发环境，可以在webpack-dev-server中设置headers支持跨域。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;Access-Control-Allow-Origin&#39;</span><span class="token operator">:</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),b={href:"https://segmentfault.com/a/1190000012550346",target:"_blank",rel:"noopener noreferrer"},_=n("h2",{id:"_3、兼容性如何",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_3、兼容性如何"},[n("span",null,"3、兼容性如何")])],-1),g=n("p",null,"micro-app依赖于CustomElements和Proxy两个较新的API。",-1),f={href:"https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements",target:"_blank",rel:"noopener noreferrer"},x=n("p",null,"但是Proxy暂时没有做兼容，所以对于不支持Proxy的浏览器无法运行micro-app。",-1),w={href:"https://caniuse.com/?search=Proxy",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,"总体如下：",-1),j=n("ul",null,[n("li",null,"PC端：除了IE浏览器，其它浏览器基本兼容。"),n("li",null,"移动端：ios10+、android5+")],-1),E=n("h2",{id:"_4、微应用无法渲染但没有报错",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_4、微应用无法渲染但没有报错"},[n("span",null,"4、微应用无法渲染但没有报错")])],-1),B={href:"/v0/zh/route",target:"_blank",rel:"noopener noreferrer"},q={href:"/v0/zh/questions#_5%E3%80%81webpack-jsonpfunction-%E5%86%B2%E7%AA%81%E5%AF%BC%E8%87%B4%E6%B8%B2%E6%9F%93%E5%A4%B1%E8%B4%A5",target:"_blank",rel:"noopener noreferrer"},A=n("h2",{id:"_5、webpack-jsonpfunction-冲突导致渲染失败",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5、webpack-jsonpfunction-冲突导致渲染失败"},[n("span",null,"5、webpack-jsonpfunction-冲突导致渲染失败")])],-1),C=n("p",null,"这种情况常见于多个应用都是通过create-react-app等类似脚手架创建的项目，或一个应用多次重复渲染。",-1),F=n("p",null,"因为相同的jsonpFunction名称会导致资源加载混乱。",-1),I=n("p",null,[n("strong",null,"解决方式：修改子应用的webpack配置")],-1),P=n("div",{class:"language-javascript line-numbers-mode","data-ext":"js","data-title":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// webpack.config.js"),s(`
module`),n("span",{class:"token punctuation"},"."),s("exports "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token literal-property property"},"output"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token operator"},"..."),s(`
    `),n("span",{class:"token literal-property property"},"jsonpFunction"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"webpackJsonp_custom_app_name"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"globalObject"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'window'"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),U=n("div",{class:"language-javascript line-numbers-mode","data-ext":"js","data-title":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// webpack.config.js"),s(`
module`),n("span",{class:"token punctuation"},"."),s("exports "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token literal-property property"},"output"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token operator"},"..."),s(`
    `),n("span",{class:"token literal-property property"},"chunkLoadingGlobal"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'webpackJsonp_custom_app_name'"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"globalObject"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'window'"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),L=n("h2",{id:"_6、开发时每次保存文件时报错-热更新导致报错",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_6、开发时每次保存文件时报错-热更新导致报错"},[n("span",null,"6、开发时每次保存文件时报错 (热更新导致报错)")])],-1),N=n("p",null,"在一些场景下，热更新会导致保存时报错，请关闭热更新来解决这个问题，同时我们也在尝试更好的解决方案。",-1),O=n("h2",{id:"_7、vue3的问题",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_7、vue3的问题"},[n("span",null,"7、vue3的问题")])],-1),z=n("p",null,[n("strong",null,"1、样式失效")],-1),R={href:"/v0/zh/configure#disablescopecss",target:"_blank",rel:"noopener noreferrer"},D=n("p",null,[n("strong",null,"2、图片等静态资源无法正常加载")],-1),G={href:"/v0/zh/static-source#publicpath",target:"_blank",rel:"noopener noreferrer"},V=o(`<h2 id="_8、开发环境中渲染angular子应用报错" tabindex="-1"><a class="header-anchor" href="#_8、开发环境中渲染angular子应用报错"><span>8、开发环境中渲染angular子应用报错</span></a></h2><p>目前需要关闭angular的热更新来解决这个问题，同时我们也在尝试更好的解决方案。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token string">&quot;scripts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
  <span class="token string">&quot;start&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;ng serve --live-reload false&quot;</span>,
<span class="token punctuation">}</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9、micro-app-报错-an-app-named-xx-already-exists" tabindex="-1"><a class="header-anchor" href="#_9、micro-app-报错-an-app-named-xx-already-exists"><span>9、micro-app 报错 an app named xx already exists</span></a></h2><p>这是<code>name</code>名称冲突导致的，请确保每个子应用的<code>name</code>值是唯一的。</p><h2 id="_10、基座应用的样式影响到子应用" tabindex="-1"><a class="header-anchor" href="#_10、基座应用的样式影响到子应用"><span>10、基座应用的样式影响到子应用</span></a></h2><p>虽然我们将子应用的样式进行隔离，但基座应用的样式依然会影响到子应用，如果发生冲突，推荐通过约定前缀或CSS Modules方式解决。</p><p>如果你使用的是<code>ant-design</code>等组件库，一般会提供添加前缀进行样式隔离的功能。</p><h2 id="_11、子应用在沙箱环境中如何获取到外部真实window" tabindex="-1"><a class="header-anchor" href="#_11、子应用在沙箱环境中如何获取到外部真实window"><span>11、子应用在沙箱环境中如何获取到外部真实window？</span></a></h2><p>目前有3种方式在子应用中获取外部真实window</p><ul><li>1、new Function(&quot;return window&quot;)() 或 Function(&quot;return window&quot;)()</li><li>2、(0, eval)(&#39;window&#39;)</li><li>3、window.rawWindow</li></ul><h2 id="_12、错误信息-xxx-未定义" tabindex="-1"><a class="header-anchor" href="#_12、错误信息-xxx-未定义"><span>12、错误信息：xxx 未定义</span></a></h2><p><strong>包括：</strong></p><ul><li><code>xxx is not defined</code></li><li><code>xxx is not a function</code></li><li><code>Cannot read properties of undefined</code></li></ul><p><strong>原因：</strong></p><p>在微前端的沙箱环境中，顶层变量不会泄漏为全局变量。</p><p>例如在正常情况下，通过 var name 或 function name () {} 定义的顶层变量会泄漏为全局变量，通过window.name或name就可以全局访问。</p><p>但是在沙箱环境下这些顶层变量无法泄漏为全局变量，window.name或name为undefined，导致出现问题。</p><p><strong>解决方式</strong>：</p><p><em>方式一：手动修改</em></p><p>将 var name 或 function name () {} 修改为 window.name = xx</p><p><em>方式二：通过插件系统修改子应用代码</em></p><p>比如常见的加载webpack打包的dll文件失败的问题，因为dll文件的内容和js地址相对固定，可以直接进行全局查找和修改。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>microApp<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">应用名称</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token function">loader</span><span class="token punctuation">(</span><span class="token parameter">code<span class="token punctuation">,</span> url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>url <span class="token operator">===</span> <span class="token string">&#39;xxx.js&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            code <span class="token operator">=</span> code<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;var xx_dll=&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;window.xx_dll=&#39;</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> code
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13、子应用加载sockjs-node失败" tabindex="-1"><a class="header-anchor" href="#_13、子应用加载sockjs-node失败"><span>13、子应用加载sockjs-node失败</span></a></h2><p>这个问题常见于create-react-app创建的子应用，推荐通过插件系统来解决。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>microApp<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;子应用name&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token function">loader</span><span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>code<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;sockjs-node&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            code <span class="token operator">=</span> code<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;window.location.port&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;子应用端口&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;window.location.hostname&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;子应用host，如果和基座相同则不需要替换hostname&#39;</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> code
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际情况可能更加复杂，上面只是一种解决思路。</p><h2 id="_14、子应用请求接口失败" tabindex="-1"><a class="header-anchor" href="#_14、子应用请求接口失败"><span>14、子应用请求接口失败</span></a></h2><ul><li><p>1、请确保接口请求没有跨域问题，因为子应用被加载到基座渲染，所以请求接口是从基座发送。</p></li><li><p>2、请求的接口为相对地址，会以基座域名进行补全，导致报错。</p><p>如：<code>fetch(&#39;/api/data&#39;)</code>，在请求时会自动被浏览器补全为<code>fetch(基座域名 + &#39;/api/data&#39;)</code></p><p>为了避免这个问题，子应用需要使用完整的地址：<code>fetch(子应用域名 + &#39;/api/data&#39;)</code></p></li></ul><h2 id="_15、子应用反向代理失败" tabindex="-1"><a class="header-anchor" href="#_15、子应用反向代理失败"><span>15、子应用反向代理失败</span></a></h2><p><strong>解决方式：</strong> 子应用使用完整的地址发送请求</p><p>如：<code>fetch(&#39;/api/data&#39;)</code> 改为 <code>fetch(子应用域名 + &#39;/api/data&#39;)</code></p><p>如果还是报跨域问题，则是服务端做了限制，此时需要撤除上述操作，并将子应用的代理放到基座应用中。</p><h2 id="_16、子应用多次渲染后内存越来越大" tabindex="-1"><a class="header-anchor" href="#_16、子应用多次渲染后内存越来越大"><span>16、子应用多次渲染后内存越来越大</span></a></h2>`,35),S={href:"/v0/zh/advanced#_3%E3%80%81%E5%86%85%E5%AD%98%E4%BC%98%E5%8C%96",target:"_blank",rel:"noopener noreferrer"},M=n("h2",{id:"_17、子应用之间如何跳转",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_17、子应用之间如何跳转"},[n("span",null,"17、子应用之间如何跳转")])],-1),J={href:"/v0/zh/route#%E5%BA%94%E7%94%A8%E4%B9%8B%E9%97%B4%E5%A6%82%E4%BD%95%E8%B7%B3%E8%BD%AC",target:"_blank",rel:"noopener noreferrer"},T=n("h2",{id:"_18、jsonp请求如何处理",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_18、jsonp请求如何处理"},[n("span",null,"18、jsonp请求如何处理？")])],-1),W={href:"/v0/zh/configure#ignore%E5%BF%BD%E7%95%A5%E5%85%83%E7%B4%A0",target:"_blank",rel:"noopener noreferrer"},H=o(`<h2 id="_19、子应用通过a标签下载文件失败" tabindex="-1"><a class="header-anchor" href="#_19、子应用通过a标签下载文件失败"><span>19、子应用通过a标签下载文件失败</span></a></h2><p><strong>原因：</strong> 当跨域时(基座和文件在不同域名下)，无法通过a标签的download属性实现下载。</p><p><strong>解决方式：</strong></p><p><strong>方式1：</strong> 转换为blob形式下载</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>xxx.png<span class="token punctuation">&#39;</span></span> <span class="token attr-name">download</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>filename.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>downloadFile<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>下载<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// 通过blob下载文件</span>
<span class="token keyword">function</span> <span class="token function">downloadFile</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 微前端环境下转换为blob下载，子应用单独运行时依然使用a标签下载</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>__MICRO_APP_ENVIRONMENT__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 注意href必须是绝对地址</span>
    <span class="token function">fetch</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>href<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">blob</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">blob</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> blobUrl <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span>
        <span class="token comment">// 转化为blobURL后再通过a标签下载</span>
        <span class="token keyword">const</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>
        a<span class="token punctuation">.</span>href <span class="token operator">=</span> blobUrl
        a<span class="token punctuation">.</span>download <span class="token operator">=</span> <span class="token string">&#39;filename.png&#39;</span>
        a<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span>blobUrl<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式2：</strong> 将文件放到基座域名下，判断微前端环境下a标签href属性设置为基座的文件地址</p>`,7);function K(Q,X){const e=t("ExternalLinkIcon"),c=t("CodeGroupItem"),l=t("CodeGroup");return r(),u("div",null,[k,v,n("p",null,[s("在此之前建议你先阅读"),n("a",m,[s("Why Not Iframe"),a(e)]),s("。")]),h,n("p",null,[s("如果是线上环境，可以通过"),n("a",b,[s("配置nginx"),a(e)]),s("支持跨域。")]),_,g,n("p",null,[s("对于不支持CustomElements的浏览器，可以通过引入polyfill进行兼容，详情可参考："),n("a",f,[s("webcomponents/polyfills"),a(e)]),s("。")]),x,n("p",null,[s("浏览器兼容性可以查看："),n("a",w,[s("Can I Use"),a(e)])]),y,j,E,n("p",null,[s("请检查路由配置是否正确，详情查看"),n("a",B,[s("路由"),a(e)]),s("一章，或者"),n("a",q,[s("下面第5条：jsonpFunction是否冲突"),a(e)])]),A,C,F,I,a(l,null,{default:p(()=>[a(c,{title:"webpack4"},{default:p(()=>[P]),_:1}),a(c,{title:"webpack5"},{default:p(()=>[U]),_:1})]),_:1}),L,N,O,z,n("p",null,[s("通过"),n("a",R,[s("禁用样式隔离"),a(e)]),s("解决。")]),D,n("p",null,[s("vue3中需要配置publicPath补全资源路径，详情请查看"),n("a",G,[s("publicPath"),a(e)])]),V,n("p",null,[s("参考"),n("a",S,[s("内存优化"),a(e)]),s("一章")]),M,n("p",null,[s("参考"),n("a",J,[s("应用之间如何跳转"),a(e)]),s("一章")]),T,n("p",null,[s("参考"),n("a",W,[s("ignore"),a(e)])]),H])}const Z=i(d,[["render",K],["__file","questions.html.vue"]]);export{Z as default};
