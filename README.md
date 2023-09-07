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
# desarrollo
$ npm run start

# desarrollo
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
  4. Levantar base de datos, obligatorio para que funcione
    ```
    docker-compose up -d
    ```
  5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

  6. Completar las variables de entornos en el __.env__ 

  7. Instalar librerias y/o dependencias mongoose
    ```
    npm install add @nestjs/mongoose mongoose
    ```
  8. Recargar la base de datos con api solo en postman

    ```
    localhost:3000/api/v2/seed/
    ```


## Instalaciones necesarias

```bash
# Validacion para los Pipes
$ npm install class-validator
# uuid
$ npm i --save-dev @types/uuid
# Transformacion de clases
$ npm install class-transformer
# Instalacion de libreria de terceros, para hacer consultas http
$ npm install axios@0.27.2
# Instalacion de .env, luego configurar en app.module.ts
$ npm i @nestjs/config
# Validar y lanzar errores por defecto, general mente se usa para variables de entorno
$ npm i joi
```


