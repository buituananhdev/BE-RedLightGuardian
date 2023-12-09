import { dbDatabase, dbUser, dbPassword, dbHost } from './index.js';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL connected successful.');
  })
  .catch((err) => {
    console.error('MySQL connected fail:', err);
  });

// sequelize.sync({ force: false }).then(() => {
//   console.log('Database synced');
// });

export default sequelize;
