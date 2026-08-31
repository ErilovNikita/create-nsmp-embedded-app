import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/index.md
var __pageData = JSON.parse("{\"title\":\"\",\"description\":\"\",\"frontmatter\":{\"layout\":\"home\",\"hero\":{\"name\":\"Create NSMP Embedded App\",\"text\":\"Встроенное приложение без лишней настройки\",\"tagline\":\"Vue 3, TypeScript, Vite, сборка и публикация в NSMP в одном пакете.\",\"image\":{\"src\":\"/logo.svg\",\"alt\":\"NSMP Embedded App\"},\"actions\":[{\"theme\":\"brand\",\"text\":\"Начать работу\",\"link\":\"/template/getting-started\"},{\"theme\":\"alt\",\"text\":\"Настроить публикацию\",\"link\":\"/template/deployment\"}]},\"features\":[{\"icon\":{\"src\":\"/icons/rocket.svg\",\"alt\":\"Ракета\",\"width\":28,\"height\":28},\"title\":\"Полностью готовый шаблон\",\"details\":\"Vue 3, TypeScript, Vite, JS API, ZIP-сборка и публикация уже настроены — можно сразу переходить к разработке приложения.\"},{\"icon\":{\"src\":\"/icons/unplug.svg\",\"alt\":\"Подключение\",\"width\":28,\"height\":28},\"title\":\"Разработка с NSMP\",\"details\":\"Dev-сервер проксирует запросы на инсталляцию, а ENV-конфигурация позволяет безопасно запускать и отлаживать приложение локально.\"},{\"icon\":{\"src\":\"/icons/blocks.svg\",\"alt\":\"Модули\",\"width\":28,\"height\":28},\"title\":\"Расширяемый генератор\",\"details\":\"Подключайте дополнительные пакеты и автоматизируйте их настройку через декларативный список и callback-функции.\"}]},\"headers\":[],\"relativePath\":\"index.md\",\"filePath\":\"index.md\",\"lastUpdated\":1788173835000}");
var _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h2 id="создаите-приложение" tabindex="-1">Создайте приложение <a class="header-anchor" href="#создаите-приложение" aria-label="Permalink to “Создайте приложение”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> create</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> nsmp-embedded-app@latest</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> my-app</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">cd</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> my-app</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> dev</span></span></code></pre></div><p>Генератор задаст несколько коротких вопросов, создаст проект и при необходимости сразу установит зависимости.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var docs_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, docs_default as default };
