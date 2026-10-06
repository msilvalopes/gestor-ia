# Documentação Swagger/OpenAPI

A API possui documentação automática gerada com Swagger/OpenAPI.

## Acessando a documentação

Após iniciar o servidor, a documentação estará disponível em:

```
http://localhost:3000/api-docs
```

## Como funciona

A documentação é gerada automaticamente a partir dos comentários JSDoc nas rotas da API. Isso permite que a documentação esteja sempre atualizada com as implementações.

## Requisitos

- Node.js
- npm

## Instalação

```bash
npm install swagger-jsdoc swagger-ui-express
```

## Configuração

O arquivo `swagger.js` contém a configuração do Swagger, incluindo:

- Informações básicas da API (título, versão, descrição)
- Servidores disponíveis
- Caminho para os arquivos com anotações JSDoc

## Anotações JSDoc

As rotas devem ser documentadas com comentários JSDoc para que a documentação seja gerada automaticamente. Exemplo:

```javascript
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     responses:
 *       200:
 *         description: Uma lista de tarefas
 */
```
