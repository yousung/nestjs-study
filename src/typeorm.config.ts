import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'local.db',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
