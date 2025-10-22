import { Injectable, Inject, ForbiddenException, ConflictException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.token';
import type { IUserRepository } from '../../domain/repositories/user.repository';
import { User, UserRole } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

interface SetupFirstAdminInput {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class SetupFirstAdminUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: SetupFirstAdminInput): Promise<User> {
    // Verificar se já existem usuários no sistema
    const userCount = await this.userRepository.count();

    if (userCount > 0) {
      throw new ForbiddenException(
        'Sistema já possui usuários cadastrados. Use o endpoint /auth/register com credenciais de administrador.',
      );
    }

    // Verificar se o email já está cadastrado (segurança extra)
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Criar o primeiro admin
    const user = User.create({
      email: input.email,
      password: hashedPassword,
      name: input.name,
      role: UserRole.ADMIN, // Sempre cria como ADMIN
    });

    return this.userRepository.create(user);
  }
}
