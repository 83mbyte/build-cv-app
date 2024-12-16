
const URLUSERS = process.env.NEXT_PUBLIC_APP_URLUSERS;

export const dbAPI = {

    checkAndCreate: async (id, token, displayName, email) => {

        let userNameSplitted = displayName.split(' ')
        let userTemplate = {
            paidServices: {
                data: {
                    pdf: {
                        isAllowed: false,
                        filesAllowed: 0
                    },
                    interview: {
                        isAllowed: false
                    }
                }
            },
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
            cover: {
                __serv: {
                    isSectionVisible: true,
                    btnLoading: false
                },
                data: {
                    company: '',
                    hiringManager: '',
                    jobTitle: '',
                    value: ''
                }
            }
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
        .catch((error) => {
            console.log(`Couldn't fetch data.. ${error}`);
            return null
        });
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