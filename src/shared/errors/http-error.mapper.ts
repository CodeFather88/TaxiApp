import { HttpStatus } from "@nestjs/common";

type ErrorConstructor<T extends Error = Error> = new (...args: any[]) => T;

export class HttpErrorMapper {
    private static readonly registry = new Map<ErrorConstructor, HttpStatus>();

    static register<T extends Error>(ctor: ErrorConstructor<T>, status: HttpStatus): void {
        this.registry.set(ctor, status);
    }

    static resolve(exception: unknown): { status: HttpStatus; message: string } | null {
        if (!(exception instanceof Error)) {
            return null;
        }

        let current: ErrorConstructor | null = exception.constructor as ErrorConstructor;

        while (current && current !== Error) {
            const status = this.registry.get(current);
            if (status !== undefined) {
                return { status, message: exception.message };
            }
            current = Object.getPrototypeOf(current) as ErrorConstructor | null;
        }

        return null;
    }
}


