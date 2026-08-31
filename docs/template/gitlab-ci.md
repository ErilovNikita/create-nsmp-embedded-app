# GitLab CI

Конфигурация находится в `.gitlab-ci.yml`. Job публикации создаётся только для pipeline, запущенного через веб-интерфейс.

## Настройка переменных

Откройте **Settings → CI/CD → Variables** и добавьте:

| Variable | Обязательна | Рекомендация |
| --- | --- | --- |
| `NSMP_URL` | да | Сделать protected |
| `NSMP_ACCESS_KEY` | да | Сделать masked и protected |

Там же можно добавить необязательные `NSMP_APP_CODE`, `NSMP_APP_TITLE`, `NSMP_APP_MIN_HEIGHT`, `NSMP_APP_ENABLE` и `NSMP_TLS_REJECT_UNAUTHORIZED`.

## Запуск

1. Откройте **Build → Pipelines**.
2. Нажмите **New pipeline** или **Run pipeline**.
3. Выберите ветку.
4. Запустите pipeline.

Обычный push не создаёт job публикации. `resource_group` гарантирует последовательную загрузку нескольких запусков.

Для закрытой инсталляции используйте GitLab Runner внутри доступной сети.
