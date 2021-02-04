const sequelize = require('./sequelize');

const Samochod = require('../../model/sequelize/Samochod');
const Klient = require('../../model/sequelize/Klient');
const Wynajecie = require('../../model/sequelize/Wynajecie');



module.exports = () => {
    Samochod.hasMany(Wynajecie, { as: 'wynajecia', foreignKey: { name: 'Samochod_IdSamochod', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Wynajecie.belongsTo(Samochod, { as: 'samochody', foreignKey: { name: 'Samochod_IdSamochod', allowNull: false } });

    Klient.hasMany(Wynajecie, { as: 'wynajecia', foreignKey: { name: 'Klient_IdKlient', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Wynajecie.belongsTo(Klient, { as: 'klienty', foreignKey: { name: 'Klient_IdKlient', allowNull: false } });


    let allSamochody, allKlienty;

    return sequelize
        .sync({ force: false })
        .then(() => {
            return Samochod.findAll();
        })
        .then(samochod => {
            if (!samochod || samochod.length == 0) {
                return Samochod.bulkCreate([
                    { Marka: 'BMW', Model: 'X4', Rok_Produkcji: '2018-07-01', Cena_Za_Dzien: 200 },
                    { Marka: 'Mercedes', Model: 'ML', Rok_Produkcji: '2017-08-01', Cena_Za_Dzien: 150 },
                    { Marka: 'Chevrolet', Model: 'Camaro', Rok_Produkcji: '2020-06-01', Cena_Za_Dzien: 250 },
                    { Marka: 'Citroen', Model: 'C1', Rok_Produkcji: '2015-04-01', Cena_Za_Dzien: 150 }
                ])
                    .then(() => {
                        return Samochod.findAll();
                    });
            } else {
                return samochod;
            }
        })
        .then(samochod => {
            allSamochody = samochod;
            return Klient.findAll();
        })
        .then(klienty => {
            if (!klienty || klienty.length == 0) {
                return Klient.bulkCreate([
                    { Imie: 'Jan', Nazwisko: 'Kowalski',  Data_Urodzenia: '1999-07-26', Telefon: '666666666',Email: 'janKowalski@gmail.com', Adres: 'Pomorska 50A/41, 30-781 Radomsko' },
                    { Imie: 'Karolina', Nazwisko: 'Suwak',  Data_Urodzenia: '2001-04-04', Telefon: '666666666',Email: 'karolinaSuwak@gmail.com', Adres: 'Koralowa 75/17, 01-014 Turek' },
                    { Imie: 'Łukasz', Nazwisko: 'Wietnamski',  Data_Urodzenia: '1998-09-27', Telefon: '666666666',Email: 'lukaszWietnamski@gmail.com', Adres: 'Kilińskiego Jana 57/59, 09-744 Osówiec' },
                    { Imie: 'Mikołaj', Nazwisko: 'Kopernik',  Data_Urodzenia: '1975-10-28', Telefon: '666666666',Email: 'mikolajKopernik@gmail.com', Adres: 'Nadbrzeżna 05/10, 68-891 Legionowo' }
                ])
                    .then(() => {
                        return Klient.findAll();
                    });

            } else {
                return klienty;
            }
        })
        .then(klient => {
            allKlienty = klient;
            return Wynajecie.findAll();
        })
        .then(wynajecia => {
            if (!wynajecia || wynajecia.length == 0) {
                return Wynajecie.bulkCreate([
                    { Samochod_IdSamochod: allSamochody[0].IdSamochod, Klient_IdKlient: allKlienty[0].IdKlient,  Data_Wynajecia: '2021-01-10', Data_Oddania: '2021-01-12' },
                     {  Samochod_IdSamochod: allSamochody[1].IdSamochod, Klient_IdKlient: allKlienty[1].IdKlient,  Data_Wynajecia: '2021-01-05', Data_Oddania: '2021-01-10'},
                     {  Samochod_IdSamochod: allSamochody[2].IdSamochod, Klient_IdKlient: allKlienty[2].IdKlient, Data_Wynajecia: '2021-01-15', Data_Oddania: '2021-01-20'},
                     {  Samochod_IdSamochod: allSamochody[3].IdSamochod, Klient_IdKlient: allKlienty[3].IdKlient, Data_Wynajecia: '2021-01-04', Data_Oddania: '2021-01-10'}
                ]);
            } else {
                return wynajecia;
            }
        });

};