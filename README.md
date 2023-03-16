
## Description



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

```bash
# troubles to get any service up and running because of port conflict
$ ps -aux | grep ${PORT}
$ sudo kill <PID>
# run again
$ docker-compose up -d
```

### Run database migration
```bash
$ docker-compose exec api npm run typeorm:migration:run
```

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
*[http://localhost:${API_PORT}/docs](http://localhost:${API_PORT}/docs)*

- Do the authenticaion first
- copy and paste the token in the Authorize button to use the other two endpoints.

## To run the node Api locally, not in the Docker container
Consider to change the ports to:
- TYPEORM_HOST=localhost
- RABBITMQ_HOST=amqp://localhost:5672

```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Run the tests

```bash
# unit tests
$ docker-compose exec api npm run test

# test coverage
$ docker-compose exec api npm run test:cov
```

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## License

Nest is [MIT licensed](LICENSE).
