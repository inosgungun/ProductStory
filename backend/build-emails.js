// build-emails.js
import { build } from 'esbuild';

build({
  entryPoints: [
    './emails/VerifyOtpEmail.jsx',
    './emails/LoginSuccessfulEmail.jsx'
  ],
  outdir: './dist/emails',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: ['node20'],
  jsx: 'automatic',    
  sourcemap: true,
  external: ['react', 'react-dom', '@react-email/components'], // do NOT bundle react libs
}).then(() => {
  console.log('✅ Email templates built successfully');
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
