import chalk from 'chalk'
// import type { defineConfig } from 'fluire/config'

// type FluireConfig = ReturnType<typeof defineConfig>
type FluireConfig = unknown

export async function getFluireConfig(): Promise<FluireConfig> {
	const files = [
		'./fluire.config.js',
		'./fluire.config.ts',
		'./fluire.config.mjs',
		'./fluire.config.cjs'
	]

	let config: FluireConfig | undefined

	for (const file of files) {
		try {
			config = await import(file)
		} catch {}
	}

	if (!config) {
		chalk.red(
			'Could not find a Fluire config file - Is the file named correctly? (fluire.config.js, fluire.config.ts, fluire.config.mjs, fluire.config.cjs)'
		)
		process.exit(1)
	}

	return config
}
