angular.module('app', ['ui.bootstrap']).
    controller('natureController', ['$scope', 'natureService', '$modal', '$log', '$window', function($scope, natureService, $modal, $log, $window){

        $scope.natures = [];
        $scope.natureFormItems = {

            libelle_nature : ""
        };
        $scope.modifFormItems = [];

        nettoyer_FC();
        listeNature_FC();

        function nettoyer_FC(){
            $scope.natureFormItems.libelle_nature = "";
        }

        function listeNature_FC(){

            natureService.listeNature_FS()
                .success(function (data) {

                    if(data && data.naturesJson && data.naturesJson.length > 0){

                        console.log(data.naturesJson);
                        $scope.natures = data.naturesJson;
                    }
                });
        }

        //MODAL AJOUTER NATURE
        $scope.ajouterNatureModal_FC = function(){

            var modalInstance = $modal.open({

                templateUrl : "/formAjoutNature",
                controller : ajouterNature_FC,
                scope : $scope,
                resolve : {
                    natureForm : function(){
                        return $scope.natureForm;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;
            }, function(){
                $log.info("Fermeture de la modal le "+new Date());
            });
        }

        var ajouterNature_FC = function($modal, $modalInstance, natureForm){

            $scope.submitForm = function(){}

            $scope.cancel = function(){$modalInstance.dismiss('cancel');}
        }

        $scope.ajouterNature_FC = function(natureFormItems){

            natureService.ajouterNature_FS(natureFormItems)

                .success(function (data) {
                    $scope.message = {class: "bg-success", msg: "Nature ajouter avec succes"};
                    $timeout(function(){
                        $window.location.href = "/listeNatures";
                    });
                })
                .error(function (data) {
                    console.log('failled');
                });
        }
        //FIN FONCTION MODAL AJOUT

        //MODAL AJOUTER NATURE
        $scope.modifierNatureModal_FC = function(idNature){

            recupNatureModif_FC();
            function recupNatureModif_FC(){
                natureService.recupNatureModif_FS(idNature)
                    .success(function(data){
                        if(data && data.natureModifJson && data.natureModifJson.length > 0){
                            console.log(data.natureModifJson);
                            $scope.modifFormItems = data.natureModifJson;
                            $scope.modifFormItems.libelle_nature = data.natureModifJson[0]['libelle_nature'];
                            $scope.modifFormItems.id_nature = data.natureModifJson[0]['id_nature'];
                        }
                    })
            }

            var modalInstance = $modal.open({

                templateUrl : "/formModifNature_url/"+idNature,
                controller : modifierNature_FC(),
                scope : $scope,
                resolve : {
                    natureModifForm : function(){
                        return $scope.natureModifForm
                    }
                }
            });

            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;
            }, function(){
                $log.info("Fermeture de modal le "+new Date());
            });
        }

        var modifierNature_FC = function($modal, $modalInstance, natureModifForm){
            $scope.submitForm = function(){}
            $scope.cancel = function(){$modalInstance.dismiss('cancel');}
        }

        $scope.modifierNature_FC = function(modifFormItems){
            natureService.modifierNature_FS(modifFormItems)
                .success(function(){
                    console.log("successful edit");
                    $scope.message = {class: "bg-success", msg: "Nature modifier avec succes"};
                    $timeout(function(){
                        $window.location.href = "/listeNatures";
                    });
                })
                .error(function(){
                    console.log("failed");
                })
        }
        //FIN FONCTION MODAL MODIF

        $scope.supprimerNature_FC = function(idNature){

            natureService.supprimerNature_FS(idNature)
                .success(function(){
                    console.log("successful delete");
                    $window.location.reload();
                })
        }


    }]).

    factory('natureService', ['$http', function($http){

        return{

            ajouterNature_FS : function (natureFormItems) {

                return $http.post(
                    '/ajouterNature_url',
                    {
                        libelle_nature : natureFormItems.libelle_nature
                    }
                );
            },

            listeNature_FS : function(){

                return $http.get('/listeNatures_url');
            },

            recupNatureModif_FS : function(idNature){
                return $http.get("/recupNature_url/"+idNature)
            },

            modifierNature_FS : function(modifFormItems){

                return $http.post("/modifierNature_url",
                    {
                        id_nature : modifFormItems.id_nature,
                        libelle_nature : modifFormItems.libelle_nature
                    })
            },

            supprimerNature_FS : function(idNature){

                return $http.get("/supprimerNature_url/"+idNature)
            }

        };

    }]);

    /////////////////////////////////////////////////

