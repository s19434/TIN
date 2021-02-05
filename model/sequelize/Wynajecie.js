const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

var sequelizeTransforms = require('sequelize-transforms');
sequelizeTransforms(sequelize);

const Wynajecie = sequelize.define('Wynajecie', {
    IdWynajecie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Samochod_IdSamochod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                msg: "Pole powinno być liczbą"
            },
        }
    },
    Klient_IdKlient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                msg: "Pole powinno być liczbą"
            },
        }
    },
    Data_Wynajecia: {
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
                if (valueDate.getTime() < compareToDate.getTime()) {
                    throw new Error('Data wynajecia nie może być w przeszłości!');
                }
            },
            inPast: function (value) {
                const rentalDate = new Date(value);
                const endDate = new Date(this.Data_Oddania);
                if (rentalDate.getTime() > endDate.getTime()) {
                    throw new Error('Data wynajęcia nie może być po dacie oddania!');
                } else if (rentalDate.getTime() == endDate.getTime()) {
                    throw new Error('Data wynajęcia nie może być w ten samy dzień co i data oddania!');
                }
            },
        }
    },
    Data_Oddania: {
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
                if (valueDate.getTime() < compareToDate.getTime()) {
                    throw new Error('Data oddania nie może być w przeszłości!');
                }
            },
            inPast: function (value) {
                const rentalDate = new Date(this.Data_Wynajecia);
                const endDate = new Date(value);
                if (rentalDate > endDate.getTime()) {
                    throw new Error('Data wynajęcia nie może być po dacie oddania!');
                } else if (rentalDate.getTime() == endDate.getTime()) {
                    throw new Error('Data wynajęcia nie może być w ten samy dzień co i data oddania!');
                }
            },
        }
    },


});

module.exports = Wynajecie;

