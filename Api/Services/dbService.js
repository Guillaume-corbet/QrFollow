import Seq from 'sequelize'
import dotenv from 'dotenv'
import {
    Organisations,
    Users,
    UsersOrganisations,
    UsersTokens
} from '../Models/index.js'

dotenv.config();

// Sequelize init
const db = {};

db.env = ""
db.Sequelize = Seq.Sequilize;

const init_db = (env) => {
    db.env = env
    db.sequelize = null
    if (db.env == "production"){
        db.sequelize = new Seq.Sequelize(
            process.env.DB_PROD_NAME,
            process.env.DB_PROD_USER,
            process.env.DB_PROD_PASSWD, {
                host: process.env.DB_PROD_HOST,
                dialect: 'mysql'
            }
        );
    } else if (db.env == "developpement") {
        db.sequelize = new Seq.Sequelize(
            process.env.DB_DEV_NAME,
            process.env.DB_DEV_USER,
            process.env.DB_DEV_PASSWD, {
                host: process.env.DB_DEV_HOST,
                dialect: 'mysql'
            }
        );
    } else if (db.env == "test") {
        db.sequelize = new Seq.Sequelize(
            process.env.DB_TEST_NAME,
            process.env.DB_TEST_USER,
            process.env.DB_TEST_PASSWD, {
                host: process.env.DB_TEST_HOST,
                dialect: 'mysql'
            }
        );
    }
    
    db.Users = Users.model(db.sequelize, Seq.DataTypes);
    db.Organisations = Organisations.model(db.sequelize, Seq.DataTypes);
    db.UsersOrganisations = UsersOrganisations.model(db.sequelize, Seq.DataTypes);
    db.UsersTokens = UsersTokens.model(db.sequelize, Seq.DataTypes);
    
    /* FOREIGN KEYS */
    
    db.UsersOrganisations.belongsTo(db.Users, {foreignKey: 'userUuid'})
    db.Users.hasMany(db.UsersOrganisations, {foreignKey: 'userUuid'})

    db.UsersOrganisations.belongsTo(db.Organisations, {foreignKey: 'organisationUuid'})
    db.Organisations.hasMany(db.UsersOrganisations, {foreignKey: 'organisationUuid'})
}

db.init_db = init_db

export default db;