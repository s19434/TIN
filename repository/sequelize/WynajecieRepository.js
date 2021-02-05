const Sequelize = require('sequelize');


const Samochod = require("../../model/sequelize/Samochod");
const Klient = require("../../model/sequelize/Klient");
const Wynajecie = require("../../model/sequelize/Wynajecie");


exports.getWynajecie = () => {
    return Wynajecie.findAll({
        include: [
            {
                model: Klient,
                as: 'klienty'
            },
            {
                model: Samochod,
                as: 'samochody'
            }]
    });
};

exports.getWynajecieById = (IdWynajecie) => {
    return Wynajecie.findByPk(IdWynajecie, {
        include: [
            {
                model: Klient,
                as: 'klienty'
            },
            {
                model: Samochod,
                as: 'samochody'
            }]
    });
};

exports.createWynajecie = (data) => {
    console.log(JSON.stringify(data));

    return Wynajecie.create({
        Samochod_IdSamochod: data.Samochod_IdSamochod,
        Klient_IdKlient: data.Klient_IdKlient,
        Data_Wynajecia: data.Data_Wynajecia,
        Data_Oddania: data.Data_Oddania
    });
};

exports.updateWynajecie = (IdWynajecie, data) => {
    return Wynajecie.update(data, {where: {IdWynajecie: IdWynajecie}});
}

exports.deleteWynajecie = (IdWynajecie) => {
    return Wynajecie.destroy({
        where: {IdWynajecie: IdWynajecie}
    });
}

exports.deleteManyZamowienieProdukts = (IdsWynajecie) => {
    return Wynajecie.find({IdWynajecie: {[Sequelize.Op.in]: IdsWynajecie}})
}


