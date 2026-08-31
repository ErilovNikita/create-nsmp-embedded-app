import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/getting-started.md
var __pageData = JSON.parse("{\"title\":\"Быстрый старт\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/getting-started.md\",\"filePath\":\"template/getting-started.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "template/getting-started.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="быстрыи-старт" tabindex="-1">Быстрый старт <a class="header-anchor" href="#быстрыи-старт" aria-label="Permalink to “Быстрый старт”">​</a></h1><h2 id="создание-проекта" tabindex="-1">Создание проекта <a class="header-anchor" href="#создание-проекта" aria-label="Permalink to “Создание проекта”">​</a></h2><p>Для старта проекта необходимо всего одна команда:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> nsmp-embedded-app@latest</span></span></code></pre></div><h2 id="интерактивные-вопросы" tabindex="-1">Интерактивные вопросы <a class="header-anchor" href="#интерактивные-вопросы" aria-label="Permalink to “Интерактивные вопросы”">​</a></h2><p>CLI предложит:</p><ol><li>выбрать имя проекта;</li><li>подключить дополнительные пакеты;</li><li>установить npm-зависимости.</li></ol><p>Доступные дополнительные пакеты:</p><table tabindex="0"><thead><tr><th>Пакет</th><th>Для чего нужен</th></tr></thead><tbody><tr><td><code>nsmp-icons</code></td><td>Иконки для интерфейса NSMP</td></tr><tr><td><code>@iframe-resizer/child</code></td><td>Автоматическое изменение высоты embedded-приложения</td></tr><tr><td><code>@minitwiks/nsmp-vue-components</code></td><td>Готовые Vue-компоненты и интеграция с Ant Design Vue</td></tr></tbody></table><p>Выбранные пакеты и необходимая настройка автоматически добавляются в создаваемый проект.</p><p>Если автоматическая установка отключена, выполните её вручную:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">cd</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> my-nsmp-app</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> install</span></span></code></pre></div><h2 id="первыи-запуск" tabindex="-1">Первый запуск <a class="header-anchor" href="#первыи-запуск" aria-label="Permalink to “Первый запуск”">​</a></h2><p>Скопируйте пример окружения:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> .env.development</span></span></code></pre></div><p>Заполните параметры инсталляции, затем запустите dev-сервер:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> dev</span></span></code></pre></div><h2 id="первая-сборка" tabindex="-1">Первая сборка <a class="header-anchor" href="#первая-сборка" aria-label="Permalink to “Первая сборка”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> build</span></span></code></pre></div><p>Готовое приложение появится в <code>dist/</code>, а архив для NSMP — в <code>dist-zip/</code>.</p><div class="tip custom-block"><p class="custom-block-title">Следующий шаг</p><p>Разберитесь, <a href="/template/environment">какие ENV-переменные нужны приложению</a>, или сразу настройте <a href="/template/deployment">публикацию в NSMP</a>.</p></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/getting-started.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var getting_started_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, getting_started_default as default };
