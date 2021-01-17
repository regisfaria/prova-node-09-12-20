# Prova Hellper

## Como iniciar o projeto
1. Certifique-se de estar com as versōes do node atualizadas e de ter o yarn instalado.
_**node**: https://nodejs.org/en/_  
_**nvm**: https://github.com/nvm-sh/nvm_  
_**yarn**: https://classic.yarnpkg.com/en/_  

2. Em seguida, instale as dependencias do projeto
```bash
$ yarn install
```

3. Certifique-se de configurar o arquivo "ormconfig.json" com a sua configuração de base de dados. O projeto espera uma base de dados do tipo postgresql.

* Para rodar a base de dados, eu utilizo um container de Postgresql com Docker. Vou deixar um quick-install para caso
  o avaliado também deseje instalar um container postregresql para testar o projeto.

3.1. Para instalar um container rapido de docker, é super simples!
     Com o docker instalado, rode o seguinte comando:
```bash
$ docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
**!. caso seja usado o container acima, não sera preciso fazer alteraçōes no arquivo "ormconfig.json"**
**!!. lembre-se que a porta 5432 tem que estar disponivel**

4. Com a base de dados configurada, rode as migrations com:
```bash
$ yarn typeorm migration:run

# Você pode rodar o seguinte comando para vizualizar o estado das migrations
$ yarn typeorm migration:show 
```

5. Inicie o servidor :)
```bash
$ yarn dev
```

## Rotas da aplicação

A aplicação foi estruturada com DDD e contém apenas 1 módulo, onde nele encontramos rotas para users e auth. 
Rotas:

**POST** - /users  
**GET** - /users  
**PUT** - /users *requer auth  
**DELETE** - /users *requer auth  

**POST** - /sessions

Você vai encontrar o'que cada rota precisa de parametros em "/src/modules/users/infra/http/routes/*.routes.ts".

Para autenticação, faço uso de um Bearer Token.

## Testes

A aplicação contem testes unitarios, para rodar os testes:

```bash
$ yarn test
```

Eu também habilitei coverage para os testes, então é possivel ver uma webview do resultado dos testes, após rodados em:  
coverage/lcov-report/index.html

## Contato

[LinkedIn](https://www.linkedin.com/in/regissfaria/)  
[GitHub](https://github.com/regisfaria).  
regisprogramming@gmail.com