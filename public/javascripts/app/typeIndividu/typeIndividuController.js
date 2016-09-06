angular.module('app', ['ngAnimate']).
    controller('typeIndividuController', ['$scope', 'typeIndividuService', function($scope, typeIndividuService){

    if(sessioinStorage.getItem('username')){
        $scope.typeIndividus = [];

        $scope.typeIndividuFormItems = {

            libelle_typeIndividu : ""
        };

        nettoyer_FC();
        listeTypeIndividu_FC();

        function nettoyer_FC(){

            $scope.typeIndividuFormItems.libelle_typeIndividu = "";
        }

        function listeTypeIndividu_FC(){

            typeIndividuService.listeTypeIndividu_FS()
                .success(function (data) {

                    if(data && data.typeIndividusJson && data.typeIndividusJson.length > 0){

                        console.log(data.typeIndividusJson);
                        $scope.typeIndividus = data.typeIndividusJson;
                    }
                });
        }

        $scope.ajouterTypeIndividu_FC = function(typeIndividuFormItems){

            typeIndividuService.ajouterTypeIndividu_FS(typeIndividuFormItems)

                .success(function (data) {
                    console.log('successfull add');
                    nettoyer_FC();
                })
                .error(function (data) {
                    console.log('failled');
                });
        }

    }else {
        $window.location.href = "/login";
    }
    }]).

    factory('typeIndividuService', ['$http', function($http){

        return{

            ajouterTypeIndividu_FS : function (typeIndividuFormItems) {

                return $http.post(
                    '/ajouterTypeIndividu_url',
                    {
                        libelle_typeIndividu : typeIndividuFormItems.libelle_typeIndividu
                    }
                );
            },

            listeTypeIndividu_FS : function(){

                return $http.get('/listeTypeIndividus_url');
            }

        };

    }]);

    /////////////////////////////////////////////////

