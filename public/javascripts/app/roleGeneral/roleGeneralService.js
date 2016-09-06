/**
 * Created by AdminWACo on 12/07/2016.
 */
angular.module('app', [])
    .factory('roleGeneralService', ['$http', '$location', '$q', function($http, $location, $q){

        return{

            recupIdAffaire_FS : function () {

                var absoluteUrl = $location.absUrl();
                var segments = absoluteUrl.split('/');
                var affaireId = segments[segments.length -1];
                return affaireId;
            },

            ajouterAffaire_FS : function (affaireFormItems) {

                return $http.post(
                    '/ajouterAffaire_url',
                    {
                        numero_ordre : affaireFormItems.numero_ordre,
                        date_saisie_affaire : affaireFormItems.date_saisie_affaire,
                        objet_affaire : affaireFormItems.objet_affaire,
                        date_audience : affaireFormItems.date_audience,
                        observation : affaireFormItems.observation,
                        id_nature_affaire : affaireFormItems.id_nature_affaire,
                        id_chambre_affaire : affaireFormItems.id_chambre_affaire,
                        doc_scan : affaireFormItems.doc_scan.name,
                        id_user_affaire : sessionStorage.getItem('azwackyx')
                    }
                );
            },

            listeAffaire_FS : function(){

                return $http.get('/listeAffaires_url');
            },

            listeNature_FS : function(){

                return $http.get('/listeNatures_url');
            },

            listeChambre_FS : function(){

                return $http.get('/listeChambres_url');
            },

            infoAffaire_FS : function(affaireId){

                return $http.get('/recupValidationAudience_url/'+affaireId);
            },

            listeIndividus_FS : function(){

                return $http.get('/listeIndividusAffaire_url');
                //return $http.get('/listeIndividus_url');
            },

            listeAffaireDate_FS : function(){

                return $http.get('/listeAffaireDate_url');
            },

            detailAffaire_FS : function(){

                return $http.get('/detailAffaire_url');
            },

            recupPartie_FS : function(individuId){
                return $http.get('/recupPartie_url/'+individuId);
            },

            recupReglement_FS : function(reglementId){
                return $http.get('/recupReglement_url/'+reglementId);
            },

            modifIndividu_FS : function(parties){
                return $http.post('/modifIndividu_url',
                    {
                        id_individu : parties.id_individu,
                        nom_individu : parties.nom_individu,
                        prenom_individu : parties.prenom_individu,
                        age : parties.age
                    });
            },

            modifReglement_FS : function(reglements){
                return $http.post('/modifReglement_url',
                    {
                        id_individu_reglement : reglements.id_individu_reglement,
                        id_reglement : reglements.id_reglement,
                        montant : reglements.montant
                    });
            },

            individuForIdAffaire_FS : function(affaireId){

                return $http.get("/listeIndividuForAffaire_url/"+affaireId)
            },

            reglement_FS : function(affaireId){

                return $http.get('/recupReglementAffaire_url/'+affaireId);
            },

            supprimerIndividu_FS : function(individuId){

                return $http.get('/supprimerIndividu/'+individuId);
            },

            transmettreAffaire_FS : function(id_affaire){
                return $http.post('/transmettreAffaire_url', {
                    id : id_affaire
                })
            },

            annulerTransmettreAffaire_FS : function(id_affaire){
                return $http.post('/annulerTransmettreAffaire_url', {
                    id : id_affaire
                })
            }

        };

        console.log(sessionStorage.getItem("username"));

    }])