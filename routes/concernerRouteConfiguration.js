function concernerRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

concernerRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

concernerRouteConfiguration.prototype.processRoutes = function() {

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

concernerRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeConcernes',
        callbackFunction: function (request, response) {
            response.render('contents/concerner/listeConcernes', {
                title: "Concerner",
                label: "Liste des concernes"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeConcernes_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/concerner/concernerDao.js');
            dao.concernerDao.listeConcerne(function(concernes){
                response.json({concernesJson : concernes})
            })
        }
    });

    //self.routeTable.push({
    //
    //    requestType: 'get',
    //    requestUrl: '/formAjoutConcerner',
    //    callbackFunction: function (request, response) {
    //        response.render('contents/concerner/formAjoutConcerner', {
    //            title: "Concerner",
    //            label: "Ajouter un concerne"
    //        })
    //    }
    //});

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterConcerner_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/concerner/concernerDao.js');
            dao.concernerDao.ajouterConcerner(
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
        requestUrl: '/formModifConcerner_url/:concernerId',
        callbackFunction: function(request, response){
            response.render('contents/concerner/formModifConcerner', {
                title: "Concerne",
                label: "Modifier un concerne"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupConcerner_url/:concernerId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/concerner/concernerDao.js');
            dao.concernerDao.recupConcerner(request.params.concernerId, function(result) {
                console.log(result);
                response.json({concernerJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifierConcerner_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/concerner/concernerDao.js');
            dao.concernerDao.modifierConcerner(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerConcerner_url/:id',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/concerner/concernerDao.js');
            dao.concernerDao.supprimerConcerner(request.params.id);
            response.redirect('contents/concerner/listeConcernes');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsConcerner/:id',
        callbackFunction: function (request, response) {
            response.render('contents/concerner/detailsConcerner', {
                title: "Detail",
                label: "Information concerne"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsConcerner_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/concerner/concernerDao.js');
            dao.concernerDao.detailsConcerner(request.params.id, function(concerner){
                response.json({concernerJson : concerner});
            });
        }
    });

    //self.routeTable.push({
    //
    //    requestType: 'get',
    //    requestUrl: '/recupAffaireConcerner_url/:id',
    //    callbackFunction: function (request, response) {
    //        var dao = require('../serveur/dao/concerner/concernerDao.js');
    //        dao.concernerDao.recupAffaireConcerner(request.params.id, function(concerner){
    //            response.json({affaireConcernerJson : concerner});
    //        });
    //    }
    //});
}

module.exports = concernerRouteConfiguration;