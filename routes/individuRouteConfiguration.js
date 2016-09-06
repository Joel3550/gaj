function individuRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

individuRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

individuRouteConfiguration.prototype.processRoutes = function() {

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

individuRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeIndividus',
        callbackFunction: function (request, response) {
            response.render('contents/individu/listeIndividus', {
                title: "Individu",
                label: "Liste des individus"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeIndividus_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.listeIndividu(function(individus){
                response.json({IndividusJson : individus})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutIndividu2/:affaireId',
        callbackFunction: function (request, response) {
            response.render('contents/individu/formAjoutIndividu2', {
                title: "Individu",
                label: "Ajouter un individu"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutIndividu',
        callbackFunction: function (request, response) {
            response.render('contents/individu/formAjoutIndividu', {
                title: "Individu",
                label: "Ajouter un individu"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterIndividu_url',
        callbackFunction: function (request, response, next) {
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.ajouterIndividu(
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
        requestUrl: '/formModifIndividus_url/:affaireId',
        callbackFunction: function(request, response){
            response.render('contents/individu/formModifIndividu', {
                title: "Individu",
                label: "Modifier un individu"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupIndividu_url/:individuId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.recupIndividu(request.params.individuId, function(result) {
                console.log(result);
                response.json({individuJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupPartie_url/:individuId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.recupPartie(request.params.individuId, function(result) {
                console.log(result);
                response.json({partieJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifierIndividu_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.modifierIndividu(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerIndividu_url/:id',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.supprimerIndividu(request.params.id);
            response.redirect('contents/individu/listeIndividus');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsIndividu/:id',
        callbackFunction: function (request, response) {
            response.render('contents/individu/detailsIndividu', {
                title: "Detail",
                label: "Information individu"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsIndividu_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.detailsIndividu(request.params.id, function(individu){
                response.json({individuJson : individu});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupAffaireIndividu_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.recupAffaireIndividu(function(result){
                response.json({affaireIndividuJson : result});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/individuLieAffaire_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.individuLieAffaireDao(function(result){
                response.json({individuLieAffaireJson : result});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeIndividuForAffaire_url/:affaireId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.recupIndividuAffaire(request.params.affaireId, function(result) {
                console.log(result);
                response.json({individuForAffaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/numeroAffaire_url/:affaireId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.recupNumeroAffaire(request.params.affaireId, function(result) {
                console.log(result);
                response.json({numeroAffaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/verifReglementAffaire_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/individu/individuDao.js');
            dao.individuDao.verifReglementAffaireDao(function(result){
                response.json({listeReglementAffJson : result});
            });
        }

    });

}

module.exports = individuRouteConfiguration;