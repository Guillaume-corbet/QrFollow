const model = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enable: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
}

const attribute = {
    all: ["uuid", "email", "password", "type","enable"],
    public: ["uuid", "type", "enable"],
    protected: ["uuid", "email", "type", "enable"]
}

export {model, attribute};