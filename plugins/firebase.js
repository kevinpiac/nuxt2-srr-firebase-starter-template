import * as Firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

/**
 * Initialize firebase app
 */
if (!Firebase.apps.length) {
  Firebase.initializeApp(config);
}

export default Firebase;
export { Firebase };
