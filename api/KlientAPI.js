const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.getKlient = (req, res, next) => {
    KlientRepository.getKlient()
        .then(prod => {
            res.status(200).json(prod);
        })
        .catch(err => {
            console.log(err);
        });
    
};

exports.getKlientById = (req, res, next) => {
    const klientID = req.params.klientID;
    KlientRepository.getKlientById(klientID)
        .then(prod => {
            if (!prod) {
                res.status(404).json({
                    message: 'Klienta z id: ' + klientID + ' nie zostało znalezione'
                })
            } else {
                res.status(200).json(prod);
            }
        });
};

exports.createKlient = (req, res, next) => {
    KlientRepository.createKlient(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateKlient = (req, res, next) => {
    const klientID = req.params.klientID;
    KlientRepository.updateKlient(klientID, req.body)
        .then(result => {
            res.status(200).json({ message: 'Klient zaktualizowany!', prod: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteKlient = (req, res, next) => {
    const klientID = req.params.klientID;
    KlientRepository.deleteKlient(klientID)
        .then(result => {
            if (result == 0) {
                res.status(404).json({ message: 'Klienta o id ' + klientID + ' nie ma w bazie danych', prod: result });
            } else {
                res.status(200).json({ message: 'Usunięto klienta o id ' + klientID, prod: result });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};