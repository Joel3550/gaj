function natureRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

natureRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

natureRouteConfiguration.prototype.processRoutes = function() {

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

natureRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeNatures',
        callbackFunction: function (request, response) {
            response.render('contents/nature/listeNatures', {
                title: "Nature",
                label: "Liste des natures"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeNatures_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/nature/natureDao.js');
            dao.natureDao.listeNature(function(natures){
                response.json({naturesJson : natures})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutNature',
        callbackFunction: function (request, response) {
            response.render('contents/nature/formAjoutNature', {
                title: "Nature",
                label: "Ajouter une nature"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterNature_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/nature/natureDao.js');
            dao.natureDao.ajouterNature(
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
        requestUrl: '/formModifNature_url/:affaireId',
        callbackFunction: function(request, response){
            response.render('contents/nature/formModifNature', {
                title: "Nature",
                label: "Modifier une nature"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupNature_url/:idNature',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/nature/natureDao.js');
            dao.natureDao.recupNature(request.params.idNature, function(result) {
                console.log(result);
                response.json({natureModifJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifierNature_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/nature/natureDao.js');
            dao.natureDao.modifierNature(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerNature_url/:idNature',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/nature/natureDao.js');
            dao.natureDao.supprimerNature(request.params.idNature);
            response.render('contents/nature/listeNatures', {
                title: "Nature",
                label: "Liste des natures"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsNature/:id',
        callbackFunction: function (request, response) {
            response.render('contents/nature/detailsNature', {
                title: "Detail",
                label: "Information nature"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsNature_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/nature/natureDao.js');
            dao.natureDao.detailsNature(request.params.id, function(nature){
                response.json({natureJson : nature});
            });
        }
    });

}

module.exports = natureRouteConfiguration;