import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/environment.md
var __pageData = JSON.parse("{\"title\":\"Переменные окружения\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/environment.md\",\"filePath\":\"template/environment.md\",\"lastUpdated\":1788173835000}");
var _sfc_main = { name: "template/environment.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="переменные-окружения" tabindex="-1">Переменные окружения <a class="header-anchor" href="#переменные-окружения" aria-label="Permalink to “Переменные окружения”">​</a></h1><p>Проект использует две независимые группы настроек: <code>VITE_*</code> для разработки приложения и <code>NSMP_*</code> для публикации.</p><div class="warning custom-block"><p class="custom-block-title">Не храните секреты в Git</p><p>Файлы <code>.env.*</code> игнорируются. Коммитьте только безопасные примеры <code>example.env</code> и <code>example.env.deploy</code>.</p></div><h2 id="окружение-разработки" tabindex="-1">Окружение разработки <a class="header-anchor" href="#окружение-разработки" aria-label="Permalink to “Окружение разработки”">​</a></h2><p>Создайте <code>.env.development</code> из примера:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">cp</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> example.env</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> .env.development</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Переменная</th><th>Назначение</th></tr></thead><tbody><tr><td><code>VITE_ACCESS_KEY</code></td><td>Ключ доступа для разработки</td></tr><tr><td><code>VITE_APP_URL</code></td><td>URL локального приложения, обычно <code>http://localhost:5173/</code></td></tr><tr><td><code>VITE_APP_REAL_URL</code></td><td>URL реальной инсталляции NSMP</td></tr><tr><td><code>VITE_REST_PATH</code></td><td>REST-путь приложения</td></tr><tr><td><code>VITE_USER_UUID</code></td><td>UUID пользователя для локального режима</td></tr><tr><td><code>VITE_SUBJECT_UUID</code></td><td>UUID объекта для локального режима</td></tr><tr><td><code>VITE_USER_LOGIN</code></td><td>Логин пользователя</td></tr></tbody></table><p><code>VITE_APP_CODE</code> создаётся автоматически в локальном <code>.env.local</code>. Если файла нет, для сборки используется имя пакета.</p><h2 id="окружение-публикации" tabindex="-1">Окружение публикации <a class="header-anchor" href="#окружение-публикации" aria-label="Permalink to “Окружение публикации”">​</a></h2><p>Создайте <code>.env.deploy.local</code>:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">cp</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> example.env.deploy</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> .env.deploy.local</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Переменная</th><th>Обязательна</th><th>По умолчанию</th><th>Назначение</th></tr></thead><tbody><tr><td><code>NSMP_URL</code></td><td>да</td><td>—</td><td>URL инсталляции без <code>/sd</code></td></tr><tr><td><code>NSMP_ACCESS_KEY</code></td><td>да</td><td>—</td><td>Ключ доступа</td></tr><tr><td><code>NSMP_APP_CODE</code></td><td>нет</td><td><code>VITE_APP_CODE</code> или имя пакета</td><td>Код embedded-приложения</td></tr><tr><td><code>NSMP_APP_TITLE</code></td><td>нет</td><td>код приложения</td><td>Отображаемое название</td></tr><tr><td><code>NSMP_APP_MIN_HEIGHT</code></td><td>нет</td><td><code>1000</code></td><td>Минимальная высота</td></tr><tr><td><code>NSMP_APP_ENABLE</code></td><td>нет</td><td><code>true</code></td><td>Включить приложение после загрузки</td></tr><tr><td><code>NSMP_TLS_REJECT_UNAUTHORIZED</code></td><td>нет</td><td><code>true</code></td><td>Проверять TLS-сертификат</td></tr></tbody></table><p>Булевы значения принимают только строки <code>true</code> и <code>false</code>.</p><div class="danger custom-block"><p class="custom-block-title">Проверка TLS</p><p>Устанавливайте <code>NSMP_TLS_REJECT_UNAUTHORIZED=false</code> только для доверенной тестовой инсталляции с самоподписанным сертификатом.</p></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/environment.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var environment_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, environment_default as default };
