const {
    NODE_ENV,
    SUPERSET_BASE_URL,
    SUPERSET_USERNAME,
    SUPERSET_PASSWORD,
} = process.env;

class SupersetService {

    async getAccessToken() {
        const response = await fetch(SUPERSET_BASE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: SUPERSET_USERNAME,
                password: SUPERSET_PASSWORD,
                provider: "db"
            }),
        });

        return await response.json();
    }

    async getGuestToken() {
        const accessToken = null;
        console.log(await getAccessToken());
        const response = await fetch(SUPERSET_BASE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                user: {
                    first_name: NODE_ENV,
                    last_name: NODE_ENV,
                    username: SUPERSET_USERNAME,
                },
                resources: [],
                rls: [],
                type: 'guest',
            }),
        });

        return await response.json();
    }
}

export default SupersetService;