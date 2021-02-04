const Sequelize = require('sequelize');


const Samochod = require("../../model/sequelize/Samochod");
const Klient = require("../../model/sequelize/Klient");  
const Wynajecie = require("../../model/sequelize/Wynajecie"); 

exports.getKlient = () => {
    return Klient.findAll();
};

exports.getKlientById = (IdKlient) => {
    return Klient.findByPk(IdKlient,
        {
            include: [{
                model: Wynajecie,
                as: 'wynajecia',
                include: [{
                    model: Samochod,
                    as: 'samochody'
                }]
            }]
        });
};

exports.createKlient = (newKlient) => {
    return Klient.create({
        Imie: newKlient.Imie,
        Nazwisko: newKlient.Nazwisko,
        Data_Urodzenia: newKlient.Data_Urodzenia,
        Telefon: newKlient.Telefon,
        Email: newKlient.Email,
        Adres: newKlient.Adres
    });
};

exports.updateKlient = (IdKlient, klientData) => {
    const imie = klientData.Imie;
    const nazwisko = klientData.Nazwisko;
    const data_Urodzenia = klientData.Data_Urodzenia;
    const telefon = klientData.Telefon;
    const email = klientData.Email;
    const adres = klientData.Adres;

    return Klient.update(klientData, { where: { IdKlient: IdKlient } });
}

exports.deleteKlient = (IdKlient) => {
    return Klient.destroy({
        where: { IdKlient: IdKlient }
    });

}; 
