const KlientRepository = require('../repository/sequelize/KlientRepository');


exports.showKlientList = (req, res, next) => {

    KlientRepository.getKlient()
        .then(klientList => {
            res.render('Pages/customer/customers-list', {
                klientList: klientList,
                navLocation: 'klienty'
            });
        })
}


exports.showKlientForm = (req, res, next) => {
    res.render('Pages/customer/customers-form', {
        klient: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/klient/add',
        navLocation: 'klient',
        validationErrors: []
    });
}

exports.showEditKlientForm = (req, res, next) => {
    const klientID = req.params.klientID;
    KlientRepository.getKlientById(klientID)
        .then(klient => {
            res.render('Pages/customer/customers-form', {
                klient: klient,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj',
                formAction: '/klient/edit',
                navLocation: 'klient',
                validationErrors: []
            });
        });
};

exports.showKlientDetails = (req, res, next) => {
    const klientID = req.params.klientID;
    KlientRepository.getKlientById(klientID)
        .then(klient => {
            res.render('Pages/customer/customers-form', {
                klient: klient,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły klienta',
                formAction: '',
                navLocation: 'klient',
                validationErrors: []
            });
        });
}



exports.addKlient = (req, res, next) => {
    const klientData = { ...req.body };
    KlientRepository.createKlient(klientData)
        .then(result => {
            res.redirect('/klient');
        })
        .catch(err => {
            res.render('Pages/customer/customers-form', {
                klient: klientData,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/klient/add',
                navLocation: 'klient',
                validationErrors: err.errors
            });
        });




};

exports.updateKlient = (req, res, next) => {
    const klientID = req.body.IdKlient;
    const klientData = { ...req.body };
    KlientRepository.updateKlient(klientID, klientData)
        .then(result => {
            res.redirect('/klient');
        })
        .catch(err => {
            res.render('Pages/customer/customers-form', {
                klient: klientData,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/klient/add',
                navLocation: 'klient',
                validationErrors: err.errors
            });
        });
};

exports.deleteKlient = (req, res, next) => {
    const klientID = req.params.klientID;
    KlientRepository.deleteKlient(klientID)
        .then(() => {
            res.redirect('/klient');
        });
};



