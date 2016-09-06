/**
 * Created by AdminWACo on 16/03/2016.
 */
angular.module('app', []).

    controller('supprimerAffaire', ['$scope', 'supprimerAffaireService', '$window', function($scope, supprimerAffaireService, $window){
if(sessionStorage.getItem('username')){
        supprimerAffaire_FC();

        function supprimerAffaire_FC(affaireId){

            supprimerAffaireService.supprimerAffaire_FS(affaireId)
                .success(function () {
                    console.log('delete success');
                    $window.location.reload();
                })
                .error(function () {
                    console.log('failed');
                })
        }
}else{
    $window.location.href="/login";
}
    }]).

    factory('supprimerAffaireService', ['$http', '$location', function($http, $location){

        return{

            supprimerAffaire_FS : function (affaireId) {

                return $http.get('/supprimerAffaire_url', {id : affaireId});
            }
        }

    }])