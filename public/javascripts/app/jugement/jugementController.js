angular.module('app', ['ui.bootstrap']).
    controller('jugementController', ['$scope', 'jugementService', '$timeout', '$modal', '$log', '$window',
        function($scope, jugementService, $timeout, $modal, $log, $window){

        $scope.dateJour = new Date();
        $scope.jugements = [];
        $scope.jugementJr = [];
        $scope.affairesJugementJr = [];
        $scope.idAffaire = [];
        $scope.individusAJuger = []
        $scope.nbreAffairesAjoutes = [];
        $scope.listeAffaireAJuger = [];
        $scope.listeReportJugementAffaires = [];
        $scope.affaireAJugerItem = [];
        $scope.listeCaracteres = [];
        $scope.dateJour = "";
        $scope.etatModif = {
            presi : false,
            asse : false,
            subs : false,
            gref : false,
            typeAff : false
        };
        $scope.affaireAJuger = {};
        $scope.visibilite = false;
        $scope.jugeEvent = false;
        $scope.statutFonde = false;
        $scope.statutMalFonde = false;
        $scope.statutPartielFonde = false;
        $scope.mois = new Date().getUTCMonth();
        $scope.date = new Date().getUTCDate();

        if($scope.mois < 10){
            $scope.mois = "0"+$scope.mois;
        }
        if($scope.date < 10){
            $scope.date = "0"+$scope.date;
        }

        getRandomArbitrary();
        function getRandomArbitrary(min, max) {
            var random = Math.random() * (max - min) + min;
            return Math.round(random);
        }

        $scope.reportItems = {

            date_report : "",
            transJugement : false,
            auJugement : false
        }

        $scope.jugementFormItems = {

            president : "",
            assesseurs : "",
            substitut : "",
            greffier: "",
            numero_jugement :"J"+$scope.date+""+$scope.mois+""+getRandomArbitrary(100, 999),
            date_saisie_jugement : new Date,
            heure_audience:"",
            salle_audience:"",
            observation:"",
            id_affaire:"",
            date_report : "",
            id_caractere_jugement : "",
            observation_jugement : "",
            observation_plumitif : "",
            typeAffaire :"",
            reporte : "",
            id_affaire_cours : ""
        };

        $scope.traiterFormItem = {


        }

        $scope.affaireJugementItems = {

            auJugement : true,
            id_affaire : ""

        };

        $scope.affairePublieItems = {

            etat_publication : true
        };


        nettoyer_FC();
        listeJugement_FC();
        jugementDuJour_FC();
        listeAffaireJugementJr_FC();
        individusAJuger_FC();
        nbreAffairesAjoute_FC();
        listeAffaireAJuger_FC();
        recupAffaireAJuger_FC();
        listeAgent_FC();
        listeSalleAudiences_FC();
        listeNumeroAffaire_FC();
        listeAffairesPlumitif_FC();
        listeCaractere_FC();

        $scope.jugerAffaire_FC = function(jugementFormItems){

            jugementService.jugerAffaire_FS(jugementFormItems)
                .success(function(){
                    console.log("successful edit");
                    $scope.jugeEvent = true;
                })
                .error(function(){
                    console.log("failed");
                })
        }

        $scope.annulerJugerAffaire_FC = function(jugementFormItems){

            jugementService.annulerJugerAffaire_FS(jugementFormItems)
                .success(function(){
                    console.log("successful edit");
                    $scope.jugeEvent = false;
                })
                .error(function(){
                    console.log("failed");
                })
        }

        function listeNumeroAffaire_FC(){

            jugementService.listeNumeroAffaire_FS()
                .success(function(data){
                    if(data && data.listeNumeroAffaireJson && data.listeNumeroAffaireJson.length > 0){
                        console.log(data.listeNumeroAffaireJson);
                        $scope.listeNumeroAffaire = data.listeNumeroAffaireJson;
                    }
                })

        }

        function listeSalleAudiences_FC(){

            jugementService.listeSalleAudiences_FS()
                .success(function(data){
                    if(data && data.salleAudiencesJson && data.salleAudiencesJson.length > 0){
                        $scope.salleAudiences = data.salleAudiencesJson;
                    }
                })
        }

        function listeAgent_FC(){

            jugementService.listeAgent_FS()
                .success(function(data){
                    if(data && data.agentsJson && data.agentsJson.length > 0){
                        console.log(data.agentsJson);
                        $scope.listeAgentsPlum = data.agentsJson;
                    }
                })

        }

        $scope.etatModifPresi_FC = function(){
            $scope.etatModif.presi = true;
        };
        $scope.annulEtatModifPresi_FC = function(){
            $scope.etatModif.presi =false;
        };
        $scope.etatModifAss_FC = function(){
            $scope.etatModif.asse = true;
        };
        $scope.annulEtatModifAss_FC = function(){
            $scope.etatModif.asse = false;
        };
        $scope.etatModifSubs_FC = function(){
            $scope.etatModif.subs = true;
        };
        $scope.annulEtatModifSubs_FC = function(){
            $scope.etatModif.subs = false;
        };
        $scope.etatModifGref_FC = function(){
            $scope.etatModif.gref = true;
        };
        $scope.annulEtatModifGref_FC = function(){
            $scope.etatModif.gref = false;
        };
        $scope.etatModifSalle_FC = function(){
            $scope.etatModif.salle = true;
        };
        $scope.annulEtatModifSalle_FC = function(){
            $scope.etatModif.salle = false;
        };
        $scope.etatModifTypeAff_FC = function(){
            $scope.etatModif.typeAff = true;
        };
        $scope.annulEtatModifTypeAff_FC = function(){
            $scope.etatModif.typeAff = false;
        };

        //AFFAIRE FONDEE
        $scope.fondeAffaire_FC = function(jugementFormItems){
            jugementService.fondeAffaire_FS(jugementFormItems)
                .success(function(){console.log("successful edit");$scope.statutFonde = true;})
                .error(function(){console.log("failed")})
        }
        $scope.annulerFondeAffaire_FC = function(jugementFormItems){
            jugementService.annulerFondeAffaire_FS(jugementFormItems)
                .success(function(){console.log("successful edit");$scope.statutFonde = false;})
                .error(function(){console.log("failed")})
        }
        //FIN

        //AFFAIRE MAL FONDEE
        $scope.malFondeAffaire_FC = function(jugementFormItems){
            jugementService.malFondeAffaire_FS(jugementFormItems)
                .success(function(){console.log("successful edit");$scope.statutMalFonde = true;})
                .error(function(){console.log("failed")})
        }
        $scope.annulerMalFondeAffaire_FC = function(jugementFormItems){
            jugementService.annulerMalFondeAffaire_FS(jugementFormItems)
                .success(function(){console.log("successful edit");$scope.statutMalFonde = false;})
                .error(function(){console.log("failed")})
        }
        //FIN

        //AFFAIRE MAL FONDEE
        $scope.partiellementFondeAffaire_FC = function(jugementFormItems){
            jugementService.partiellementFondeAffaire_FS(jugementFormItems)
                .success(function(){console.log("successful edit");$scope.statutPartielFonde = true;})
                .error(function(){console.log("failed")})
        }
        $scope.annulerPartiellementFondeAffaire_FC = function(jugementFormItems){
            jugementService.annulerPartiellementFondeAffaire_FS(jugementFormItems)
                .success(function(){console.log("successful edit");$scope.statutPartielFonde = false;})
                .error(function(){console.log("failed")})
        }
        //FIN

        function listeCaractere_FC(){

            jugementService.listeCaractere_FS()
                .success(function(data){
                    if(data && data.listeCaractereJson && data.listeCaractereJson.length > 0){
                        console.log(data.listeCaractereJson);
                        $scope.listeCaracteres = data.listeCaractereJson;
                    }else{console.log('Aucun enregistrement');}
                })
        }

        $scope.repporterAffaire_FC = function(jugementFormItems){

            jugementService.repporterAffaire_FS(jugementFormItems)
                .success(function(){
                    console.log("successful repport");
                    $scope.message = {class:"bg-success", msg:"L'affaire a ete reportée avec succes"};
                    $scope.visibilite = true;
                    $timeout(function(){
                        $window.location.href = '/listeAffairesPlumitif_url';
                    },1000);
                })
                .error(function(){
                    console.log("failed");
                });

            jugementService.modif_typeAffaire_FS(jugementFormItems)
                .success(function(){
                    console.log("successful edit");
                })
                .error(function(){
                    console.log("failed edit")
                })
        }

        //MODAL D'ENREGISTREMENT DES AFFAIRE DANS LE REPERTOIRE
        $scope.ajouterAffaireAuRepertoirModal = function(){

            //listeAffaireATraiter_FC();
            $scope.listeAffaireAEnregisitrer_FC = function(idAffaire){
                jugementService.listeAffaireAEnregisitrer_FS(idAffaire)
                    .success(function(data){
                        if(data && data.affaireAEnregistrerJson && data.affaireAEnregistrerJson.length > 0){
                            console.log(data.affaireAEnregistrerJson);
                            $scope.affaireAEnregistrer = data.affaireAEnregistrerJson;
                            $scope.jugementFormItems.date_audience = data.affaireAEnregistrerJson[0]['date_audience'];
                            $scope.jugementFormItems.objet_affaire = data.affaireAEnregistrerJson[0]['objet_affaire'];
                            $scope.jugementFormItems.president = data.affaireAEnregistrerJson[0]['president'];
                            $scope.jugementFormItems.assesseurs = data.affaireAEnregistrerJson[0]['assesseurs'];
                            $scope.jugementFormItems.greffier = data.affaireAEnregistrerJson[0]['greffier'];
                            $scope.jugementFormItems.substitut = data.affaireAEnregistrerJson[0]['substitut'];
                            $scope.jugementFormItems.libelle_salleAudience = data.affaireAEnregistrerJson[0]['libelle_salleAudience'];
                            $scope.jugementFormItems.id_salleAudience = data.affaireAEnregistrerJson[0]['id_salleAudience'];
                            $scope.jugementFormItems.id_affaire_cours = data.affaireAEnregistrerJson[0]['id_affaire_cours'];
                            $scope.jugementFormItems.id_cours = data.affaireAEnregistrerJson[0]['id_cours'];
                            $scope.jugementFormItems.date_report = data.affaireAEnregistrerJson[0]['date_report'];
                            $scope.jugementFormItems.juge = data.affaireAEnregistrerJson[0]['juge'];
                            $scope.jugementFormItems.reporte = data.affaireAEnregistrerJson[0]['reporte'];
                            $scope.jugementFormItems.edit_expedition = data.affaireAEnregistrerJson[0]['edit_expedition'];
                        }
                    })
            }

            var modalInstance = $modal.open({

                templateUrl : "/formAjouterAffaireAuJugement",
                controller : enregistrerAuJugement_FC,
                scope : $scope,
                resolve : {
                    affaireJugementForm : function(){
                        return $scope.affaireJugementForm;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem){
                $scope.seleted = selectedItem;
            }, function(){
                $log.info("Fermeture de la modal a : "+new Date());
            });
        }
        var enregistrerAuJugement_FC = function($modal, $modalInstance, affaireJugementForm){
            $scope.submitForm = function(){}
            $scope.cancel = function(){$modalInstance.dismiss('cancel');}
        }
        $scope.enregistrerAuJugement_FC = function(jugementFormItems){

            jugementService.enregistrerAuJugement_FS(jugementFormItems)
                .success(function(){
                    console.log("successful add");
                    $scope.message = {class:"bg-success", msg:"Affaire enregistré avec succès au repertoire des jugements"}
                    $timeout(function(){
                        $window.location.href = '/repertoirJugement_url'
                    }, 1000);
                })
        }
        //FIN MODAL

        //MODAL DE TRAITEMENT DES AFFAIRE
        $scope.traiterAffaireModal_FC = function(){

            //listeAffaireATraiter_FC();
            $scope.listeAffaireATraiter_FC = function(idAffaire){
                jugementService.listeAffaireATraiter_FS(idAffaire)
                    .success(function(data){
                        if(data && data.affaireATraiterJson && data.affaireATraiterJson.length > 0){
                            console.log(data.affaireATraiterJson);
                            $scope.nbrAffaireATraiter = data.affaireATraiterJson.length;
                            $scope.affaireATraiter = data.affaireATraiterJson;
                            $scope.jugementFormItems.date_audience = data.affaireATraiterJson[0]['date_audience'];
                            $scope.jugementFormItems.objet_affaire = data.affaireATraiterJson[0]['objet_affaire'];
                            $scope.jugementFormItems.president = data.affaireATraiterJson[0]['president'];
                            $scope.jugementFormItems.assesseurs = data.affaireATraiterJson[0]['assesseurs'];
                            $scope.jugementFormItems.greffier = data.affaireATraiterJson[0]['greffier'];
                            $scope.jugementFormItems.substitut = data.affaireATraiterJson[0]['substitut'];
                            $scope.jugementFormItems.libelle_salleAudience = data.affaireATraiterJson[0]['libelle_salleAudience'];
                            $scope.jugementFormItems.id_salleAudience = data.affaireATraiterJson[0]['id_salleAudience'];
                            $scope.jugementFormItems.id_affaire_cours = data.affaireATraiterJson[0]['id_affaire_cours'];
                            $scope.jugementFormItems.id_cours = data.affaireATraiterJson[0]['id_cours'];
                            $scope.jugementFormItems.date_report = data.affaireATraiterJson[0]['date_report'];
                            $scope.jugementFormItems.juge = data.affaireATraiterJson[0]['juge'];
                            $scope.jugementFormItems.reporte = data.affaireATraiterJson[0]['reporte'];
                            $scope.jugementFormItems.typeAffaire = data.affaireATraiterJson[0]['type_affaire'];
                            $scope.jugementFormItems.observation_plumitif = data.affaireATraiterJson[0]['observation_plumitif'];
                        }
                    })
            }

            var modalInstance = $modal.open({

                templateUrl : "/formTraiterAffaire",
                controller : traiterAffaire_FC,
                scope : $scope,
                resolve : {
                    affairePumitifForm : function(){
                        return $scope.affairePumitifForm;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem){
                $scope.seleted = selectedItem;
            }, function(){
                $log.info("Fermeture de la modal a : "+new Date());
            });
        }
        var traiterAffaire_FC = function($modal, $modalInstance, affairePumitifForm){
            $scope.submitForm = function(){}
            $scope.cancel = function(){$modalInstance.dismiss('cancel');}
        }
        $scope.traiterAffaire_FC = function(jugementFormItems){

            jugementService.traiterAffaire_FS(jugementFormItems)
                .success(function(){
                    console.log("successful edit");
                    $scope.message = {class:"bg-success", msg:"Affaire traitée avec succès"}
                    $timeout(function(){
                        $window.location.href = '/listeAffairesPlumitif_url'
                    }, 1000);
                })
        }
        //FIN MODAL

        $scope.ajoutCoursAffaire = function(){


        }

        function nettoyer_FC(){

            $scope.jugementFormItems.president = "";
            $scope.jugementFormItems.greffier = "";
            $scope.jugementFormItems.heure_audience = "";
            $scope.jugementFormItems.salle_audience = "";
        }

        function listeJugement_FC(){

            jugementService.listeJugement_FS()
                .success(function (data) {

                    if(data && data.jugementsJson && data.jugementsJson.length > 0){
                        $scope.jugements = data.jugementsJson;
                    }
                });
        }

        $scope.ajouterJugement_FC = function(jugementFormItems){

            jugementService.ajouterJugement_FS(jugementFormItems)

                .success(function (data) {
                    console.log('successfull add');
                    $timeout(function(){
                        $scope.message = {class:'bg-success', msg:"L'affaire a ete enregistre avec succes"};
                    },1000);
                    nettoyer_FC();
                })
                .error(function (data) {
                    console.log('failled');
                    $interval(function(){
                        $scope.message = {class:'bg-danger', msg:"Une erreur est survenue lors de l'enregisrement"};
                    },1000);
                });
        }

        function jugementDuJour_FC(){

            jugementService.jugementDuJour_FS(jugementService.recupIdJugementJr_FS())
                .success(function(data){
                    if(data && data.jugementsJrJson && data.jugementsJrJson.length > 0){
                        $scope.jugementJr = data.jugementsJrJson;
                    }
                })
        }

        function listeAffaireJugementJr_FC(){

            jugementService.listeAffaireJugementJr_FS()
                .success(function(data){
                    if(data && data.affairesJugementJrJson && data.affairesJugementJrJson.length > 0){
                        console.log(data.affairesJugementJrJson);
                        $scope.affairesJugementJr = data.affairesJugementJrJson;
                    }
                })
        }

        $scope.ajouterAffaireJugement_FC = function(){

            jugementService.ajouterAffaireJugement_FS($scope.affaireJugementItems, jugementService.recupIdJugementJr_FS())
                .success(function(data){
                    console.log('successful add');
                    $timeout(function(){
                        $scope.message = {class:'bg-success', msg:"L'affaire a ete enregistre avec succes"};
                    },1000);
                    $scope.affaireJugementItems.id_affaire = "";
                })
                .error(function(data){
                    console.log('failled');
                    $interval(function(){
                        $scope.message = {class:'bg-danger', msg:"Une erreur est survenue lors de l'enregisrement"};
                    },1000);
                    $scope.affaireJugementItems.id_affaire = "";
                })
        }

        function listeAffairesPlumitif_FC(){

            $scope.id_user = sessionStorage.getItem("azwackyx");
            jugementService.listeAffairesPlumitif_FS()
                .success(function(data){
                    if(data && data.listeAffairesPlumitifJson && data.listeAffairesPlumitifJson.length > 0){
                        console.log(data.listeAffairesPlumitifJson);
                        $scope.listeAffairesPlumitif = data.listeAffairesPlumitifJson;
                    }
                });
        }

        listeAffairesJuge_FC();
        function listeAffairesJuge_FC(){

            $scope.id_user = sessionStorage.getItem("azwackyx");
            jugementService.listeAffairesJuge_FS()
                .success(function(data){
                    if(data && data.listeAffairesJugeJson && data.listeAffairesJugeJson.length > 0){
                        console.log(data.listeAffairesJugeJson);
                        $scope.listeAffairesJuge = data.listeAffairesJugeJson;
                    }
                });
        }
        listeAffairesExpedition_FC();
        function listeAffairesExpedition_FC(){

            $scope.id_user = sessionStorage.getItem("azwackyx");
            jugementService.listeAffairesExpedition_FS()
                .success(function(data){
                    if(data && data.listeAffairesExpeditionJson && data.listeAffairesExpeditionJson.length > 0){
                        console.log(data.listeAffairesExpeditionJson);
                        $scope.listeAffairesExpedition = data.listeAffairesExpeditionJson;
                    }
                });
        }

        $scope.qualite = false;
        $scope.factum = false;
        $scope.expedition = false;
        $scope.listeDetailAffairesJuge = [];
        $scope.listDetailAffairesJugeSup = [];
        $scope.listePartiesAffairesJuge = [];
        $scope.type_document = "";

        $scope.activeQualite = function (idAffaire) {

            jugementService.activeQualite_FS(idAffaire)
                .success(function(){
                    console.log("successful edit");
                    $scope.message = {class:"bg-success", msg:"Qualité editée avec succès"};
                    $scope.qualite = true;
                    $timeout(function(){
                        $scope.message = null;
                    },1000);
                })
                .error(function(){
                    console.log("error");
                })
        }

        $scope.closeQualite = function (idAffaire) {
            //$scope.qualite = false;
            jugementService.closeQualite_FS(idAffaire)
                .success(function(){
                    console.log("successful disable");
                    $scope.message = {class:"bg-danger", msg:"Edition annulée avec succès"};
                    $scope.qualite = false;
                    $timeout(function(){
                        $scope.message = null;
                    },1000);
                })
                .error(function(){
                    console.log("failed");
                })
        }

        $scope.activeFactum = function (idAffaire) {
            //$scope.factum = true;
            jugementService.activeFactum_FS(idAffaire)
                .success(function(){
                    console.log("successful edit");
                    $scope.message = {class:"bg-success", msg:"Factum edité avec succès"};
                    $scope.factum = true;
                    $timeout(function(){
                        $scope.message = null;
                    },1000);
                })
                .error(function(){
                    console.log("failed");
                })
        }

        $scope.closeFactum = function (idAffaire) {
            //$scope.factum = false;
            jugementService.closeFactum_FS(idAffaire)
                .success(function(){
                    console.log("successful disable");
                    $scope.message = {class:"bg-danger", msg:"Edition annulée avec succès"};
                    $scope.factum = false;
                    $timeout(function(){
                        $scope.message = null;
                    },1000);
                })
                .error(function(){
                    console.log("failed");
                })
        }

        $scope.activeExpedition = function (idAffaire) {
            //$scope.factum = true;
            jugementService.activeExpedition_FS(idAffaire)
                .success(function(){
                    console.log("successful edit");
                    $scope.message = {class:"bg-success", msg:"Expedition edité avec succès"};
                    $scope.expedition = true;
                    $timeout(function(){
                        $scope.message = null;
                    },1000);
                })
                .error(function(){
                    console.log("failed");
                })
        }

        $scope.closeExpedition = function (idAffaire) {
            //$scope.factum = false;
            jugementService.closeExpedition_FS(idAffaire)
                .success(function(){
                    console.log("successful disable");
                    $scope.message = {class:"bg-danger", msg:"Edition annulée avec succès"};
                    $scope.expedition = false;
                    $timeout(function(){
                        $scope.message = null;
                    },1000);
                })
                .error(function(){
                    console.log("failed");
                })
        }

        $scope.detailAffairesJuge_FC = function(idAffaire) {
            jugementService.detailAffairesJuge_FS(idAffaire)
                .success(function (data) {
                    if (data && data.detailAffairesJugeJson && data.detailAffairesJugeJson.length > 0) {
                        //console.log(data.detailAffairesJugeJson[0]['prenom_individu']);
                        //$scope.edition = true;
                        $scope.listeDetailAffairesJuge.id_affaire = data.detailAffairesJugeJson[0]['id_affaire'];
                        $scope.listeDetailAffairesJuge.date_audience = data.detailAffairesJugeJson[0]['date_audience'];
                        $scope.listeDetailAffairesJuge.numero_ordre = data.detailAffairesJugeJson[0]['numero_ordre'];
                        $scope.listeDetailAffairesJuge.date_audience = data.detailAffairesJugeJson[0]['date_audience'];
                        $scope.listeDetailAffairesJuge.objet_affaire = data.detailAffairesJugeJson[0]['objet_affaire'];
                        $scope.listeDetailAffairesJuge.president = data.detailAffairesJugeJson[0]['president'];
                        $scope.listeDetailAffairesJuge.greffier = data.detailAffairesJugeJson[0]['greffier'];
                        $scope.listeDetailAffairesJuge.reporte = data.detailAffairesJugeJson[0]['reporte'];
                        $scope.listeDetailAffairesJuge.date_report = data.detailAffairesJugeJson[0]['date_report'];
                        $scope.listeDetailAffairesJuge.edit_qualite = data.detailAffairesJugeJson[0]['edit_qualite'];
                        $scope.listeDetailAffairesJuge.edit_factum = data.detailAffairesJugeJson[0]['edit_factum'];
                        $scope.listeDetailAffairesJuge.edit_expedition = data.detailAffairesJugeJson[0]['edit_expedition'];
                    }
                })
            jugementService.detailAffairesJugeSup_FS(idAffaire)
                .success(function (data) {
                    if (data && data.detailAffairesJugeSupJson && data.detailAffairesJugeSupJson.length > 0) {
                        console.log(data.detailAffairesJugeSupJson);
                        $scope.listDetailAffairesJugeSup.libelle_caractere = data.detailAffairesJugeSupJson[0]['libelle_caractere'];
                    }
                })
            jugementService.listePartiesAffairesJuge_FS(idAffaire)
                .success(function (data) {
                    if (data && data.listePartiesAffairesJugeJson && data.listePartiesAffairesJugeJson.length > 0) {
                        console.log(data.listePartiesAffairesJugeJson);
                        $scope.listePartiesAffairesJuge = data.listePartiesAffairesJugeJson;
                    }
                })
        }

        function nbreAffairesAjoute_FC(){

            jugementService.nbreAffairesAjoute_FS()
                .success(function(data){
                    if(data && data.nbreAffairesAjouteJson && data.nbreAffairesAjouteJson.length > 0){
                        console.log(data.nbreAffairesAjouteJson);
                        $scope.nbreAffairesAjoutes = data.nbreAffairesAjouteJson;
                    }
                })
        }

        $scope.publierAffaire_FC = function () {

            jugementService.publierAffaire_FS($scope.affairePublieItems, jugementService.recupIdJugementJr_FS())
                .success(function (data) {
                    console.log("successful edit");
                    $timeout(function(){
                        $scope.message = {class:"bg-success", msg:"Affaire publier avec succes"}
                    }, 1000);
                })
                .error(function () {
                    console.log("Failled");
                    $timeout(function(){
                        $scope.message = {class:"bg-danger", msg:"Affaire non publier! suite a une erreur"}
                    }, 1000);
                })
        }

        function listeAffaireAJuger_FC(){

            jugementService.listeAffaireAJuger_FS()
                .success(function(data){
                    if(data && data.listeAffaireAJugerJson && data.listeAffaireAJugerJson.length > 0){
                        console.log(data.listeAffaireAJugerJson);
                        $scope.listeAffaireAJuger = data.listeAffaireAJugerJson;
                    }
                })
        }

        function individusAJuger_FC(){

            jugementService.individusAJuger_FS()
                .success(function(data){
                    if(data && data.individusAJugerJson && data.individusAJugerJson.length > 0){
                        console.log(data.individusAJugerJson);
                        $scope.individusAJuger = data.individusAJugerJson;
                    }
                })
        }

        function recupAffaireAJuger_FC(){

            jugementService.recupAffaireAJuger_FS(jugementService.recupIdAffaire_FS())
                .success(function(data){
                    if(data && data.affaireAJugerJson && data.affaireAJugerJson.length > 0){
                        console.log(data.affaireAJugerJson);
                        $scope.affaireAJugerItem = data.affaireAJugerJson;
                        $scope.affaireAJuger.president = data.affaireAJugerJson[0]['president'];
                        $scope.affaireAJuger.greffier = data.affaireAJugerJson[0]['greffier'];
                        $scope.affaireAJuger.salle_audience = data.affaireAJugerJson[0]['salle_audience'];
                        $scope.affaireAJuger.libelle_nature = data.affaireAJugerJson[0]['libelle_nature'];
                        $scope.affaireAJuger.libelle_chambre = data.affaireAJugerJson[0]['libelle_chambre'];
                        //$scope.affaireAJuger.date_jugement = data.affaireAJugerJson[0]['date_jugement'];
                        $scope.affaireAJuger.heure_audience = data.affaireAJugerJson[0]['heure_audience'];
                        $scope.affaireAJuger.id_audience = data.affaireAJugerJson[0]['id_audience'];
                    }
                })
        }

        $scope.reporterJugementAffaire_FC = function () {

            jugementService.reporterJugementAffaire_FS($scope.reportItems, jugementService.recupIdAffaire_FS())
                .success(function () {
                    console.log("successful report");
                    $timeout(function(){
                        $scope.message = {class:"bg-success", msg:"Affaire reportee avec succes"}
                    }, 1000);
                })
                .error(function () {
                    console.log("Failed");
                    $timeout(function(){
                        $scope.message = {class:"bg-danger", msg:"Erreur survenue lors du report de l'affaire"}
                    }, 1000);
                })
        }

        detailsAffaireAuJugement_FC();
        $scope.detailsAffaireAuJugement = [];

        function detailsAffaireAuJugement_FC(){

            jugementService.detailsAffaireAuJugement_FS(jugementService.recupIdJugementJr_FS())
                .success(function(data){
                    if(data && data.detailsAffaireAuJugementJson && data.detailsAffaireAuJugementJson.length >0){
                        console.log(data.detailsAffaireAuJugementJson);
                        $scope.detailsAffaireAuJugement = data.detailsAffaireAuJugementJson;
                        $scope.detailsAffaireAuJugement.id_jugement = data.detailsAffaireAuJugementJson[0]['id_jugement'];
                        $scope.detailsAffaireAuJugement.numero_ordre = data.detailsAffaireAuJugementJson[0]['numero_ordre'];
                        $scope.detailsAffaireAuJugement.motif_retour = data.detailsAffaireAuJugementJson[0]['motif_retour'];
                        $scope.detailsAffaireAuJugement.libelle_nature = data.detailsAffaireAuJugementJson[0]['libelle_nature'];
                        $scope.detailsAffaireAuJugement.objet_affaire = data.detailsAffaireAuJugementJson[0]['objet_affaire'];
                        $scope.detailsAffaireAuJugement.libelle_chambre = data.detailsAffaireAuJugementJson[0]['libelle_chambre'];
                        $scope.detailsAffaireAuJugement.observation = data.detailsAffaireAuJugementJson[0]['observation'];
                        $scope.detailsAffaireAuJugement.date_audience = data.detailsAffaireAuJugementJson[0]['date_audience'];
                        $scope.detailsAffaireAuJugement.doc_scan = data.detailsAffaireAuJugementJson[0]['doc_scan'];
                        $scope.detailsAffaireAuJugement.numero_jugement = data.detailsAffaireAuJugementJson[0]['numero_jugement'];
                        $scope.detailsAffaireAuJugement.libelle_caractere = data.detailsAffaireAuJugementJson[0]['libelle_caractere'];
                        $scope.detailsAffaireAuJugement.fin_appel = data.detailsAffaireAuJugementJson[0]['fin_appel'];
                        $scope.detailsAffaireAuJugement.fonde = data.detailsAffaireAuJugementJson[0]['fonde'];
                        $scope.detailsAffaireAuJugement.mal_fonde = data.detailsAffaireAuJugementJson[0]['mal_fonde'];
                        $scope.detailsAffaireAuJugement.partiellement_fonde = data.detailsAffaireAuJugementJson[0]['partiellement_fonde'];
                        $scope.detailsAffaireAuJugement.doc_scan = data.detailsAffaireAuJugementJson[0]['doc_scan'];
                        $scope.detailsAffaireAuJugement.date_enregistrement = data.detailsAffaireAuJugementJson[0]['date_enregistrement'];
                        $scope.detailsAffaireAuJugement.appel_effectue = data.detailsAffaireAuJugementJson[0]['appel_effectue'];
                        $scope.detailsAffaireAuJugement.libelle_nature = data.detailsAffaireAuJugementJson[0]['libelle_nature'];
                        $scope.detailsAffaireAuJugement.president = data.detailsAffaireAuJugementJson[0]['president'];
                        $scope.detailsAffaireAuJugement.greffier = data.detailsAffaireAuJugementJson[0]['greffier'];
                        $scope.detailsAffaireAuJugement.accesseurs = data.detailsAffaireAuJugementJson[0]['accesseurs'];
                        $scope.detailsAffaireAuJugement.substitut = data.detailsAffaireAuJugementJson[0]['substitut'];
                        $scope.detailsAffaireAuJugement.libelle_salleAudience = data.detailsAffaireAuJugementJson[0]['libelle_salleAudience'];
                        $scope.detailsAffaireAuJugement.type_affaire = data.detailsAffaireAuJugementJson[0]['type_affaire'];
                        $scope.detailsAffaireAuJugement.nbr_jour_restant = data.detailsAffaireAuJugementJson[0]['nbr_jour_restant'];
                    }
                })
                .error(function(data){
                    console.log('No data found');
                })
        }

        appelInfo_FC();
        $scope.appelInfo = []
        function appelInfo_FC(){
            jugementService.appelInfo_FS(jugementService.recupIdJugementJr_FS())
                .success(function(data){
                    if(data && data.appelInfoJson && data.appelInfoJson.length > 0){
                        console.log(data.appelInfoJson);
                        $scope.appelInfo.nom_individu = data.appelInfoJson[0]['nom_individu'];
                        $scope.appelInfo.prenom_individu = data.appelInfoJson[0]['prenom_individu'];
                        $scope.appelInfo.libelle_typeIndividu = data.appelInfoJson[0]['libelle_typeIndividu'];
                    }
                })
                .error(function(data){
                    console.log('No data found');
                })
        }

        $scope.afficherFichierModal = function(){

            var modalInstance = $modal.open({
                templateUrl: '/afficherFichierAuJugement',
                controller: afficherFichier_FC,
                scope: $scope
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Fermeture de la modal a: ' + new Date());
            });
        }
        var afficherFichier_FC = function ($scope, $modalInstance) {

            $scope.submitForm = function () {}
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            }
        }
        $scope.afficherFichier_FC = function () {jugementService.afficherFichier_FC()}

        $scope.faireAppelModal = function(id_jugement){

            individusAuJugement_FC();
            $scope.listeIndividusAuJugement = [];
            function individusAuJugement_FC(){
                jugementService.individusAuJugement_FS(id_jugement)
                    .success(function(data){
                        if(data && data.individusAuJugementJson && data.individusAuJugementJson.length > 0){
                            console.log(data.individusAuJugementJson);
                            $scope.listeIndividusAuJugement = data.individusAuJugementJson;
                            //$scope.listeIndividusAuJugement.id_individu = data.individusAuJugementJson[0]['id_individu'];
                            $scope.listeIndividusAuJugement.id_jugement = data.individusAuJugementJson[0]['id_jugement'];
                            $scope.listeIndividusAuJugement.numero_jugement = data.individusAuJugementJson[0]['numero_jugement'];
                            $scope.listeIndividusAuJugement.numero_ordre = data.individusAuJugementJson[0]['numero_ordre'];
                            $scope.listeIndividusAuJugement.objet_affaire = data.individusAuJugementJson[0]['objet_affaire'];
                            $scope.listeIndividusAuJugement.date_enregistrement = data.individusAuJugementJson[0]['date_enregistrement'];
                            $scope.listeIndividusAuJugement.nom_individu = data.individusAuJugementJson[0]['nom_individu'];
                            $scope.listeIndividusAuJugement.prenom_individu = data.individusAuJugementJson[0]['prenom_individu'];
                            $scope.listeIndividusAuJugement.libelle_typeIndividu = data.individusAuJugementJson[0]['libelle_typeIndividu'];
                        }
                    })
                    .error(function(data){
                        console.log('No data found');
                    })
            }

            var modalInstance = $modal.open({
                templateUrl : '/formFaireAppel',
                controller : faireAppel_FC,
                scope : $scope
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Fermeture de la modal a: ' + new Date());
            });
        }
        var faireAppel_FC = function ($scope, $modalInstance) {

            $scope.submitForm = function () {}
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            }
        }
        $scope.faireAppel_FC = function (listeIndividusAuJugement) {
            jugementService.faireAppel_FS(listeIndividusAuJugement)
                .success(function(){
                    console.log('successfull add');
                    $scope.message = {
                        class: "bg-success",
                        msg: "L'appel a été éffectué avec succes"
                    };
                    $timeout(function () {
                        $window.location.href = "/detailsAffaireAuJugement/"+listeIndividusAuJugement.id_jugement;
                        $scope.message = null;
                    }, 1000);
                })
                .error(function(){
                    console.log('failed');
                })
        }

        $scope.editAppel = false;
        $scope.editAppel_FC = function(){
            $scope.editAppel = true;
        }
        $scope.annulerEditAppel_FC = function(){
            $scope.editAppel = false;
        }
        $scope.editCertificat = false;
        $scope.editCertificat_FC = function(){
            $scope.editCertificat = true;
        }
        $scope.annulerEditCertificat_FC = function(){
            $scope.editCertificat = false;
        }

    }]).

    factory('jugementService', ['$http', '$location', function($http, $location){

        return{

            ajouterJugement_FS : function (jugementFormItems) {

                return $http.post(
                    '/ajouterJugement_url',
                    {
                        //numero_jugement : jugementFormItems.numero_jugement,
                        president : jugementFormItems.president,
                        assesseurs : jugementFormItems.assesseurs,
                        substitut : jugementFormItems.substitut,
                        greffier : jugementFormItems.greffier,
                        //date_jugement : jugementFormItems.date_jugement,
                        date_saisie_jugement : jugementFormItems.date_saisie_jugement,
                        heure_audience : jugementFormItems.heure_audience,
                        salle_audience : jugementFormItems.salle_audience,
                        observation : jugementFormItems.observation
                    }
                );
            },

            listeJugement_FS : function(){

                return $http.get('/listeJugement_url');
            },

            recupIdJugementJr_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var jugementId = segments[segments.length -1];
                return jugementId;
            },

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var idAffaire = segments[segments.length -1];
                return idAffaire;
            },

            jugementDuJour_FS : function(jugementId){

                return $http.get('/jugementJr_url/'+jugementId);
            },

            listeAffaireJugementJr_FS : function(){

                return $http.get('/listeAffaireJugementJr_url');
            },

            ajouterAffaireJugement_FS : function(affaireJugementItems, jugementId){

                return $http.post('/ajouterAffaireJugement_url',
                    {
                        id : jugementId,
                        auJugement : affaireJugementItems.auJugement,
                        id_affaire : affaireJugementItems.id_affaire
                    });
            },

            publierAffaire_FS : function(affairePublieItems, jugementId){

                return $http.post('/publieAffaire_url',
                    {
                        id : jugementId,
                        etat_publication : affairePublieItems.etat_publication
                    });
            },

            nbreAffairesAjoute_FS : function(){

                return $http.get('/listeAffairesAjoutes_url');
            },

            listeAffaireAJuger_FS : function(){

                return $http.get('/listeAffaireAJuger_url');
            },

            individusAJuger_FS : function(){

                return $http.get('/individusAJuger_url');
            },

            recupAffaireAJuger_FS : function(idAffaire){

                return $http.get('/recupAffaireAJuger_url/'+idAffaire);
            },

            reporterJugementAffaire_FS : function(reportItems, idAffaire){

                return $http.post('/reportJugementAffaire',
                    {
                        id_affaire : idAffaire,
                        transJugement : reportItems.transJugement,
                        auJugement : reportItems.auJugement,
                        date_report : reportItems.date_report
                    })
            },

            listeAffaireATraiter_FS : function(idAffaire){

                return $http.get('/listeAffaireATraiter_url/'+idAffaire);
            },

            detailAffairesJuge_FS : function(idAffaire){

                return $http.get('/detailAffairesJuge_url/'+idAffaire);
            },

            detailAffairesJugeSup_FS : function(idAffaire){

                return $http.get('/detailAffairesJugeSup_url/'+idAffaire);
            },

            listePartiesAffairesJuge_FS : function(idAffaire){

                return $http.get('/listePartiesAffairesJuge_url/'+idAffaire);
            },

            listeAgent_FS : function(){

                return $http.get('/listeAgents_url');
            },

            listeSalleAudiences_FS :function(){

                return $http.get('/listeSalleAudiences_url');
            },

            listeNumeroAffaire_FS :function(){

                return $http.get('/listeNumeroAffaire_url');
            },

            traiterAffaire_FS :function(jugementFormItems){

                return $http.post('/traiterAffaire_url',
                    {
                        id_cours : jugementFormItems.id_cours,
                        id_affaire_cours : jugementFormItems.id_affaire_cours,
                        president : jugementFormItems.president,
                        assesseurs : jugementFormItems.assesseurs,
                        substitut : jugementFormItems.substitut,
                        greffier : jugementFormItems.greffier,
                        id_salleAudience_cours : jugementFormItems.id_salleAudience,
                        type_affaire : jugementFormItems.typeAffaire,
                        observation_plumitif : jugementFormItems.observation_plumitif
                    });
            },

            listeAffairesPlumitif_FS : function(){

                return $http.get("/affairesPlumitif_url");
            },

            listeAffairesJuge_FS : function(){

                return $http.get("/listeAffairesJuge_url");
            },

            listeAffairesExpedition_FS : function(){

                return $http.get("/listeAffairesExpedition_url");
            },

            repporterAffaire_FS : function(jugementFormItems){

                return $http.post("/repporterAffaire_url",
                    {
                        id_affaire : jugementFormItems.id_affaire_cours,
                        date_audience : jugementFormItems.date_audience,
                        date_report : jugementFormItems.date_report
                    });
            },

            modif_typeAffaire_FS : function(jugementFormItems){

                return $http.post("/modif_typeAffaire_url",
                {
                    id_affaire_cours : jugementFormItems.id_affaire_cours
                });
            },

            jugerAffaire_FS : function(jugementFormItems){

                return $http.post("/jugerAffaire_url",
                    {
                        id_affaire : jugementFormItems.id_affaire_cours
                    });
            },

            annulerJugerAffaire_FS : function(jugementFormItems){

                return $http.post("/annulerJugerAffaire_url",
                    {
                        id_affaire : jugementFormItems.id_affaire_cours
                    });
            },

            listeAffaireAEnregisitrer_FS : function(idAffaire){

                return $http.get('/listeAffaireAEnregisitrer_url/'+idAffaire);
            },

            listeCaractere_FS : function(){

                return $http.get('/listeCaractere_url');
            },

            fondeAffaire_FS : function(jugementFormItems){

                return $http.post('/fondeAffaire_url', {id_affaire : jugementFormItems.id_affaire_cours});
            },

            annulerFondeAffaire_FS : function(jugementFormItems){

                return $http.post('/annulerFondeAffaire_url', {id_affaire : jugementFormItems.id_affaire_cours});
            },

            malFondeAffaire_FS : function(jugementFormItems){

                return $http.post('/malFondeAffaire_url', {id_affaire : jugementFormItems.id_affaire_cours});
            },

            annulerMalFondeAffaire_FS : function(jugementFormItems){

                return $http.post('/annulerMalFondeAffaire_url', {id_affaire : jugementFormItems.id_affaire_cours});
            },

            partiellementFondeAffaire_FS : function(jugementFormItems){

                return $http.post('/partiellementFondeAffaire_url', {id_affaire : jugementFormItems.id_affaire_cours});
            },

            annulerPartiellementFondeAffaire_FS : function(jugementFormItems){

                return $http.post('/annulerPartiellementFondeAffaire_url', {id_affaire : jugementFormItems.id_affaire_cours});
            },

            enregistrerAuJugement_FS : function(jugementFormItems){

                return $http.post("/enregistrerAuJugement_url",
                    {
                        id_affaire : jugementFormItems.id_affaire_cours,
                        numero_jugement : jugementFormItems.numero_jugement,
                        id_caractere : jugementFormItems.id_caractere_jugement,
                        observation : jugementFormItems.observation_jugement,
                        signature_greffier : jugementFormItems.greffier,
                        signature_president : jugementFormItems.president
                    })
            },

            activeQualite_FS : function(idAffaire){
                return $http.post('/activeQualite_url',
                    {
                        id_affaire : idAffaire
                    }
                )
            },

            closeQualite_FS : function(idAffaire){
                return $http.post('/closeQualite_url',
                    {
                        id_affaire : idAffaire
                    }
                )
            },

            activeFactum_FS : function(idAffaire){
                return $http.post('/activeFactum_url',
                    {
                        id_affaire : idAffaire
                    }
                )
            },

            closeFactum_FS : function(idAffaire){
                return $http.post('/closeFactum_url',
                    {
                        id_affaire : idAffaire
                    }
                )
            },

            activeExpedition_FS : function(idAffaire){
                return $http.post('/activeExpedition_url',
                    {
                        id_affaire : idAffaire
                    }
                )
            },

            closeExpedition_FS : function(idAffaire){
                return $http.post('/closeExpedition_url',
                    {
                        id_affaire : idAffaire
                    }
                )
            },

            detailsAffaireAuJugement_FS : function(idAffaire){
                return $http.get('/detailsAffaireAuJugement_url/'+idAffaire);
            },

            individusAuJugement_FS : function(id_jugement){
                return $http.get('/individusAuJugement_url/'+id_jugement);
            },

            faireAppel_FS : function(listeIndividusAuJugement){
                return $http.post('/individusAuJugement_url',
                    {
                        id_jugement : listeIndividusAuJugement.id_jugement,
                        id_individu : listeIndividusAuJugement.id_individu
                    });
            },

            appelInfo_FS : function(jugementId){
                return $http.get('/appelInfo_url/'+jugementId);
            }

        };

    }]);

    /////////////////////////////////////////////////

