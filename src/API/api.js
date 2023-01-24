export const fetchAPI = {
    BASEURL: `https://introduce-1b6f8-default-rtdb.firebaseio.com`,
    async simpleFetchData(path) {
        return await fetch(`${this.BASEURL}/prvt/users/${path}.json`)
            .then((resp) => {
                if (resp && resp.status === 200) {
                    return resp.json()
                }
                else {
                    return 'Error -- simpleFetchData from api.js'
                }
            }).then(response => response)

    }
}