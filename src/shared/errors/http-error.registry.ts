import { HttpStatus } from "@nestjs/common";
import { HttpErrorMapper } from "./http-error.mapper";
import { AppError } from "./app-error";
import { ConflictError, NotFoundError, UnauthorizedError, ValidationError } from "./domain-errors";

export class HttpErrorRegistry {
    static registerDefaults(): void {
        HttpErrorMapper.register(AppError, HttpStatus.BAD_REQUEST);
        HttpErrorMapper.register(UnauthorizedError, HttpStatus.UNAUTHORIZED);
        HttpErrorMapper.register(NotFoundError, HttpStatus.NOT_FOUND);
        HttpErrorMapper.register(ConflictError, HttpStatus.CONFLICT);
        HttpErrorMapper.register(ValidationError, HttpStatus.BAD_REQUEST);
    }
}