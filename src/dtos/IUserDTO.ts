export default interface IUserDTO {
    id: number;
    email: string;
    password?: string;
    created_at: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
}
