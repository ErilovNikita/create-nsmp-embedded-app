import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/utils/index.md
var __pageData = JSON.parse("{\"title\":\"Утилиты шаблона\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/utils/index.md\",\"filePath\":\"template/utils/index.md\",\"lastUpdated\":1788173835000}");
var _sfc_main = { name: "template/utils/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="утилиты-шаблона" tabindex="-1">Утилиты шаблона <a class="header-anchor" href="#утилиты-шаблона" aria-label="Permalink to “Утилиты шаблона”">​</a></h1><p>Шаблон содержит небольшие утилиты для типовых интеграций с NSMP.</p><h2 id="version" tabindex="-1">Version <a class="header-anchor" href="#version" aria-label="Permalink to “Version”">​</a></h2><p>Получает стабильные релизы GitHub или GitLab, сравнивает SemVer и формирует информацию о доступном обновлении.</p><p><a href="./version">Документация Version →</a></p><h2 id="theme" tabindex="-1">Theme <a class="header-anchor" href="#theme" aria-label="Permalink to “Theme”">​</a></h2><p>Получает текущую тему оформления через NSMP endpoint и возвращает строковое значение для интерфейса приложения.</p><p><a href="./theme">Документация Theme →</a></p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/utils/index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var utils_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, utils_default as default };
