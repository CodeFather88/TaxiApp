export interface IJwtAdapter {
    sign(payload: object): Promise<string>;
    verify<T = any>(token: string): Promise<T>;
}