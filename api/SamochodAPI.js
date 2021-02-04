const SamochodRepository = require('../repository/sequelize/SamochodRepository');

exports.getSamochod = (req, res, next) => {
    SamochodRepository.getSamochod()
        .then(prod => {
            res.status(200).json(prod);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSamochodById = (req, res, next) => {
    const samochodID = req.params.samochodID;
    SamochodRepository.getSamochodById(samochodID)
        .then(prod => {
            if (!prod) {
                res.status(404).json({
                    message: 'Samochod z id: ' + samochodID + ' nie został znaleziony'
                })
            } else {
                res.status(200).json(prod);
            }
        });
};

exports.createSamochod = (req, res, next) => {
    SamochodRepository.createSamochod(req.body)
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

exports.updateSamochod = (req, res, next) => {
    const samochodID = req.params.samochodID;
    SamochodRepository.updateSamochod(samochodID, req.body)
        .then(result => {
            res.status(200).json({ message: 'Samochod zaktualizowany!', prod: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteSamochod = (req, res, next) => {
    const samochodID = req.params.samochodID;
    SamochodRepository.deleteSamochod(samochodID)
        .then(result => {
            if (result == 0) {
                res.status(404).json({ message: 'Samochodu o id ' + samochodID + ' nie ma w bazie danych', prod: result });
            } else {
                res.status(200).json({ message: 'Usunięto samochod o id ' + samochodID, prod: result });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};