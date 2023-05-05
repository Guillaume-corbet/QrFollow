const model = (sequelize, DataTypes) => {
    return sequelize.define('UsersTokens', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
}

const attribute = {
    all: ["email", "token"],
}

export {model, attribute};