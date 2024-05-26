import { Sequelize } from 'sequelize-typescript';
import { RoomUser, User, Room, Message } from './models';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.PG_DB_HOST,
        port: +process.env.PG_DB_PORT,
        username: process.env.PG_DB_USER,
        password: process.env.PG_DB_PASSWORD,
        database: process.env.PG_DB_NAME,
      });
      sequelize.addModels([User, Room, RoomUser, Message]);
      // await sequelize.sync({ force: true });
      await sequelize.sync({ alter: true });

      return sequelize;
    },
  },
];
