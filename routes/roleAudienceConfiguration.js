function roleAudienceConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

roleAudienceConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

roleAudienceConfiguration.prototype.processRoutes = function() {

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

roleAudienceConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAudiences',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/listeAudiences', {
                title: "Role d'audience",
                label: "Liste des affaires recu du role general en attente de validation"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAudiences_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.listeAudience(function(audiences){
                response.json({audiencesJson : audiences})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupValidationAudience_url/:affaireId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupValidationAudience(request.params.affaireId, function(result) {
                console.log(result);
                response.json({audienceJson : result});
            })
        }
    });

    //self.routeTable.push({
    //
    //    requestType: 'post',
    //    requestUrl: '/validationAudience_url',
    //    callbackFunction: function (request, response) {
    //
    //        var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
    //        dao.roleAudienceDao.validationAudience(request.body, function(status) {
    //            response.json(status);
    //        });
    //    }
    //});

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/validationAudience_url/:audienceId',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.validationAudience(request.params.audienceId);
            response.render('contents/roleAudience/consultationAffairesAudience', {
                title: "Cahier de transmission",
                label: "Liste des affaires reçu du role general en attente de validation"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/autoriserPublieAffaire_url/:idAffaire',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.publierAffaire(request.params.idAffaire);
            response.render('contents/roleAudience/compositionCours', {
                title: "Cours",
                label: "Composition de la cours"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/annulerPublieAffaire_url/:idAffaire',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.annulerPublierAffaire(request.params.idAffaire);
            response.render('contents/roleAudience/compositionCours', {
                title: "Cours",
                label: "Composition de la cours"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/retourAffaire_url',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.retourAffaire(request.body);
            response.render('contents/roleAudience/listeAudiences', {
                title: "Role d'audience",
                label: "Liste des affaires reçu du role general en attente de validation"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/validationAudience/:audienceId',
        callbackFunction: function(request, response){
            response.render('contents/roleAudience/validationAudience', {
                title: "Validation",
                label: "Validation d'une affaire recu du role general"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsAudience/:id',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/detailsAudience', {
                title: "Detail",
                label: "Information sur l'affaire"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsAudience_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/audienceDao.js');
            dao.audienceDao.detailsAudience(request.params.id, function(audience){
                response.json({audienceJson : audience});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/transmettreAudience/:affaireId',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/transmettreAudience', {
                title: "Transmission",
                label: "Transmission de la'affaire au plumitif"
            })
        }

    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/transmettreAudience_url',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.transmettreAudience(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeParties_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupParties(function(result){
                response.json({partiesJson : result})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeDefendeur_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupDefendeur(function(defendeurs){
                response.json({defendeursJson : defendeurs})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/ajusterDateAffaire_url/:affaireId',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/ajusterDateAffaire', {
                title: "Role d'audience",
                label: "Mettre a jour la date de l'affaire"
            })
        }

    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajusterDateAffaire',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.ajusterDateAffaire(request.body, function(status) {
                response.json(status);
            });
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutCours/:affaireId',
        callbackFunction: function (request, response) {
            response.render('contents/cours/formAjoutCours', {
                title: "Cours",
                label: "Composition de la cours"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/affaireItems_url/:affaireId',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupAffaireItems(request.params.affaireId, function(result){
                response.json({affaireItemsJson : result});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAgentsCours_url/:affaireId',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupAgentsCours(request.params.affaireId, function(result){
                response.json({agentCoursJson : result});
            });
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterCours_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.ajouterCours(request.body, function(status){
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/chambreAffaires_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupChambreAffaires(function(result){
                response.json({chambreAffairesJson : result});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/compositionCours_url',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/compositionCours',
                {
                    title:'Cours',
                    label: 'Composition de la cours'
                });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/composition_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupCompositionCours(function(result){
                response.json({compositionCoursJson : result});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeChambresAffaires_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recuplisteChambre(function(chambres){
                response.json({listeChambresJson : chambres})
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/coursForChambre_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupCoursForChambre(request.body, function(result){
                response.json({coursForChambreJson : result})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/consultationAffairesAudience_url',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/consultationAffairesAudience',
                {
                    title:'Cahier de transmission',
                    label:'Liste des affaires reçu du role general en attente de validation'
                });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeDateAffaire_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupListeDateAffaire(function(result){
                response.json({listeDateAffaireJson : result})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeCoursAffaire_url/:idAffaire',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.listeCoursAffaire(request.params.idAffaire, function(result){
                response.json({listeCoursAffaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeCoursAffaireBis_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.listeCoursAffaireBis(function(result){
                response.json({listeCoursAffaireBisJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeCoursAffaireBis_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.listeCoursAffaireBis(function(result){
                response.json({listeCoursAffaireBisJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formulaireCompositionCours/:affaireId',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/formulaireCompositionCours',
                {
                    title:'La cours',
                    label:'Composition de la cours'
                });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeCours_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupCours(function(result){
                response.json({coursJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeSalle_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupSalles(function(result){
                response.json({sallesJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/affaireForCours_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupAffaireForCours(function(result){
                response.json({affaireForCoursJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listePresidents_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupPresidents(function(result){
                response.json({presidentsJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeGreffiers_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupGreffiers(function(result){
                response.json({greffiersJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeDateAudience_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupDateAudience(function(result){
                response.json({dateAudiencesJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formulaireMotifRetour/:idAffaire',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/formulaireMotifRetour',
                {
                    title:"Role d'audience",
                    label:'Retour affaire au role general'
                });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupAffaireItems_url/:idAffaire',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupAffaireRetourItems(request.params.idAffaire, function(result){
                response.json({affaireRetourJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/afficherPublication/:dateAudience',
        callbackFunction: function (request, response) {
            response.render('contents/roleAudience/plublicationAffaires',
                {
                    title:"Publication",
                    label:'Liste des affaires publiées'
                });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/publicationAffaire_url/:dateAudience',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupAffairePublie(request.params.dateAudience, function(result){
                response.json({listeAffairesPublieJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeIdAffaire',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/roleAudience/roleAudienceDao.js');
            dao.roleAudienceDao.recupListeIdAffaire(request.body, function(result){
                response.json({listeIdAffaireJson : result});
            })
        }
    });


    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/exportAction_url',
        callbackFunction: function (request, response) {

            var html = fs.readFileSync('contents/roleAudience/consultationAffairesAudience.ejs', 'utf8');
            var options = {format : 'letter'};
            pdf.create(html, options).toFile('contents/roleAudience/consultationAffairesAudience.pdf');
        }
    });


}

module.exports = roleAudienceConfiguration;