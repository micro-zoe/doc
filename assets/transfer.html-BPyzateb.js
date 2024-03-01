import{_ as e,r as t,o as p,c as o,d as a,e as s,b as i,a as c}from"./app-Js4EkCke.js";const r={},l=c(`<h1 id="_0-x迁移到1-0" tabindex="-1"><a class="header-anchor" href="#_0-x迁移到1-0"><span>0.x迁移到1.0</span></a></h1><p>从0.x版本迁移到1.0只针对于旧项目，如果在迁移中发现问题，请及时反馈。</p><h3 id="迁移步骤" tabindex="-1"><a class="header-anchor" href="#迁移步骤"><span>迁移步骤</span></a></h3><p><strong>1、安装最新版本</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> i @micro-zoe/micro-app@latest <span class="token parameter variable">--save</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2、在start中增加配置</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">import</span> microApp <span class="token keyword">from</span> <span class="token string">&#39;@micro-zoe/micro-app&#39;</span>

microApp<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token string-property property">&#39;disable-memory-router&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 关闭虚拟路由系统</span>
  <span class="token string-property property">&#39;disable-patch-request&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 关闭对子应用请求的拦截</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vite迁移" tabindex="-1"><a class="header-anchor" href="#vite迁移"><span>vite迁移</span></a></h3><p>这里只针对子应用是vite的情况，基座为vite不需要特殊处理。</p><p>如果你已经接入vite子应用且正常运行，不建议进行迁移操作，除非遇到问题。</p><h5 id="迁移步骤-1" tabindex="-1"><a class="header-anchor" href="#迁移步骤-1"><span>迁移步骤：</span></a></h5><h6 id="步骤1-删除子应用vite-config-js中的配置" tabindex="-1"><a class="header-anchor" href="#步骤1-删除子应用vite-config-js中的配置"><span>步骤1：删除子应用vite.config.js中的配置</span></a></h6><p><img src="https://img11.360buyimg.com/imagetools/jfs/t1/139617/40/34382/151613/642ea0aaF6702a8f3/6499828d857d86d4.png" alt="alt" title=":size=900"></p><h6 id="步骤2-开启iframe沙箱" tabindex="-1"><a class="header-anchor" href="#步骤2-开启iframe沙箱"><span>步骤2：开启iframe沙箱</span></a></h6><p>删除之前的两个配置项：<code>inline</code>、<code>disableSandbox</code>，然后开启iframe沙箱。</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>micro-app</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>名称<span class="token punctuation">&#39;</span></span> <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>地址<span class="token punctuation">&#39;</span></span> <span class="token attr-name">iframe</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>micro-app</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="步骤3-删除基座中的自定义插件" tabindex="-1"><a class="header-anchor" href="#步骤3-删除基座中的自定义插件"><span>步骤3：删除基座中的自定义插件</span></a></h6><p><img src="https://img11.360buyimg.com/imagetools/jfs/t1/183018/25/34575/44563/642ea0a9F91294e53/03f1ef93b1531932.png" alt="alt" title=":size=900"></p><h6 id="步骤4-删除手动注册的通信对象" tabindex="-1"><a class="header-anchor" href="#步骤4-删除手动注册的通信对象"><span>步骤4：删除手动注册的通信对象</span></a></h6>`,19),d={href:"/zh/data",target:"_blank",rel:"noopener noreferrer"},u=a("p",null,[a("img",{src:"https://img10.360buyimg.com/imagetools/jfs/t1/98342/11/36602/21989/642ea0a9F6e5a197f/841d7fbd1e2c7bd1.png",alt:"alt",title:":size=700"})],-1);function m(h,k){const n=t("ExternalLinkIcon");return p(),o("div",null,[l,a("p",null,[s("删除手动注册的通信对象，改用默认的通信方式进行数据通信，参考"),a("a",d,[s("数据通信"),i(n)]),s("章节。")]),u])}const g=e(r,[["render",m],["__file","transfer.html.vue"]]);export{g as default};
