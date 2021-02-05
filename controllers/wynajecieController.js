const WynajecieRepository = require('../repository/sequelize/WynajecieRepository');
const KlientRepository = require('../repository/sequelize/KlientRepository');
const SamochodRepository = require('../repository/sequelize/SamochodRepository');



exports.showWynajecieList = (req, res, next) => {

    WynajecieRepository.getWynajecie()
        .then(wynajecieList => {
            res.render('Pages/rent/rent-list', {
                wynajecieList: wynajecieList,
                navLocation: 'wynajecie'
            });
        })
};



exports.showWynajecieForm = (req, res, next) => {
    let klientGetAll = KlientRepository.getKlient();
    let samochodGetAll = SamochodRepository.getSamochod();
    let wynajecieGetAll = WynajecieRepository.getWynajecie();


    Promise.all([klientGetAll, samochodGetAll, wynajecieGetAll]).then(results => {
        const [zam, prod, pozZam] = results;
        res.render('Pages/rent/rent-form', {
            wynajecie: {},
            formMode: 'createNew',
            allKlient: zam,
            allSamochod: prod,
            allWynajecie: pozZam,
            pageTitle: 'Nowa wynajecie',
            btnLabel: 'Dodaj',
            formAction: '/wynajecie/add',
            navLocation: 'wynajecie',
            validationErrors: []
        });



    });
};



exports.showEditWynajecieForm = (req, res, next) => {
    const wynajecieID = req.params.wynajecieID;

    let klientGetAll = KlientRepository.getKlientById(wynajecieID);
    let samochodGetAll = SamochodRepository.getSamochodById(wynajecieID);
    let wynajecieGetAll = WynajecieRepository.getWynajecieById(wynajecieID);

    let samochodGetAllSamochodList = SamochodRepository.getSamochod();
    let klientGetAllKlientList = KlientRepository.getKlient();


    Promise.all([klientGetAll, samochodGetAll, wynajecieGetAll,samochodGetAllSamochodList,klientGetAllKlientList ]).then(results => {
        const [zam, prod, pozZam, prodAll, klientAll] = results;
        res.render('Pages/rent/rent-form', {
            wynajecie: pozZam,
            formMode: 'edit',
            pageTitle: 'Edycja wynajecia',
            btnLabel: 'Edytuj',
            formAction: '/wynajecie/edit',
            navLocation: 'wynajecie',
            validationErrors: [],
            allKlient: zam,
            allSamochod: prod,
            allWynajecie: pozZam,
            samochodAllLista: prodAll,
            klientAllLista: klientAll


        });



    });


};

exports.showWynajecieDetails = (req, res, next) => {

    const wynajecieID = req.params.wynajecieID;
    let allKlient, allWynajecie;
    KlientRepository.getKlientById(wynajecieID)
        .then(klient => {
            allKlient = klient;
            return WynajecieRepository.getWynajecieById(wynajecieID);
        })
        .then(wynajecie => {
            allWynajecie = wynajecie;
            res.render('Pages/rent/rent-form', {
                wynajecie: wynajecie,
                formMode: 'showDetails',
                allKlient: allKlient,
                allWynajecie: allWynajecie,
                pageTitle: 'Szczegóły wynajecia',
                formAction: '',
                navLocation: 'wynajecie',
                validationErrors: []
            });
        });
}


exports.addWynajecie = (req, res, next) => {

    // let klientGetAll = KlientRepository.getKlient();
    // let samochodGetAll = SamochodRepository.getSamochod();
    // let wynajecieGetAll = WynajecieRepository.getWynajecie();

    const wynajecieData = { ...req.body };
    WynajecieRepository.createWynajecie(wynajecieData)
        .then(result => {
            res.redirect('/wynajecie');
        })
        // .catch(err => {
        //     Promise.all([klientGetAll, samochodGetAll, wynajecieGetAll]).then(results => {
        //         const [zam, prod, pozZam] = results;
        //         res.render('Pages/rent/rent-form', {
        //             wynajecie: wynajecieData,
        //             pageTitle: 'Nowe wynajecie',
        //             formMode: 'createNew',
        //             btnLabel: 'Dodaj',
        //             formAction: '/wynajecie/add',
        //             navLocation: 'wynajecie',
        //             validationErrors: err.errors,
        //             allKlient: zam,
        //             allSamochod: prod,
        //             allWynajecie: pozZam
        //         });
        //
        //     })
        // });
};


exports.updateWynajecie = (req, res, next) => {
    const wynajecieID = req.body.IdWynajecie;
    const wynajecieData = { ...req.body };

    let klientGetAll = KlientRepository.getKlient();
    let samochodGetAll = SamochodRepository.getSamochod();
    let wynajecieGetAll = WynajecieRepository.getWynajecie();

    WynajecieRepository.updateWynajecie(wynajecieID, wynajecieData)
        .then(result => {
            res.redirect('/wynajecie');
        })
        .catch(err => {
            Promise.all([klientGetAll, samochodGetAll, wynajecieGetAll]).then(results => {
                const [zam, prod, pozZam] = results;
                res.render('Pages/rent/rent-form', {
                    wynajecie: wynajecieData,
                    pageTitle: 'Nowa wynajecie',
                    formMode: 'createNew',
                    btnLabel: 'Dodaj',
                    formAction: '/wynajecie/edit',
                    navLocation: 'wynajecie',
                    validationErrors: err.errors,
                    allKlient: zam,
                    allSamochod: prod,
                    allWynajecie: pozZam
                });

            })


        });

};

exports.deleteWynajecie = (req, res, next) => {
    const wynajecieID = req.params.wynajecieID;
    WynajecieRepository.deleteWynajecie(wynajecieID)
        .then(() => {
            res.redirect('/wynajecie');
        });
};



