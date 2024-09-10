import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  target: 'es2019',
  splitting: true,
  sourcemap: false,
  clean: true,
})
