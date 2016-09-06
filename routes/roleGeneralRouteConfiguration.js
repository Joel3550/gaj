function roleGeneralRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

roleGeneralRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

roleGeneralRouteConfiguration.prototype.processRoutes = function() {

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

roleGeneralRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffaires',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/listeAffaires', {
                title: "Role general",
                label: "Liste des affaires enregistre au RG"
            })
        }

    });

    //self.routeTable.push({
    //
    //    requestType: 'get',
    //    requestUrl: '/listeAffaires_url',
    //    callbackFunction: function (request, response) {
    //        var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
    //        dao.affaireDao.listeAffaire(function(affaires){
    //            response.json({affairesJson : affaires})
    //        })
    //    }
    //});

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutAffaire',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/formAjoutAffaire', {
                title: "Role general",
                label: "Ajouter une affaire au registre du RG"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterConcernes_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.ajouterConcerner(
                request.body,
                function(status) {
                    response.json(status);
                    console.log(status);
                }
            );
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterAffaire_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.ajouterAffaire(
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
        requestUrl: '/formModifAffaire_url/:affaireId',
        callbackFunction: function(request, response){
            response.render('contents/roleGeneral/formModifAffaire', {
                title: "Role general",
                label: "Modifier une affaire"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupAffaire_url/:affaireId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.recupAffaire(request.params.affaireId, function(result) {
                console.log(result);
                response.json({affaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifierAffaire_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.modifierAffaire(request.body, function(status) {
                response.json(status);
            });
        }
    });

    //self.routeTable.push({
    //
    //    requestType: 'get',
    //    requestUrl: '/supprimerAffaire_url/:id',
    //    callbackFunction: function (request, response) {
    //        var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
    //        dao.affaireDao.supprimerAffaire(request.params.id);
    //        response.render('contents/roleGeneral/listeAffaires',
    //            {
    //                title:'Affaire',
    //                label:'liste des affaires'
    //            });
    //    }
    //});

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsAffaire/:id',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/detailsAffaire', {
                title: "Detail",
                label: "Information Affaire"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsAffaire_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.detailsAffaire(request.params.id, function(affaire){
                response.json({affaireJson : affaire});
            });
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/listeReglementsAffaire_url/:id',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.reglementAffaire(request.params.id, function(reglement){
                response.json({reglementAffaireJson : reglement});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupAffaire_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.recupAffaire(request.params.id, function(result){
                response.json({affaireJson : result});
            })
        }
    });

    //self.routeTable.push({
    //
    //    requestType: 'get',
    //    requestUrl: '/vUniqueAffaires_url/:(modelValue || viewValue)',
    //    callbackFunction: function (request, response) {
    //        var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
    //        dao.affaireDao.vUniqueAffaire(request.params.(modelValue || viewValue), function(result){
    //            response.json({vUniqueAffaireJson : result});
    //        })
    //    }
    //});
}

module.exports = roleGeneralRouteConfiguration;