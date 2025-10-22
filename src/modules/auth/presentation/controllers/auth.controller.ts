import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from '../../application/dtos/register.dto';
import { LoginDto } from '../../application/dtos/login.dto';
import { RefreshTokenDto } from '../../application/dtos/refresh-token.dto';
import { TokenResponseDto } from '../../application/dtos/token-response.dto';
import { SetupAdminDto } from '../../application/dtos/setup-admin.dto';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case';
import { SetupFirstAdminUseCase } from '../../application/use-cases/setup-first-admin.use-case';
import { Public } from '../../../../shared/decorators/public.decorator';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { AdminGuard } from '../../../../shared/guards/admin.guard';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly setupFirstAdminUseCase: SetupFirstAdminUseCase,
  ) {}

  @ApiOperation({ summary: 'Registrar novo usuário (apenas admin)' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '018c8f3e-3e3e-7000-8000-000000000000',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - apenas administradores',
  })
  @ApiResponse({
    status: 409,
    description: 'Email já cadastrado',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ id: string }> {
    const user = await this.registerUserUseCase.execute(registerDto);
    return { id: user.id };
  }

  @ApiOperation({
    summary: 'Configurar primeiro administrador (setup inicial do sistema)',
    description: `⚠️ ATENÇÃO: Este endpoint só funciona quando não há nenhum usuário cadastrado no sistema.
    
🔒 POLÍTICA DE SENHA FORTE OBRIGATÓRIA:
A senha deve ter no mínimo 8 caracteres e incluir:
• Pelo menos 1 letra maiúscula (A-Z)
• Pelo menos 1 letra minúscula (a-z)
• Pelo menos 1 número (0-9)
• Pelo menos 1 caractere especial (!@#$%^&*()_+-=[]{}|;:,.<>/?)

✅ Exemplo de senha válida: "1qaSW@3edFR$"
❌ Exemplo de senha inválida: "admin123" (falta maiúscula e caractere especial)

Use este endpoint apenas durante o setup inicial para criar o primeiro administrador.`,
  })
  @ApiResponse({
    status: 201,
    description: 'Primeiro administrador criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '018c8f3e-3e3e-7000-8000-000000000000',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou senha não atende aos requisitos de segurança',
  })
  @ApiResponse({
    status: 403,
    description: 'Já existem usuários cadastrados - use /auth/register',
  })
  @Public()
  @Post('setup')
  async setup(@Body() setupAdminDto: SetupAdminDto): Promise<{ id: string }> {
    const user = await this.setupFirstAdminUseCase.execute(setupAdminDto);
    return { id: user.id };
  }

  @ApiOperation({ summary: 'Fazer login' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }

  @ApiOperation({ summary: 'Renovar access token' })
  @ApiResponse({
    status: 200,
    description: 'Token renovado com sucesso',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token inválido ou expirado',
  })
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponseDto> {
    return this.refreshTokenUseCase.execute(refreshTokenDto.refreshToken);
  }

  @ApiOperation({ summary: 'Obter dados do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário',
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '019a0cca-0dc3-7264-9ab1-41647ef7dd3b',
        },
        email: { type: 'string', example: 'admin@gearcash.com' },
        role: { type: 'string', example: 'admin' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autenticado',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@CurrentUser() user: { userId: string; email: string; role: string }) {
    return user;
  }

  @ApiOperation({ summary: 'Fazer logout' })
  @ApiResponse({
    status: 200,
    description: 'Logout realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Logged out successfully' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autenticado',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(): { message: string } {
    // Aqui você pode invalidar o refresh token no banco de dados
    return { message: 'Logged out successfully' };
  }
}
