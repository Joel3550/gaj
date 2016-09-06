angular.module('app', ['ui.bootstrap']).
    controller('roleAudienceController', ['$scope', 'roleAudienceService', '$timeout', '$window', '$log', '$modal',
        function($scope, roleAudienceService, $timeout, $window, $log, $modal){

        $scope.dateSyst = new Date();
        $scope.dateJour = "";
        $scope.audiences = [];
        $scope.natures = [];
        $scope.listeChambres = [];
        $scope.parties = [];
        $scope.defendeurs = [];
        $scope.affaireItems = [];
        $scope.listeAgentsCours = [];
        $scope.listeSalleAudiences = [];
        $scope.listeAgents = [];
        $scope.clickEvent = false;
        $scope.coursAffaireItems = [];
        $scope.chambreAffaires = [];
        $scope.compositionCours = [];
        $scope.coursForChambre = [];
        $scope.listeDateAffaire = [];
        $scope.affaires = [];
        $scope.nbr = "";
        $scope.verifCours = false;
        $scope.publieStatut = false;
        $scope.listeCoursAffaireBis = [];
        $scope.listePresidents = [];
        $scope.listeGreffier = [];
        $scope.listeDateAudiences = [];
        $scope.affaireRetour = [];
        $scope.etatPublie = false;

        $scope.chambreItems = {
            id_chambre : ""
        };

        $scope.coursFormItems = {

            president : "",
            greffier : "",
            assesseurs : "",
            substitut : "",
            id_affaire_cours : "",
            id_salleAudience_cours : "",
            //numero_ordre : "",
            id_chambre_cours : "",
            id_cours : "",
            president : "",
            id_affaire : "",
            id_salleAudience : "",
            date_audience : "",
            type_affaire : "Nouvelle"
        };

        $scope.ajusterAffaireItem = {
            date_saisie_affaire : new Date()
        };

        $scope.audienceFormItems = {

            numero_ordre : "",
            date_saisie_affaire: new Date(),
            objet_affaire:"",
            date_audience:"",
            observation:"",
            id_nature_affaire:"",
            id_chambre_affaire:""
        };

    if(sessionStorage.getItem('username')) {

        nettoyer_FC();
        //affaireAudience_FC();
        listeAudience_FC();
        listeNature_FC();
        listeChambre_FC();
        listeParties_FC();
        listeDefendeurs_FC();
        affaireItems_FC();
        listeAgentsCours_FC();
        listeAgents_FC();
        formModifCours_FC();
        listeSalleAudiences_FC();
        compositionCours_FC();
        chambreAffaires_FC();
        listeDateAffaire_FC();
        listeAffaire_FC();
        verifCoursAffaire_bis_FC();
        listeCours_FC();
        listePresidents_FC();
        listeGreffiers_FC();
        listeSalle_FC();
        affaireForCours_FC();
        listeDateAudience_FC();
        publicationAffaire_FC();

        $scope.cpt = 0;
        function publicationAffaire_FC() {

            roleAudienceService.publicationAffaire_FS(roleAudienceService.recupDateAudienceAffaires_FS())
                .success(function (data) {
                    if (data && data.listeAffairesPublieJson && data.listeAffairesPublieJson.length > 0) {
                        console.log(data.listeAffairesPublieJson);
                        $scope.listeAffairesPublie = data.listeAffairesPublieJson;
                        $scope.listeAffairesPublie.date_audience = data.listeAffairesPublieJson[0]['date_audience'];
                        $scope.listeAffairesPublie.president = data.listeAffairesPublieJson[0]['president'];
                        $scope.listeAffairesPublie.greffier = data.listeAffairesPublieJson[0]['greffier'];
                        $scope.listeAffairesPublie.commentaire = data.listeAffairesPublieJson[0]['commentaire'];
                        $scope.listeAffairesPublie.libelle_nature = data.listeAffairesPublieJson[0]['libelle_nature'];
                        $scope.listeAffairesPublie.libelle_salleAudience = data.listeAffairesPublieJson[0]['libelle_salleAudience'];

                    }
                })
        }

        $scope.modalRetourAffaire_FC = function (idAffaire) {

            recupAffaireItems_FC();

            function recupAffaireItems_FC() {

                roleAudienceService.recupAffaireItems_FS(idAffaire)
                    .success(function (data) {
                        if (data && data.affaireRetourJson && data.affaireRetourJson.length > 0) {
                            console.log(data.affaireRetourJson);
                            $scope.affaireRetour = data.affaireRetourJson;
                            $scope.affaireRetour.numero_ordre = data.affaireRetourJson[0]['numero_ordre'];
                        }
                    })
            }

            $scope.coursFormItems.id_affaire = idAffaire;
            var modalInstance = $modal.open({
                templateUrl: '/formulaireMotifRetour/' + idAffaire,
                controller: retourAffaire_FC,
                scope: $scope,
                resolve: {
                    affaireForm: function () {
                        return $scope.affaireForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }

        var retourAffaire_FC = function ($scope, $modalInstance, affaireForm) {
            $scope.submitForm = function () {
            }
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            }
        }

        $scope.retourAffaire_FC = function (coursFormItems) {

            roleAudienceService.retourAffaire_FS(coursFormItems)
                .success(function () {
                    console.log('successful add');
                    $scope.message = {class: "bg-success", msg: "Affaire repporté avec succès"};
                    $timeout(function () {
                        $window.location.href = "/consultationAffairesAudience_url";
                    }, 1000);
                })
                .error(function () {
                    console.log('failed');
                    $timeout(function () {
                        $scope.message = {
                            class: "bg-danger",
                            msg: "Une erreur est survenue lors de l'enregisrement"
                        };
                    }, 1000);
                })
        }

        $scope.autoriserPublieAffaire_FC = function (idAffaire) {

            roleAudienceService.autoriserPublieAffaire_FS(idAffaire)
                .success(function () {
                    console.log("successful published");
                    $scope.etatPublie = true;
                })
                .error(function () {
                    console.log("failed");
                })
        }

        $scope.annulerPublieAffaire_FC = function (idAffaire) {

            roleAudienceService.annulerPublieAffaire_FS(idAffaire)
                .success(function () {
                    console.log("successful cancel published");
                    //$scope.etatPublie = false;
                })
                .error(function () {
                    console.log("failed");
                })
        }

        function listeDateAudience_FC() {

            roleAudienceService.listeDateAudience_FS()
                .success(function (data) {
                    if (data && data.dateAudiencesJson && data.dateAudiencesJson.length > 0) {
                        console.log(data.dateAudiencesJson);
                        $scope.listeDateAudiences = data.dateAudiencesJson;
                    }
                })
        }

        function listePresidents_FC() {

            roleAudienceService.listePresidents_FS()
                .success(function (data) {
                    if (data && data.presidentsJson && data.presidentsJson.length > 0) {
                        console.log(data.presidentsJson);
                        $scope.presidents = data.presidentsJson;
                    }
                })
        }

        function listeGreffiers_FC() {

            roleAudienceService.listeGreffiers_FS()
                .success(function (data) {
                    if (data && data.greffiersJson && data.greffiersJson.length > 0) {
                        console.log(data.greffiersJson);
                        $scope.greffiers = data.greffiersJson;
                    }
                })
        }

        function affaireForCours_FC() {

            roleAudienceService.affaireForCours_FS()
                .success(function (data) {
                    if (data && data.affaireForCoursJson && data.affaireForCoursJson.length > 0) {
                        console.log(data.affaireForCoursJson);
                        $scope.affaireForCours = data.affaireForCoursJson;
                    }
                })
        }

        function listeSalle_FC() {

            roleAudienceService.listeSalle_FS()
                .success(function (data) {
                    if (data && data.sallesJson && data.sallesJson.length > 0) {
                        $scope.salles = data.sallesJson;
                    }
                })
        }

        function listeCours_FC() {

            roleAudienceService.listeCours_FS()
                .success(function (data) {
                    if (data && data.coursJson && data.coursJson.length > 0) {
                        $scope.cours = data.coursJson;
                    }
                })
        }

        $scope.publieEvent = function () {
            $scope.publieStatut = true;
        }

        $scope.closePublieEvent = function () {
            $scope.publieStatut = false;
        }

        function verifCoursAffaire_bis_FC() {
            roleAudienceService.verifCoursAffaire_bis_FS()
                .success(function (data) {
                    if (data && data.listeCoursAffaireBisJson && data.listeCoursAffaireBisJson.length > 0) {
                        console.log(data.listeCoursAffaireBisJson);
                        $scope.listeCoursAffaireBis = data.listeCoursAffaireBisJson;
                    }
                });
        }

        function nettoyer_FC() {

            $scope.coursFormItems.president = "";
            $scope.coursFormItems.assesseurs = "";
            $scope.coursFormItems.substitut = "";
            $scope.coursFormItems.greffier = "";
            $scope.coursFormItems.id_salleAudience_cours = "";
        }

        //MODAL COMPOSITION DE LA COURS/////////
        $scope.ajoutCoursAffaire = function (idAffaire) {

            verifCoursAffaire_FC();
            $scope.verifStatut = false;

            function verifCoursAffaire_FC() {
                roleAudienceService.verifCoursAffaire_FS(idAffaire)
                    .success(function (data) {
                        if (data && data.listeCoursAffaireJson && data.listeCoursAffaireJson.length > 0) {
                            console.log(data.listeCoursAffaireJson);
                            $scope.listeCoursAffaire = data.listeCoursAffaireJson;
                            $scope.verifStatut = true;
                        } else {
                            $scope.verifStatut = false;
                        }
                    });
            }

            $scope.message = "Show Form for ";
            $scope.coursFormItems.id_affaire_cours = idAffaire;
            console.log($scope.message);
            var modalInstance = $modal.open({
                templateUrl: '/formulaireCompositionCours/' + idAffaire,
                controller: ajouterCours_FC,
                scope: $scope,
                resolve: {
                    coursForm: function () {
                        return $scope.coursForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        var ajouterCours_FC = function ($scope, $modalInstance, coursForm) {

            $scope.listeCoursAffaire = [];

            $scope.submitForm = function () {
                console.log(idAffaire);
                if ($scope.form.coursForm.$valid) {
                    roleAudienceService.ajouterCours_FS()
                        .success(function () {
                            console.log('successful add');
                            $scope.message = {class: "bg-success", msg: "La cours a ete enregistrée avec succes"};
                            $timeout(function () {
                                $window.location.href = '/compositionCours_url';
                                $scope.message = null;
                            }, 2000);
                        })
                        .error(function () {
                            console.log('failed');
                            $timeout(function () {
                                $scope.message = {class: "bg-danger", msg: "Impossible d'enregistrer la cours"};
                            }, 1000);
                        })
                    console.log('user form is in scope');
                    $modalInstance.close('closed');
                } else {
                    console.log('userform is not in scope');
                }
            }

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            }
        }
        //FIN DE LA COMPOSITION ////////////////

        function listeAffaire_FC() {

            roleAudienceService.listeAffaire_FS()
                .success(function (data) {
                    if (data && data.affairesJson && data.affairesJson.length > 0) {
                        console.log(data.affairesJson);
                        $scope.affaires = data.affairesJson;
                    }
                });

        }

        function listeDateAffaire_FC() {

            roleAudienceService.listeDateAffaire_FS()
                .success(function (data) {
                    if (data && data.listeDateAffaireJson && data.listeDateAffaireJson.length > 0) {
                        console.log(data.listeDateAffaireJson);
                        $scope.listeDateAffaire = data.listeDateAffaireJson;
                    }
                })
        }

        $scope.coursForChambre_FC = function (coursFormItems) {

            roleAudienceService.coursForChambre_FS(coursFormItems)
                .success(function (data) {
                    if (data && data.coursForChambreJson && data.coursForChambreJson.length > 0) {
                        console.log(data.coursForChambreJson);
                        $scope.coursForChambre = data.coursForChambre;
                        $scope.nbr = data.coursForChambreJson.length;
                    } else {
                        $scope.nbr = null;
                    }
                })
        }

        function compositionCours_FC() {
            roleAudienceService.compositionCours_FS()
                .success(function (data) {
                    if (data && data.compositionCoursJson && data.compositionCoursJson.length > 0) {
                        console.log(data.compositionCoursJson);
                        $scope.compositionCours = data.compositionCoursJson;
                        for (var i = 0; i <= data.compositionCoursJson.length; i++) {
                            if ($scope.coursFormItems.id_affaire_cours != data.compositionCoursJson[i]['id_affaire_cours']) {
                                $scope.verifCours = true;
                                console.log($scope.verifCours);
                                break;
                            }
                        }
                    }
                })
        }

        function chambreAffaires_FC() {

            roleAudienceService.chambreAffaires_FS()
                .success(function (data) {
                    if (data && data.chambreAffairesJson && data.chambreAffairesJson.length > 0) {
                        console.log(data.chambreAffairesJson);
                        $scope.chambreAffaires = data.chambreAffairesJson;
                        $scope.coursFormItems.id_chambre_cours = $scope.chambreItems.id_chambre;
                        //$scope.audienceFormItems.id_chambre_affaire = $scope.chambreItems.id_chambre;
                        //$scope.clickEvent = true;
                        //}
                        //else{
                        //    $scope.clickEvent = false;
                    }
                })
        }

        function listeSalleAudiences_FC() {

            roleAudienceService.listeSalleAudiences_FS()
                .success(function (data) {

                    if (data && data.salleAudiencesJson && data.salleAudiencesJson.length > 0) {
                        console.log(data.salleAudiencesJson);
                        $scope.listeSalleAudiences = data.salleAudiencesJson;
                    }
                })
        }

        $scope.callFormModifCours_FC = function () {

            $scope.clickEvent = true;
        }

        function formModifCours_FC() {

            roleAudienceService.formModifCours_FS(roleAudienceService.recupIdAffaire_FS())
                .success(function (data) {
                    if (data && data.coursAffaireJson && data.coursAffaireJson.length > 0) {
                        console.log(data.coursAffaireJson);
                        $scope.coursAffaireItems = data.coursAffaireJson;
                        $scope.coursAffaireItems.president = data.coursAffaireJson[0]['president'];
                        $scope.coursAffaireItems.greffier = data.coursAffaireJson[0]['greffier'];
                        $scope.coursAffaireItems.substitut = data.coursAffaireJson[0]['substitut'];
                        $scope.coursAffaireItems.assesseurs = data.coursAffaireJson[0]['assesseurs'];
                        $scope.coursAffaireItems.libelle_salleAudience = data.coursAffaireJson[0]['libelle_salleAudience'];
                        $scope.coursAffaireItems.id_salleAudience = data.coursAffaireJson[0]['id_salleAudience'];
                        $scope.coursAffaireItems.id_salleAudience_cours = data.coursAffaireJson[0]['id_salleAudience_cours'];
                        $scope.coursAffaireItems.id_user_affaire = data.coursAffaireJson[0]['id_user_affaire'];
                    }
                })
        }

        $scope.annulerFormCours = function () {

            $scope.nbr = 1;
        }

        $scope.ajouterCours_FC = function (coursFormItems) {

            roleAudienceService.ajouterCours_FS(coursFormItems)
                .success(function () {
                    console.log('successful add');
                    $scope.message = {class: "bg-success", msg: "L'affaire a ete enregistre avec succes"};
                    $timeout(function () {
                        $window.location.href = '/compositionCours_url';
                    }, 1000);
                    nettoyer_FC();
                })
                .error(function () {
                    console.log('failed');
                    $timeout(function () {
                        $scope.message = {
                            class: "bg-danger",
                            msg: "Une erreur est survenue lors de l'enregisrement"
                        };
                    }, 1000);
                })
        }

        function listeAgents_FC() {

            roleAudienceService.listeAgents_FS()
                .success(function (data) {
                    if (data && data.agentsJson && data.agentsJson.length > 0) {
                        console.log(data.agentsJson);
                        $scope.listeAgents = data.agentsJson;
                    }
                })
        }

        function listeAgentsCours_FC() {

            roleAudienceService.listeAgentsCours_FS(roleAudienceService.recupIdAffaire_FS())
                .success(function (data) {
                    if (data && data.agentCoursJson && data.agentCoursJson.length > 0) {
                        console.log(data.agentCoursJson);
                        $scope.listeAgentsCours = data.agentCoursJson;
                    }
                })
        }

        function affaireItems_FC() {

            roleAudienceService.affaireItems_FS(roleAudienceService.recupIdAffaire_FS())
                .success(function (data) {
                    if (data && data.affaireItemsJson && data.affaireItemsJson.length > 0) {
                        console.log(data.affaireItemsJson);
                        $scope.affaireItems.id_affaire = data.affaireItemsJson[0]['id_affaire'];
                        $scope.affaireItems.numero_ordre = data.affaireItemsJson[0]['numero_ordre'];
                        $scope.affaireItems.objet_affaire = data.affaireItemsJson[0]['objet_affaire'];
                        $scope.affaireItems.observation = data.affaireItemsJson[0]['observation'];
                        $scope.affaireItems.libelle_chambre = data.affaireItemsJson[0]['libelle_chambre'];
                        $scope.affaireItems.libelle_nature = data.affaireItemsJson[0]['libelle_nature'];
                        //$scope.coursFormItems.id_affaire_cours = data.affaireItemsJson[0]['id_affaire'];
                    }
                })
        }

        function listeAudience_FC() {

            $scope.id_user = sessionStorage.getItem("azwackyx");
            roleAudienceService.listeAudience_FS()
                .success(function (data) {

                    if (data && data.audiencesJson && data.audiencesJson.length > 0) {
                        $scope.audiences = data.audiencesJson;
                        var i = data.audiencesJson.length - 1;
                        if (data.audiencesJson[i]['date_saisie_affaire']) {
                            $scope.dateJour = data.audiencesJson[i]['date_saisie_affaire'];
                        }
                    }
                });
        }

        function listeNature_FC() {

            roleAudienceService.listeNature_FS()
                .success(function (data) {

                    if (data && data.naturesJson && data.naturesJson.length > 0) {

                        console.log(data.naturesJson);
                        $scope.natures = data.naturesJson;
                    }
                });
        }

        function listeChambre_FC() {

            roleAudienceService.listeChambre_FS()
                .success(function (data) {

                    if (data && data.listeChambresJson && data.listeChambresJson.length > 0) {

                        console.log(data.listeChambresJson);
                        $scope.listeChambres = data.listeChambresJson;
                    }
                });
        }

        function listeParties_FC() {

            roleAudienceService.listeParties_FS()
                .success(function (data) {

                    if (data && data.partiesJson && data.partiesJson.length > 0) {

                        console.log(data.partiesJson);
                        $scope.parties = data.partiesJson;
                    }
                });
        }

        function listeDefendeurs_FC() {

            roleAudienceService.listeDefendeurs_FS()
                .success(function (data) {

                    if (data && data.defendeursJson && data.defendeursJson.length > 0) {

                        console.log(data.defendeursJson);
                        $scope.defendeurs = data.defendeursJson;
                    }
                });
        }


        $scope.generatPdf = function () {
            //html2canvas(document.getElementById('affaireAudience'), {
            //    onrendered : function(canvas){
            //        var data = canvas.toDataURL();

            var docDefinition = {
                content: document.body
            };
            pdfMake.createPdf(docDefinition).open("affaireAudience.pdf");
            //    }
            //});
        }

        $scope.exportAction_FC = function () {

            roleAudienceService.exportAction_FS()
                .success(function () {
                    console.log('successful')
                })
                .error(function () {
                    console.log('error')
                })
        }
    }else {
            $window.location.href = "/login";
        }
    }]).

    factory('roleAudienceService', ['$http', '$location', function($http, $location){

        return{

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            listeAudience_FS : function(){

                return $http.get('/listeAudiences_url');
            },

            listeNature_FS : function(){

                return $http.get('/listeNatures_url');
            },

            listeChambre_FS : function(){

                return $http.get('/listeChambresAffaires_url');
            },

            listeParties_FS : function(){

                return $http.get('/listeParties_url');
            },

            listeDefendeurs_FS : function(){

                return $http.get('/listeDefendeur_url');
            },

            ajusterDateAffaire_FS : function (ajusterAffaireItem, audienceId) {

                return $http.post('/ajusterDateAffaire',
                    {
                        id : audienceId,
                        date_saisie_affaire : ajusterAffaireItem.date_saisie_affaire
                    });
            },

            ajouterCours_FS : function (coursFormItems) {

                return $http.post('/ajouterCours_url',
                    {
                        president : coursFormItems.president,
                        greffier : coursFormItems.greffier,
                        assesseurs : coursFormItems.assesseurs,
                        substitut : coursFormItems.substitut,
                        id_affaire_cours : coursFormItems.id_affaire_cours,
                        id_salleAudience_cours : coursFormItems.id_salleAudience_cours,
                        id_chambre_cours : coursFormItems.id_chambre_cours,
                        type_affaire : coursFormItems.type_affaire
                    });
            },

            affaireItems_FS : function(affaireId){

                return $http.get('/affaireItems_url/'+affaireId);
            },

            listeAgentsCours_FS : function(affaireId){

                return $http.get('/listeAgentsCours_url/'+affaireId);
            },

            listeAgents_FS : function(){

                return $http.get('/listeAgents_url');
            },

            formModifCours_FS :function(affaireId){

                return $http.get('/formModifCours_url/'+affaireId);
            },

            listeSalleAudiences_FS :function(){

                return $http.get('/listeSalleAudiences_url');
            },

            chambreAffaires_FS : function(){

                return $http.get('/chambreAffaires_url');
            },

            compositionCours_FS : function(){

                return $http.get('/composition_url')
            },

            coursForChambre_FS : function(coursFormItems){

                return $http.post('/coursForChambre_url', {id_chambre : coursFormItems.id_chambre_cours})
            },

            listeDateAffaire_FS : function(){

                return $http.get('/listeDateAffaire_url')
            },

            listeAffaire_FS : function(){

                return $http.get('/listeAffaires_url');
            },

            verifCoursAffaire_FS : function(idAffaire){

                return $http.get('/listeCoursAffaire_url/'+idAffaire);
            },

            verifCoursAffaire_bis_FS : function(){

                return $http.get('/listeCoursAffaireBis_url');
            },

            listeCours_FS : function(){

                return $http.get('/listeCours_url');
            },

            listeSalle_FS : function(){

                return $http.get('/listeSalle_url');
            },

            affaireForCours_FS : function(){

                return $http.get('/affaireForCours_url');
            },

            listePresidents_FS : function(){

                return $http.get('/listePresidents_url');
            },

            listeGreffiers_FS : function(){

                return $http.get('/listeGreffiers_url');
            },

            listeDateAudience_FS : function(){

                return $http.get('/listeDateAudience_url');
            },

            autoriserPublieAffaire_FS : function(idAffaire){

                return $http.get('/autoriserPublieAffaire_url/'+idAffaire);
            },

            annulerPublieAffaire_FS : function(idAffaire){

                return $http.get('/annulerPublieAffaire_url/'+idAffaire);
            },

            recupAffaireItems_FS : function(idAffaire){

                return $http.get('/recupAffaireItems_url/'+idAffaire);
            },

            retourAffaire_FS : function(coursFormItems){

                return $http.post('/retourAffaire_url', {
                    id_affaire : coursFormItems.id_affaire,
                    motif_retour : coursFormItems.motif_retour
                });
            },

            recupDateAudienceAffaires_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var dateAudience = segments[segments.length -1];
                return dateAudience;
            },

            publicationAffaire_FS : function(dateAudience){

                return $http.get('/publicationAffaire_url/'+dateAudience);
            },

            exportAction_FS : function(){

                return $http.get('/exportAction_url');
            }
        };

    }]);

    /////////////////////////////////////////////////

