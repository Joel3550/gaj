//angular.module('app', []).
//    controller('modifierAgentController', ['$scope', 'modifierAgentService', '$timeout', function($scope, modifierAgentService, $timeout) {
//
//
//        $scope.agentModifItem = {
//            nom_agent : "",
//            prenom_agent : "",
//            date_modification : new Date()
//        };
//
//
//        $scope.modalModifAgent_FC = function(idAgent){
//
//            agent_FC();
//
//            function agent_FC() {
//
//                modifierAgentService.agent_FS(idAgent)
//                    .success(function (data) {
//                        if (data && data.agentCourantJson && data.agentCourantJson.length > 0) {
//                            console.log(data.agentCourantJson);
//                            $scope.agentModifItem.nom_agent = data.agentCourantJson[0]['nom_agent'];
//                            $scope.agentModifItem.prenom_agent = data.agentCourantJson[0]['prenom_agent'];
//
//                        }
//                    })
//            }
//
//            var modalInstance = $modal.open({
//
//                templateUrl : "/formModifAgent_url/"+idAgent,
//                controller : modifierAgent_FC,
//                scope : $scope,
//                resolve : {
//                    agentForm: function(){
//                        return $scope.agentForm;
//                    }
//                }
//            });
//
//            modalInstance.result.then(function(selectedItem){
//                $scope.selected = selectedItem;
//            }, function(){
//                $log.info('Fermeture du modal a :' + new Date());
//            });
//        }
//
//        var modifierAgent_FC = function($scope, $modalInstance, agentForm){
//
//            $scope.submitForm = function(){
//
//            }
//            $scope.cancel = function () {
//                $modalInstance.dismiss('cancel');
//            }
//        }
//
//        $scope.modifierAgent_FC = function () {
//
//            modifierAgentService.modifierAgent_FS($scope.agentModifItem, modifierAgentService.recupIdAgent_FS())
//                .success(function () {
//                    $timeout(function(){
//                        $scope.message = {class:"alert-success", msg:"L'agent a ete modifiee avec succes"};
//                    },1000);
//                    console.log("successful edit");
//                })
//                .error(function () {
//                    $timeout(function(){
//                        $scope.message = {class:"alert-danger", msg:"Une erreur est intervenue lors de la modification de l'agent"};
//                    },1000);
//                })
//        }
//    }]).
//
//    factory('modifierAgentService', ['$http', '$location', function($http, $location){
//
//        return{
//
//            recupIdAgent_FS : function () {
//
//                var absoluteUrl = $location.absUrl();
//                var segments = absoluteUrl.split('/');
//                var agentId = segments[segments.length -1];
//                return agentId;
//            },
//
//            modifierAgent_FS : function (agentModifItem, agentId) {
//
//                return $http.post('/modifierAgent_url',
//                    {
//                        id : agentId,
//                        nom_agent : agentModifItem.nom_agent,
//                        prenom_agent : agentModifItem.prenom_agent,
//                        date_modification : agentModifItem.date_modification
//                    });
//            },
//
//
//            agent_FS : function(agentId){
//
//                return $http.get('/recupAgent_url/'+agentId);
//            }
//
//        };
//
//    }]);