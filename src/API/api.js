import { browserSessionPersistence, createUserWithEmailAndPassword, signOut, getAuth, sendEmailVerification, setPersistence, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { app } from "../_firebase/firebase";

const URLUSERS = process.env.REACT_APP_URLUSERS;

export const authAPI = {
    signUp: (email, password, firstName = '', lastName = '') => {
        const auth = getAuth(app);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                return updateProfile(auth.currentUser, {
                    displayName: `${firstName} ${lastName}`, photoURL: ""
                })
                    .then(() => {
                        return sendEmailVerification(user)
                            .then(() => {
                                // Email verification sent!
                                // ...
                                return { message: 'verify' }
                            });
                    })

                // ...
            })
            .catch((error) => {
                //const errorCode = error.code;
                let err = error.message.slice(16,);
                return { message: err }
            });

    },
    logIn: (email, password) => {
        const auth = getAuth(app);
        return setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        if (userCredential.user) {
                            const user = userCredential.user;
                            if (user.emailVerified) {
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

                        } else {
                            return { data: null, message: 'wrong -- credentials' }
                        }
                    }).catch((error) => {
                        const errorMessage = error.message;
                        console.log(errorMessage);
                        return { data: null, message: errorMessage.slice(10,) }
                    })
            })
    },
    logOut: () => {
        const auth = getAuth(app);
        return signOut(auth).then(() => {
            // Sign-out successful.
            return { message: 'logged out' }
        }).catch((error) => {
            // An error happened.
            return { message: error.message }
        });
    },
    signInGoogle: async (initial) => {
        const auth = getAuth(app);

        if (initial === true) {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        }
        else {
            return setPersistence(auth, browserSessionPersistence)
                .then(async () => {
                    return await getRedirectResult(auth)
                        .then(async (result) => {
                            if (result) {
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
                        })
                        .catch((error) => {
                            // Handle Errors here.
                            const errorMessage = error.message;

                            if (errorMessage) {
                                return { data: null, message: errorMessage }
                            }
                            else {
                                return { data: null, message: 'unknown error..' }
                            }
                        });
                })
        }
    },
}

export const funcAPI = {
    requestAI: async (endPoint, query) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: query
            })
        }
        try {

            const resp = await fetch(`${process.env.REACT_APP_DOMAIN}/${endPoint}`, options);
            if (resp) {
                let content = await resp.json();
                let res = { status: resp.status, content: content.content }

                return res;
            } else {
                throw new Error(`HTTP error: ${resp.status}`)
            }

        } catch (error) {
            console.error(error)
        }

    }
}


export const dbAPI = {

    checkAndCreate: async (id, token, displayName, email) => {
        let userNameSplitted = displayName.split(' ')
        let userTemplate = {
            image: { value: '' },
            personDetails: {
                __serv: {
                    isSectionVisible: true,
                },
                data: {
                    firstName: userNameSplitted[0] ? userNameSplitted[0] : '',
                    lastName: userNameSplitted[1] ? userNameSplitted[1] : '',
                    email: email,
                    phone: ''
                }
            },
            summary: {
                __serv: {
                    isSectionVisible: true,
                },
                data: {
                    value: ''
                }
            },
            education: {
                __serv: {
                    isSectionVisible: true,
                },
                data: []
            },
            links: {
                __serv: {
                    isSectionVisible: true,
                },
                data: []
            },
            skills: {
                __serv: {
                    isSectionVisible: true,
                    isSwitchChecked: false,
                },
                data: []
            },
            courses: {
                data: []
            },
            history: {
                __serv: {
                    isSectionVisible: true,
                },
                data: []
            },
            languages: {
                data: []
            },
            references: {
                __serv: {
                    isSwitchChecked: false,
                },
                data: []
            },
            hobbies: {
                data: {
                    value: ''
                }
            },
        }
        let resp = await fetch(`${URLUSERS}/${id}.json?auth=${token}`)
            .then((resp) => {
                if (resp && resp.status === 200) {
                    return resp.json();
                } else {
                    throw new Error(`HTTP error: ${resp.status}`)
                }
            })
            .catch((error) => (console.log(`Couldn't fetch data.. ${error}`)));

        if (!resp) {
            return await fetch(`${URLUSERS}/${id}.json?auth=${token}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userTemplate)
                })
        } else {
            console.log('Done. User exists.')
        }
    },

    getSectionData: async (section, id, token) => {
        let resp = await getData(`${URLUSERS}/${id}/${section}.json?auth=${token}`);
        return resp;
    },

    putDataToSection: async (user, section, token, data) => {
        let resp = await putData(`${URLUSERS}/${user}/${section}.json?auth=${token}`, data);
        return resp;
    },

    putUserImageData: async (user, token, data) => {
        console.log('set data to DB')
        let resp = await putData(`${URLUSERS}/${user}/image/value.json?auth=${token}`, data);
        return resp;
    },

}

const getData = async (url) => {
    return await fetch(`${url}`)
        .then((resp) => {

            if (resp && resp.status === 200) {
                return resp.json();
            } else {
                throw new Error(`HTTP error: ${resp.status}`)
            }
        })
        .catch((error) => (console.log(`Couldn't fetch data.. ${error}`)));
}

const putData = async (url, data) => {
    let resp = await fetch(url,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
    if (resp) {
        return resp;
    }
}