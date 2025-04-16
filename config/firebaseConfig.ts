import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as serviceAccount from "../back-end-project-3a1c1-firebase-adminsdk-fbsvc-9568123341.json";

initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();

const db: Firestore = getFirestore();

export { auth, db };