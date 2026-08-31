import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/generator/index.md
var __pageData = JSON.parse("{\"title\":\"Разработка генератора\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"generator/index.md\",\"filePath\":\"generator/index.md\",\"lastUpdated\":1788173835000}");
var _sfc_main = { name: "generator/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="разработка-генератора" tabindex="-1">Разработка генератора <a class="header-anchor" href="#разработка-генератора" aria-label="Permalink to “Разработка генератора”">​</a></h1><p><code>create-nsmp-embedded-app</code> — интерактивный CLI для создания встроенных приложений NSMP. Он копирует готовый шаблон, подставляет имя и код приложения, предлагает дополнительные зависимости и при необходимости сразу выполняет <code>npm install</code>.</p><h2 id="что-делает-генератор" tabindex="-1">Что делает генератор <a class="header-anchor" href="#что-делает-генератор" aria-label="Permalink to “Что делает генератор”">​</a></h2><ul><li>проверяет имя проекта;</li><li>не перезаписывает существующую директорию;</li><li>копирует шаблон без локальных зависимостей и сборок;</li><li>восстанавливает <code>.gitignore</code>, GitHub Actions и GitLab CI;</li><li>создаёт локальный <code>VITE_APP_CODE</code>;</li><li>подключает выбранные дополнительные пакеты;</li><li>выполняет callback-настройку пакетов;</li><li>устанавливает зависимости по выбору пользователя.</li></ul><h2 id="когда-нужен-этот-раздел" tabindex="-1">Когда нужен этот раздел <a class="header-anchor" href="#когда-нужен-этот-раздел" aria-label="Permalink to “Когда нужен этот раздел”">​</a></h2><p>Этот раздел нужен, если вы хотите изменить CLI, добавить новые вопросы, зависимости или автоматическую настройку создаваемых проектов. Для обычной работы с уже созданным приложением используйте раздел <a href="/create-nsmp-embedded-app/template/">«Работа с шаблоном»</a>.</p><p>Начните с <a href="./development">подготовки репозитория</a> или изучите <a href="./optional-dependencies">настройку дополнительных зависимостей</a>.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("generator/index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var generator_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, generator_default as default };
