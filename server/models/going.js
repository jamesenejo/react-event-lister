const going = (sequelize, DataTypes) => {
    const Going = sequelize.define('Going', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });

    Going.associate = (models) => {
        Going.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

        Going.belongsTo(models.Events, {
            foreignKey: 'eventId',
            as: 'going'
        });
    };
    return Going;
};

export default going;
