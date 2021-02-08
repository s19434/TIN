const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

var sequelizeTransforms = require('sequelize-transforms');
sequelizeTransforms(sequelize);

const Samochod = sequelize.define('Samochod', {
    IdSamochod: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Marka: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        trim: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 30],
                msg: "Pole powinno zawierać od 3 do 30 znaków"
            }
        }
    },
    Model: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 20],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            },
        }
    },
    Rok_Produkcji: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno być datą"
            },
            inFuture: function (value) {
                const valueDate = new Date(value);
                const compareToDate = new Date();
                if (valueDate.getTime() > compareToDate.getTime()) {
                    throw new Error('Data produkcji nie może być w przyszłości!');
                }
            },
        }
    },
    Cena_Za_Dzien: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                msg: "Pole powinno być liczbą"
            },
            min: {
                args: 1,
                msg: "Cena musi być liczbą DODATNIĄ (zerem też nie może być)"
            }
        }
    },
});

module.exports = Samochod;



