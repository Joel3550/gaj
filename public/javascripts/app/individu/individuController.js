angular.module('app', ['ui.bootstrap']).
    controller('individuController', ['$scope', 'individuService', '$timeout', '$window', '$location', '$log', '$modal',
        function($scope, individuService, $timeout, $window, $location, $log, $modal){

        $scope.individus = [];
        $scope.typeIndividu = [];
        $scope.individusForAffaire = [];
        $scope.numerosAffaire = [];
        $scope.individuLieAffaire = [];
        $scope.demandeur = [];
        $scope.defendeur = [];
        $scope.id_affaire_reglement = [];
        $scope.suivantStatut = false;
        $scope.numeroAffaire = {};

        $scope.individuFormItems = {

            nom_individu : "",
            prenom_individu : "",
            age : "",
            date_creation : new Date(),
            id_typeIndividu_demandeur : "",
            id_typeIndividu_defendeur : "",
            id_affaire_individu : "",
            numero_ordre : ""
        };

        nettoyer_FC();
        listeIndividu_FC();
        listeTypeIndividu_FC();
        affaire_FC();
        individuForIdAffaire_FC();
        individuLieAffaire_FC();
        numeroAffaire_FC();
        verifReglementAffaire_FC();

        function verifReglementAffaire_FC(){

            individuService.verifReglementAffaire_FS()
                .success(function(data){
                    if(data && data.listeReglementAffJson && data.listeReglementAffJson.length > 0){
                        console.log(data.listeReglementAffJson);
                        $scope.listeReglementAff = data.listeReglementAffJson;
                        var i = data.listeReglementAffJson.length - 1;
                        $scope.id_affaire_reglement = data.listeReglementAffJson[i]['id_affaire_reglement'];
                    }
                })
        }

        function numeroAffaire_FC(){

            individuService.numeroAffaire_FS(individuService.recupIdAffaire_FS())
                .success(function(data){
                    if(data && data.numeroAffaireJson && data.numeroAffaireJson.length){
                        console.log(data.numeroAffaireJson);
                        $scope.numeroAffaire.numero_ordre = data.numeroAffaireJson[0]['numero_ordre'];
                        $scope.numeroAffaire.id_affaire = data.numeroAffaireJson[0]['id_affaire'];
                    }
                })
        }

        function individuLieAffaire_FC(){

            individuService.individuLieAffaire_FS()
                .success(function(data){
                    if(data && data.individuLieAffaireJson && data.individuLieAffaireJson.length > 0){

                        console.log(data.individuLieAffaireJson);
                        $scope.individuLieAffaire = data.individuLieAffaireJson;
                    }
                })
        }

        function nettoyer_FC(){

            $scope.individuFormItems.nom_individu = "";
            $scope.individuFormItems.prenom_individu = "";
            $scope.individuFormItems.age = "";
            $scope.id_typeIndividu_individu = "";
        }

        function listeIndividu_FC(){

            individuService.listeIndividu_FS()
                .success(function (data) {

                    if(data && data.IndividusJson && data.IndividusJson.length > 0){

                        console.log(data.IndividusJson);
                        $scope.individus = data.IndividusJson;
                    }
                });
        }

        function individuForIdAffaire_FC(){

            individuService.individuForIdAffaire_FS(individuService.recupIdAffaire_FS())
                .success(function(data){

                    if(data && data.individuForAffaireJson && data.individuForAffaireJson.length > 0){
                        $scope.individusForAffaire = data.individuForAffaireJson;
                    }
                });
        }

        $scope.ajouterDemandeur_FC = function(individuFormItems){

            individuService.ajouterDemandeur_FS(individuFormItems)

                .success(function (data) {
                    console.log('successfull add');
                    $scope.message = {class:"bg-success", msg:"Demandeur ajouter avec succes"};
                    $timeout(function(){
                        $scope.message = null;
                    }, 2000);
                    nettoyer_FC();
                    $scope.suivantStatut = true;
                })
                .error(function (data) {
                    console.log('failled');
                    $timeout(function(){
                        $scope.message = {class:"bg-danger", msg:"Une erreur est intervenue lors de l'ajout de l'individu"};
                    }, 2000);
                });
        }

        $scope.ajouterDefendeur_FC = function(individuFormItems){

            individuService.ajouterDefendeur_FS(individuFormItems)

                .success(function (data) {
                    console.log('successfull add');
                    $scope.message = {class:"bg-success", msg:"Defendeur ajouter avec succes"};
                    $timeout(function(){
                        $scope.message = null;
                    }, 1000);
                    nettoyer_FC();
                    $scope.suivantStatut = true;
                })
                .error(function (data) {
                    console.log('failled');
                    $timeout(function(){
                        $scope.message = {class:"bg-danger", msg:"Une erreur est intervenue lors de l'ajout de l'individu"};
                    }, 1000);
                });
        }

        function listeTypeIndividu_FC(){

            individuService.listeTypeIndividu_FS()
                .success(function (data) {

                    if(data && data.typeIndividusJson && data.typeIndividusJson.length > 0){
                        $scope.typeIndividu = data.typeIndividusJson;
                        $scope.individuFormItems.id_typeIndividu_demandeur = data.typeIndividusJson[0]['id_typeIndividu'];
                        $scope.individuFormItems.id_typeIndividu_defendeur = data.typeIndividusJson[1]['id_typeIndividu'];
                    }
                });
        }

        /////////////////////////////////////////////////////////////////

        function affaire_FC() {

            individuService.affaire_FS()
                .success(function (data) {
                    if (data && data.affaireIndividuJson && data.affaireIndividuJson.length > 0) {
                        $scope.numerosAffaire = data.affaireIndividuJson;
                        var i = (data.affaireIndividuJson.length - 1);
                        $scope.individuFormItems.id_affaire_individu = data.affaireIndividuJson[i]['id_affaire'];
                        $scope.individuFormItems.numero_ordre = data.affaireIndividuJson[i]['numero_ordre'];

                    }
                })
        }


    }]).

    factory('individuService', ['$http', '$location', function($http, $location){

        return{

            listeIndividu_FS : function(){

                return $http.get('/listeIndividus_url');
            },

            ajouterDemandeur_FS : function (individuFormItems) {

                //bg("cool");
                return $http.post(
                    '/ajouterIndividu_url',
                    {
                        nom_individu : individuFormItems.nom_individu,
                        prenom_individu : individuFormItems.prenom_individu,
                        age : individuFormItems.age,
                        date_creation : individuFormItems.date_creation,
                        id_typeIndividu_individu : individuFormItems.id_typeIndividu_demandeur,
                        id_affaire_individu : individuFormItems.id_affaire_individu
                    }
                );
            },

            ajouterDefendeur_FS : function (individuFormItems) {

                //alert("cool");
                return $http.post(
                    '/ajouterIndividu_url',
                    {
                        nom_individu : individuFormItems.nom_individu,
                        prenom_individu : individuFormItems.prenom_individu,
                        age : individuFormItems.age,
                        date_creation : individuFormItems.date_creation,
                        id_typeIndividu_individu : individuFormItems.id_typeIndividu_defendeur,
                        id_affaire_individu : individuFormItems.id_affaire_individu
                    }
                );
            },

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            affaire_FS : function(){

                return $http.get('/recupAffaireIndividu_url');
            },

            listeTypeIndividu_FS : function(){
                return $http.get('/listeTypeIndividus_url');
            },

            individuForIdAffaire_FS : function(affaireId){

                return $http.get("/listeIndividuForAffaire_url/"+affaireId)
            },

            individuLieAffaire_FS : function(){
                return $http.get('/individuLieAffaire_url');
            },

            numeroAffaire_FS : function(affaireId){
                return $http.get('/numeroAffaire_url/'+affaireId);
            },

            verifReglementAffaire_FS : function(){
                return $http.get('/verifReglementAffaire_url');
            }

        };

    }]);

    /////////////////////////////////////////////////

