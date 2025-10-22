# 🏗️ Arquitetura DDD + Clean Architecture

Este projeto segue os princípios de **Domain-Driven Design (DDD)**, **Clean Architecture** e **SOLID** para garantir código maintível, testável e escalável.

## 📁 Estrutura de Pastas

```
src/
├── 🎯 domain/                       # DOMAIN LAYER - Regras de negócio
│   ├── entities/                    # Entidades de domínio
│   ├── repositories/                # Interfaces dos repositórios (contratos)
│   ├── services/                    # Domain Services
│   └── events/                      # Domain Events
│
├── ⚙️ application/                  # APPLICATION LAYER - Casos de uso
│   ├── use-cases/                   # Use Cases (Application Services)
│   ├── dtos/                        # Data Transfer Objects
│   └── ports/                       # Interfaces para serviços externos
│
├── 🛠️ infrastructure/               # INFRASTRUCTURE LAYER - Detalhes técnicos
│   ├── database/                    # Persistência
│   │   └── typeorm/
│   │       ├── entities/           # TypeORM Entities (Schema)
│   │       ├── repositories/       # Implementação dos repositórios
│   │       └── migrations/         # Migrações do banco
│   ├── external-services/           # Serviços externos (Email, Storage, etc.)
│   └── config/                      # Configurações de ambiente
│
├── 🎨 presentation/                 # PRESENTATION LAYER - Interface HTTP
│   ├── controllers/                 # REST Controllers
│   ├── guards/                      # Auth Guards
│   ├── middlewares/                 # Custom Middlewares
│   ├── filters/                     # Exception Filters
│   └── interceptors/                # Interceptors
│
└── 🔄 shared/                       # SHARED LAYER - Utilitários comuns
    ├── decorators/                  # Custom Decorators
    ├── exceptions/                  # Custom Exceptions
    ├── utils/                       # Utilities
    ├── types/                       # Common Types
    └── constants/                   # Application Constants
```

## 🎯 Princípios Aplicados

### **Domain-Driven Design (DDD)**
- **Domain Layer** isolado e independente
- **Entities** com regras de negócio
- **Domain Services** para lógica complexa
- **Repository Interfaces** como contratos

### **Clean Architecture**
- **Dependency Inversion**: Camadas externas dependem das internas
- **Use Cases** orquestram a lógica de aplicação
- **Frameworks** são detalhes (Infrastructure)
- **Testabilidade** através de interfaces

### **SOLID Principles**
- **S**ingle Responsibility: Cada classe tem uma responsabilidade
- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Subtipos substituíveis
- **I**nterface Segregation: Interfaces específicas
- **D**ependency Inversion: Dependa de abstrações

## 📋 Fluxo de Dados

```
HTTP Request → Controller → Use Case → Domain Service → Repository → Database
                ↑              ↑            ↑              ↑
          Presentation    Application    Domain     Infrastructure
```

## 🚀 Benefícios

1. **✅ Testabilidade**: Cada camada pode ser testada isoladamente
2. **✅ Manutenibilidade**: Mudanças ficam isoladas por responsabilidade
3. **✅ Escalabilidade**: Estrutura cresce de forma organizada
4. **✅ Flexibilidade**: Fácil trocar implementações (banco, frameworks)
5. **✅ Colaboração**: Time entende facilmente a organização

## 📝 Exemplos de Uso

### Controller (Presentation)
```typescript
@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }
}
```

### Use Case (Application)
```typescript
@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}
  
  async execute(dto: CreateUserDto): Promise<User> {
    const user = new User(dto.email, dto.name);
    return this.userRepository.save(user);
  }
}
```

### Entity (Domain)
```typescript
export class User {
  constructor(
    private readonly id: UserId,
    private email: Email,
    private name: string
  ) {}
  
  changeEmail(newEmail: Email): void {
    // Regras de negócio aqui
    this.email = newEmail;
  }
}
```

### Repository Implementation (Infrastructure)
```typescript
@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserSchema) 
    private repository: Repository<UserSchema>
  ) {}
  
  async save(user: User): Promise<User> {
    // Implementação com TypeORM
  }
}
```

## 🔧 Próximos Passos

1. Implementar TypeORM e entidades
2. Criar casos de uso para autenticação
3. Adicionar validações com class-validator
4. Implementar testes unitários por camada