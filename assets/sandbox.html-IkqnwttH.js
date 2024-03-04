import{_ as e,r as t,o,c as p,d as n,e as a,b as i,w as c,a as l}from"./app-CYuVcYeJ.js";const d={},r=n("h1",{id:"js沙箱",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#js沙箱"},[n("span",null,"JS沙箱")])],-1),u=n("h3",{id:"沙箱介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#沙箱介绍"},[n("span",null,"沙箱介绍")])],-1),k=n("p",null,[a("我们使用"),n("code",null,"Proxy"),a("拦截了用户全局操作的行为，防止对window的访问和修改，避免全局变量污染。"),n("code",null,"micro-app"),a("中的每个子应用都运行在沙箱环境，以获取相对纯净的运行空间。")],-1),m=n("p",null,"沙箱是默认开启的，正常情况下不建议关闭，以避免出现不可预知的问题。",-1),v=l(`<h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h3><h4 id="_1、子应用在沙箱环境中如何获取到真实window" tabindex="-1"><a class="header-anchor" href="#_1、子应用在沙箱环境中如何获取到真实window"><span>1、子应用在沙箱环境中如何获取到真实window</span></a></h4><p>目前有3种方式在子应用中获取外部真实window</p><ul><li>1、new Function(&quot;return window&quot;)() 或 Function(&quot;return window&quot;)()</li><li>2、(0, eval)(&#39;window&#39;)</li><li>3、window.rawWindow</li></ul><h4 id="_2、子应用抛出错误信息-xxx-未定义" tabindex="-1"><a class="header-anchor" href="#_2、子应用抛出错误信息-xxx-未定义"><span>2、子应用抛出错误信息：xxx 未定义</span></a></h4><p><strong>包括：</strong></p><ul><li><code>xxx is not defined</code></li><li><code>xxx is not a function</code></li><li><code>Cannot read properties of undefined</code></li></ul><p><strong>原因：</strong></p><p>在沙箱环境中，顶层变量不会泄漏为全局变量。</p><p>例如在正常情况下，通过 var name 或 function name () {} 定义的顶层变量会泄漏为全局变量，通过window.name或name就可以全局访问。</p><p>但是在沙箱环境下这些顶层变量无法泄漏为全局变量，window.name或name的值为undefined，导致出现问题。</p><p><strong>解决方式</strong>：</p><p><em>方式一：手动修改</em></p><p>将 var name 或 function name () {} 修改为 window.name = xx</p><p><em>方式二：通过插件系统修改子应用代码</em></p><p>比如常见的加载webpack打包的dll文件失败的问题，因为dll文件的内容和js地址相对固定，可以直接进行全局查找和修改。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>microApp<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function x(h,w){const s=t("RouterLink");return o(),p("div",null,[r,u,k,m,n("p",null,[a("如何关闭沙箱请查看："),i(s,{to:"/v0/zh/configure.html#disablesandbox"},{default:c(()=>[a("disableSandbox")]),_:1})]),v])}const b=e(d,[["render",x],["__file","sandbox.html.vue"]]);export{b as default};
