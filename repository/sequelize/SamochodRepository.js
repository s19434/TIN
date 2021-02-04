const Sequelize = require('sequelize');


const Samochod = require("../../model/sequelize/Samochod");
const Klient = require("../../model/sequelize/Klient");
const Wynajecie = require("../../model/sequelize/Wynajecie");

exports.getSamochod = () => {
    return Samochod.findAll();
};

exports.getSamochodById = (IdSamochod) => {
    return Samochod.findByPk(IdSamochod,
        {
            include: [{
                model: Wynajecie,
                as: 'wynajecia',
                include: [{
                    model: Klient,
                    as: 'klienty'
                }]
            }]
        });
};

exports.createSamochod = (newSamochod) => {
    return Samochod.create({
        Marka: newSamochod.Marka,
        Model: newSamochod.Model,
        Rok_Produkcji: newSamochod.Rok_Produkcji,
        Cena_Za_Dzien: newSamochod.Cena_Za_Dzien
    });
};

exports.updateSamochod = (IdSamochod, samochodData) => {
    const marka = samochodData.Marka;
    const model = samochodData.Model;
    const rok_Produkcji = samochodData.Rok_Produkcji;
    const cena_Za_Dzien = samochodData.Cena_Za_Dzien;
    return Samochod.update(samochodData, { where: { IdSamochod: IdSamochod } });
};

exports.deleteSamochod = (IdSamochod) => {
    return Samochod.destroy({
        where: { IdSamochod: IdSamochod }
    });

}; 
