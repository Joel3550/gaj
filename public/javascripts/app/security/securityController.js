/**
 * Created by joel Fabrice on 4/12/2016.
 */
angular.module("app", [])
    .controller("securityController", ['$scope', 'securityService', '$window', '$timeout', function($scope, securityService, $window, $timeout){

        if(!sessionStorage.getItem("username")) {
            $scope.registerFormItems = {
                identite: "",
                username: "",
                email: "",
                telephone: "",
                password: "",
                confirmPassword: "",
                juridiction: ""
            }

            $scope.listeAffairesSave = "";

            listeJuridiction_FC();

            /--------------------DASHBOARD SETTINGS ----------------/
            //listeAffairesSave_FC();

            //function listeAffairesSave_FC(){
            //
            //    $scope.id_user = sessionStorage.getItem("azwackyx");
            //    securityService.listeAffairesSave_FS($scope.id_user)
            //        .success(function(data){
            //            if(data && data.listeAffairesSaveJson && data.listeAffairesSaveJson.length > 0){
            //                console.log("resultat "+data.listeAffairesSaveJson);
            //                $scope.listeAffairesSave = data.listeAffairesSaveJson;
            //            }
            //        })
            //        .error(function(data){
            //            console.log("failed");
            //        })
            //}
            $scope.listeJuridictions = [];
            function listeJuridiction_FC(){

                securityService.listeJuridiction_FS()
                    .success(function(data){
                        if(data && data.listeJuridictionJson && data.listeJuridictionJson.length > 0){
                            console.log(data.listeJuridictionJson);
                            $scope.listeJuridictions = data.listeJuridictionJson;
                        }
                    })
                    .error(function(data){
                        console.log("aucune données recupérée");
                    })
            }

            $scope.ouvrirSession_FC = function () {

                securityService.ouvrirSession_FS()
                    .success(
                    console.log('successful')
                )
            };

            $scope.creerCompte_FC = function (registerFormItems) {

                securityService.creerCompte_FS(registerFormItems)
                    .success(function (data) {
                        if (data.errorsJson) {
                            $scope.listeErrors = data.errorsJson;
                        } else {
                            if (data.message) {
                                $scope.messageInfo = {class: 'bg-red', msg: data.message}
                            }
                            else {
                                $scope.messageInfo = {class: 'bg-success', msg: 'Votre compte a bien été créer et pouvez vous connecter'}
                                $timeout(function () {
                                    $window.location.href = '/'
                                }, 1000)
                            }
                        }
                    })
                    .error(function () {
                        console.log('failed');
                    })
            };
            $scope.user = {
                username: ""
            };
            $scope.connexion_FC = function (registerFormItems) {

                securityService.connexion_FS(registerFormItems)
                    .success(function (data) {
                        if (data.errorsJson) {
                            $scope.listeErrors = data.errorsJson;
                        } else {
                            if (data && data.userJson && data.userJson.length > 0) {
                                $scope.user.username = data.userJson[0]['username'];
                                console.log(data.userJson[0]['username']);
                                $scope.messageInfo = {class: 'bg-success', msg: 'authentification reussi'}
                                $timeout(function () {
                                    $window.location.href = '/ouvrirSession_url'
                                }, 1000)
                                sessionStorage.setItem("username", data.userJson[0]['username']);
                                sessionStorage.setItem("azwackyx", data.userJson[0]['userId']);
                            }
                            if (!data.userJson.length) {

                                $scope.messageInfo = {
                                    class: 'bg-danger',
                                    msg: 'Nom utilisateur ou mot de passe invalide'
                                }
                            }
                        }
                    })
                    .error(function () {
                        console.log('error');
                    })
            }

            $scope.deconnexion = function(){

                securityService.deconnexion_FS()
                    .success(function(){
                        console.log("successful edit");
                    })
                    .error(function(){
                        console.log("error");
                    })
            }

            $scope.currentUsername = sessionStorage.getItem("username");
        }
    }])
    .factory("securityService", ['$http', function($http) {

        return {

            creerCompte_FS : function(registerFormItems){

                return $http.post('/creerCompte_url',
                    {
                        identite : registerFormItems.identite,
                        username : registerFormItems.username,
                        email : registerFormItems.email,
                        telephone : registerFormItems.telephone,
                        password : registerFormItems.password,
                        juridiction : registerFormItems.juridiction
                    })
            },

            connexion_FS : function(registerFormItems) {

                return $http.post('/connexion_url',
                    {
                        username: registerFormItems.username,
                        password: registerFormItems.password
                    })
            },

            listeJuridiction_FS : function(){

                return $http.get("/listeJuridictions_url");
            },

            deconnexion_FS : function(){

                return $http.get("/deconnexion_url");
            }

            //listeAffairesSave_FS : function(id_user){
            //
            //    return $http.get("/listeAffairesSave_url/"+id_user);
            //}

        }
    }])

