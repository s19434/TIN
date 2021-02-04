const WynajecieRepository = require('../repository/sequelize/WynajecieRepository');

exports.getWynajecie = (req, res, next) => {
    WynajecieRepository.getWynajecie()
        .then(prod => {
            res.status(200).json(prod);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getWynajecieById = (req, res, next) => {
    const wynajecieID = req.params.wynajecieID;
    WynajecieRepository.getWynajecieById(wynajecieID)
        .then(prod => {
            if (!prod) {
                res.status(404).json({
                    message: 'Wynajecia z id: ' + wynajecieID + ' nie zostało znalezione'
                })
            } else {
                res.status(200).json(prod);
            }
        });
};

exports.createWynajecie = (req, res, next) => {
    WynajecieRepository.createWynajecie(req.body)
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

exports.updateWynajecie = (req, res, next) => {
    const wynajecieID = req.params.wynajecieID;
    WynajecieRepository.updateWynajecie(wynajecieID, req.body)
        .then(result => {
            res.status(200).json({ message: 'Wynajecie zaktualizowane!', prod: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteWynajecie = (req, res, next) => {
    const wynajecieID = req.params.wynajecieID;
    WynajecieRepository.deleteWynajecie(wynajecieID)
        .then(result => {
            if (result == 0) {
                res.status(404).json({ message: 'Wynajecie o id ' + wynajecieID + ' nie ma w bazie danych', prod: result });
            } else {
                res.status(200).json({ message: 'Usunięto wynajecie o id ' + wynajecieID, prod: result });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
