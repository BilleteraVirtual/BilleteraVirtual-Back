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



// **** Export default **** //

export default {
    verifyToken
} as const;
