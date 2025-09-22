import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError, NotFoundError, ConflictError, UnauthorizedError, ValidationError } from '../types';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const { status, message } = this.mapExceptionToHttp(exception);

        response.status(status).json({
            statusCode: status,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }

    private mapExceptionToHttp(exception: unknown): { status: number; message: string } {
        if (exception instanceof UnauthorizedError) {
            return { status: HttpStatus.UNAUTHORIZED, message: exception.message };
        }
        if (exception instanceof NotFoundError) {
            return { status: HttpStatus.NOT_FOUND, message: exception.message };
        }
        if (exception instanceof ConflictError) {
            return { status: HttpStatus.CONFLICT, message: exception.message };
        }
        if (exception instanceof ValidationError) {
            return { status: HttpStatus.BAD_REQUEST, message: exception.message };
        }
        if (exception instanceof AppError) {
            return { status: HttpStatus.BAD_REQUEST, message: exception.message };
        }
        // Fallback for unknown errors
        const message = exception instanceof Error ? exception.message : 'Internal server error';
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message };
    }
}


