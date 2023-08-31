<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


## Description

Proyecto de pokedex en NestJS

## Stack a utilizar
  -MongoDB
  -NestJs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



# ejecutar en desarrollo
  1. Clonar repo
  2. Ejecutar
    ```
    npm install
    ```
  3. Tener NestCli instalado
    ```
    npm i -g @nest/cli
    ```
  4. Levantar base de datos
    ```
    docker-compose up -d
    ```
  5. Instalar librerias y/o dependencias mongoose
    ```
    npm install add @nestjs/mongoose mongoose
    ```