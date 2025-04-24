import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import {
  initializeApp,
  cert,
  getApps,
  App,
  AppOptions,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

/**
 * Retrieves Firebase configuration from environment variables
 */
function getFirebaseConfig(): AppOptions {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Missing Firebase configuration. Please check .env or .env.test for FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  const serviceAccount: ServiceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };

  return {
    credential: cert(serviceAccount),
  };
}

/**
 * Initializes Firebase Admin SDK if not already initialized
 */
function initializeFirebaseAdmin(): App {
  const existingApp = getApps()[0];
  return existingApp ? existingApp : initializeApp(getFirebaseConfig());
}

const app: App = initializeFirebaseAdmin();
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth, app };
