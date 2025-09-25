import { AppError } from "./app-error";

export class NotFoundError extends AppError {}
export class ConflictError extends AppError {}
export class UnauthorizedError extends AppError {}
export class ValidationError extends AppError {}
export class BadRequestError extends AppError {}