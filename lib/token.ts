import { SignJWT, jwtVerify } from 'jose';

function getKey() {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return new TextEncoder().encode(secretKey);
}

export async function signJWT(payload: any) {
    const key = getKey();
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
}

export async function verifyJWT(token: string) {
    try {
        const key = getKey();
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}
