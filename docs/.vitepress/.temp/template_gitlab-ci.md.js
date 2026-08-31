import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/gitlab-ci.md
var __pageData = JSON.parse("{\"title\":\"GitLab CI\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/gitlab-ci.md\",\"filePath\":\"template/gitlab-ci.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "template/gitlab-ci.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="gitlab-ci" tabindex="-1">GitLab CI <a class="header-anchor" href="#gitlab-ci" aria-label="Permalink to “GitLab CI”">​</a></h1><p>Конфигурация находится в <code>.gitlab-ci.yml</code>. Job публикации создаётся только для pipeline, запущенного через веб-интерфейс.</p><h2 id="настроика-переменных" tabindex="-1">Настройка переменных <a class="header-anchor" href="#настроика-переменных" aria-label="Permalink to “Настройка переменных”">​</a></h2><p>Откройте <strong>Settings → CI/CD → Variables</strong> и добавьте:</p><table tabindex="0"><thead><tr><th>Variable</th><th>Обязательна</th><th>Рекомендация</th></tr></thead><tbody><tr><td><code>NSMP_URL</code></td><td>да</td><td>Сделать protected</td></tr><tr><td><code>NSMP_ACCESS_KEY</code></td><td>да</td><td>Сделать masked и protected</td></tr></tbody></table><p>Там же можно добавить необязательные <code>NSMP_APP_CODE</code>, <code>NSMP_APP_TITLE</code>, <code>NSMP_APP_MIN_HEIGHT</code>, <code>NSMP_APP_ENABLE</code> и <code>NSMP_TLS_REJECT_UNAUTHORIZED</code>.</p><h2 id="запуск" tabindex="-1">Запуск <a class="header-anchor" href="#запуск" aria-label="Permalink to “Запуск”">​</a></h2><ol><li>Откройте <strong>Build → Pipelines</strong>.</li><li>Нажмите <strong>New pipeline</strong> или <strong>Run pipeline</strong>.</li><li>Выберите ветку.</li><li>Запустите pipeline.</li></ol><p>Обычный push не создаёт job публикации. <code>resource_group</code> гарантирует последовательную загрузку нескольких запусков.</p><p>Для закрытой инсталляции используйте GitLab Runner внутри доступной сети.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/gitlab-ci.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var gitlab_ci_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, gitlab_ci_default as default };
