import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/deployment.md
var __pageData = JSON.parse("{\"title\":\"Публикация в NSMP\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/deployment.md\",\"filePath\":\"template/deployment.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "template/deployment.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="публикация-в-nsmp" tabindex="-1">Публикация в NSMP <a class="header-anchor" href="#публикация-в-nsmp" aria-label="Permalink to “Публикация в NSMP”">​</a></h1><p>Публикация вынесена в отдельную команду и использует архив, уже созданный Vite.</p><h2 id="настроика" tabindex="-1">Настройка <a class="header-anchor" href="#настроика" aria-label="Permalink to “Настройка”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> .env.deploy.local</span></span></code></pre></div><p>Минимальная конфигурация:</p><div class="language-dotenv"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">dotenv</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">NSMP_URL</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">https://support.example.ru</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">NSMP_ACCESS_KEY</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">replace-me</span></span></code></pre></div><h2 id="сборка-и-публикация" tabindex="-1">Сборка и публикация <a class="header-anchor" href="#сборка-и-публикация" aria-label="Permalink to “Сборка и публикация”">​</a></h2><p>Одной командой:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> release</span></span></code></pre></div><p>Или отдельными этапами:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> build</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> deploy</span></span></code></pre></div><h2 id="что-делает-deploy" tabindex="-1">Что делает deploy <a class="header-anchor" href="#что-делает-deploy" aria-label="Permalink to “Что делает deploy”">​</a></h2><ol><li>Загружает <code>.env</code>, <code>.env.local</code>, <code>.env.deploy</code> и <code>.env.deploy.local</code>.</li><li>Проверяет URL и access key.</li><li>Определяет код и версию приложения.</li><li>Читает соответствующий ZIP из <code>dist-zip/</code>.</li><li>Формирует <code>multipart/form-data</code> с метаданными приложения.</li><li>Отправляет архив в <code>/sd/services/smpsync/ea</code>.</li><li>Возвращает ненулевой код процесса при ошибке.</li></ol><p>Access key не выводится в лог. Время ожидания ответа — 60 секунд.</p><h2 id="ручная-публикация-из-ci" tabindex="-1">Ручная публикация из CI <a class="header-anchor" href="#ручная-публикация-из-ci" aria-label="Permalink to “Ручная публикация из CI”">​</a></h2><p>В шаблоне есть конфигурации для <a href="./github-actions">GitHub Actions</a> и <a href="./gitlab-ci">GitLab CI</a>. Обе запускаются только вручную, чтобы push сам по себе не изменял приложение на инсталляции.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/deployment.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var deployment_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, deployment_default as default };
