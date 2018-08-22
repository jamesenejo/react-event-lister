const users = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });

    Users.associate = (models) => {
        Users.hasMany(models.Events, {
            foreignKey: 'userId',
            as: 'events'
        });

        Users.hasMany(models.Going, {
            foreignKey: 'userId',
            as: 'attendings'
        });
    };
    return Users;
};

export default users;
