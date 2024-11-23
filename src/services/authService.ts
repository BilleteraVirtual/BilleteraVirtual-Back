

// **** Variables **** //

export const CATEGORY_NOT_FOUND_ERR = 'Category not found';
const jwt = require('jsonwebtoken');

// **** Functions **** //

async function verifyToken(token: string): Promise<boolean> {
    
    return jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            throw new Error('Invalid token');
        }
        return true;
    }
    );
}

async function decodeToken(token: string): Promise<any> {
    return jwt.decode(token);
}

// **** Export default **** //

export default {
    verifyToken,
    decodeToken
} as const;
