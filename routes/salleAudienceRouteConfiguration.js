function salleAudienceRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

salleAudienceRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

salleAudienceRouteConfiguration.prototype.processRoutes = function() {

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

salleAudienceRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeSalleAudiences',
        callbackFunction: function (request, response) {
            response.render('contents/salleAudience/listeSalleAudiences', {
                title: "Salle d'audience",
                label: "Liste des salles d'audiences"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeSalleAudiences_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/salleAudience/salleAudienceDao.js');
            dao.salleAudienceDao.listeSalleAudiences(function(result){
                response.json({salleAudiencesJson : result})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutSalleAudience',
        callbackFunction: function (request, response) {
            response.render('contents/salleAudience/formAjoutSalleAudience', {
                title: "Salle d'audience",
                label: "Ajouter une nouvelle salle"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterSalleAudience_url',
        callbackFunction: function (request, response, next) {
            var dao = require('../serveur/dao/salleAudience/salleAudienceDao.js');
            dao.salleAudienceDao.ajouterSalleAudience(
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
        requestUrl: '/formModifSalleAudience/:idSalleAudience',
        callbackFunction: function (request, response) {
            response.render('contents/salleAudience/formModifSalleAudience', {
                title: "Salle d'audience",
                label: "Formulaire de modification d'une salle d'audience"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupSalleAudienceModif_url/:idSalleAudience',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/salleAudience/salleAudienceDao.js');
            dao.salleAudienceDao.recupSalleAudienceModif(request.params.idSalleAudience, function(result) {
                    response.json({salleAudienceModifJson:result});
                }
            );
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifSalleAudience_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/salleAudience/salleAudienceDao.js');
            dao.salleAudienceDao.modifSalleAudience(request.body, function(status) {
                    response.json(status);
                }
            );
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/suppressionSalleAudience_url/:idSalleAudience',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/salleAudience/salleAudienceDao.js');
            dao.salleAudienceDao.suppressionSalleAudience(request.params.idSalleAudience);
            response.render('contents/salleAudience/listeSalleAudiences', {
                title: "Salle d'audience",
                label: "Liste des salles d'audiences"
            })
        }
    });


}

module.exports = salleAudienceRouteConfiguration;