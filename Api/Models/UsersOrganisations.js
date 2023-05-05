const model = (sequelize, DataTypes) => {
    return sequelize.define('UsersOrganisations', {
        userUuid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        organisationUuid: {
            type: DataTypes.UUID,
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
    all: ["userUuid", "organisationUuid", "type", "enable"],
    public: ["userUuid", "organisationUuid", "type", "enable"],
    protected: ["userUuid", "organisationUuid", "type", "enable"]
}

export {model, attribute};