import{_ as i,r as e,o as r,c as u,b as n,w as t,d as a,e as s,a as p}from"./app-Js4EkCke.js";const d={},k=p(`<h1 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始"><span>快速开始</span></a></h1><p>我们分别列出主应用和子应用需要进行的修改，具体介绍<code>micro-app</code>的使用方式。</p><h3 id="主应用" tabindex="-1"><a class="header-anchor" href="#主应用"><span>主应用</span></a></h3><p>1、安装依赖</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> i @micro-zoe/micro-app <span class="token parameter variable">--save</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、初始化<code>micro-app</code></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">import</span> microApp <span class="token keyword">from</span> <span class="token string">&#39;@micro-zoe/micro-app&#39;</span>

microApp<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、嵌入子应用</p>`,8),m=a("div",{class:"language-javascript line-numbers-mode","data-ext":"js","data-title":"js"},[a("pre",{class:"language-javascript"},[a("code",null,[a("span",{class:"token keyword"},"export"),s(),a("span",{class:"token keyword"},"function"),s(),a("span",{class:"token function"},"MyPage"),s(),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),s(),a("span",{class:"token punctuation"},"{"),s(`
  `),a("span",{class:"token keyword"},"return"),s(),a("span",{class:"token punctuation"},"("),s(`
    `),a("span",{class:"token operator"},"<"),s("div"),a("span",{class:"token operator"},">"),s(`
      `),a("span",{class:"token operator"},"<"),s("h1"),a("span",{class:"token operator"},">"),s("子应用👇"),a("span",{class:"token operator"},"<"),a("span",{class:"token operator"},"/"),s("h1"),a("span",{class:"token operator"},">"),s(`
      `),a("span",{class:"token comment"},"// name：应用名称, url：应用地址"),s(`
      `),a("span",{class:"token operator"},"<"),s("micro"),a("span",{class:"token operator"},"-"),s("app name"),a("span",{class:"token operator"},"="),a("span",{class:"token string"},"'my-app'"),s(" url"),a("span",{class:"token operator"},"="),a("span",{class:"token string"},"'http://localhost:3000/'"),a("span",{class:"token operator"},">"),a("span",{class:"token operator"},"<"),a("span",{class:"token operator"},"/"),s("micro"),a("span",{class:"token operator"},"-"),s("app"),a("span",{class:"token operator"},">"),s(`
    `),a("span",{class:"token operator"},"<"),a("span",{class:"token operator"},"/"),s("div"),a("span",{class:"token operator"},">"),s(`
  `),a("span",{class:"token punctuation"},")"),s(`
`),a("span",{class:"token punctuation"},"}"),s(`
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"})])],-1),v=a("div",{class:"language-html line-numbers-mode","data-ext":"html","data-title":"html"},[a("pre",{class:"language-html"},[a("code",null,[a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),s("template")]),a("span",{class:"token punctuation"},">")]),s(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),s("div")]),a("span",{class:"token punctuation"},">")]),s(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),s("h1")]),a("span",{class:"token punctuation"},">")]),s("子应用👇"),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),s("h1")]),a("span",{class:"token punctuation"},">")]),s(`
    `),a("span",{class:"token comment"},"<!-- name：应用名称, url：应用地址 -->"),s(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),s("micro-app")]),s(),a("span",{class:"token attr-name"},"name"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},"'"),s("my-app"),a("span",{class:"token punctuation"},"'")]),s(),a("span",{class:"token attr-name"},"url"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},"'"),s("http://localhost:3000/"),a("span",{class:"token punctuation"},"'")]),a("span",{class:"token punctuation"},">")]),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),s("micro-app")]),a("span",{class:"token punctuation"},">")]),s(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),s("div")]),a("span",{class:"token punctuation"},">")]),s(`
`),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),s("template")]),a("span",{class:"token punctuation"},">")]),s(`
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"})])],-1),h=p(`<h3 id="子应用" tabindex="-1"><a class="header-anchor" href="#子应用"><span>子应用</span></a></h3><p>1、在webpack-dev-server的headers中设置跨域支持。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;Access-Control-Allow-Origin&#39;</span><span class="token operator">:</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成以上步骤即完成微前端的接入。</p>`,4),b={class:"custom-container note"},g=a("p",{class:"custom-container-title"},"Note",-1),_=a("li",null,"name：必传参数，必须以字母开头，且不可以带特殊符号(中划线、下划线除外)",-1),f=a("li",null,"url：必传参数，必须指向子应用的index.html，如：http://localhost:3000/ 或 http://localhost:3000/index.html",-1),x={href:"/zh/questions#_2%E3%80%81%E5%AD%90%E5%BA%94%E7%94%A8%E4%B8%80%E5%AE%9A%E8%A6%81%E6%94%AF%E6%8C%81%E8%B7%A8%E5%9F%9F%E5%90%97",target:"_blank",rel:"noopener noreferrer"};function E(y,j){const o=e("CodeGroupItem"),c=e("CodeGroup"),l=e("ExternalLinkIcon");return r(),u("div",null,[k,n(c,null,{default:t(()=>[n(o,{title:"React"},{default:t(()=>[m]),_:1}),n(o,{title:"Vue"},{default:t(()=>[v]),_:1})]),_:1}),h,a("div",b,[g,a("ol",null,[_,f,a("li",null,[s("子应用必须支持跨域，跨域配置参考"),a("a",x,[s("这里"),n(l)])])])])])}const w=i(d,[["render",E],["__file","start.html.vue"]]);export{w as default};
