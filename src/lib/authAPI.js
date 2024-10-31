import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';

import { app } from '@/__firebase/__firebaseConf';
import { dbAPI } from './dbAPI';

const auth = getAuth(app);

export const authAPI = {

    signUp: (email, password, firstName = '', lastName = '') => {
        // const auth = getAuth(app);
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
        // const auth = getAuth(app);
        return signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // console.log('logged')
                // Signed in 
                const user = userCredential.user;

                // return user
                if (user.emailVerified || process.env.NEXT_PUBLIC_NODE_MODE == 'development') {
                    await dbAPI.checkAndCreate(user.uid, user.accessToken, user.displayName, user.email);

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
    },
    signOut: () => {
        // const auth = getAuth(app);
        signOut(auth).then(() => {
            console.log('SignOut done')
            // Sign-out successful.
            return { data: null, message: 'sign-out successful' }
        }).catch((error) => {
            // An error happened.
            return { data: null, message: error.code }
        });
    },

    signInGoogle: async (initial) => {
        // const auth = getAuth(app);

        if (initial === true) {
            // sign in with Google, first click
            const provider = new GoogleAuthProvider();
            auth.useDeviceLanguage();
            await signInWithRedirect(auth, provider);

        } else {

            return await getRedirectResult(auth)
                .then(async (result) => {
                    // This gives you a Google Access Token. You can use it to access Google APIs.
                    //const credential = GoogleAuthProvider.credentialFromResult(result);
                    //const token = credential.accessToken;

                    if (result) {
                        // The signed-in user info.
                        const user = result.user;
                        await dbAPI.checkAndCreate(user.uid, user.accessToken, user.displayName, user.email);
                        return {
                            data: {
                                userId: user.uid,
                                email: user.email,
                                accessToken: user.accessToken
                            },
                            message: 'success'
                        }
                    }
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    //const email = error.customData.email;
                    // The AuthCredential type that was used.
                    //const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                    return ({ data: null, message: errorMessage })
                });
            // return setPersistence(auth, browserSessionPersistence)
            //     .then(async () => {
            //         return await getRedirectResult(auth)
            //             .then(async (result) => {
            //                 // This gives you a Google Access Token. You can use it to access Google APIs.
            //                 //const credential = GoogleAuthProvider.credentialFromResult(result);
            //                 //const token = credential.accessToken;


            //                 if (result) {
            //                     // The signed-in user info.
            //                     const user = result.user;
            //                     await dbAPI.checkAndCreate(user.uid, user.accessToken, user.displayName, user.email);
            //                     return {
            //                         data: {
            //                             userId: user.uid,
            //                             email: user.email,
            //                             accessToken: user.accessToken
            //                         },
            //                         message: 'success'
            //                     }
            //                 }
            //             }).catch((error) => {
            //                 // Handle Errors here.
            //                 console.log('ERROR with getRedirectResult..');
            //                 const errorCode = error.code;
            //                 const errorMessage = error.message;
            //                 // The email of the user's account used.
            //                 //const email = error.customData.email;
            //                 // The AuthCredential type that was used.
            //                 //const credential = GoogleAuthProvider.credentialFromError(error);
            //                 // ...
            //                 return ({ data: null, message: errorMessage })
            //             });
            //     })

            // ===

        }  //end else 
    }
}

