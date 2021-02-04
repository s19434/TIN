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
                msg: "Pole powinno zawierać od 3 do 30 znaków"
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
                args: [2, 60],
                msg: "Pole powinno zawierać od 3 do 30 znaków"
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
            }
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
                msg: "Pole powinno być numerem telefonu"
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
                args: [5, 50],
                msg: "Pole powinno zawierać od 5 do 50 znaków"
            }
        }
    },
});

module.exports = Klient;

