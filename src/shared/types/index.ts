export * from './user.type'
export const TOKENS = {
    IUserRepository: Symbol('IUserRepository'),
    IAuthUserRepository: Symbol('IAuthUserRepository'),
    IJwtAdapter: Symbol('IJwtAdapter'),
} as const;

export class AppError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}

export class NotFoundError extends AppError {}
export class ConflictError extends AppError {}
export class UnauthorizedError extends AppError {}
export class ValidationError extends AppError {}