import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpErrorMapper } from '../errors/http-error.mapper';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const { status, message } = this.mapExceptionToHttp(exception);

        this.logError(exception, request, status);

        response.status(status).json({
            statusCode: status,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }

    private logError(exception: unknown, request: Request, status: number): void {
        const errorMessage = exception instanceof Error ? exception.message : 'Unknown error';
        const errorStack = exception instanceof Error ? exception.stack : undefined;
        
        const logContext = {
            method: request.method,
            url: request.url,
            userAgent: request.get('User-Agent'),
            ip: request.ip,
            status,
            timestamp: new Date().toISOString(),
        };

        if (status >= 500) {
            this.logger.error(
                `Server error: ${errorMessage}`,
                errorStack,
                JSON.stringify(logContext)
            );
        } else if (status >= 400) {
            this.logger.warn(
                `Client error: ${errorMessage}`,
                JSON.stringify(logContext)
            );
        }
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


