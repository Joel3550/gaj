function chambreRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

chambreRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

chambreRouteConfiguration.prototype.processRoutes = function() {

    var self = this;
    self.routeTable.forEach(function(route){

        if(route.requestType == 'get'){
            console.log(route);
            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if(route.requestType == 'post'){
            console.log(route);
            self.app.post(route.requestUrl, route.callbackFunction);
        }

    });

}

chambreRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeChambres',
        callbackFunction: function (request, response) {
            response.render('contents/chambre/listeChambres', {
                title: "Chambre",
                label: "Liste des chambres"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeChambres_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/chambre/chambreDao.js');
            dao.chambreDao.listeChambre(function(chambres){
                response.json({chambresJson : chambres})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutChambre',
        callbackFunction: function (request, response) {
            response.render('contents/chambre/formAjoutChambre', {
                title: "Chambre",
                label: "Ajouter une chambre"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterChambre_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/chambre/chambreDao.js');
            dao.chambreDao.ajouterChambre(
                request.body, 
                function(status) {
                    response.json(status);
                    console.log(status);
                }
            );
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formModifChambre/:idChambre',
        callbackFunction: function(request, response){
            response.render('contents/chambre/formModifChambre', {
                title: "Chambre",
                label: "Modifier une chambre"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupChambre_url/:chambreId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/chambre/chambreDao.js');
            dao.chambreDao.recupChambre(request.params.chambreId, function(result) {
                console.log(result);
                response.json({chambreJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifierChambre_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/chambre/chambreDao.js');
            dao.chambreDao.modifierChambre(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerChambre_url/:idChambre',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/chambre/chambreDao.js');
            dao.chambreDao.supprimerChambre(request.params.idChambre);
            response.render('contents/chambre/listeChambres', {
                title: "Chambre",
                label: "Liste des chambres"
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsChambre/:id',
        callbackFunction: function (request, response) {
            response.render('contents/chambre/detailsChambre', {
                title: "Detail",
                label: "Information chambre"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsChambre_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/chambre/chambreDao.js');
            dao.chambreDao.detailsChambre(request.params.id, function(chambre){
                response.json({chambreJson : chambre});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/chambreModif_url/:idChambre',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/chambre/chambreDao.js');
            dao.chambreDao.recupChmabreModif(request.params.idChambre, function(result){
                response.json({chambreModifJson : result});
            });
        }
    });

}

module.exports = chambreRouteConfiguration;