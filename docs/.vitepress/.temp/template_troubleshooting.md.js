import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/troubleshooting.md
var __pageData = JSON.parse("{\"title\":\"Устранение проблем\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/troubleshooting.md\",\"filePath\":\"template/troubleshooting.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "template/troubleshooting.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="устранение-проблем" tabindex="-1">Устранение проблем <a class="header-anchor" href="#устранение-проблем" aria-label="Permalink to “Устранение проблем”">​</a></h1><h2 id="не-задана-nsmp-app-code" tabindex="-1">Не задана NSMP_APP_CODE <a class="header-anchor" href="#не-задана-nsmp-app-code" aria-label="Permalink to “Не задана NSMP_APP_CODE”">​</a></h2><p>Скрипт использует <code>NSMP_APP_CODE</code>, затем <code>VITE_APP_CODE</code>, затем имя из <code>package.json</code>. Убедитесь, что команда запускается из корня созданного приложения и <code>package.json</code> содержит непустое поле <code>name</code>.</p><h2 id="не-задана-nsmp-url-или-nsmp-access-key" tabindex="-1">Не задана NSMP_URL или NSMP_ACCESS_KEY <a class="header-anchor" href="#не-задана-nsmp-url-или-nsmp-access-key" aria-label="Permalink to “Не задана NSMP_URL или NSMP_ACCESS_KEY”">​</a></h2><p>Создайте <code>.env.deploy.local</code>:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> .env.deploy.local</span></span></code></pre></div><p>Проверьте формат <code>KEY=value</code>, отсутствие пробелов в имени переменной и правильную рабочую директорию.</p><h2 id="архив-не-наиден" tabindex="-1">Архив не найден <a class="header-anchor" href="#архив-не-наиден" aria-label="Permalink to “Архив не найден”">​</a></h2><p>Сначала выполните:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> build</span></span></code></pre></div><p>Код и версия в имени ZIP должны совпадать с настройками deploy. Не меняйте <code>NSMP_APP_CODE</code> между сборкой и загрузкой.</p><h2 id="ошибка-tls-сертификата" tabindex="-1">Ошибка TLS-сертификата <a class="header-anchor" href="#ошибка-tls-сертификата" aria-label="Permalink to “Ошибка TLS-сертификата”">​</a></h2><p>Правильное решение — установить доверенный сертификат. Для изолированной тестовой инсталляции временно допустимо:</p><div class="language-dotenv"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">dotenv</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">NSMP_TLS_REJECT_UNAUTHORIZED</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">false</span></span></code></pre></div><p>Не используйте эту настройку для production.</p><h2 id="http-401-или-403" tabindex="-1">HTTP 401 или 403 <a class="header-anchor" href="#http-401-или-403" aria-label="Permalink to “HTTP 401 или 403”">​</a></h2><p>Проверьте access key и права на endpoint синхронизации embedded-приложений. В CI убедитесь, что protected secret доступен выбранной ветке.</p><h2 id="ci-не-запускает-публикацию-после-push" tabindex="-1">CI не запускает публикацию после push <a class="header-anchor" href="#ci-не-запускает-публикацию-после-push" aria-label="Permalink to “CI не запускает публикацию после push”">​</a></h2><p>Это ожидаемое поведение. Шаблоны GitHub и GitLab намеренно настроены только на ручной запуск.</p><h2 id="папка-проекта-уже-существует" tabindex="-1">Папка проекта уже существует <a class="header-anchor" href="#папка-проекта-уже-существует" aria-label="Permalink to “Папка проекта уже существует”">​</a></h2><p>Генератор не перезаписывает файлы. Выберите другое имя либо самостоятельно разберитесь с существующей директорией перед повторным запуском.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/troubleshooting.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var troubleshooting_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, troubleshooting_default as default };
