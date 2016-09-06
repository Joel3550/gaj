angular.module('app', []).
    controller('transmettreAffaireController', ['$scope', 'transmettreAffaireService', '$timeout', '$window',
        function($scope, transmettreAffaireService, $timeout, $window) {

if(sessionStorage.getItem("username")) {
    $scope.transAffaire = {

        transmission: true

    };

    $scope.affaireTransItem = {}

    $scope.individusForAffaire = [];
    $scope.reglements = [];

    affaire_FC();
    individuForIdAffaire_FC();
    reglement_FC();

    function reglement_FC() {

        transmettreAffaireService.reglement_FS(transmettreAffaireService.recupIdAffaire_FS())
            .success(function (data) {
                if (data && data.reglementAffaireJson && data.reglementAffaireJson.length > 0) {
                    console.log(data.reglementAffaireJson);
                    $scope.reglements = data.reglementAffaireJson;
                }
            })
    }


    function affaire_FC() {

        transmettreAffaireService.affaire_FS(transmettreAffaireService.recupIdAffaire_FS())
            .success(function (data) {
                if (data && data.affaireJson && data.affaireJson.length > 0) {

                    $scope.affaireTransItem.numero_ordre = data.affaireJson[0]['numero_ordre'];
                    $scope.affaireTransItem.date_saisie_affaire = data.affaireJson[0]['date_saisie_affaire'];
                    $scope.affaireTransItem.objet_affaire = data.affaireJson[0]['objet_affaire'];
                    $scope.affaireTransItem.date_audience = data.affaireJson[0]['date_audience'];
                    $scope.affaireTransItem.observation = data.affaireJson[0]['observation'];
                    $scope.affaireTransItem.id_nature_affaire = data.affaireJson[0]['id_nature_affaire'];
                    $scope.affaireTransItem.id_chambre_affaire = data.affaireJson[0]['id_chambre_affaire'];
                    $scope.affaireTransItem.libelle_nature = data.affaireJson[0]['libelle_nature'];
                    $scope.affaireTransItem.libelle_chambre = data.affaireJson[0]['libelle_chambre'];
                    $scope.affaireTransItem.nom_individu = data.affaireJson[0]['nom_individu'];
                    $scope.affaireTransItem.montant = data.affaireJson[0]['montant'];
                    $scope.affaireTransItem.id_affaire = data.affaireJson[0]['id_affaire'];
                    $scope.affaireTransItem.transmission = data.affaireJson[0]['transmission'];
                    $scope.affaireTransItem.doc_scan = data.affaireJson[0]['doc_scan'];

                }
            })
    }

    $scope.transmettreAffaire_FC = function () {

        transmettreAffaireService.transmettreAffaire_FS($scope.transAffaire, transmettreAffaireService.recupIdAffaire_FS())
            .success(function (data) {
                console.log("successful edit");
                $scope.message = {class: "bg-success", msg: "Affaire transmise avec succes"}
                $timeout(function () {
                    $window.location.href = '/listeAffaires'
                }, 1000);
            })
            .error(function () {
                console.log("Failled");
                $timeout(function () {
                    $scope.message = {class: "bg-danger", msg: "Une erreur est intervenue lors de la transmission"}
                }, 1000);
            })
    }

    function individuForIdAffaire_FC() {

        transmettreAffaireService.individuForIdAffaire_FS(transmettreAffaireService.recupIdAffaire_FS())
            .success(function (data) {

                if (data && data.individuForAffaireJson && data.individuForAffaireJson.length > 0) {
                    $scope.individusForAffaire = data.individuForAffaireJson;
                }
            });
    }
}else{
    $window.location.href="/login";
}

    }]).

    service('transmettreAffaireService', ['$http', '$location', function($http, $location){

        return{

            //listeIndividuAffaire_FS : function(){
            //    return $http.get('/listeIndividus_url');
            //},

            transmettreAffaire_FS : function (transAffaire, affaireId) {

                return $http.post('/transmettreAffaire_url',
                    {
                        id : affaireId,
                        transmission : transAffaire.transmission
                    });
            },

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            affaire_FS : function(affaireId){

                return $http.get('/recupAffaire_url/'+affaireId);
                //return $http.get('/recupAffaireReglement_url/'+affaireId);
            },

            individuForIdAffaire_FS : function(affaireId){

                return $http.get("/listeIndividuForAffaire_url/"+affaireId)
            },

            listeAffaire_FS : function(){

                return $http.get('/listeAffaires_url');
            },

            reglement_FS : function(affaireId){

                return $http.get('/recupReglementAffaire_url/'+affaireId);
            }

        };

    }]);