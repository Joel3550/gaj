function reglementRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

reglementRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

reglementRouteConfiguration.prototype.processRoutes = function() {

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

reglementRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeReglements',
        callbackFunction: function (request, response) {
            response.render('contents/reglement/listeReglements', {
                title: "Reglement",
                label: "Liste des reglements"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeReglements_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.listeReglement(function(reglements){
                response.json({reglementsJson : reglements})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutReglement2/:affaireId',
        callbackFunction: function (request, response) {
            response.render('contents/reglement/formAjoutReglement2', {
                title: "Reglement",
                label: "Ajouter un reglement"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutReglement',
        callbackFunction: function (request, response) {
            response.render('contents/reglement/formAjoutReglement', {
                title: "Reglement",
                label: "Ajouter un reglement"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterReglement_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.ajouterReglement(
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
        requestUrl: '/formModifatures_url/:affaireId',
        callbackFunction: function(request, response){
            response.render('contents/reglement/formModifReglement', {
                title: "Reglement",
                label: "Modifier une reglement"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupReglement_url/:reglementId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.recupReglement(request.params.reglementId, function(result) {
                console.log(result);
                response.json({reglementJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupReglementAffaire_url/:affaireId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.recupReglementAffaire(request.params.affaireId, function(result) {
                console.log(result);
                response.json({reglementAffaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifierReglement_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.modifierReglement(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerReglement_url/:id',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.supprimerReglement(request.params.id);
            response.redirect('contents/reglement/listeReglements');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsReglement/:id',
        callbackFunction: function (request, response) {
            response.render('contents/reglement/detailsReglement', {
                title: "Detail",
                label: "Information reglement"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsReglement_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.detailsReglement(request.params.id, function(reglement){
                response.json({reglementJson : reglement});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupAffaireReglement_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.recupAffaireReglement(request.params.id, function(reglement){
                response.json({affaireReglementJson : reglement});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/affaireCourante_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.affaireCouranteDao(function(result){
                response.json({affaireCouranteJson : result});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/impressionReglement_url/:idReglement',
        callbackFunction: function (request, response) {
            response.render('contents/reglement/impressionReglement', {
                title: "Detail",
                label: "Information reglement"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/impressionReglement/:idReglement',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/reglement/reglementDao.js');
            dao.reglementDao.reglementsItemForPrint(request.params.idReglement, function(result){
                response.json({reglementsItemJson : result});
            });
        }
    });


}

module.exports = reglementRouteConfiguration;