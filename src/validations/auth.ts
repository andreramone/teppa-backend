import * as Yup from 'yup';

export default interface IUserAuthDTO {
    email: string
    password: string
}

export const UserAuthDTOValidation = Yup.object().shape({
    email: Yup.string().email('E-mail is invalid.').required('Field email is required'),
    password: Yup.string().required('Field password is required'),
})