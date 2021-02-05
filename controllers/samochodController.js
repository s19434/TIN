const SamochodRepository = require('../repository/sequelize/SamochodRepository');

    exports.showSamochodList = (req, res, next) => {
    SamochodRepository.getSamochod()
        .then(samochodList => {
            res.render('Pages/car/cars_list', {
                samochodList: samochodList,
                navLocation: 'samochod'
            });
        })
};


exports.showAddSamochodForm = (req, res, next) => {
    res.render('Pages/car/cars_form', {
        samochod: {},
        pageTitle: 'Nowy samochod',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/samochod/add',
        navLocation: 'samochod',
        validationErrors: []

    });
};

exports.showEditSamochodForm = (req, res, next) => {
    const samochodID = req.params.samochodID;
    SamochodRepository.getSamochodById(samochodID)
        .then(samochod => {
            res.render('Pages/car/cars_form', {
                samochod: samochod,
                formMode: 'edit',
                pageTitle: 'Edycja samochodu',
                btnLabel: 'Edytuj',
                formAction: '/samochod/edit',
                navLocation: 'samochod',
                validationErrors: []
            });
        });
};

exports.showSamochodDetails = (req, res, next) => {
    const samochodID = req.params.samochodID;
    SamochodRepository.getSamochodById(samochodID)
        .then(samochod => {
            res.render('Pages/car/cars_form', {
                samochod: samochod,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły produktu',
                formAction: '',
                navLocation: 'samochod',
                validationErrors: []
            });
        });
};



exports.addSamochod = (req, res, next) => {

    const samochodData = { ...req.body };
    SamochodRepository.createSamochod(samochodData)
        .then(result => {
            res.redirect('/samochod');
        })
        .catch(err => {
            res.render('Pages/car/cars_form', {
                samochod: samochodData,
                pageTitle: 'Dodawanie samochodu',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/samochod/add',
                navLocation: 'samochod',
                validationErrors: err.errors
            });
        });

};

exports.updateSamochod = (req, res, next) => {
    const samochodID = req.body.IdSamochod;
    const samochodData = {...req.body};
    SamochodRepository.updateSamochod(samochodID, samochodData)
        .then(result => {
            res.redirect('/samochod');
        }) .catch(err => {
            res.render('Pages/car/cars_form', {
                samochod: samochodData,
                pageTitle: 'Dodawanie samochodu',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/samochod/add',
                navLocation: 'samochod',
                validationErrors: err.errors
            });
        });
};

exports.deleteSamochod = (req, res, next) => {
    const samochodID = req.params.samochodID;
    SamochodRepository.deleteSamochod(samochodID)
        .then(() => {
            res.redirect('/samochod');
        });
};
