import * as bcrypt from "bcrypt";
import { IPasswordHasher } from "./password-hasher.port";

export class BcryptPasswordHasher implements IPasswordHasher {
    async hash(plain: string): Promise<string> {
        return bcrypt.hash(plain, 10);
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed);
    }
}


