export enum UserRole {
    driver = 'driver'
}

export interface UserEntity {
    id: number;
    phoneNumber: string;
    password: string;
    name: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
