angular.module('app', ['ui.bootstrap']).
    controller('salleAudienceController', ['$scope', 'salleAudienceService', '$window', '$modal', '$log',
        function($scope, salleAudienceService, $window, $modal, $log){

    if(sessionStorage.getItem('username')){
        $scope.listeSalleAudiences = [];
        $scope.salleAudienceModifItems = [];
        $scope.salleAudienceModif = [];
        $scope.salleAudienceModifItems = [];
        $scope.clickEvent = false;
        $scope.salleAudienceFormItems = {
            libelle_salleAudience : ""
        };

        nettoyer_FC();
        listeSalleAudience_FC();
        salleAudienceModifItems_FC();

        function salleAudienceModifItems_FC(){

        }

        $scope.callFormModifSalleAudience_FC = function(){

            $scope.clickEvent = true;
        }

        $scope.annuler_FC = function(){

            $scope.clickEvent = false;
        }

        function nettoyer_FC(){

            $scope.salleAudienceFormItems.libelle_salleAudience = "";
        }

        function listeSalleAudience_FC(){

            salleAudienceService.listeSalleAudience_FS()
                .success(function (data) {

                    if(data && data.salleAudiencesJson && data.salleAudiencesJson.length > 0){

                        console.log(data.salleAudiencesJson);
                        $scope.listeSalleAudiences = data.salleAudiencesJson;
                    }
                });
        }

        //MODAL D'AJOUT DE SALLE D'AUDIENCE
        $scope.ajouterSalleAudienceModal_FC = function(){

            var modalInstance = $modal.open({

                templateUrl : "/formAjoutSalleAudience",
                controller : ajouterSalleAudience_FC,
                scope : $scope,
                resolve : {
                    salleAudienceForm : function(){
                        return $scope.salleAudienceForm;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;
            }, function(){
                $log.info("Fermeture de modal a "+new Date());
            });
        }
        var ajouterSalleAudience_FC = function($modal, $modalInstance, salleAudienceForm){
            $scope.submitForm = function(){}
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
        }
        $scope.ajouterSalleAudience_FC = function(salleAudienceFormItems){

            salleAudienceService.ajouterSalleAudience_FS(salleAudienceFormItems)

                .success(function () {
                    console.log('successfull add');
                    $window.location.reload();
                    nettoyer_FC();
                })
                .error(function () {
                    console.log('failled');
                });
        }
        //FIN DE MODAL

        //MODAL DE MODIFICATION DE SALLE D'AUDIENCE
        $scope.modifSalleAudienceModal_FC = function(idSalleAudience){

            recupSalleAudienceModif_FC();

            function recupSalleAudienceModif_FC(){
                salleAudienceService.recupSalleAudienceModif_FS(idSalleAudience)
                    .success(function(data){
                        if(data && data.salleAudienceModifJson && data.salleAudienceModifJson.length > 0){
                            console.log(data.salleAudienceModifJson);
                            $scope.salleAudienceModif = data.salleAudienceModifJson;
                            $scope.salleAudienceModifItems.id_salleAudience = data.salleAudienceModifJson[0]['id_salleAudience'];
                            $scope.salleAudienceModifItems.libelle_salleAudience = data.salleAudienceModifJson[0]['libelle_salleAudience'];
                        }
                    })
            }

            var modalInstance = $modal.open({

                templateUrl : "/formModifSalleAudience/"+idSalleAudience,
                controller : modifSalleAudience_FC,
                scope : $scope,
                resolve : {
                    modifSalleAudienceForm : function(){
                        return $scope.modifSalleAudienceForm;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;
            }, $log.info("Fermeture de la modal a "+new Date()));

        }
        var modifSalleAudience_FC = function($modal, $modalInstance, modifSalleAudienceForm){
            $scope.submitForm = function(){}
            $scope.cancel = function(){$modalInstance.dismiss('cancel');}
        }
        $scope.modifSalleAudience_FC = function(salleAudienceModifItems){

            salleAudienceService.modifSalleAudience_FS(salleAudienceModifItems)
                .success(function(){
                    console.log("successful edit");
                    $window.location.reload();
                })
                .error(function(){
                    console.log("failed");
                })
        }
        //FIN DE MODAL

        $scope.suppressionSalleAudience_FC = function(idSalleAudience){

            salleAudienceService.suppressionSalleAudience_FS(idSalleAudience)
                .success(function(){
                    console.log("successful delete");
                    $window.location.reload();
                })
                .error(function(){
                    console.log("failed");
                })
        }
    }else {
        $window.location.href = "/login";
    }

    }]).

    factory('salleAudienceService', ['$http', function($http){

        return{

            ajouterSalleAudience_FS : function (salleAudienceFormItems) {

                return $http.post('/ajouterSalleAudience_url',
                    {
                        libelle_salleAudience : salleAudienceFormItems.libelle_salleAudience
                    }
                );
            },

            listeSalleAudience_FS : function(){

                return $http.get('/listeSalleAudiences_url');
            },

            recupSalleAudienceModif_FS : function(idSalleAudience){

                return $http.get("/recupSalleAudienceModif_url/"+idSalleAudience)
            },

            modifSalleAudience_FS : function(salleAudienceModifItems){

                return $http.post("/modifSalleAudience_url",
                    {
                        id_salleAudience : salleAudienceModifItems.id_salleAudience,
                        libelle_salleAudience : salleAudienceModifItems.libelle_salleAudience
                    })
            },

            suppressionSalleAudience_FS : function(idSalleAudience){

                return $http.get("/suppressionSalleAudience_url/"+idSalleAudience)
            }

        };

    }]);

    /////////////////////////////////////////////////

