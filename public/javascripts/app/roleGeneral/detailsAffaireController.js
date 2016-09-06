/**
 * Created by AdminWACo on 22/03/2016.
 */
angular.module('app', []).

    controller('detailsAffaireController', ['$scope', 'detailsAffaireService', function($scope, detailsAffaireService){

        $scope.affaires = [];

        if(sessionStorage.getItem('username')) {
            detailsAffaire_FC();

            function detailsAffaire_FC() {

                detailsAffaireService.detailsAffaire_FS(detailsAffaireService.recupIdAffaire_FS())

                    .success(function (data) {

                        if (data && data.affaireJson && data.affaireJson.length > 0) {
                            $scope.affaire = data.affaireJson;
                        }
                    });
            }
        }else {
            $window.location.href = "/login";
        }
    }]).

    factory('detailsAffaireService', ['$http', '$location', function($http, $location){

        return {

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            detailsAffaire_FS : function(affaireId){

                return $http.get('/detailsAffaire_url/'+affaireId, {id : affaireId});
            }
        };

    }]);
