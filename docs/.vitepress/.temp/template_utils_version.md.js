import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/template/utils/version.md
var __pageData = JSON.parse("{\"title\":\"Утилита проверки версии\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"template/utils/version.md\",\"filePath\":\"template/utils/version.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "template/utils/version.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="утилита-проверки-версии" tabindex="-1">Утилита проверки версии <a class="header-anchor" href="#утилита-проверки-версии" aria-label="Permalink to “Утилита проверки версии”">​</a></h1><p><a href="./">Вернуться к списку утилит</a></p><p>Модуль <code>version</code> проверяет версию приложения по стабильным релизам публичного репозитория GitHub или GitLab. Все функции и типы импортируются через единую точку входа:</p><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">import</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> { checkVersion, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">type</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> VersionCheckResult } </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">from</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> &#39;./utils/version&#39;</span></span></code></pre></div><p>Утилита поддерживает SemVer и распространённые форматы тегов: <code>1.2.3</code>, <code>v1.2.3</code>, <code>release-v1.2.3</code> и <code>refs/tags/v1.2.3</code>. Возвращаемые версии нормализуются до формата без префикса <code>v</code>. Черновики, prerelease-релизы и теги без корректной версии не учитываются.</p><h2 id="полная-проверка-версии" tabindex="-1">Полная проверка версии <a class="header-anchor" href="#полная-проверка-версии" aria-label="Permalink to “Полная проверка версии”">​</a></h2><p><code>checkVersion</code> — рекомендуемый способ использования. Метод получает последнюю релизную версию, сравнивает её с версией приложения и формирует готовое сообщение.</p><h3 id="github" tabindex="-1">GitHub <a class="header-anchor" href="#github" aria-label="Permalink to “GitHub”">​</a></h3><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">import</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> { checkVersion, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">type</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> VersionCheckResult } </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">from</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> &#39;./utils/version&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">const</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> result</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">:</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> VersionCheckResult</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> =</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> await</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> checkVersion</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  service: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;github&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  owner: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;ErilovNikita&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  repo: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;create-nsmp-embedded-app&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">})</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">console.</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">log</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(result.message)</span></span></code></pre></div><h3 id="gitlab" tabindex="-1">GitLab <a class="header-anchor" href="#gitlab" aria-label="Permalink to “GitLab”">​</a></h3><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">const</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> result</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> =</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> await</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> checkVersion</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  service: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;gitlab&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  project: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;group/subgroup/project&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">})</span></span></code></pre></div><p>Для публичного проекта на собственном сервере GitLab можно передать <code>baseUrl</code>:</p><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">const</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> result</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> =</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> await</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> checkVersion</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  service: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;gitlab&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  project: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;group/project&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  baseUrl: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;https://gitlab.example.com&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">})</span></span></code></pre></div><h2 id="передача-текущеи-версии" tabindex="-1">Передача текущей версии <a class="header-anchor" href="#передача-текущеи-версии" aria-label="Permalink to “Передача текущей версии”">​</a></h2><p>По умолчанию текущая версия читается из <code>package.json</code>. При необходимости её можно передать вторым аргументом:</p><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">const</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> result</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> =</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> await</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> checkVersion</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  {</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">    service: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;github&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">    owner: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;owner&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">    repo: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;repository&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  },</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">  &#39;v1.2.3&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">)</span></span></code></pre></div><h2 id="результат-проверки" tabindex="-1">Результат проверки <a class="header-anchor" href="#результат-проверки" aria-label="Permalink to “Результат проверки”">​</a></h2><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">interface</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> VersionCheckResult</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">  currentVersion</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">:</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> string</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">  latestVersion</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">:</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> string</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">  comparison</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">:</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> -</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> |</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 0</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> |</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 1</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c13617",
		"--shiki-dark": "#FFAB70"
	})}">  message</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">:</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> string</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">}</span></span></code></pre></div><p>Значение <code>comparison</code>:</p><ul><li><code>-1</code> — доступна новая версия приложения;</li><li><code>0</code> — установлена актуальная версия;</li><li><code>1</code> — текущая версия выше релизной и считается тестовой.</li></ul><h2 id="обработка-ошибок" tabindex="-1">Обработка ошибок <a class="header-anchor" href="#обработка-ошибок" aria-label="Permalink to “Обработка ошибок”">​</a></h2><p>Сетевые ошибки следует обрабатывать в месте вызова:</p><div class="language-ts"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">try</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">  const</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> result</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> =</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> await</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> checkVersion</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">    service: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;github&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">    owner: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;owner&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">    repo: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;repository&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  })</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  console.</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">log</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(result.message)</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">} </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">catch</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> (error) {</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">  console.</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">error</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;Не удалось проверить версию&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, error)</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">}</span></span></code></pre></div><h2 id="доступные-функции" tabindex="-1">Доступные функции <a class="header-anchor" href="#доступные-функции" aria-label="Permalink to “Доступные функции”">​</a></h2><ul><li><code>checkVersion(source, currentVersion?)</code> — выполняет полную проверку версии и возвращает <code>VersionCheckResult</code>;</li><li><code>getCurrentVersion()</code> — возвращает нормализованную версию из <code>package.json</code>;</li><li><code>getLastVersion(source)</code> — возвращает максимальную стабильную версию из GitHub или GitLab;</li><li><code>compareVersions(localVersion, remoteVersion)</code> — сравнивает две версии и возвращает <code>-1</code>, <code>0</code> или <code>1</code>;</li><li><code>getVersionMessage(comparison, currentVersion, latestVersion)</code> — формирует готовое сообщение о результате сравнения;</li><li><code>normalizeVersion(value)</code> — преобразует версию или тег к стандартному виду без префикса;</li><li><code>getGitHubReleaseTags(options)</code> — получает теги стабильных релизов GitHub;</li><li><code>getGitLabReleaseTags(options)</code> — получает теги опубликованных релизов GitLab.</li></ul><h2 id="доступные-типы" tabindex="-1">Доступные типы <a class="header-anchor" href="#доступные-типы" aria-label="Permalink to “Доступные типы”">​</a></h2><ul><li><code>VersionCheckResult</code> — полный результат проверки;</li><li><code>VersionComparison</code> — результат сравнения <code>-1 | 0 | 1</code>;</li><li><code>VersionSource</code> — параметры источника GitHub или GitLab;</li><li><code>GitHubVersionOptions</code> — владелец и имя репозитория GitHub;</li><li><code>GitLabVersionOptions</code> — проект и адрес сервера GitLab.</li></ul></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("template/utils/version.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var version_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, version_default as default };
