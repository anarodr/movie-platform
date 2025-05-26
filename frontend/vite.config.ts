import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
    base: 'https://github.com/anarodr/movie-platform/frontend/',
    plugins: [react()],
    test: {
        include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
    },
})
