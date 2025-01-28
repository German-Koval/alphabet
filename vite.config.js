import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BASE_PATH = process.env.BASE_PATH

export default defineConfig({
  base: BASE_PATH ? `${BASE_PATH}/` : '/',
  plugins: [react()],
})
