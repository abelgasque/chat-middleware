const {
    NODE_ENV,
    SUPERSET_BASE_URL,
    SUPERSET_USERNAME,
    SUPERSET_PASSWORD,
} = process.env;

class SupersetService {

    async getAccessToken() {
        const response = await fetch(`${SUPERSET_BASE_URL}/api/v1/security/login`, {
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

    async getGuestToken(id, clauses) {
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${SUPERSET_BASE_URL}/api/v1/security/guest_token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken.access_token}`,
            },
            body: JSON.stringify({
                user: {
                    first_name: NODE_ENV,
                    last_name: NODE_ENV,
                    username: SUPERSET_USERNAME,
                },
                resources: [
                    { type: "dashboard", id: id }
                ],
                rls: clauses,
                type: 'guest',
            }),
        });

        return await response.json();
    }
}

export default SupersetService;