const events = (sequelize, DataTypes) => {
    const Events = sequelize.define('Events', {
        eventName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Event name is required!',
                },
                is: {
                    args: /([a-zA-Z0-9])+/,
                    msg: 'Event name can contain only alphabets and numbers',
                },
                len: {
                    args: [3, 70],
                    msg: 'Event name should be longer than 3 words and less than 70 words',
                },
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        eventTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });

    Events.associate = (models) => {
        Events.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

        Events.hasMany(models.Going, {
            foreignKey: 'eventsId',
            as: 'going'
        });

        Events.hasMany(models.Views, {
            foreignKey: 'eventsId',
            as: 'views'
        });
    };
    return Events;
};

export default events;
