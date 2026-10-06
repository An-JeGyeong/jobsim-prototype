import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' : 어떤 정적 호스팅(Vercel, Netlify, GitHub Pages 등)에서도 동작
export default defineConfig({ plugins: [react()], base: './' })
