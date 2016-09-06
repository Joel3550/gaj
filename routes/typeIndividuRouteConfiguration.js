function typeIndividuRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

typeIndividuRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

typeIndividuRouteConfiguration.prototype.processRoutes = function() {

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

typeIndividuRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeTypeIndividus',
        callbackFunction: function (request, response) {
            response.render('contents/typeIndividu/listeTypeIndividus', {
                title: "Type Individu",
                label: "Liste des type Individus"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeTypeIndividus_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/typeIndividu/typeIndividuDao.js');
            dao.typeIndividuDao.listeTypeIndividu(function(typeIndividus){
                response.json({typeIndividusJson : typeIndividus})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutTypeIndividu',
        callbackFunction: function (request, response) {
            response.render('contents/typeIndividu/formAjoutTypeIndividu', {
                title: "Type Individu",
                label: "Ajouter un type Individu"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterTypeIndividu_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/typeIndividu/typeIndividuDao.js');
            dao.typeIndividuDao.ajouterTypeIndividu(
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
        requestUrl: '/formModifTypeIndividus_url/:affaireId',
        callbackFunction: function(request, response){
            response.render('contents/typeIndividu/formModifTypeIndividu', {
                title: "Type Individu",
                label: "Modifier un type Individu"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupTypeIndividu_url/:typeIndividuId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/typeIndividu/typeIndividuDao.js');
            dao.typeIndividuDao.recupTypeIndividu(request.params.typeIndividuId, function(result) {
                console.log(result);
                response.json({typeIndividuJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifierTypeIndividu_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/typeIndividu/typeIndividuDao.js');
            dao.typeIndividuDao.modifierTypeIndividu(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerTypeIndividu_url/:id',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/typeIndividu/typeIndividuDao.js');
            dao.typeIndividuDao.supprimerTypeIndividu(request.params.id);
            response.redirect('contents/typeIndividu/listeTypeIndividus');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsTypeIndividu/:id',
        callbackFunction: function (request, response) {
            response.render('contents/typeIndividu/detailsTypeIndividu', {
                title: "Detail",
                label: "Information type Individu"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsTypeIndividu_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/typeIndividu/typeIndividuDao.js');
            dao.typeIndividuDao.detailsTypeIndividu(request.params.id, function(typeIndividu){
                response.json({typeIndividuJson : typeIndividu});
            });
        }
    });

}

module.exports = typeIndividuRouteConfiguration;