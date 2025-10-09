import { defineConfig } from 'vite'

export default defineConfig({
  base: '/your-repo-name/', // Replace 'your-repo-name' with your actual GitHub repo name
  build: {
    outDir: 'dist'
  }
})
