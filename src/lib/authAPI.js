import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

import { app } from '@/__firebase/__firebaseConf';
const auth = getAuth(app);

export const authAPI = {

    signUp: (email, password, firstName = '', lastName = '') => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (lastName !== '' || firstName != '') {
                    let name = [firstName, lastName];
                    updateProfile(auth.currentUser, { displayName: name.join(' ') })
                        .then(() => null)
                }
                return sendEmailVerification(auth.currentUser)
                    .then(() => {
                        return { status: 'ok', message: 'verify-email', userEmail: email }
                        // return { status: 'ok', message: 'verify-email', user: auth.currentUser }
                    })
                // return user
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return ({ status: 'error', errorCode, message: errorCode || errorMessage })
            });
    },
    signIn: (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log('logged')
                // Signed in 
                const user = userCredential.user;

                // return user
                if (user.emailVerified || process.env.NEXT_PUBLIC_NODE_MODE == 'development') {
                    // await dbAPI.checkAndCreate(user.uid, user.accessToken, user.displayName, user.email);

                    return {
                        data: {
                            userId: user.uid,
                            email: user.email,
                            accessToken: user.accessToken
                        },
                        message: 'success'
                    }
                } else {
                    return { data: null, message: 'not verified' }
                }
                // ...
            })
            .catch((error) => {
                console.log('error')
                const errorCode = error.code;
                const errorMessage = error.message;
                return { data: null, message: errorCode }
            });
    }
}