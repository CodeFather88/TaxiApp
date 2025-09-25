export const TOKENS = {
    IUserRepository: Symbol('IUserRepository'),
    IAuthUserRepository: Symbol('IAuthUserRepository'),
    IJwtAdapter: Symbol('IJwtAdapter'),
    IPasswordHasher: Symbol('IPasswordHasher'),
    IOsrmAdapter: Symbol('IOsrmAdapter')
} as const;