# Tecnologias Utilizadas
[NodeJS](https://nodejs.org/en/)

[PostgreSQL](https://www.postgresql.org)

[TypeScript](https://www.typescriptlang.org)

[ExpressJS](https://expressjs.com/pt-br/)

[Prisma](https://www.prisma.io)

[Jest](https://jestjs.io/pt-BR/)

[Supertest](https://www.npmjs.com/package/supertest)

[express-async-errors](https://www.npmjs.com/package/express-async-errors)

[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

[Dotenvi](https://www.npmjs.com/package/dotenv)

[Pino](https://www.npmjs.com/package/pino)

[pino-http](https://www.npmjs.com/package/pino-http)

## Como subir o projeto:

Primeiro faça o clone do projeto:

```bash
$ git clone https://github.com/AbnerTavares14/igma-teste.git
```

Instale as dependência: 
```bash
$ npm install
```

Crie um arquivo .env com base no arquivo .env.example, colocando a URI do seu banco de dados postgreSQL e a porta que utilizar para rodar a aplicação

Execute as migrações:
```bash
$ npx prisma migrate dev
```

Inicialize a aplicação: 
```bash
$ npm run dev
```

## Como executar os testes:
Crie um arquivo .env.test com base no arquivo .env.example.test e execute no terminal
```bash
$ npm run tests
```
Caso queira ver o coverage dos testes, execute: 
```bash
$ npm run coverage:test
```

# Documentação
Para ver a documentação da api, acesse a rota /api-docs ao subir o projeto.
