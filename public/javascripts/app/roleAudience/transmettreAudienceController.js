angular.module('app', []).
    controller('transmettreAudienceController', ['$scope', 'transmettreAudienceService', '$timeout', function($scope, transmettreAudienceService, $timeout) {


        $scope.audienceTransItem = {

            numero_ordre : "",
            //date_saisie_affaire :"",
            objet_affaire :"",
            //date_audience :"",
            transmission : true,
            observation :"",
            id_nature_affaire :"",
            id_chambre_affaire :"",
            libelle_nature :"",
            libelle_chambre :""

        };

        //$scope.individus = [];
if(sessionStorage.getItem('username')){
        affaire_FC();

        //listeIndividuAffaire_FC();

        function affaire_FC() {

            transmettreAudienceService.affaire_FS(transmettreAudienceService.recupIdAudience_FS())
                .success(function (data) {
                    if (data && data.audienceJson && data.audienceJson.length > 0) {

                        $scope.audienceTransItem.numero_ordre = data.audienceJson[0]['numero_ordre'];
                        $scope.audienceTransItem.date_saisie_affaire = data.audienceJson[0]['date_saisie_affaire'];
                        $scope.audienceTransItem.objet_affaire = data.audienceJson[0]['objet_affaire'];
                        $scope.audienceTransItem.date_audience = data.audienceJson[0]['date_audience'];
                        $scope.audienceTransItem.observation = data.audienceJson[0]['observation'];
                        $scope.audienceTransItem.id_nature_affaire = data.audienceJson[0]['id_nature_affaire'];
                        $scope.audienceTransItem.id_chambre_affaire = data.audienceJson[0]['id_chambre_affaire'];
                        $scope.audienceTransItem.libelle_nature = data.audienceJson[0]['libelle_nature'];
                        $scope.audienceTransItem.libelle_chambre = data.audienceJson[0]['libelle_chambre'];

                    }
                })
        }

        $scope.transmettreAudience_FC = function () {

            transmettreAudienceService.transmettreAudience_FS($scope.audienceTransItem, transmettreAudienceService.recupIdAudience_FS())
                .success(function (data) {
                    console.log("successful edit");
                    $timeout(function(){
                        $scope.message = {class : "bg-success", msg : "Affaire tranmis avec succes"}
                    }, 1000);
                })
                .error(function (data) {
                    console.log("Failled");
                    $timeout(function(){
                        $scope.message = {class : "bg-danger", msg : "erreur lors de la transmission"}
                    }, 1000);
                })
        }

        //function listeIndividuAffaire_FC(){
        //
        //    transmettreAffaireService.listeIndividuAffaire_FS()
        //        .success(function (data) {
        //
        //            if(data && data.individuJson && data.individuJson.length > 0){
        //                $scope.individus = data.individuJson;
        //            }
        //        });
        //}
}else {
    $window.location.href = "/login";
}

    }]).

    service('transmettreAudienceService', ['$http', '$location', function($http, $location){

        return{

            //listeIndividuAffaire_FS : function(){
            //    return $http.get('/listeIndividus_url');
            //},

            transmettreAudience_FS : function (audienceTransItem, affaireId) {

                return $http.post('/transmettreAudience_url',
                    {
                        id : affaireId,
                        numero_ordre : audienceTransItem.numero_ordre,
                        //date_saisie_affaire : audienceTransItem.date_saisie_affaire,
                        objet_affaire : audienceTransItem.objet_affaire,
                        //date_audience : audienceTransItem.date_audience,
                        transmission : audienceTransItem.transmission,
                        observation : audienceTransItem.observation,
                        id_nature_affaire : audienceTransItem.id_nature_affaire,
                        id_chambre_affaire : audienceTransItem.id_chambre_affaire
                    });
            },

            recupIdAudience_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            affaire_FS : function(affaireId){

                return $http.get('/recupAudience_url/'+affaireId);
            }

        };

    }]);