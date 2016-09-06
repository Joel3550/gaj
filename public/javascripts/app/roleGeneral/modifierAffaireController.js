angular.module('app', ['ngSanitize', 'ui.bootstrap']).
    controller('modifierAffaireController', ['$scope', 'modifierAffaireService', '$timeout', function($scope, modifierAffaireService, $timeout) {

if(sessionStorage.getItem("username")){
        $scope.affaireModifItem = {

            numero_ordre : "",
            date_modification : new Date(),
            objet_affaire : "",
            date_audience : "",
            observation : "",
            id_nature_affaire : "",
            id_chambre_affaire : ""

        };

        $scope.natures = [];
        $scope.chambres = [];

        affaire_FC();

        listeNatureAffaire_FC();
        listeChambreAffaire_FC();

        function affaire_FC() {

            modifierAffaireService.affaire_FS(modifierAffaireService.recupIdAffaire_FS())
                .success(function (data) {
                    if (data && data.affaireJson && data.affaireJson.length > 0) {
                        $scope.affaireModifItem.numero_ordre = data.affaireJson[0]['numero_ordre'];
                        $scope.affaireModifItem.objet_affaire = data.affaireJson[0]['objet_affaire'];
                        $scope.affaireModifItem.observation = data.affaireJson[0]['observation'];
                        $scope.affaireModifItem.libelle_nature = data.affaireJson[0]['libelle_nature'];
                        $scope.affaireModifItem.libelle_chambre = data.affaireJson[0]['libelle_chambre'];
                        $scope.affaireModifItem.id_nature_affaire = data.affaireJson[0]['id_nature_affaire'];
                        $scope.affaireModifItem.id_chambre_affaire = data.affaireJson[0]['id_chambre_affaire'];
                        $scope.affaireModifItem.date_audience = data.affaireJson[0]['date_audience'];

                    }
                })
        }

        $scope.modifierAffaire_FC = function () {

            modifierAffaireService.modifierAffaire_FS($scope.affaireModifItem, modifierAffaireService.recupIdAffaire_FS())
                .success(function () {
                    $scope.message = {class:"bg-success", msg:"L'affaire a été modifiée avec succes"};
                    $timeout(function(){
                        $window.location.href = "/listeAffaires"
                    },1000);
                })
                .error(function () {
                    $timeout(function(){
                        $scope.message = {class:"bg-danger", msg:"Une erreur est intervenue lors de la modification de l'affaire"};
                    },1000);
                })
        }

        function listeNatureAffaire_FC(){

            modifierAffaireService.listeNatureAffaire_FS()
                .success(function (data) {

                    if(data && data.naturesJson && data.naturesJson.length > 0){
                        $scope.natures = data.naturesJson;
                    }
                });
        }

        function listeChambreAffaire_FC(){

            modifierAffaireService.listeChambreAffaire_FS()
                .success(function (data) {

                    if(data && data.chambresJson && data.chambresJson.length > 0){
                        $scope.chambres = data.chambresJson;
                    }
                });
        }
}else {
    $window.location.href = "/login";
}

    }]).

    factory('modifierAffaireService', ['$http', '$location', function($http, $location){

        return{

            listeNatureAffaire_FS : function(){
                return $http.get('/listeNatures_url');
            },

            listeChambreAffaire_FS : function(){
                return $http.get('/listeChambres_url');
            },

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            modifierAffaire_FS : function (affaireModifItem, affaireId) {

                return $http.post('/modifierAffaire_url',
                    {
                        id : affaireId,
                        numero_ordre : affaireModifItem.numero_ordre,
                        date_modification : affaireModifItem.date_modification,
                        objet_affaire : affaireModifItem.objet_affaire,
                        date_audience : affaireModifItem.date_audience,
                        observation : affaireModifItem.observation,
                        id_nature_affaire : affaireModifItem.id_nature_affaire,
                        id_chambre_affaire : affaireModifItem.id_chambre_affaire
                    });
            },


            affaire_FS : function(affaireId){

                return $http.get('/recupAffaire_url/'+affaireId);
            }

        };

    }]);