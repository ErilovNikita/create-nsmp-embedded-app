# GitHub Actions

Workflow находится в `.github/workflows/nsmp-deploy.yml` и запускается только вручную.

## Настройка секретов

Откройте **Settings → Secrets and variables → Actions → Secrets** и добавьте:

| Secret | Значение |
| --- | --- |
| `NSMP_URL` | URL инсталляции без `/sd` |
| `NSMP_ACCESS_KEY` | Ключ доступа |

Необязательные параметры добавьте на вкладке **Variables**:

- `NSMP_APP_CODE`;
- `NSMP_APP_TITLE`;
- `NSMP_APP_MIN_HEIGHT`;
- `NSMP_APP_ENABLE`;
- `NSMP_TLS_REJECT_UNAUTHORIZED`.

## Запуск

1. Откройте вкладку **Actions**.
2. Выберите **Deploy to NSMP**.
3. Нажмите **Run workflow**.
4. Выберите ветку и подтвердите запуск.

Workflow устанавливает зависимости через `npm ci`, собирает ZIP и публикует его. `concurrency` не позволяет двум публикациям выполняться одновременно.

::: tip Внутренняя сеть
Если NSMP недоступна из интернета, назначьте workflow self-hosted runner с сетевым доступом к инсталляции.
:::
