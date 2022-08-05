import { compare } from 'bcryptjs';
import { sign, Secret } from 'jsonwebtoken';
import firebase from 'firebase';
import authConfig from '../../config/auth';
import IUserTokenDTO from '../../dtos/IUserTokenDTO';

class AuthenticateUserService {
    public async execute(userAuth: any): Promise<any> {
        const db = firebase.firestore();
        const userDb = db.collection('users')
        const snapshot = await userDb.get();

        const users: any = snapshot.docs.map((doc) => ({...doc.data()}))
        const passwordMatched = await compare(userAuth.password, users.map((user: any) => user.password.password));
        console.log( passwordMatched, ' passwordMatched')

        if (!passwordMatched) throw new Error('E-mail or password incorrect');

        const { secret, expiresIn }: IUserTokenDTO = authConfig.jwt;
        console.log( secret)
        if (secret && expiresIn) {
            const token = sign({}, secret, {
                expiresIn,
                subject: users.id.toString(),
            });

            const userWithoutPassword = users;
            delete userWithoutPassword.password;

            return {
                user: userWithoutPassword,
                token,
            }
        }

        throw new Error('Something gone wrong')
    }
}

export default AuthenticateUserService;