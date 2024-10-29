export const functionsAPI = {
    requestAI: async (endPoint, query, accessToken) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                accessToken: accessToken
            })
        }
        let resp = null;

        try {

            resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/${endPoint}`, options);

            // if (process.env.NODE_ENV == "development") {
            //     resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/${endPoint}`, options);

            // } else {
            //     resp = await fetch(`https://${endPoint}-${process.env.NEXT_PUBLIC_FUNC_SUFFIX}`, options);
            // }

            if (resp) {
                let data = await resp.json();

                return { status: data.status, content: data?.content ?? data?.message }
            } else {
                throw new Error(`HTTP error: ${resp.status}`)
            }

        } catch (error) {
            console.error(':: ', error)
        }
    },

    callFunction: async (endPoint, accessToken) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: accessToken
            })
        }
        let resp = null;
        try {
            resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/${endPoint}`, options);

            // if (process.env.NODE_ENV == "development") {
            //     resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/${endPoint}`, options);

            // } else {
            //     resp = await fetch(`https://${endPoint}-${process.env.NEXT_PUBLIC_FUNC_SUFFIX}`, options);
            // }

            if (resp) {
                let data = await resp.json();

                return { status: data.status, content: data?.content ?? data?.message ?? data?.error }
            } else {
                throw new Error(`HTTP error: ${resp.status}`)
            }

        } catch (error) {
            console.error(':: ', error)
        }
    }

}