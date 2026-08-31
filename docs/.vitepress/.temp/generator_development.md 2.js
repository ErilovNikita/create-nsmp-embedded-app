import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/generator/development.md
var __pageData = JSON.parse("{\"title\":\"Разработка генератора\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"generator/development.md\",\"filePath\":\"generator/development.md\",\"lastUpdated\":1788173835000}");
var _sfc_main = { name: "generator/development.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="разработка-генератора" tabindex="-1">Разработка генератора <a class="header-anchor" href="#разработка-генератора" aria-label="Permalink to “Разработка генератора”">​</a></h1><h2 id="подготовка" tabindex="-1">Подготовка <a class="header-anchor" href="#подготовка" aria-label="Permalink to “Подготовка”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> install</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> --prefix</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> template</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> install</span></span></code></pre></div><h2 id="проверки" tabindex="-1">Проверки <a class="header-anchor" href="#проверки" aria-label="Permalink to “Проверки”">​</a></h2><p>Перед отправкой изменений выполните:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> check</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> test</span></span>
<span class="line"><span style="${ssrRenderStyle({
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
	})}"> docs:build</span></span></code></pre></div><h2 id="работа-с-шаблоном" tabindex="-1">Работа с шаблоном <a class="header-anchor" href="#работа-с-шаблоном" aria-label="Permalink to “Работа с шаблоном”">​</a></h2><p>Файлы из <code>template/</code> копируются в новый проект. Некоторые dotfiles хранятся под безопасными для npm именами:</p><table tabindex="0"><thead><tr><th>В npm-шаблоне</th><th>В созданном проекте</th></tr></thead><tbody><tr><td><code>_gitignore</code></td><td><code>.gitignore</code></td></tr><tr><td><code>_github/</code></td><td><code>.github/</code></td></tr><tr><td><code>_gitlab-ci.yml</code></td><td><code>.gitlab-ci.yml</code></td></tr></tbody></table><p>Переименование выполняется в <code>cli/project.js</code>.</p><h2 id="проверка-npm-пакета" tabindex="-1">Проверка npm-пакета <a class="header-anchor" href="#проверка-npm-пакета" aria-label="Permalink to “Проверка npm-пакета”">​</a></h2><p>Перед публикацией убедитесь, что шаблонные файлы входят в архив, а локальные ENV отсутствуют:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> pack</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> --dry-run</span></span></code></pre></div><h2 id="документация" tabindex="-1">Документация <a class="header-anchor" href="#документация" aria-label="Permalink to “Документация”">​</a></h2><p>Исходники находятся в <code>docs/</code>. Навигация и поиск настраиваются в <code>docs/.vitepress/config.ts</code>, визуальная тема — в <code>docs/.vitepress/theme/style.css</code>.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("generator/development.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var development_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, development_default as default };
