import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_CUSTOM,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and AppCheck
let appCheck;
if (typeof window !== 'undefined') {

    if (process.env.NODE_ENV === 'development') {
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK;
        // self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK),
        isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
    });

    const analytics = getAnalytics(app);
}

export { appCheck, app };
