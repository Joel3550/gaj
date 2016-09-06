angular.module('app', ['ui.bootstrap',  'ngAnimate']).
    controller('chambreController', ['$scope', 'chambreService', '$window', '$modal', '$log', '$timeout',
        function($scope, chambreService, $window, $modal, $log, $timeout){

        $scope.chambres = [];
        $scope.chambreModif = [];

        $scope.chambreFormItems = {

            libelle_chambre : ""
        };

        nettoyer_FC();
        listeChambre_FC();

        function nettoyer_FC(){

            $scope.chambreFormItems.libelle_chambre = "";
        }

        function listeChambre_FC(){

            chambreService.listeChambre_FS()
                .success(function (data) {

                    if(data && data.chambresJson && data.chambresJson.length > 0){

                        console.log(data.chambresJson);
                        $scope.chambres = data.chambresJson;
                    }
                });
        }

        $scope.ajouterChambreModal_FC = function(){

            var modalInstance = $modal.open({

                templateUrl: "/formAjoutChambre",
                controller: ajouterChambre_FC,
                scope : $scope,
                resolve : {
                    chambreForm : function(){
                        return $scope.chambreForm;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;
            }, function(){
                $log.info("Fermeture du modal a : "+new Date());
            });
        }

        var ajouterChambre_FC = function($modal, $modalInstance, chambreForm){
            $scope.submitForm = function(){}
            $scope.cancel = function(){$modalInstance.dismiss('cancel');}
        }

        $scope.ajouterChambre_FC = function(chambreFormItems){

            chambreService.ajouterChambre_FS(chambreFormItems)

                .success(function (data) {
                    console.log('successfull add');
                    $scope.message = {class: "bg-success", msg: "Chambre modifier avec succes"};
                    $timeout(function(){
                        $scope.message = null;
                        $window.location.href="/listeChambres";
                    }, 1000);
                })
                .error(function (data) {
                    console.log('failled');
                });
        }

        $scope.modifierChambreModal_FC = function(idChambre){

            recupChambreModif_FC();
            function recupChambreModif_FC(){

                chambreService.recupChambreModif_FS(idChambre)
                    .success(function(data){
                        if(data && data.chambreModifJson && data.chambreModifJson.length > 0){
                            console.log(data.chambreModifJson);
                            $scope.chambreModif = data.chambreModifJson;
                            $scope.chambreModif.id_chambre = data.chambreModifJson[0]['id_chambre'];
                            $scope.chambreModif.libelle_chambre = data.chambreModifJson[0]['libelle_chambre'];
                        }
                    });
            }

            var modalInstance = $modal.open({

                templateUrl: "/formModifChambre/"+idChambre,
                controller: modifierChambre_FC,
                scope : $scope,
                resolve : {
                    chambreModifForm : function(){
                        return $scope.chambreModifForm;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;
            }, function(){
                $log.info("Fermeture du modal a : "+new Date());
            });
        }

        var modifierChambre_FC = function($modal, $modalInstance, chambreModifForm){
            $scope.submitForm = function(){}
            $scope.cancel = function(){$modalInstance.dismiss('cancel');}
        }

        $scope.modifierChambre_FC = function(chambreModifItems){

            chambreService.modifierChambre_FS(chambreModifItems)

                .success(function (data) {
                    console.log('successfull edit');
                    $scope.message = {class: "bg-success", msg: "Chambre ajouter avec succes"};
                    $timeout(function () {
                        $scope.message = null;
                        $window.location.href = "/listeChambres"
                    }, 1000);
                })
                .error(function (data) {
                    console.log('failled');
                });
        }

        $scope.supprimerChambre_FC = function(idChambre){

            chambreService.supprimerChambre_FS(idChambre)
                .success(function(){
                    $window.location.reload();
                })
        }

    }]).

    factory('chambreService', ['$http', function($http){

        return{

            ajouterChambre_FS : function (chambreFormItems) {

                return $http.post(
                    '/ajouterChambre_url',
                    {
                        libelle_chambre : chambreFormItems.libelle_chambre
                    }
                );
            },

            listeChambre_FS : function(){

                return $http.get('/listeChambres_url');
            },

            recupChambreModif_FS : function(idChambre){

                return $http.get("/chambreModif_url/"+idChambre)
            },

            modifierChambre_FS : function(chambreModif){

                return $http.post("/modifierChambre_url",
                    {
                        id_chambre : chambreModif.id_chambre,
                        libelle_chambre : chambreModif.libelle_chambre
                    })
            },

            supprimerChambre_FS : function(idChambre){

                return $http.get("/supprimerChambre_url/"+idChambre)
            }

        };

    }]);

    /////////////////////////////////////////////////

