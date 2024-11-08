import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const repoName = 'react-stations-kiso-1';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
})
