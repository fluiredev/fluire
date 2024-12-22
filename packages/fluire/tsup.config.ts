import { defineConfig } from 'tsup'

export default defineConfig({
	clean: true,
	entry: ['src/index.ts'],
	format: ['esm'],
	sourcemap: true,
	outDir: 'dist',
	dts: true,
	minify: true,
	target: 'esnext'
})
