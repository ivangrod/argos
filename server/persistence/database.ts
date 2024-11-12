import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('argos', 'ivangrod', 's3cr3t', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: true,
});

export default sequelize;
