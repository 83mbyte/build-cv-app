import { browserSessionPersistence, createUserWithEmailAndPassword, signOut, getAuth, sendEmailVerification, setPersistence, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../_firebase/firebase";

const URLUSERS = 'https://buildcv-app-cd890-default-rtdb.firebaseio.com/prvt/users';
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
                                await dbAPI.checkAndCreate(user.uid, user.displayName, user.email);
                                //console.log('USER::: ', user)
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
    }
}


export const dbAPI = {

    checkAndCreate: async (id, displayName, email) => {
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
                data: [{
                    degree: '',
                    institution: '',
                    location: '',
                    period: '',
                    comments: '',
                }]
            },
            links: {
                __serv: {
                    isSectionVisible: true,
                },
                data: [{
                    label: '',
                    link: ''
                }]
            },
            skills: {
                __serv: {
                    isSectionVisible: true,
                    isSwitchChecked: false,
                },
                data: [{
                    label: '',
                    level: ''
                }]
            },
            courses: {
                __serv: {
                    isSectionVisible: false,
                },
                data: [{
                    course: '',
                    institution: '',
                    period: '',
                    link: ''
                }]
            },
            history: {
                __serv: {
                    isSectionVisible: true,
                },
                data: [{
                    job: '',
                    employer: '',
                    period: '',
                    location: '',
                    comments: ''
                }]
            },
            languages: {
                __serv: {
                    isSectionVisible: false,
                },
                data: [{
                    language: '',
                    level: '',
                }]
            },
            references: {
                __serv: {
                    isSectionVisible: false,
                    isSwitchChecked: false,
                },
                data: [{
                    name: '',
                    company: '',
                    phone: '',
                    email: ''
                }]
            },
            hobbies: {
                __serv: {
                    isSectionVisible: false,
                },
                data: {
                    value: ''
                }
            },
        }
        let resp = await fetch(`${URLUSERS}/${id}.json`)
            .then((resp) => {
                if (resp && resp.status === 200) {
                    return resp.json();
                } else {
                    throw new Error(`HTTP error: ${resp.status}`)
                }
            })
            .catch((error) => (console.log(`Couldn't fetch data.. ${error}`)));

        if (!resp) {
            return await fetch(`${URLUSERS}/${id}.json`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userTemplate)
                })
        } else {
            console.log('Done. User exists.')
        }
    },
    getSectionData: async (section, id) => {
        let resp = await getData(`${URLUSERS}/${id}/${section}.json`);
        return resp;
    },
    putDataToSection: async (user, section, data) => {
        let resp = await putData(`${URLUSERS}/${user}/${section}.json`, data);
        return resp;
    },

    putUserImageData: async (user, data) => {
        console.log('set data to DB')
        let resp = await putData(`${URLUSERS}/${user}/image/value.json`, data);
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