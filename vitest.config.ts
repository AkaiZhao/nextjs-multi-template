import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      templates: fileURLToPath(new URL('./templates', import.meta.url)),
    },
  },
  test: { include: ['tests/**/*.test.ts'] },
})
