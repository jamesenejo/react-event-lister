const views = (sequelize, DataTypes) => {
    const Views = sequelize.define('Views', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventsId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });

    Views.associate = (models) => {
        Views.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

        Views.belongsTo(models.Events, {
            foreignKey: 'eventsId',
            as: 'going'
        });
    };
    return Views;
};

export default views;
