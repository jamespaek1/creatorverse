import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Creatorverse app.  This file tells Vite
// to use the React plugin which enables support for JSX transformation
// and Fast Refresh during development.
export default defineConfig({
  plugins: [react()],
});