function jugementRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

jugementRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

jugementRouteConfiguration.prototype.processRoutes = function() {

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

jugementRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeJugements',
        callbackFunction: function (request, response) {
            response.render('contents/jugement/listeJugements', {
                title: "Repertoire d'audience",
                label: "Liste des affaires validées par le role d'audience"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeJugement_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.listeJugements(function(affaires){
                response.json({jugementsJson : affaires})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formAjoutJugement',
        callbackFunction: function (request, response) {
            response.render('contents/jugement/formAjoutJugement', {
                title: "Audience",
                label: "Creation de l'audience du jour"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterJugement_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.ajouterJugement(
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
        requestUrl: '/formAjoutAffaireJugement/:jugementId',
        callbackFunction: function (request, response) {
            response.render('contents/jugement/formAjoutAffaireJugement', {
                title: "Audience",
                label: "Ajouter le(s) affaire(s) a l'audience"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterAffaireJugement_url',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.ajouterAffaireJugement(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/publieAffaire_url',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.publieAffaireJugement(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/jugementJr_url/:jugementId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.recupJugement(request.params.jugementId, function(result) {
                console.log(result);
                response.json({jugementsJrJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffaireJugementJr_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.recupAffairesJugementJr(function(affaires){
                response.json({affairesJugementJrJson : affaires})
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffairesPlumitif_url',
        callbackFunction: function (request, response) {

            response.render('contents/jugement/listeAffairesPlumitif', {
                title: "Publication",
                label: "Publication de l'audience"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/affairesPlumitif_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.recupAffairesPlumitif(function(result) {
                response.json({listeAffairesPlumitifJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffairesJuge_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.recupAffairesJuge(function(result) {
                response.json({listeAffairesJugeJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffairesExpedition_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.recupAffairesExpedition(function(result) {
                response.json({listeAffairesExpeditionJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeDemandeurAffairesPublication_url/:jugementId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.listeDemandeurAffairesPublication(request.params.jugementId, function(result) {
                console.log(result);
                response.json({demandeurAffairesPublicationJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeDefendeurAffairesPublication_url/:jugementId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.listeDefendeurAffairesPublication(request.params.jugementId, function(result) {
                console.log(result);
                response.json({defendeurAffairesPublicationJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffairesAjoutes_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.nbreAffaireAjoutes(function(result) {
                console.log(result);
                response.json({nbreAffairesAjouteJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/detailsAffaires/:audienceId',
        callbackFunction: function(request, response){
            response.render('contents/jugement/detailsAffaires',
                {
                    title : 'Detail',
                    label : 'Detail de l\'audience'
                })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/jugementAffaire',
        callbackFunction: function(request, response){
            response.render('contents/jugement/jugementAffaire',
                {
                    title : 'Plumitif',
                    label : 'Liste des affaires en attente de decision'
                })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffaireAJuger_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.listeAffaireAJuger(function(result) {
                console.log(result);
                response.json({listeAffaireAJugerJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/individusAJuger_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.individusAJuger(function(result) {
                console.log(result);
                response.json({individusAJugerJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffairesPlumitif_url',
        callbackFunction: function(request, response){
            response.render('contents/jugement/listeAffairesPlumitif',
                {
                    title: "Plumitif",
                    label: "Liste des affaires au plumitif"
                })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/reportJugementAffaire_url/:idAffaire',
        callbackFunction: function(request, response){
            response.render('contents/jugement/reportJugementAffaire',
                {
                    title: "Report",
                    label: "Report d'une affaire"
                })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeReportJugementAffaire/:affaireId',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.listeReportJugementAffaire(request.params.affaireId, function(result) {
                console.log(result);
                response.json({listeReportJugementAffaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupAffaireAJuger_url/:idAffaire',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.recupAffaireAJuger(request.params.idAffaire, function(result) {
                console.log(result);
                response.json({affaireAJugerJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/reportJugementAffaire',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/jugement/jugementDao.js');
            dao.jugementDao.reportJugementAffaire(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/formTraiterAffaire',
        callbackFunction: function(request, response){
            response.render('contents/jugement/formTraiterAffaire',
                {
                    title : 'Plumitif',
                    label : "Formulaire de traitement d'une affaire"
                })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/listeAffaireATraiter_url/:idAffaire',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupAffaireATraiter(request.params.idAffaire, function(result){
                response.json({affaireATraiterJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/detailAffairesJuge_url/:idAffaire',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupDetailAffairesJuge(request.params.idAffaire, function(result){
                response.json({detailAffairesJugeJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/detailAffairesJugeSup_url/:idAffaire',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupDetailAffairesJugeSup(request.params.idAffaire, function(result){
                response.json({detailAffairesJugeSupJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/listePartiesAffairesJuge_url/:idAffaire',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupPartiesAffairesJuge(request.params.idAffaire, function(result){
                response.json({listePartiesAffairesJugeJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/listeNumeroAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupNumeroAffaireJson(function(result){
                response.json({listeNumeroAffaireJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/traiterAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.traiterAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/repporterAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.repporterAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/modif_typeAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.modif_typeAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/jugerAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.jugerAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/annulerJugerAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.annulerJugerAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/repertoirJugement_url',
        callbackFunction: function(request, response){
            response.render('contents/jugement/repertoirJugement',
                {
                    title : 'Repertoire du jugement',
                    label : "Liste des affaires enregistrées au repertoir des jugemente"
                })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/listeAffaireAEnregisitrer_url/:idAffaire',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.listeAffaireAEnregisitrer(request.params.idAffaire, function(result){
                response.json({affaireAEnregistrerJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/formAjouterAffaireAuJugement',
        callbackFunction: function(request, response){
           response.render("contents/jugement/formAjouterAffaireAuJugement",
               {
                   title : "Repertoire de jugement",
                   label : "Formulaire d'enregistrement d'affaire dans le repertoire de jugement"
               })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/listeCaractere_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupListeCaracteres(function(result){
                response.json({listeCaractereJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/fondeAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.fondeAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/annulerFondeAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.annulerFondeAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/malFondeAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.malFondeAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/annulerMalFondeAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.annulerMalFondeAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/partiellementFondeAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.partiellementFondeAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/annulerPartiellementFondeAffaire_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.annulerPartiellementFondeAffaire(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/enregistrerAuJugement_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.enregistrerAuJugement(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/editionMinute_url',
        callbackFunction: function(request, response){
            response.render("contents/jugement/editionMinute");
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/editionExpedition_url',
        callbackFunction: function(request, response){
            response.render("contents/jugement/editionExpedition");
        }
    });


    self.routeTable.push({

        requestType:'post',
        requestUrl:'/activeQualite_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.activeQualite(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/closeQualite_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.closeQualite(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/activeFactum_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.activeFactum(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/closeFactum_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.closeFactum(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/activeExpedition_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.activeExpedition(request.body, function(status){
                response.json(status);
            })
        }
    });

    self.routeTable.push({

        requestType:'post',
        requestUrl:'/closeExpedition_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.closeExpedition(request.body, function(status){
                response.json(status);
            })
        }
    });

    var Request = require('request');

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/printMinute',
        callbackFunction: function(request, response, next){

            var data = {
                template : {'shortid':'SJgt_iPt'}
            }
            var options = {
                uri : 'http://localhost:1337/api/report',
                method : 'POST',
                json : data
            }
            Request(options).pipe(response);
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/detailsAffaireAuJugement/:id',
        callbackFunction: function(request, response){
            response.render("contents/jugement/detailsAffaireAuJugement");
        }
    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/detailsAffaireAuJugement_url/:id',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupDetailsAffaireAuJugement(request.params.id, function(result){
                response.json({detailsAffaireAuJugementJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/afficherFichierAuJugement',
        callbackFunction: function (request, response) {
            response.render('contents/jugement/afficherFichierAuJugement');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formFaireAppel',
        callbackFunction: function (request, response) {
            response.render('contents/jugement/formFaireAppel');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/individusAuJugement_url/:id_jugement',
        callbackFunction: function (request, response) {
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupIndividusAuJugement(request.params.id_jugement, function(result){
                response.json({individusAuJugementJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/individusAuJugement_url',
        callbackFunction: function (request, response) {
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.faireAppel(request.body, function(status){
                response.json(status);
            });
            dao.jugementDao.effectueAppel(request.body, function(){
                console.log('success');
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/appelInfo_url/:jugementId',
        callbackFunction: function (request, response) {
            var dao = require("../serveur/dao/jugement/jugementDao.js");
            dao.jugementDao.recupAppelInfo(request.params.jugementId, function(result){
                response.json({appelInfoJson : result});
            })
        }
    });

}

module.exports = jugementRouteConfiguration;