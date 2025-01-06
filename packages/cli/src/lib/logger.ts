import chalk from 'chalk'

export const log = (...messages: unknown[]) => {
	console.log(chalk.blueBright('[Fluire]'), ...messages)
}

export const danger = (...messages: unknown[]) => {
	console.log(chalk.redBright('[Danger]', ...messages))
}

export const debug = (...messages: unknown[]) => {
	console.log(chalk.yellowBright('[Debug]', ...messages))
}
