import { defineConfig } from 'tsup'

export default defineConfig({
	clean: true,
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	sourcemap: true,
	outDir: 'dist',
	dts: true,
	minify: true,
	target: 'esnext'
})
