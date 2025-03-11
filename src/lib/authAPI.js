
import { app } from "@/__firebase/__firebaseConf";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth"

const auth = getAuth(app);

export const authAPI = {

    login: (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                return ({
                    status: 'Success',
                    payload: {
                        userId: user.uid,
                        email: user.email,
                        accessToken: user.accessToken
                    },
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return ({ status: 'Error', message: errorCode ?? errorMessage })
            });
    },

    signOut: () => {
        return signOut(auth).then(() => {
            // Sign-out successful.
            return ({
                status: 'Success',
                payload: {
                    userId: null,
                    email: null,
                    accessToken: null
                }
            })
        }).catch((error) => {
            // An error happened.
            return ({ status: 'Error', error: error.errorCode ?? error.errorMessage })
        });
    }

}