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
        try {

            const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/${endPoint}`, options);

            if (resp) {
                let data = await resp.json();

                return { status: data.status, content: data?.content ?? data?.message }
            } else {
                throw new Error(`HTTP error: ${resp.status}`)
            }

        } catch (error) {
            console.error(':: ', error)
        }

    }
}