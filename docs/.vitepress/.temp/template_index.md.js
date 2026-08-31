import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/index.md
var __pageData = JSON.parse("{\"title\":\"Работа с шаблоном\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/index.md\",\"filePath\":\"template/index.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "template/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="работа-с-шаблоном" tabindex="-1">Работа с шаблоном <a class="header-anchor" href="#работа-с-шаблоном" aria-label="Permalink to “Работа с шаблоном”">​</a></h1><p>Шаблон — это готовое embedded-приложение на Vue 3 и TypeScript, которое генератор копирует в новый проект. В нём уже настроены Vite, JS API, локальная разработка с NSMP, ZIP-сборка и ручная публикация на инсталляцию.</p><div class="tip custom-block"><p class="custom-block-title">Кастомная версия jsAPI</p><p>Шаблон использует <code>@minitwiks/js-api</code> — независимо поддерживаемую производную версию библиотеки <code>@nsmp/js-api</code>. Она добавляет типизированный mock-слой, инициализацию через ENV и поддержку локальной разработки встроенных приложений.</p><p><a href="https://github.com/ErilovNikita/js-api/blob/main/README.md" target="_blank" rel="noreferrer">Документация</a> · <a href="https://github.com/ErilovNikita/js-api" target="_blank" rel="noreferrer">Репозиторий</a></p></div><h2 id="возможности-шаблона" tabindex="-1">Возможности шаблона <a class="header-anchor" href="#возможности-шаблона" aria-label="Permalink to “Возможности шаблона”">​</a></h2><ul><li>Vue 3 с Composition API и TypeScript;</li><li>Vite и прокси запросов <code>/sd/</code>;</li><li><code>@minitwiks/js-api</code>;</li><li>автоматическая ZIP-упаковка production-сборки;</li><li>ENV-конфигурация без обязательного JSON-файла;</li><li>локальная и CI/CD-публикация;</li><li>примеры работы с пользователем, темой и версиями.</li></ul><h2 id="рабочии-процесс" tabindex="-1">Рабочий процесс <a class="header-anchor" href="#рабочии-процесс" aria-label="Permalink to “Рабочий процесс”">​</a></h2><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span>Настройка ENV → локальная разработка → сборка ZIP → публикация в NSMP</span></span></code></pre></div><p>Если приложение ещё не создано, начните с <a href="./getting-started">быстрого старта</a>. Затем настройте <a href="./environment">переменные окружения</a> и запустите <a href="./development">локальную разработку</a>.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var template_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, template_default as default };
