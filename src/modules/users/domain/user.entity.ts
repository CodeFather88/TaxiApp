import { UserRole } from "src/modules/users/domain/user.types";

export interface UserEntity {
  id: number;
  phoneNumber: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
