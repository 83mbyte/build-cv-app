import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence, sendEmailVerification } from "firebase/auth";

export const fetchAPI = {
    BASEURL: `https://introduce-1b6f8-default-rtdb.firebaseio.com`,
    ROOTUSERURL: `https://introduce-1b6f8-default-rtdb.firebaseio.com/prvt/users`,

    async fethingSubPath(path, user) {
        return await fetch(`${this.ROOTUSERURL}/${user}/${path}.json`)
            .then((resp) => {
                if (resp && resp.status === 200) {
                    return resp.json()
                }
                else {
                    return 'Error -- fethingSubPath from api.js'
                }
            }).then(response => response)

    },

    async putData(user, path, data) {
        return await fetch(`${this.BASEURL}/prvt/users/${user}/${path}/value.json`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data)

            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response;
            })
            .catch((error) => alert(`Couldn't fetch verseL ${error}`))
    },
    async putDataToWholeSection(user, path, data) {
        return await fetch(`${this.BASEURL}/prvt/users/${user}/${path}.json`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data)

            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response;
            })
            .catch((error) => alert(`Couldn't fetch verseL ${error}`))
    },

    // async simpleFetchData(path) {
    //     return await fetch(`${this.BASEURL}/prvt/users/${path}.json`)
    //         .then((resp) => {
    //             if (resp && resp.status === 200) {
    //                 return resp.json()
    //             }
    //             else {
    //                 return 'Error -- simpleFetchData from api.js'
    //             }
    //         }).then(response => response)

    // },

}

export const authAPI = {
    login: (auth, email, password) => {
        return setPersistence(auth, browserSessionPersistence)
            .then(() => {

                return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    // Signed in 
                    if (userCredential.user != null) {
                        const user = userCredential.user;

                        if (user.emailVerified) {
                            return {
                                data: { userId: user.uid, email: user.email, accessToken: user.accessToken },
                                message: 'success'
                            }
                        } else {
                            return { data: null, message: 'not verified' }
                        }
                    }
                    else {
                        return { data: null, message: 'wrong credentials' }
                    }

                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    return { data: null, message: 'wrong credentials' }

                })
            })
    },
    signup: (auth, email, password) => {
        //console.log('to signup: ', auth, email, password)
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                return sendEmailVerification(user)
                    .then(() => {
                        // Email verification sent!
                        // ...
                        return { message: 'verify' }
                    });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                let err = error.message.slice(16,);
                return { message: err }
            });

    }

}


