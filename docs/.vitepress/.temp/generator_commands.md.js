import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/generator/commands.md
var __pageData = JSON.parse("{\"title\":\"Команды разработки генератора\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"generator/commands.md\",\"filePath\":\"generator/commands.md\",\"lastUpdated\":1788173835000}");
var _sfc_main = { name: "generator/commands.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="команды-разработки-генератора" tabindex="-1">Команды разработки генератора <a class="header-anchor" href="#команды-разработки-генератора" aria-label="Permalink to “Команды разработки генератора”">​</a></h1><h2 id="разработка-репозитория" tabindex="-1">Разработка репозитория <a class="header-anchor" href="#разработка-репозитория" aria-label="Permalink to “Разработка репозитория”">​</a></h2><table tabindex="0"><thead><tr><th>Команда</th><th>Назначение</th></tr></thead><tbody><tr><td><code>npm run dev</code></td><td>Запустить dev-сервер шаблона</td></tr><tr><td><code>npm run build</code></td><td>Собрать шаблон приложения</td></tr><tr><td><code>npm test</code></td><td>Запустить тесты CLI</td></tr><tr><td><code>npm run check</code></td><td>Проверить синтаксис CLI-файлов</td></tr><tr><td><code>npm run docs:dev</code></td><td>Запустить документацию</td></tr><tr><td><code>npm run docs:build</code></td><td>Собрать статическую документацию</td></tr><tr><td><code>npm run docs:preview</code></td><td>Просмотреть production-сборку документации</td></tr></tbody></table></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("generator/commands.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var commands_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, commands_default as default };
