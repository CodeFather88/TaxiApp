import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpErrorMapper } from '../errors/http-error.mapper';

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
        const mapped = HttpErrorMapper.resolve(exception);
        if (mapped) {
            return mapped;
        }
        const message = exception instanceof Error ? exception.message : 'Internal server error';
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message };
    }
}


