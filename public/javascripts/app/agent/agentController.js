angular.module('app', ['ui.bootstrap']).
    controller('agentController', ['$scope', 'agentService', '$timeout', '$window', '$modal', '$log',
        function($scope, agentService, $timeout, $window, $modal, $log){

        $scope.agents = [];

        $scope.agentModifItem = [];

        $scope.agentFormItems = {

            nom_agent : "",
            prenom_agent : "",
            date_saisie_agent : new Date()
        };

        if(sessionStorage.getItem('username')) {

            listeAgents_FC();

            $scope.modalModifAgent_FC = function (idAgent) {

                agent_FC();

                function agent_FC() {

                    agentService.agent_FS(idAgent)
                        .success(function (data) {
                            if (data && data.agentCourantJson && data.agentCourantJson.length > 0) {
                                console.log(data.agentCourantJson);
                                $scope.agentModifItem.id_agent = data.agentCourantJson[0]['id_agent'];
                                $scope.agentModifItem.nom_agent = data.agentCourantJson[0]['nom_agent'];
                                $scope.agentModifItem.prenom_agent = data.agentCourantJson[0]['prenom_agent'];

                            }
                        })
                }

                var modalInstance = $modal.open({

                    templateUrl: "/formModifAgent_url/" + idAgent,
                    controller: modifierAgent_FC,
                    scope: $scope,
                    resolve: {
                        agentModifForm: function () {
                            return $scope.agentModifForm;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Fermeture du modal a :' + new Date());
                });
            }

            var modifierAgent_FC = function ($scope, $modalInstance, agentModifForm) {

                $scope.submitForm = function () {

                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                }
            }

            $scope.modifierAgent_FC = function (agentModifItem) {

                agentService.modifierAgent_FS(agentModifItem)
                    .success(function () {
                        $scope.message = {class:"bg-success", msg:"L'agent a ete modifiee avec succes"};
                        $timeout(function(){
                            $window.location.href = "/listeAgents";
                        },1000);
                    })
                    .error(function () {
                        $timeout(function () {
                            $scope.message = {
                                class: "bg-danger",
                                msg: "Une erreur est intervenue lors de la modification de l'agent"
                            };
                        }, 800);
                    })
            }

            function nettoyer_FC() {

                $scope.agentFormItems.nom_agent = "";
                $scope.agentFormItems.prenom_agent = "";
                $scope.agentFormItems.date_saisie_agent = "";
            }

            function listeAgents_FC() {

                agentService.listeAgents_FS()
                    .success(function (data) {

                        if (data && data.agentsJson && data.agentsJson.length > 0) {

                            console.log(data.agentsJson);
                            $scope.agents = data.agentsJson;
                        }
                    });
            }

            $scope.modalAjoutAgent_FC = function () {

                var modalInstance = $modal.open({

                    templateUrl: "/formAjoutAgent",
                    controller: ajouterAgent_FC,
                    scope: $scope,
                    resolve: {
                        agentForm: function () {
                            return $scope.agentForm;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Fermeture du modal a :' + new Date());
                });
            }

            var ajouterAgent_FC = function ($scope, $modalInstance, agentForm) {

                $scope.submitForm = function () {

                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                }
            }

            $scope.ajouterAgent_FC = function (agentFormItems) {

                agentService.ajouterAgent_FS(agentFormItems)

                    .success(function (data) {
                        console.log('successfull add');
                        $scope.message = {class: "bg-success", msg: "Agent ajouter avec succes"};
                        $timeout(function () {
                            $window.location.href = "/listeAgents"
                        }, 1000);
                        nettoyer_FC();
                    })
                    .error(function (data) {
                        console.log('failled');
                        $timeout(function () {
                            $scope.message = {
                                class: "bg-danger",
                                msg: "Une erreur est intervenue lors de l'ajout de l'agent"
                            };
                        }, 800);
                    });
            }

            $scope.supprimerAgent_FC = function (idAgent) {

                agentService.supprimerAgent_FS(idAgent)
                    .success(function () {
                        console.log("successful delete");
                        $window.location.href = "/listeAgents";
                    })
                    .error(function () {
                        console.log('failed');
                    })
            }
        }else {
                $window.location.href = "/login";
            }
    }]).

    factory('agentService', ['$http', '$location', function($http, $location){

        return{

            listeAgents_FS : function(){

                return $http.get('/listeAgents_url');
            },

            ajouterAgent_FS : function (agentFormItems) {

                return $http.post(
                    '/ajouterAgent_url',
                    {
                        nom_agent : agentFormItems.nom_agent,
                        prenom_agent : agentFormItems.prenom_agent,
                        date_saisie_agent : agentFormItems.date_saisie_agent
                    }
                );
            },

            modifierAgent_FS : function (agentModifItem) {

                return $http.post('/modifierAgent_url',
                    {
                        id_agent : agentModifItem.id_agent,
                        nom_agent : agentModifItem.nom_agent,
                        prenom_agent : agentModifItem.prenom_agent
                    });
            },

            agent_FS : function(agentId){

                return $http.get('/recupAgent_url/'+agentId);
            },

            supprimerAgent_FS : function(idAgent){

                return $http.get("/supprimerAgent_url/"+idAgent);
            }

        };

    }]);

    /////////////////////////////////////////////////

