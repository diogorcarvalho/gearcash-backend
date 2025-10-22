import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsStrongPassword } from '../../../../shared/validators/is-strong-password.validator';

export class SetupAdminDto {
  @ApiProperty({
    description: 'Email do administrador',
    example: 'admin@gearcash.com',
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({
    description:
      'Senha forte do administrador. OBRIGATÓRIO: mínimo 8 caracteres com pelo menos 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial',
    example: '1qaSW@3edFR$',
    minLength: 8,
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @IsStrongPassword({
    message:
      'Senha deve ser forte: mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial (!@#$%^&*()_+-=[]{}|;:,.<>?)',
  })
  password: string;

  @ApiProperty({
    description: 'Nome completo do administrador',
    example: 'Administrador do Sistema',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  name: string;
}
