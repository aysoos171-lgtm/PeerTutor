import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          admin: path.resolve(__dirname, 'admin-dashboard.html'),
          auth: path.resolve(__dirname, 'auth.html'),
          progress: path.resolve(__dirname, 'progress.html'),
          role: path.resolve(__dirname, 'role-selection.html'),
          search: path.resolve(__dirname, 'student-search.html'),
          application: path.resolve(__dirname, 'tutor-application.html'),
          tutorAuth: path.resolve(__dirname, 'tutor-auth.html'),
          tutorDashboard: path.resolve(__dirname, 'tutor-dashboard.html'),
          tutorLogin: path.resolve(__dirname, 'tutor-login.html'),
          profile: path.resolve(__dirname, 'tutor-profile.html'),
          registration: path.resolve(__dirname, 'tutor-registration.html'),
          tutors: path.resolve(__dirname, 'tutors.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
