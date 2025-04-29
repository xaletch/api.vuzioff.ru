import sequelize from "../config/db";

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();

    console.log('Подключение к PostgreSQL установлено');

    // await sequelize.sync({ alter: true });
  }
  catch (err) {
    console.log(`Не удалось подключиться к ДБ ${err}`);
    throw err;
  }
};

export default connectPostgres;