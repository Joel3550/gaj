angular.module('app', []).
    controller('concernerController', ['$scope', 'concernerService', function($scope, concernerService){

        $scope.concernes = [];
        $scope.affaire = [];
        $scope.individus = [];

        $scope.concernerFormItems = {

            id_individu_concerner : "",
            id_affaire_concerner : "",
            numero_ordre : "",
            montant : "",
            date_saisie : new Date()
        };

        nettoyer_FC();
        listeConcerner_FC();
        listeIndividu_FC();
        affaire_FC();

        function nettoyer_FC(){

            $scope.concernerFormItems.id_individu_concerner = "";
            $scope.concernerFormItems.montant = "";
        }

        function listeConcerner_FC(){

            concernerService.listeConcerner_FS()
                .success(function (data) {

                    if(data && data.concernesJson && data.concernesJson.length > 0){

                        console.log(data.concernesJson);
                        $scope.concernes = data.concernesJson;
                    }
                });
        }

        $scope.ajouterConcerner_FC = function(concernerFormItems){

            concernerService.ajouterConcerner_FS(concernerFormItems)

                .success(function (data) {
                    console.log('successfull add');
                    nettoyer_FC();
                })
                .error(function (data) {
                    console.log('failled');
                });
        }

        ////////////////////////////////////////////////////////////////////////

        function affaire_FC() {

            concernerService.affaire_FS(concernerService.recupIdAffaire_FS())
                .success(function (data) {
                    if (data && data.affaireConcernerJson && data.affaireConcernerJson.length > 0) {
                        $scope.concernerFormItems.id_affaire_concerner = data.affaireConcernerJson[0]['id_affaire'];
                        $scope.concernerFormItems.numero_ordre = data.affaireConcernerJson[0]['numero_ordre'];

                    }
                })
        }

        function listeIndividu_FC(){

            concernerService.listeIndividu_FS()
                .success(function(data){
                    if(data && data.IndividusJson && data.IndividusJson.length > 0){

                        console.log(data.IndividusJson);
                        $scope.individus = data.IndividusJson;
                    }
                })
        }


    }]).

    factory('concernerService', ['$http', '$location', function($http, $location){

        return{

            ajouterConcerner_FS : function (concernerFormItems) {

                return $http.post(
                    '/ajouterConcerner_url',
                    {
                        id_individu_concerner : concernerFormItems.id_individu_concerner,
                        id_affaire_concerner : concernerFormItems.id_affaire_concerner,
                        montant : concernerFormItems.montant,
                        date_saisie : concernerFormItems.date_saisie
                    }
                );
            },

            listeConcerner_FS : function(){

                return $http.get('/listeConcernes_url');
            },

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            affaire_FS : function(affaireId){

                return $http.get('/recupAffaireConcerner_url/'+affaireId);
            },

            listeIndividu_FS: function(){
                return $http.get("/listeIndividus_url");
            }

        };

    }]);

    /////////////////////////////////////////////////

