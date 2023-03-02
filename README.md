
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# generate .env file
$ cp .env.example .env
```

```bash
# generate JWT secret key and copy to JWT_SECRET variable inside of .env file
$ node
$ crypto.randomBytes(64).toString("hex");
```

```bash
# setup the local environment with Docker
$ docker-compose up -d
```

## Database migration
In the docker-compose I have defined to run the migration together with npm install and start, but the migration command is not working.
So, before you start to test the API, you can access the mysql by adminer http://localhost:8080/ (credials are in the .env.example) and
import the migration database from the folder /database/migration_db.sql

## Test mocked users
- To facilitate the test in the migration process the user,
task tables will be created and populates with some mocks users:

username: manager.test
password: 123456

username: technician.test1
password: 654321

username: technician.test2
password: 123456

## To test the Api, access Swagger APi documentation
# http://localhost:${API_PORT}/docs

- Do the authenticaion first
- copy and paste the token in the Authorize button to use the other two endpoints.


## To run the node Api locally, not in the Docker container
- Consider to change the port and host to

TYPEORM_HOST=localhost
TYPEORM_PORT=3307
RABBITMQ_HOST=amqp://localhost:5672

```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Run the tests locally

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).