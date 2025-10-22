import { UserRole } from '../../domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

class UserResponseDto {
  @ApiProperty({
    description: 'ID do usuário (UUIDv7)',
    example: '018c8f3e-3e3e-7000-8000-000000000000',
  })
  id: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin@gearcash.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Admin User',
  })
  name: string;

  @ApiProperty({
    description: 'Role do usuário',
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  role: UserRole;
}

export class TokenResponseDto {
  @ApiProperty({
    description: 'Token de acesso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Token de renovação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Dados do usuário',
    type: UserResponseDto,
  })
  user: UserResponseDto;
}
