import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  // Adding 'umd' to trigger the umdWrapper plugin
  format: ['cjs', 'esm', 'iife'],
})