const model = (sequelize, DataTypes) => {
    return sequelize.define('Organisations', {
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
        name: {
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
    all: ["uuid", "name", "enable"],
    public: ["uuid", "name", "enable"],
    protected: ["uuid", "name", "enable"]
}

export {model, attribute};