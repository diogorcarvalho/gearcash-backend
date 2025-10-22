import { UuidHelper } from '../../../../shared/utils/uuid.helper';

export enum UserRole {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  SELLER = 'seller',
}

export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static create(data: { email: string; password: string; name: string; role?: UserRole }): User {
    return new User({
      id: UuidHelper.generate(),
      ...data,
      role: data.role || UserRole.SELLER,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
