import { auth } from "../config/firebaseConfig";

const setCustomUserRole = async (uid: string, role: "admin" | "user") => {
    try {
      await auth.setCustomUserClaims(uid, { role });
      console.log(`Custom claim '${role}' set for user ${uid}`);
    } catch (err) {
      console.error("Failed to set custom claim:", err);
    }
  };
  

  setCustomUserRole("ypjHlulK9LdyCLpr6acjNosuftv1", "admin");
  setCustomUserRole("hgRHa6oISke38uDRWHq5UY1bror1", "user");
  