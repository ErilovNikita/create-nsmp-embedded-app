export const banner = String.raw`
    _   _______ __  _______     ______          __             __    __         __   ___  by @minitwiks
   / | / / ___//  |/  / __ \   / ____/___ ___  / /_  ___  ____/ /___/ /__  ____/ /  /   |  ____  ____
  /  |/ /\__ \/ /|_/ / /_/ /  / __/ / __ '__ \/ __ \/ _ \/ __  / __  / _ \/ __  /  / /| | / __ \/ __ \
 / /|  /___/ / /  / / ____/  / /___/ / / / / / /_/ /  __/ /_/ / /_/ /  __/ /_/ /  / ___ |/ /_/ / /_/ /
/_/ |_//____/_/  /_/_/      /_____/_/ /_/ /_/_.___/\___/\__,_/\__,_/\___/\__,_/  /_/  |_/ .___/ .___/
                                                                                       /_/   /_/
`

const colorsEnabled = Boolean(process.stdout.isTTY) && !('NO_COLOR' in process.env)
const color = (code, text) => colorsEnabled ? `\u001B[${code}m${text}\u001B[0m` : text

export const ui = {
    cyan: text => color(36, text),
    green: text => color(32, text),
    yellow: text => color(33, text),
    red: text => color(31, text),
    bold: text => color(1, text),
    dim: text => color(2, text)
}

export function printWelcome() {
    console.log(ui.cyan(banner))
    console.log(ui.bold('Создание нового NSMP Embedded App'))
    console.log(ui.dim('Ответьте на несколько вопросов — остальное сделает установщик.\n'))
}

export function printStep(icon, message) {
    console.log(`${icon}  ${message}`)
}

export function printProgressHeader() {
    console.log(`\n${ui.bold('Создание и настройка проекта')}`)
    console.log(ui.dim('────────────────────────────'))
}

export function printCancelled() {
    console.log(`\n${ui.yellow('⚠ Создание проекта отменено.')}`)
}

export function printError(error) {
    console.error(`\n${ui.red('✖ Не удалось создать проект.')}`)
    console.error(error.message)
}

export function printCompletion({ targetDir, projectName, installed }) {
    console.log(`\n${ui.green('✔ Проект успешно создан!')}`)
    console.log(`\nРасположение: ${ui.bold(targetDir)}`)

    if (!installed) {
        console.log(ui.yellow('\nЗависимости ещё не установлены. Сначала выполните npm install.'))
    }

    console.log(`
Следующие шаги:

  ${ui.cyan(`cd ${projectName}`)}
  ${!installed ? `${ui.cyan('npm install')}\n  ` : ''}${ui.cyan('cp example.env .env.development')}
  ${ui.cyan('npm run dev')}
`)
}
