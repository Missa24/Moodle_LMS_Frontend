type JwtPayload = {
    exp?: number;
};

export function getJwtExpiration(
    token: string,
): number | null {
    try {
        const parts =
            token.split(".");

        if (parts.length !== 3) {
            return null;
        }

        const payload =
            parts[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/");

        const paddedPayload =
            payload.padEnd(
                payload.length +
                ((4 -
                    (payload.length %
                        4)) %
                    4),
                "=",
            );

        const decoded =
            atob(paddedPayload);

        const parsed =
            JSON.parse(
                decoded,
            ) as JwtPayload;

        if (
            typeof parsed.exp !==
            "number"
        ) {
            return null;
        }

        return parsed.exp * 1000;
    } catch {
        return null;
    }
}

export function isJwtExpired(
    token: string,
): boolean {
    const expiration =
        getJwtExpiration(token);

    if (!expiration) {
        return true;
    }

    return Date.now() >= expiration;
}