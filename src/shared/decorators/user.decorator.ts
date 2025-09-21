import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { IUser } from "../types/user.type"

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
})
