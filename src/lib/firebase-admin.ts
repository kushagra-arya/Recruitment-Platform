import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

// Validate required environment variables at startup
const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_STORAGE_BUCKET',
] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// Firebase Admin SDK configuration
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    // Handle newline characters in private key from .env / Vercel env vars
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
};

// Initialize Firebase Admin (singleton pattern)
function getFirebaseAdmin(): App {
  if (getApps().length === 0) {
    return initializeApp(firebaseAdminConfig);
  }
  return getApps()[0];
}

// Initialize the app
const adminApp = getFirebaseAdmin();

// Export the storage bucket instance
export const bucket = getStorage(adminApp).bucket();

// Alias used for explicit storage operations (e.g. deleting resume files)
export const adminStorage = bucket;

// Export the Firestore database instance
export const db = getFirestore(adminApp);

export default adminApp;
