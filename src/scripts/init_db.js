import sequelize from '../config/database.config.js'

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});


