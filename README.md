# API de Gerenciamento de Tarefas

API REST desenvolvida com Node.js e Express para gerenciar tarefas. Inclui autenticação, validações, testes e documentação Swagger.

## Funcionalidades

- Criar tarefas
- Listar tarefas
- Atualizar tarefas
- Deletar tarefas
- Autenticação de usuários
- Validação de dados
- Middleware de logging e tratamento de erros

## Tecnologias Utilizadas

- Node.js
- Express
- Jest (testes)
- Swagger/OpenAPI
- JWT para autenticação

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

## Uso

A API estará disponível em `http://localhost:3000`.

### Endpoints

- `POST /api/tasks` - Criar uma nova tarefa
- `GET /api/tasks` - Listar todas as tarefas
- `PUT /api/tasks/:id` - Atualizar uma tarefa
- `DELETE /api/tasks/:id` - Deletar uma tarefa

### Documentação

A documentação completa da API está disponível em:
- `/api-docs` (Swagger UI)

## Testes

Para executar os testes:
```bash
npm test
```

Para verificar a cobertura de testes:
```bash
npm run coverage
```

## Estrutura do Projeto

```
.
├── middleware/     # Middlewares customizados
├── models/         # Modelos de dados
├── routes/         # Rotas da API
├── tests/          # Testes automatizados
├── docs/           # Documentação
├── scripts/        # Scripts auxiliares
├── server.js       # Ponto de entrada do servidor
└── package.json    # Dependências e scripts
```

## Licença

MIT