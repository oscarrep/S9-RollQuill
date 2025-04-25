import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const targetPath = join(__dirname, '..', 'src/environments/environment.prod.ts');

const envConfig = `
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "${process.env['NG_APP_FIREBASE_API_KEY']}",
    authDomain: "${process.env['NG_APP_FIREBASE_AUTH_DOMAIN']}",
    projectId: "${process.env['NG_APP_FIREBASE_PROJECT_ID']}",
    storageBucket: "${process.env['NG_APP_FIREBASE_STORAGE_BUCKET']}",
    messagingSenderId: "${process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID']}",
    appId: "${process.env['NG_APP_FIREBASE_APP_ID']}",
  }
};`;

writeFileSync(targetPath, envConfig);
console.log('environment.prod generated')