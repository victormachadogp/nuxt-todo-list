import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let app: ReturnType<typeof initializeApp> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

export const initializeFirebase = (config: Record<string, string>) => {
  if (!app) {
    app = initializeApp(config);
    db = getFirestore(app);
  }
  return { app, db };
};
