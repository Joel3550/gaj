angular.module('app', []).
    controller('transmettreJugementController', ['$scope', 'transmettreJugementService', '$timeout', function($scope, transmettreJugementService, $timeout) {

if(sessionStorage.getItem('username')){
        $scope.jugementTransItem = {
            transJugement : ""
        };

        $scope.ajusterAffaireItem = {
            date_saisie_affaire : new Date()
        };

        $scope.individusForAffaire = [];

        affaire_FC();
        individuForIdAffaire_FC();

        function affaire_FC() {

            transmettreJugementService.affaire_FS(transmettreJugementService.recupIdAudience_FS())
                .success(function (data) {
                    if (data && data.audienceJson && data.audienceJson.length > 0) {

                        $scope.jugementTransItem.numero_ordre = data.audienceJson[0]['numero_ordre'];
                        $scope.jugementTransItem.date_saisie_affaire = data.audienceJson[0]['date_saisie_affaire'];
                        $scope.jugementTransItem.objet_affaire = data.audienceJson[0]['objet_affaire'];
                        $scope.jugementTransItem.date_audience = data.audienceJson[0]['date_audience'];
                        $scope.jugementTransItem.observation = data.audienceJson[0]['observation'];
                        $scope.jugementTransItem.id_nature_affaire = data.audienceJson[0]['id_nature_affaire'];
                        $scope.jugementTransItem.id_chambre_affaire = data.audienceJson[0]['id_chambre_affaire'];
                        $scope.jugementTransItem.libelle_nature = data.audienceJson[0]['libelle_nature'];
                        $scope.jugementTransItem.libelle_chambre = data.audienceJson[0]['libelle_chambre'];
                        $scope.jugementTransItem.nom_individu = data.audienceJson[0]['nom_individu'];
                        $scope.jugementTransItem.montant = data.audienceJson[0]['montant'];
                        $scope.jugementTransItem.nom_individu = data.audienceJson[0]['nom_individu'];
                        $scope.jugementTransItem.montant = data.audienceJson[0]['montant'];

                    }
                })
        }

        $scope.transmettreJugement_FC = function () {

            transmettreJugementService.transmettreJugement_FS($scope.jugementTransItem, transmettreJugementService.recupIdAudience_FS())
                .success(function (data) {
                    console.log("successful edit");
                    $timeout(function(){
                        $scope.message = {class:'bg-success', msg : "Affaire transmise avec succes"}
                    },1000);
                })
                .error(function (data) {
                    console.log("Failled");
                    $timeout(function(){
                        $scope.message = {class:'bg-danger', msg : "Ume erreur est intervenue lors de la transmission de l'affaire"}
                    },1000);
                })
        }

        $scope.ajusterDateAffaire_FC = function () {

            transmettreJugementService.ajusterDateAffaire_FS($scope.ajusterAffaireItem, transmettreJugementService.recupIdAudience_FS())
                .success(function () {
                    console.log("successful edit");
                    $timeout(function(){
                        $scope.message = {class:'bg-success', msg : "La date a ete mis a jour avec succes"}
                    },1000);
                })
                .error(function () {
                    console.log("Failled");
                    $timeout(function(){
                        $scope.message = {class:'bg-danger', msg : "Ume erreur est intervenue lors de la mise a jour de la date de l'affaire"}
                    },1000);
                })
        }

        function individuForIdAffaire_FC(){

            transmettreJugementService.individuForIdAffaire_FS(transmettreJugementService.recupIdAudience_FS())
                .success(function(data){

                    if(data && data.individuForAffaireJson && data.individuForAffaireJson.length > 0){
                        $scope.individusForAffaire = data.individuForAffaireJson;
                    }
                });
        }
}else {
    $window.location.href = "/login";
}

    }]).

    factory('transmettreJugementService', ['$http', '$location', function($http, $location){

        return{

            transmettreJugement_FS : function (jugementTransItem, audienceId) {

                return $http.post('/transmettreAudience_url',
                    {
                        id : audienceId,
                        transJugement : jugementTransItem.transJugement
                    });
            },

            recupIdAudience_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var audienceId = segments[segments.length -1];
                return audienceId;
            },

            ajusterDateAffaire_FS : function (ajusterAffaireItem, audienceId) {

                return $http.post('/ajusterDateAffaire',
                    {
                        id : audienceId,
                        date_saisie_affaire : ajusterAffaireItem.date_saisie_affaire
                    });
            },

            individuForIdAffaire_FS : function(audienceId){

                return $http.get("/listeIndividuForAffaire_url/"+audienceId)
            },

            affaire_FS : function(audienceId){

                return $http.get('/recupValidationAudience_url/'+audienceId);
            }

        };

    }]);