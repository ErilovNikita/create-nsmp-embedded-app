# Platform

Утилита определяет клиентскую платформу и позволяет типобезопасно отключать
возможности интерфейса для отдельных ОС.

```ts
import {
  applyPlatformFeatureRules,
  Platform,
  PlatformFeature,
  usePlatform,
  type PlatformFeatureRules,
} from './utils/platform'

const { platform, isWindows, isMac } = usePlatform()

const rules: PlatformFeatureRules = {
  [Platform.Windows]: [PlatformFeature.AntAnimations],
}

applyPlatformFeatureRules(platform.value, rules)
```

`AntAnimations` глобально отключает CSS-анимации и переходы у классов Ant Design.
Методы ничего не делают, если DOM недоступен, поэтому их можно безопасно вызывать
в окружении SSR.
