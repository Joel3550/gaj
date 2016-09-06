angular.module('app', []).
    controller('reglementController', ['$scope', 'reglementService', '$timeout', '$window', function($scope, reglementService, $timeout, $window){

        $scope.reglements = [];
        $scope.individusForAffaire = [];
        $scope.reglementAffaire = [];
        $scope.affaireCourante = [];
        $scope.listeIndividus = [];
        $scope.suivantStatut = false;
        $scope.id_affaire = "";
        $scope.dateJour = new Date();

        $scope.reglementItems = {
            id_affaire_reglement : "",
            id_affaire_individu : ""
        };

        $scope.reglementFormItems = {

            montant : "",
            id_affaire_reglement : "",
            id_individu_reglement : "",
            date_reglement : new Date()
        };

        listeReglement_FC();
        affaire_FC();
        individuForIdAffaire_FC();
        recupReglementAffaire_FC();
        //nettoyer_FC();
        affaireCourante_FC();
        reglementItemForPrint_FC();

        function reglementItemForPrint_FC(idReglement){

            reglementService.reglementItemForPrint_FS(idReglement)
                .success(function(data){
                    if(data && data.reglementsItemJson && data.reglementsItemJson.length > 0){
                        console.log(data.reglementsItemJson);
                    }
                })
        }

        function affaireCourante_FC(){

            reglementService.affaireCourante_FS()
                .success(function(data){
                    if(data && data.affaireCouranteJson && data.affaireCouranteJson.length > 0){
                        $scope.listeIndividus = data.affaireCouranteJson;
                        var i = data.affaireCouranteJson.length - 1;
                        $scope.reglementFormItems.id_affaire_reglement = data.affaireCouranteJson[i]['id_affaire'];
                        $scope.reglementFormItems.id_affaire_individu = data.affaireCouranteJson[i]['id_affaire_individu'];
                        $scope.reglementFormItems.id_affaire = data.affaireCouranteJson[i]['id_affaire'];
                    }
                })
        }

        function listeReglement_FC(){

            reglementService.listeReglement_FS()
                .success(function (data) {

                    if(data && data.reglementsJson && data.reglementsJson.length > 0){
                        console.log(data.reglementsJson);
                        $scope.reglements = data.reglementsJson;
                        var i = data.reglementsJson.length - 1;
                        $scope.reglementItems.id_affaire_reglement = data.reglementsJson[i]['id_affaire_reglement'];
                        $scope.id_affaire = data.reglementsJson[i]['id_affaire'];
                    }
                });
        }

        $scope.ajouterReglement_FC = function(reglementFormItems){

            reglementService.ajouterReglement_FS(reglementFormItems)

                .then(function () {
                    console.log('successfull add');
                    $scope.message = {class:"bg-success", msg:"Votre reglement a ete pris en compte"};
                    //nettoyer_FC();
                    $timeout(function(){
                        $window.location.href = "/listeAffaires";
                        //$scope.suivantStatut = true;
                    }, 1000);
                    //

                }, function(){
                    $timeout(function(){
                        $scope.message = {class:"bg-danger", msg:"Une erreur inconnu est intervenu lors du reglement"};
                    }, 1000);
                })
        }

        function individuForIdAffaire_FC(){

            reglementService.individuForIdAffaire_FS(reglementService.recupIdAffaire_FS())
                .success(function(data){

                    if(data && data.individuForAffaireJson && data.individuForAffaireJson.length > 0){
                        $scope.individusForAffaire = data.individuForAffaireJson;
                    }
                });
        }

        function recupReglementAffaire_FC(){

            reglementService.recupReglementAffaire_FS(reglementService.recupIdAffaire_FS())
                .success(function(data){

                    if(data && data.reglementAffaireJson && data.reglementAffaireJson.length > 0){
                        $scope.reglementAffaire = data.reglementAffaireJson;
                        $scope.reglementAffaire.montant = data.reglementAffaireJson[0]['montant'];
                        $scope.reglementAffaire.nomIndividu = data.reglementAffaireJson[0]['nom_individu'];
                        $scope.reglementAffaire.id_reglement = data.reglementAffaireJson[0]['id_reglement'];
                    }
                })
        }

        ///////////////////////////////////////////////////////////////////////

        function affaire_FC() {

            reglementService.affaire_FS(reglementService.recupIdAffaire_FS())
                .success(function (data) {
                    if (data && data.affaireReglementJson && data.affaireReglementJson.length > 0) {
                        $scope.reglementFormItems.numero_ordre = data.affaireReglementJson[0]['numero_ordre'];
                        $scope.reglementFormItems.nom_individu = data.affaireReglementJson[0]['nom_individu'];
                        $scope.reglementFormItems.montant = data.affaireReglementJson[0]['montant'];
                        $scope.reglementFormItems.libelle_nature = data.affaireReglementJson[0]['libelle_nature'];
                        $scope.reglementFormItems.objet_affaire = data.affaireReglementJson[0]['objet_affaire'];
                        $scope.reglementFormItems.libelle_chambre = data.affaireReglementJson[0]['libelle_chambre'];
                        $scope.reglementFormItems.observation = data.affaireReglementJson[0]['observation'];
                        $scope.reglementFormItems.id_reglement = data.affaireReglementJson[0]['id_reglement'];

                    }
                })
        }


    }]).

    factory('reglementService', ['$http', '$location', function($http, $location){

        return{

            ajouterReglement_FS : function (reglementFormItems) {

                return $http.post(
                    '/ajouterReglement_url',
                    {
                        montant : reglementFormItems.montant,
                        id_affaire_reglement : reglementFormItems.id_affaire_reglement,
                        id_individu_reglement : reglementFormItems.id_individu_reglement,
                        date_reglement : reglementFormItems.date_reglement
                    }
                );
            },

            listeReglement_FS : function(){

                return $http.get('/listeReglements_url');
            },

            affaire_FS : function(affaireId){

                return $http.get('/recupAffaireReglement_url/'+affaireId);
            },

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            individuForIdAffaire_FS : function(affaireId){

                return $http.get("/listeIndividuForAffaire_url/"+affaireId)
            },

            recupReglementAffaire_FS : function(affaireId){

                return $http.get("/recupReglementAffaire_url/"+affaireId);
            },

            affaireCourante_FS : function(){

                return $http.get("/affaireCourante_url");
            },

            reglementItemForPrint_FS : function(idReglement){

                return $http.get("/impressionReglement/"+idReglement);
            }

        };

    }]);

    /////////////////////////////////////////////////

