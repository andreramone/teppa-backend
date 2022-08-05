import { Secret } from 'jsonwebtoken';

export default interface IUserTokenDTO {
    secret?: Secret;
    expiresIn?: string;
}