const errorController = require('../controllers/errorController.js');
const serviceController = require('../controllers/serviceController.js');

module.exports = ({ server, errorHandler}) => {

    server.get('/', function (req, res) {
        //executa aqui quando a rota for chamada.
        serviceController.getCovidGeneral(req, res).catch(error => {
            errorController.returnInternalServerError(error, res);
        });
    });

    server.post('/country', function (req, res) {
        //executa aqui quando a rota for chamada.
        serviceController.getCovidCountries(req, res).catch(error => {
            errorController.returnInternalServerError(error, res);
        });
    });

    server.get('/daily', function (req, res) {
        //executa aqui quando a rota for chamada.
        serviceController.getCovidDaily(req, res).catch(error => {
            errorController.returnInternalServerError(error, res);
        });
    });

    server.get('/states', function (req, res) {
        //executa aqui quando a rota for chamada.
        serviceController.getCovidStates(req, res).catch(error => {
            errorController.returnInternalServerError(error, res);
        });
    });


    server.post('/state', function (req, res) {
        //executa aqui quando a rota for chamada.
        serviceController.getCovidOneState(req, res).catch(error => {
            errorController.returnInternalServerError(error, res);
        });
    });

}

