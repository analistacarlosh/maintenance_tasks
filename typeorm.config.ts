import { DataSource, DataSourceOptions } from 'typeorm';
import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '.env') });
 
export const cliOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: true,
  entities: ["./src/entity/*.entity{.ts,.js}"],
  migrations: ["./src/migration/*-migration{.ts,.js}"]
};

const datasource = new DataSource(cliOrmConfig)
export default  datasource
