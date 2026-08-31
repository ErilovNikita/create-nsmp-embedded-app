import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/github-actions.md
var __pageData = JSON.parse("{\"title\":\"GitHub Actions\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/github-actions.md\",\"filePath\":\"template/github-actions.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "template/github-actions.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="github-actions" tabindex="-1">GitHub Actions <a class="header-anchor" href="#github-actions" aria-label="Permalink to “GitHub Actions”">​</a></h1><p>Workflow находится в <code>.github/workflows/nsmp-deploy.yml</code> и запускается только вручную.</p><h2 id="настроика-секретов" tabindex="-1">Настройка секретов <a class="header-anchor" href="#настроика-секретов" aria-label="Permalink to “Настройка секретов”">​</a></h2><p>Откройте <strong>Settings → Secrets and variables → Actions → Secrets</strong> и добавьте:</p><table tabindex="0"><thead><tr><th>Secret</th><th>Значение</th></tr></thead><tbody><tr><td><code>NSMP_URL</code></td><td>URL инсталляции без <code>/sd</code></td></tr><tr><td><code>NSMP_ACCESS_KEY</code></td><td>Ключ доступа</td></tr></tbody></table><p>Необязательные параметры добавьте на вкладке <strong>Variables</strong>:</p><ul><li><code>NSMP_APP_CODE</code>;</li><li><code>NSMP_APP_TITLE</code>;</li><li><code>NSMP_APP_MIN_HEIGHT</code>;</li><li><code>NSMP_APP_ENABLE</code>;</li><li><code>NSMP_TLS_REJECT_UNAUTHORIZED</code>.</li></ul><h2 id="запуск" tabindex="-1">Запуск <a class="header-anchor" href="#запуск" aria-label="Permalink to “Запуск”">​</a></h2><ol><li>Откройте вкладку <strong>Actions</strong>.</li><li>Выберите <strong>Deploy to NSMP</strong>.</li><li>Нажмите <strong>Run workflow</strong>.</li><li>Выберите ветку и подтвердите запуск.</li></ol><p>Workflow устанавливает зависимости через <code>npm ci</code>, собирает ZIP и публикует его. <code>concurrency</code> не позволяет двум публикациям выполняться одновременно.</p><div class="tip custom-block"><p class="custom-block-title">Внутренняя сеть</p><p>Если NSMP недоступна из интернета, назначьте workflow self-hosted runner с сетевым доступом к инсталляции.</p></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/github-actions.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var github_actions_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, github_actions_default as default };
