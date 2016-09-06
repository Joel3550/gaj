function affaireRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

affaireRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

affaireRouteConfiguration.prototype.processRoutes = function() {

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

affaireRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffaires',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/listeAffaires', {
                title: "Role General",
                label: "Liste des affaires"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffaires_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.listeAffaire(function(affaires){
                response.json({affairesJson : affaires})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutAffaire',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/formAjoutAffaire', {
                title: "Affaire",
                label: "Ajouter une affaire"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterAffaire_url',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.getAffaireByNumero(request.body, function (rows) {
                if (rows.length) {
                    response.send({message: 'Numero d\'ordre déjà utilisé'});
                }
                if (!rows.length) {
                    dao.affaireDao.ajouterAffaire(request.body, function(status) {
                            response.json(status);
                        }
                    );
                }

            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formModifAffaire_url/:affaireId',
        callbackFunction: function(request, response){
            response.render('contents/roleGeneral/formModifAffaire', {
                title: "Affaire",
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

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerAffaire_url/:id',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.supprimerAffaire(request.params.id);
            response.render('contents/roleGeneral/listeAffaires',
                {
                    title: "Role general",
                    label: "Liste des affaires enregistre au RG"
                });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsAffaire/:id',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/detailsAffaire', {
                title: "Detail",
                label: "Information affaire"
            })
        }

    });
    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsAffaireConsultation/:id',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/detailsAffaire', {
                title: "Detail",
                label: "Information affaire"
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

        requestType: 'get',
        requestUrl: '/transmettreAffaire/:affaireId',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/transmettreAffaire', {
                title: "Registre du Role General",
                label: "Transmission au role d'audience"
            })
        }

    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/transmettreAffaire_url',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.transmettreAffaire(request.body);
            response.render('contents/roleGeneral/listeAffaires', {
                title: "Role General",
                label: "Liste des affaires"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/annulerTransmettreAffaire_url',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.annulerTransmettreAffaire(request.body);
            response.render('contents/roleGeneral/listeAffaires', {
                title: "Role General",
                label: "Liste des affaires"
            })
        }
    });
    //
    //self.routeTable.push({
    //
    //    requestType: 'get',
    //    requestUrl: '/listeDemandeur_url/:id',
    //    callbackFunction: function (request, response) {
    //        var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
    //        dao.affaireDao.recupDemandeur(function(demandeurs){
    //            response.json({demandeursJson : demandeurs})
    //        })
    //    }
    //});
    //
    //self.routeTable.push({
    //
    //    requestType: 'get',
    //    requestUrl: '/listeDefendeur_url/:id',
    //    callbackFunction: function (request, response) {
    //        var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
    //        dao.affaireDao.recupDefendeur(function(defendeurs){
    //            response.json({defendeursJson : defendeurs})
    //        })
    //    }
    //});

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeIndividusAffaire_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.listeIndividus(function(result){
                response.json({listeIndividusAffaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formModifCours_url/:affaireId',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.recupCoursAffaire(request.params.affaireId, function(result){
                response.json({coursAffaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/consultationAffaires',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/consultationAffaires', {
                title: "Consultation",
                label: "Consultation des affaires par date de saisie"
            })
        }

    });
    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffaireDate_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.recupAffaireDate(function(result){
                response.json({affaireDateJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupPartie_url/:individuId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.recupPartie(request.params.individuId, function(result) {
                console.log(result);
                response.json({partieJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifIndividu_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.modifIndividu(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifReglement_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.modifReglement(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formModifIndividu/:idIndividu',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/formModifIndividu', {
                title: "Modification",
                label: "Formulaire de modification d'une partie"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formModifReglement/:reglementId',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/formModifReglement', {
                title: "Modification",
                label: "Formulaire de modification du reçu"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupReglement_url/:reglementId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.recupReglement(request.params.reglementId, function(result) {
                console.log(result);
                response.json({reglementsJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerIndividu/:idIndividu',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleGeneral/affaireDao.js');
            dao.affaireDao.supprimerIndividuAffaire(request.params.idIndividu);
            response.render('contents/roleGeneral/detailsAffaire', {
                title: "Detail",
                label: "Information affaire"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/uploadFichier_url',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/uploadFichier');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/afficherFichier',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/afficherFichier');
        }
    });

}

module.exports = affaireRouteConfiguration;