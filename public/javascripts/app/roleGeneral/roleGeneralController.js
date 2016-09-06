angular.module('app', ['ngSanitize', 'ui.bootstrap', 'ngFileUpload']).
    controller('roleGeneralController', ['Upload', '$scope', 'roleGeneralService', '$timeout', '$window', '$location', '$log', '$modal',
        function(Upload, $scope, roleGeneralService, $timeout, $window, $location, $log, $modal){


        $scope.affaires = [];
        $scope.natures = [];
        $scope.chambres = [];
        $scope.demandeurs = [];
        $scope.defendeurs = [];
        $scope.nom_individu = [];
        $scope.dateJour = "";
        $scope.date = new Date();
        $scope.listeIndividus = [];
        $scope.affaireCourante = [];
        $scope.suivantStatut = false;
        //$scope.clickEvent = false;
        $scope.numeroValide = false;
        $scope.affaireDate = [];
        $scope.affaireForDate = [];
        $scope.numeroOrdre = [];
        $scope.individusForAffaire = [];
        $scope.parties = [];
        $scope.reglements = [];
        $scope.etatModif = false;
        $scope.mois = new Date().getUTCMonth();
        $scope.date = new Date().getUTCDate();
        $scope.year = new Date().getUTCFullYear();

        if($scope.mois < 10){
            $scope.mois = "0"+$scope.mois;
        }
        if($scope.date < 10){
            $scope.date = "0"+$scope.date;
        }
        if($scope.year < 10){
            $scope.year= "0"+$scope.year;
        }

        getRandomArbitrary();
        function getRandomArbitrary(min, max) {
            var random = Math.random() * (max - min) + min;
            return Math.round(random);
        }

        $scope.affaireFormItems = {

            numero_ordre : "RG"+$scope.date+""+$scope.mois+""+getRandomArbitrary(100, 999),
            //numero_ordre : "RG"+getRandomArbitrary(10000, 99999)+"/"+$scope.year,
            date_saisie_affaire: new Date(),
            objet_affaire:"",
            date_audience:"",
            observation:"",
            id_nature_affaire:"",
            id_chambre_affaire:"",
            doc_scan:""
        };

    if(sessionStorage.getItem('username')){
        nettoyer_FC();
        listeAffaire_FC();
        listeNature_FC();
        listeChambre_FC();
        infoAffaire_FC();
        listeIndividus_FC();
        listeAffaireDate_FC();
        individuForIdAffaire_FC();
        reglement_FC();

        $scope.supprimerIndividu_FC = function (individuId) {

            roleGeneralService.supprimerIndividu_FS(individuId)
                .success(function () {
                    console.log("successful delete");
                    $scope.message = {
                        class: "bg-success",
                        msg: "L'affaire a ete supprimer avec succes"
                    };
                    $timeout(function () {
                        $window.location.href = "/listeAffaires";
                        $scope.message = null;
                    }, 1000);
                })
                .error(function () {
                    console.log("failed");
                })
        };

        $scope.etatModif_FC = function () {

            $scope.etatModif = true;
        }
        $scope.annulEtatModif_FC = function () {

            $scope.etatModif = false;
        }

        function reglement_FC() {

            roleGeneralService.reglement_FS(roleGeneralService.recupIdAffaire_FS())
                .success(function (data) {
                    if (data && data.reglementAffaireJson && data.reglementAffaireJson.length > 0) {
                        console.log(data.reglementAffaireJson);
                        $scope.reglements = data.reglementAffaireJson;
                    }
                })
        }

        function individuForIdAffaire_FC() {

            roleGeneralService.individuForIdAffaire_FS(roleGeneralService.recupIdAffaire_FS())
                .success(function (data) {

                    if (data && data.individuForAffaireJson && data.individuForAffaireJson.length > 0) {
                        $scope.individusForAffaire = data.individuForAffaireJson;
                    }
                });
        }

        $scope.uploadFileModal = function () {

            var modalInstance = $modal.open({

                templateUrl: "/uploadFichier_url",
                controller: uploadFile_FC,
                scope: $scope
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Fermeture de la modal a: ' + new Date());
            });
        }
        var uploadFile_FC = function ($scope, $modalInstance) {

            $scope.submitForm = function () {
            }

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            }
        }

        $scope.fileUploadActive = false;
        $scope.fileUploadActive_FC = function () {
            $scope.fileUploadActive = true;
        }
        $scope.fileUploadisabled_FC = function () {
            $scope.fileUploadActive = false;
        }
        $scope.uploadFile_FC = function () {


        }

        $scope.afficherFichierModal = function(){

            var modalInstance = $modal.open({
                templateUrl: '/afficherFichier',
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
        $scope.afficherFichier_FC = function () {

            roleGeneralService.afficherFichier_FC()

        }

        $scope.modifReglementModal = function (reglementId) {

            recupReglement_FC();

            function recupReglement_FC() {
                roleGeneralService.recupReglement_FS(reglementId)
                    .success(function (data) {
                        if (data && data.reglementsJson && data.reglementsJson.length > 0) {
                            console.log(data.reglementsJson);
                            $scope.reglements = data.reglementsJson;
                            $scope.reglements.id_reglement = data.reglementsJson[0]['id_reglement'];
                            $scope.reglements.id_affaire_reglement = data.reglementsJson[0]['id_affaire_reglement'];
                            $scope.reglements.id_individu_reglement = data.reglementsJson[0]['id_individu_reglement'];
                            $scope.reglements.nom_individu = data.reglementsJson[0]['nom_individu'];
                            $scope.reglements.prenom_individu = data.reglementsJson[0]['prenom_individu'];
                            $scope.reglements.montant = data.reglementsJson[0]['montant'];
                        }
                    });
            }

            var modalInstance = $modal.open({
                templateUrl: '/formModifReglement/' + reglementId,
                controller: modifReglement_FC,
                scope: $scope,
                resolve: {
                    reglementForm: function () {
                        return $scope.reglementForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Fermeture de la modal a: ' + new Date());
            });
        }
        var modifReglement_FC = function ($scope, $modalInstance, reglementForm) {

            $scope.submitForm = function () {


            }

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            }
        }
        $scope.modifReglement_FC = function (reglements) {

            roleGeneralService.modifReglement_FS(reglements)
                .success(function () {
                    console.log("successful edit");
                    $window.location.reload();
                })
                .error(function () {
                    console.log("failed");
                })
        }

        $scope.modifIndividuModal = function (individuId) {

            recupPartie_FC();

            function recupPartie_FC() {
                roleGeneralService.recupPartie_FS(individuId)
                    .success(function (data) {
                        if (data && data.partieJson && data.partieJson.length > 0) {
                            console.log(data.partieJson);
                            $scope.parties = data.partieJson;
                            $scope.parties.id_individu = data.partieJson[0]['id_individu'];
                            $scope.parties.nom_individu = data.partieJson[0]['nom_individu'];
                            $scope.parties.prenom_individu = data.partieJson[0]['prenom_individu'];
                            $scope.parties.age = data.partieJson[0]['age'];
                            $scope.parties.libelle_typeIndividu = data.partieJson[0]['libelle_typeIndividu'];
                        }
                    });
            }

            $scope.message = "Show Form for ";
            //$scope.coursFormItems.id_affaire_cours = idAffaire;
            console.log($scope.message);
            var modalInstance = $modal.open({
                templateUrl: '/formModifIndividu/' + individuId,
                controller: modifIndividu_FC,
                scope: $scope,
                resolve: {
                    individuForm: function () {
                        return $scope.individuForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });


        }
        var modifIndividu_FC = function ($scope, $modalInstance, individuForm) {

            $scope.submitForm = function () {


            }

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            }
        }

        $scope.modifIndividu_FC = function (partie) {

            roleGeneralService.modifIndividu_FS(partie)
                .success(function () {
                    console.log("successful edit");
                    $window.location.reload();
                })
                .error(function () {
                    console.log("failed");
                })
        }

        function listeAffaireDate_FC() {

            roleGeneralService.listeAffaireDate_FS()
                .success(function (data) {
                    if (data && data.affaireDateJson && data.affaireDateJson.length > 0) {
                        console.log(data.affaireDateJson);
                        $scope.affaireDate = data.affaireDateJson;
                    }
                })

        }

        //TRI
        $scope.champTri = null;
        $scope.triDescendant = false;

        $scope.triAffaire = function (champ) {
            if ($scope.champTri == champ) {
                $scope.triDescendant = !$scope.triDescendant;
            } else {
                $scope.champTri = champ;
                $scope.triDescendant = false;
            }
        }
        $scope.cssChevronsTri = function (champ) {
            return {
                glyphicon: $scope.champTri == champ,
                'glyphicon-chevron-up': $scope.champTri == champ && !$scope.triDescendant,
                'glyphicon-chevron-down': $scope.champTri == champ && $scope.triDescendant
            }
        }

        $scope.recherche = null;
        //FIN TRI

        function nettoyer_FC() {

            $scope.affaireFormItems.objet_affaire = "";
            $scope.affaireFormItems.date_audience = "";
            $scope.affaireFormItems.observation = "";
            $scope.affaireFormItems.id_nature_affaire = "";
            $scope.affaireFormItems.id_chambre_affaire = "";
        }

        function listeAffaire_FC() {
            //$scope.dateVrai = false;
            $scope.nom_indvididu = "";
            $scope.id_user = sessionStorage.getItem("azwackyx")
            roleGeneralService.listeAffaire_FS()
                .success(function (data) {

                    if (data && data.affairesJson && data.affairesJson.length > 0) {
                        console.log(data.affairesJson);
                        $scope.affaires = data.affairesJson;
                        var i = data.affairesJson.length - 1;
                        if (data.affairesJson[i]['date_saisie_affaire']) {
                            $scope.dateJour = data.affairesJson[i]['date_saisie_affaire'];
                        }
                    }
                });

        }

        function listeNature_FC() {

            roleGeneralService.listeNature_FS()
                .success(function (data) {

                    if (data && data.naturesJson && data.naturesJson.length > 0) {

                        console.log(data.naturesJson);
                        $scope.natures = data.naturesJson;
                    }
                });
        }

        function listeChambre_FC() {

            roleGeneralService.listeChambre_FS()
                .success(function (data) {

                    if (data && data.chambresJson && data.chambresJson.length > 0) {

                        console.log(data.chambresJson);
                        $scope.chambres = data.chambresJson;
                    }
                });
        }

         function upload(file) {
            Upload.upload({
                url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    console.log('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'Chargement: ' + progressPercentage + '% '; // capture upload progress
            });
        };

        $scope.ajouterAffaire_FC = function (affaireFormItems) {

            roleGeneralService.ajouterAffaire_FS(affaireFormItems)

                .success(function (data) {
                    if (data.message) {
                        $scope.message = {class: 'bg-danger', msg: data.message};
                    } else {
                        if ($scope.formAffaire.file.$valid && $scope.affaireFormItems.doc_scan) { //check if from is valid
                            upload($scope.affaireFormItems.doc_scan); //call upload function
                        }
                        console.log('successfull add');
                        $scope.message = {
                            class: "bg-success",
                            msg: "L'affaire a ete ensregistre avec succes"
                        };
                        $timeout(function () {
                            $window.location.href = '/formAjoutIndividu';
                        }, 1000);
                        nettoyer_FC();
                        $scope.suivantStatut = true;
                    }
                })
                .error(function () {
                    console.log('failled');
                    $scope.message = {
                        class: "bg-danger",
                        msg: "Une erreur est survenue lors de l'enregisrement"
                    };
                    $timeout(function () {
                        $window.location.href = '/formAjoutAffaire'
                    }, 1000);
                });
        }

        function infoAffaire_FC() {

            roleGeneralService.infoAffaire_FS(roleGeneralService.recupIdAffaire_FS())
                .success(function (data) {
                    if (data && data.audienceJson && data.audienceJson.length > 0) {

                        $scope.affaireFormItems.date_saisie_affaire = data.audienceJson[0]['date_saisie_affaire'];
                        $scope.affaireFormItems.numero_ordre = data.audienceJson[0]['numero_ordre'];
                        $scope.affaireFormItems.observation = data.audienceJson[0]['observation'];
                        $scope.affaireFormItems.objet_affaire = data.audienceJson[0]['objet_affaire'];
                        $scope.affaireFormItems.date_audience = data.audienceJson[0]['date_audience'];
                        $scope.affaireFormItems.libelle_nature = data.audienceJson[0]['libelle_nature'];
                        $scope.affaireFormItems.libelle_chambre = data.audienceJson[0]['libelle_chambre'];
                        $scope.affaireFormItems.valide = data.audienceJson[0]['valide'];
                        $scope.affaireFormItems.id_affaire = data.audienceJson[0]['id_affaire'];
                        $scope.affaireFormItems.motif_retour = data.audienceJson[0]['motif_retour'];
                        $scope.affaireFormItems.doc_scan = data.audienceJson[0]['doc_scan'];

                    }

                })
        }

        function listeIndividus_FC() {

            roleGeneralService.listeIndividus_FS()
                .success(function (data) {
                    if (data && data.listeIndividusAffaireJson && data.listeIndividusAffaireJson.length > 0) {
                        console.log(data.listeIndividusAffaireJson);
                        $scope.listeIndividus = data.listeIndividusAffaireJson;
                    }
                })
        }
    } else {
        $window.location.href = "/login";
    }

    $scope.transmettreAffaire_FC = function (id_affaire) {

        roleGeneralService.transmettreAffaire_FS(id_affaire)
            .success(function () {
                console.log("successful edit");
                //$scope.message = {class: "bg-success", msg: "Affaire transmise avec succes"}
                //$timeout(function () {
                //    $window.location.href = '/listeAffaires'
                //}, 1000);
            })
            .error(function () {
                console.log("Failled");
                //$timeout(function () {
                //    $scope.message = {class: "bg-danger", msg: "Une erreur est intervenue lors de la transmission"}
                //}, 1000);
            })
    }

    $scope.annulerTransmettreAffaire_FC = function (id_affaire) {

        roleGeneralService.annulerTransmettreAffaire_FS(id_affaire)
            .success(function () {
                console.log("successful disabled");
                //$scope.message = {class: "bg-success", msg: "Affaire transmise avec succes"}
                //$timeout(function () {
                //    $window.location.href = '/listeAffaires'
                //}, 1000);
            })
            .error(function () {
                console.log("Failled");
                //$timeout(function () {
                //    $scope.message = {class: "bg-danger", msg: "Une erreur est intervenue lors de la transmission"}
                //}, 1000);
            })
    }

    $scope.transmettreAffaires = function () {

        $timeout(function () {
            $window.location.href = "/listeAffaires";
        }, 1000);
    }

    }]).

    filter("surbrillanceRecherche", function(){
        return function(input, recherche){
            if(recherche){
                return input.replace(new RegExp("(" + recherche + ")", "gi"), "<span class='surbrillanceRecherche'>$1</span>")
            }else {
                return input;
            }
        }
    })

    .factory('roleGeneralService', ['$http', '$location', '$q', function($http, $location, $q){

        return{

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            ajouterAffaire_FS : function (affaireFormItems) {

                return $http.post(
                    '/ajouterAffaire_url',
                    {
                        numero_ordre : affaireFormItems.numero_ordre,
                        date_saisie_affaire : affaireFormItems.date_saisie_affaire,
                        objet_affaire : affaireFormItems.objet_affaire,
                        date_audience : affaireFormItems.date_audience,
                        observation : affaireFormItems.observation,
                        id_nature_affaire : affaireFormItems.id_nature_affaire,
                        id_chambre_affaire : affaireFormItems.id_chambre_affaire,
                        doc_scan : affaireFormItems.doc_scan.name,
                        id_user_affaire : sessionStorage.getItem('azwackyx')
                    }
                );
            },

            listeAffaire_FS : function(){

                return $http.get('/listeAffaires_url');
            },

            listeNature_FS : function(){

                return $http.get('/listeNatures_url');
            },

            listeChambre_FS : function(){

                return $http.get('/listeChambres_url');
            },

            infoAffaire_FS : function(affaireId){

                return $http.get('/recupValidationAudience_url/'+affaireId);
            },

            listeIndividus_FS : function(){

                return $http.get('/listeIndividusAffaire_url');
                //return $http.get('/listeIndividus_url');
            },

            listeAffaireDate_FS : function(){

                return $http.get('/listeAffaireDate_url');
            },

            detailAffaire_FS : function(){

                return $http.get('/detailAffaire_url');
            },

            recupPartie_FS : function(individuId){
                return $http.get('/recupPartie_url/'+individuId);
            },

            recupReglement_FS : function(reglementId){
                return $http.get('/recupReglement_url/'+reglementId);
            },

            modifIndividu_FS : function(parties){
                return $http.post('/modifIndividu_url',
                    {
                        id_individu : parties.id_individu,
                        nom_individu : parties.nom_individu,
                        prenom_individu : parties.prenom_individu,
                        age : parties.age
                    });
            },

            modifReglement_FS : function(reglements){
                return $http.post('/modifReglement_url',
                    {
                        id_individu_reglement : reglements.id_individu_reglement,
                        id_reglement : reglements.id_reglement,
                        montant : reglements.montant
                    });
            },

            individuForIdAffaire_FS : function(affaireId){

                return $http.get("/listeIndividuForAffaire_url/"+affaireId)
            },

            reglement_FS : function(affaireId){

                return $http.get('/recupReglementAffaire_url/'+affaireId);
            },

            supprimerIndividu_FS : function(individuId){

                return $http.get('/supprimerIndividu/'+individuId);
            },

            transmettreAffaire_FS : function(id_affaire){
                return $http.post('/transmettreAffaire_url', {
                    id : id_affaire
                })
            },

            annulerTransmettreAffaire_FS : function(id_affaire){
                return $http.post('/annulerTransmettreAffaire_url', {
                    id : id_affaire
                })
            }

        };

        console.log(sessionStorage.getItem("username"));

    }])
