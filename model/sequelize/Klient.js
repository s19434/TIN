const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

var sequelizeTransforms = require('sequelize-transforms');
sequelizeTransforms(sequelize);

const Klient = sequelize.define('Klient', {
    IdKlient: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Imie: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 40],
                msg: "Pole powinno zawierać od 2 do 40 znaków"
            }
        }
    },
    Nazwisko: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 40],
                msg: "Pole powinno zawierać od 2 do 40 znaków"
            },
        }
    },
    Data_Urodzenia: {
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
                    throw new Error('Data urodzenia nie może być w przyszłości!');
                }
            },
        }
    },
    Telefon: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [7, 11],
                msg: "Numer powinien zawierać od 7 do 11 cyfr!"
            }

        }
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        lowercase: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5, 70],
                msg: "Pole powinno zawierać od 5 do 70 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
        }
    },
    Adres: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [4, 60],
                msg: "Pole powinno zawierać od 4 do 60 znaków"
            }
        }
    },
});

module.exports = Klient;

