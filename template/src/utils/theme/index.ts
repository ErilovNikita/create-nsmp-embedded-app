/**
 * Получает строковое значение конфигурации темы из NSMP.
 *
 * @param themeName Имя темы, передаваемое в параметре `theme`.
 * @returns Строковое содержимое темы из ответа сервера.
 * @throws Если имя темы пустое или сервер вернул ошибку.
 */
export const getTheme = async (themeName: string): Promise<string> => {
  if (!themeName.trim()) throw new Error('Имя темы не должно быть пустым')

  const params = new URLSearchParams({
    id: 'common',
    method: 'theme',
    theme: themeName,
  })
  const response = await fetch(`/sd/jspresource?${params.toString()}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error(`Не удалось получить тему: ${response.status} ${response.statusText}`.trim())
  }

  return response.text()
}
