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