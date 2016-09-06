angular.module('app', ['ngAnimate']).
    controller('validationAudienceController', ['$scope', 'validationAudienceService', '$timeout', '$window',
        function($scope, validationAudienceService, $timeout, $window) {

if(sessionStorage.getItem("username")){
        $scope.validationAudienceTransItem = {

            valide : true

        };

        $scope.inputType = "";
        $scope.individusForAffaire = [];
        $scope.reglements = [];

        audience_FC();
        individuForIdAffaire_FC();
        reglement_FC();
        validationAudience_FC();

        function reglement_FC(){

            validationAudienceService.reglement_FS(validationAudienceService.recupIdAudience_FS())
                .success(function(data){
                    if(data && data.reglementAffaireJson && data.reglementAffaireJson > 0){
                        console.log(data.reglementAffaireJson);
                        $scope.reglements = data.reglementAffaireJson;
                        $scope.reglements.montant = data.reglementAffaireJson[0]['montant'];
                    }
                })
        }


        function audience_FC() {

            validationAudienceService.audience_FS(validationAudienceService.recupIdAudience_FS())
                .success(function (data) {
                    if (data && data.audienceJson && data.audienceJson.length > 0) {

                        $scope.validationAudienceTransItem.numero_ordre = data.audienceJson[0]['numero_ordre'];
                        $scope.validationAudienceTransItem.date_saisie_affaire = data.audienceJson[0]['date_saisie_affaire'];
                        $scope.validationAudienceTransItem.objet_affaire = data.audienceJson[0]['objet_affaire'];
                        $scope.validationAudienceTransItem.date_audience = data.audienceJson[0]['date_audience'];
                        //$scope.audienceTransItem.id_nature_affaire = data.audienceJson[0]['id_nature_affaire'];
                        //$scope.audienceTransItem.id_chambre_affaire = data.audienceJson[0]['id_chambre_affaire'];
                        $scope.validationAudienceTransItem.libelle_nature = data.audienceJson[0]['libelle_nature'];
                        $scope.validationAudienceTransItem.libelle_chambre = data.audienceJson[0]['libelle_chambre'];
                        $scope.validationAudienceTransItem.nom_individu = data.audienceJson[0]['nom_individu'];
                        $scope.validationAudienceTransItem.prenom_individu = data.audienceJson[0]['prenom_individu'];
                        $scope.validationAudienceTransItem.age = data.audienceJson[0]['age'];
                        $scope.validationAudienceTransItem.valide = data.audienceJson[0]['valide'];
                        $scope.validationAudienceTransItem.observation = data.audienceJson[0]['observation'];
                        $scope.validationAudienceTransItem.numero_ordre = data.audienceJson[0]['numero_ordre'];
                        $scope.validationAudienceTransItem.montant = data.audienceJson[0]['montant'];
                        $scope.validationAudienceTransItem.nom_individu = data.audienceJson[0]['nom_individu'];
                        $scope.validationAudienceTransItem.prenom_individu = data.audienceJson[0]['prenom_individu'];

                    }

                })
        }

        function individuForIdAffaire_FC(){

            validationAudienceService.individuForIdAffaire_FS(validationAudienceService.recupIdAudience_FS())
                .success(function(data){

                    if(data && data.individuForAffaireJson && data.individuForAffaireJson.length > 0){
                        $scope.individusForAffaire = data.individuForAffaireJson;
                    }
                });
        }

        //$scope.validationAudience_FC = function () {
        //
        //    validationAudienceService.validationAudience_FS($scope.validationAudienceTransItem, validationAudienceService.recupIdAudience_FS())
        //        .success(function (data) {
        //            console.log("successful edit");
        //            $timeout(function(){
        //               $scope.message = {class : "bg-success", msg : "Affaire validee avec succes"}
        //            }, 1000);
        //        })
        //        .error(function (data) {
        //            console.log("Failled");
        //            $timeout(function(){
        //                $scope.message = {class : "bg-danger", msg : "Affaire validee avec succes"}
        //            }, 1000);
        //        })
        //}

        function validationAudience_FC(){

            validationAudienceService.validationAudience_FS(validationAudienceService.recupIdAudience_FS())
                .success(function () {
                    console.log('validation success');
                })
                .error(function () {
                    console.log('failed');
                })
        }
}else {
    $window.location.href = "/login";
}

    }]).

    service('validationAudienceService', ['$http', '$location', function($http, $location){

        return{

            validationAudience_FS : function (audienceId) {

                return $http.get('/validationAudience_url/'+audienceId);
            },

            recupIdAudience_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var audienceId = segments[segments.length -1];
                return audienceId;
            },

            individuForIdAffaire_FS : function(audienceId){

                return $http.get("/listeIndividuForAffaire_url/"+audienceId)
            },

            audience_FS : function(audienceId){

                return $http.get('/recupValidationAudience_url/'+audienceId);
            },

            reglement_FS : function(audienceId){
                return $http.get('/recupReglementAffaire_url/'+audienceId);
            }

        };

    }]);