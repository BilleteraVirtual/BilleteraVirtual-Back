import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IReq, IRes } from './types/express/misc';
import authService from '@src/services/authService';


// **** Functions **** //

async function verifyToken(req: IReq<string>, res: IRes) {
    // Assert that req.body is an object with a 'token' string property
    const { token } = req.body as unknown as { token: string };  // Type assertion

    const result = await authService.verifyToken(token);
    if(result) {
        return res.status(HttpStatusCodes.OK).send({ message: 'Token verified successfully' });
    }
    return res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: 'Invalid token' });

}

async function decodeToken(req: IReq<string>, res: IRes) {
    // Extract token from authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    const result = await authService.decodeToken(token);
    if(result) {
        return res.status(HttpStatusCodes.OK).send({ message: 'Token decoded successfully', result });
    }
    return res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: 'Invalid token' });

}



// **** Export default **** //

export default {
    verifyToken,
    decodeToken
} as const;
