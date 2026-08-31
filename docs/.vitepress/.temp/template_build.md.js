import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/build.md
var __pageData = JSON.parse("{\"title\":\"Сборка приложения\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/build.md\",\"filePath\":\"template/build.md\",\"lastUpdated\":1788173835000}");
var _sfc_main = { name: "template/build.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="сборка-приложения" tabindex="-1">Сборка приложения <a class="header-anchor" href="#сборка-приложения" aria-label="Permalink to “Сборка приложения”">​</a></h1><h2 id="production-сборка" tabindex="-1">Production-сборка <a class="header-anchor" href="#production-сборка" aria-label="Permalink to “Production-сборка”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> build</span></span></code></pre></div><p>Команда выполняет два этапа:</p><ol><li><code>vue-tsc -b</code> проверяет TypeScript;</li><li><code>vite build</code> собирает приложение и запускает ZIP-плагин.</li></ol><h2 id="результат" tabindex="-1">Результат <a class="header-anchor" href="#результат" aria-label="Permalink to “Результат”">​</a></h2><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span>dist/                              # файлы приложения</span></span>
<span class="line"><span>dist-zip/&lt;app-code&gt;-&lt;version&gt;.zip  # архив NSMP</span></span></code></pre></div><p>Код берётся из <code>VITE_APP_CODE</code>, а при его отсутствии — из <code>name</code> в <code>package.json</code>. Версия берётся из <code>version</code> в <code>package.json</code>.</p><p>Например:</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span>dist-zip/my-nsmp-app-1.2.0.zip</span></span></code></pre></div><p>Vite использует относительный <code>base: &quot;./&quot;</code>, поэтому ресурсы внутри архива работают независимо от URL размещения embedded-приложения.</p><h2 id="сборка-без-публикации" tabindex="-1">Сборка без публикации <a class="header-anchor" href="#сборка-без-публикации" aria-label="Permalink to “Сборка без публикации”">​</a></h2><p><code>npm run build</code> не обращается к инсталляции. Архив можно проверить или передать отдельно, а затем опубликовать командой:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> deploy</span></span></code></pre></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/build.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var build_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, build_default as default };
