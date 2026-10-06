# API REST de Gerenciamento de Tarefas - Guia de Uso

Esta documentação explica como utilizar a API REST para gerenciar tarefas.

## Endpoints

### 1. Criar uma nova tarefa

**POST** `/tasks`

#### Exemplo de requisição:
```http
POST /tasks HTTP/1.1
Content-Type: application/json

{
  "title": "Comprar leite",
  "description": "Ir ao mercado e comprar leite",
  "completed": false
}
```

#### Exemplo de resposta:
```json
{
  "id": "1234567890abcdef12345678",
  "title": "Comprar leite",
  "description": "Ir ao mercado e comprar leite",
  "completed": false,
  "createdAt": "2023-05-15T10:00:00.000Z",
  "updatedAt": "2023-05-15T10:00:00.000Z"
}
```

### 2. Obter todas as tarefas

**GET** `/tasks`

#### Exemplo de resposta:
```json
[
  {
    "id": "1234567890abcdef12345678",
    "title": "Comprar leite",
    "description": "Ir ao mercado e comprar leite",
    "completed": false,
    "createdAt": "2023-05-15T10:00:00.000Z",
    "updatedAt": "2023-05-15T10:00:00.000Z"
  }
]
```

### 3. Obter uma tarefa específica

**GET** `/tasks/{id}`

#### Exemplo de requisição:
```http
GET /tasks/1234567890abcdef12345678 HTTP/1.1
```

#### Exemplo de resposta:
```json
{
  "id": "1234567890abcdef12345678",
  "title": "Comprar leite",
  "description": "Ir ao mercado e comprar leite",
  "completed": false,
  "createdAt": "2023-05-15T10:00:00.000Z",
  "updatedAt": "2023-05-15T10:00:00.000Z"
}
```

### 4. Atualizar uma tarefa

**PUT** `/tasks/{id}`

#### Exemplo de requisição:
```http
PUT /tasks/1234567890abcdef12345678 HTTP/1.1
Content-Type: application/json

{
  "title": "Comprar leite e pão",
  "description": "Ir ao mercado e comprar leite e pão",
  "completed": true
}
```

#### Exemplo de resposta:
```json
{
  "id": "1234567890abcdef12345678",
  "title": "Comprar leite e pão",
  "description": "Ir ao mercado e comprar leite e pão",
  "completed": true,
  "createdAt": "2023-05-15T10:00:00.000Z",
  "updatedAt": "2023-05-15T10:05:00.000Z"
}
```

### 5. Excluir uma tarefa

**DELETE** `/tasks/{id}`

#### Exemplo de requisição:
```http
DELETE /tasks/1234567890abcdef12345678 HTTP/1.1
```

#### Exemplo de resposta:
```json
{
  "message": "Tarefa excluída com sucesso"
}
```

## Validação

A API realiza validações nos campos:
- `title`: obrigatório, mínimo de 3 caracteres
- `description`: opcional
- `completed`: opcional, deve ser booleano

## Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Dados inválidos
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro interno do servidor
