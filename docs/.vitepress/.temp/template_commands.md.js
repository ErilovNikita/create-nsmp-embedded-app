import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/commands.md
var __pageData = JSON.parse("{\"title\":\"Команды шаблона\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/commands.md\",\"filePath\":\"template/commands.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "template/commands.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="команды-шаблона" tabindex="-1">Команды шаблона <a class="header-anchor" href="#команды-шаблона" aria-label="Permalink to “Команды шаблона”">​</a></h1><h2 id="создание-проекта" tabindex="-1">Создание проекта <a class="header-anchor" href="#создание-проекта" aria-label="Permalink to “Создание проекта”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> create</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> nsmp-embedded-app@latest</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> my-app</span></span></code></pre></div><p>Имя проекта можно не указывать — CLI запросит его интерактивно.</p><h2 id="работа-с-приложением" tabindex="-1">Работа с приложением <a class="header-anchor" href="#работа-с-приложением" aria-label="Permalink to “Работа с приложением”">​</a></h2><table tabindex="0"><thead><tr><th>Команда</th><th>Назначение</th></tr></thead><tbody><tr><td><code>npm run dev</code></td><td>Запустить Vite в режиме разработки</td></tr><tr><td><code>npm run build</code></td><td>Проверить типы, собрать приложение и создать ZIP</td></tr><tr><td><code>npm run deploy</code></td><td>Загрузить готовый ZIP в NSMP</td></tr><tr><td><code>npm run release</code></td><td>Последовательно выполнить build и deploy</td></tr></tbody></table><p>Аргументы Vite можно передать после <code>--</code>:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> dev</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> --</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> --host</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 0.0.0.0</span></span></code></pre></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/commands.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var commands_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, commands_default as default };
