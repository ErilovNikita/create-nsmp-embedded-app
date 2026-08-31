import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/development.md
var __pageData = JSON.parse("{\"title\":\"Локальная разработка\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/development.md\",\"filePath\":\"template/development.md\",\"lastUpdated\":1788173835000}");
var _sfc_main = { name: "template/development.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="локальная-разработка" tabindex="-1">Локальная разработка <a class="header-anchor" href="#локальная-разработка" aria-label="Permalink to “Локальная разработка”">​</a></h1><h2 id="запуск-сервера" tabindex="-1">Запуск сервера <a class="header-anchor" href="#запуск-сервера" aria-label="Permalink to “Запуск сервера”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> dev</span></span></code></pre></div><p>Vite запускается в режиме <code>development</code> и загружает <code>.env.development</code> вместе с локальными ENV-файлами.</p><h2 id="проксирование-nsmp" tabindex="-1">Проксирование NSMP <a class="header-anchor" href="#проксирование-nsmp" aria-label="Permalink to “Проксирование NSMP”">​</a></h2><p>Запросы, начинающиеся с <code>/sd/</code>, проксируются на <code>VITE_APP_REAL_URL</code>. Из URL автоматически удаляются завершающий <code>/</code> и путь <code>/sd</code>, поэтому допустима запись как с <code>/sd</code>, так и без него.</p><p>Прокси использует:</p><ul><li>изменение origin запроса;</li><li>WebSocket;</li><li>работу с тестовыми TLS-сертификатами в dev-режиме.</li></ul><h2 id="компонент-пользователя" tabindex="-1">Компонент пользователя <a class="header-anchor" href="#компонент-пользователя" aria-label="Permalink to “Компонент пользователя”">​</a></h2><p><code>User.vue</code> получает UUID текущего пользователя через JS API, запрашивает его заголовок и формирует ссылку на карточку оператора. Если ссылка отсутствует, обработчик перехода не вызывается и элемент не отображается как кликабельный.</p><h2 id="изменение-приложения" tabindex="-1">Изменение приложения <a class="header-anchor" href="#изменение-приложения" aria-label="Permalink to “Изменение приложения”">​</a></h2><p>Начните с:</p><ul><li><code>src/App.vue</code> — экран приложения;</li><li><code>src/main.ts</code> — глобальные плагины;</li><li><code>src/styles/global.css</code> — общие стили;</li><li><code>src/components/</code> — переиспользуемые компоненты.</li></ul><p>Перед production-сборкой TypeScript проверяется командой <code>vue-tsc -b</code>.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/development.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var development_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, development_default as default };
