import { auth } from "../config/firebaseConfig";

const setCustomUserRole = async (uid: string, role: "admin" | "user") => {
    try {
      await auth.setCustomUserClaims(uid, { role });
      console.log(`Custom claim '${role}' set for user ${uid}`);
    } catch (err) {
      console.error("Failed to set custom claim:", err);
    }
  };
  

  setCustomUserRole("uid-for-admin", "admin");
  setCustomUserRole("uid-for-user", "user");
  