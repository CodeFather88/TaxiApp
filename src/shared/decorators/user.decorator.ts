import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { IJwtUser } from "../types/jwt-user.type"

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): IJwtUser => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
})
