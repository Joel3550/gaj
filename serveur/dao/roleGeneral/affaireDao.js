var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var affaireDao = {

    listeAffaire : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, DATE_FORMAT(DATE(NOW()), '%d/%m/%Y') AS dateJr FROM affaire " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) ORDER BY affaire.id_affaire";

        //var queryStatement = "SELECT * FROM individu " +
        //    "INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
        //    "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
        //    "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) GROUP BY id_affaire_individu";

        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupDemandeur : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
        "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
        "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
        "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) WHERE " +
        "individu.id_affaire_individu = affaire.id_affaire AND individu.id_typeIndividu_individu = 1";

        if(connection){

            connection.query(queryStatement, affaireId, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupDefendeur : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) WHERE " +
            "individu.id_affaire_individu = affaire.id_affaire AND individu.id_affaire_individu =? AND individu.id_typeIndividu_individu = 2";

        if(connection){

            connection.query(queryStatement, affaireId, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterAffaire : function(affaireFormItems, onSuccessfulCallback){

        var affaire = {
            numero_ordre : affaireFormItems.numero_ordre,
            date_saisie_affaire : affaireFormItems.date_saisie_affaire,
            objet_affaire : affaireFormItems.objet_affaire,
            date_audience : affaireFormItems.date_audience,
            observation : affaireFormItems.observation,
            id_nature_affaire : affaireFormItems.id_nature_affaire,
            id_chambre_affaire : affaireFormItems.id_chambre_affaire,
            doc_scan : affaireFormItems.doc_scan,
            id_user_affaire : affaireFormItems.id_user_affaire
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO affaire SET ?";

        if(connection){

            connection.query(queryStatement, affaire, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    getAffaireByNumero : function(affaireFormItems, callback){

        var affaire = {
            numero_ordre : affaireFormItems.numero_ordre
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM affaire WHERE numero_ordre = ?";

        if(connection){

            connection.query(queryStatement, [affaire.numero_ordre], function(err, rows){

                if(err){throw err;}
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupAffaire : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, DATE_FORMAT(date_audience, '%d/%m/%Y') AS date_audience FROM affaire INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) WHERE affaire.id_affaire = ?";

        //var queryStatement = "SELECT *, DATE_FORMAT(date_saisie_affaire, '%d/%m/%Y') AS date_saisie_affaire," +
        //    "DATE_FORMAT(date_audience, '%d/%m/%Y') AS date_audience FROM individu " +
        //    "INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
        //    "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
        //    "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
        //    //"INNER JOIN reglement ON (affaire.id_affaire = reglement.id_affaire_reglement)" +
        //    "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
        //    "WHERE individu.id_affaire_individu = ? AND individu.id_typeIndividu_individu = 1";

        if(connection){

            connection.query(queryStatement, affaireId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifierAffaire : function(affaireModifItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            numero_ordre : affaireModifItem.numero_ordre,
            date_modification : affaireModifItem.date_modification,
            objet_affaire : affaireModifItem.objet_affaire,
            date_audience : affaireModifItem.date_audience,
            observation : affaireModifItem.observation,
            id_nature_affaire : affaireModifItem.id_nature_affaire,
            id_chambre_affaire : affaireModifItem.id_chambre_affaire,
            id_affaire: affaireModifItem.id

        };
        var queryStatement = "UPDATE affaire SET numero_ordre=?, date_modification=?, objet_affaire=?, " +
            "date_audience=?, observation=?, id_nature_affaire=?, id_chambre_affaire=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.numero_ordre, affaire.date_modification,
                affaire.objet_affaire, affaire.date_audience, affaire.observation,
                affaire.id_nature_affaire, affaire.id_chambre_affaire, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerAffaire : function(id){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire_id = id;
        var queryStatement = "DELETE FROM affaire WHERE id_affaire = ?";

        if(connection){

            connection.query(queryStatement, affaire_id, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsAffaire: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire_id = id;
        var queryStatement = "SELECT * FROM affaire WHERE id_affaire = ?";

        if(connection){

            connection.query(queryStatement, affaire_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterConcerner: function(concernerFormItems, onSuccessfulCallback){

        var concerner = {
            id_individu_concerner : concernerFormItems.id_individu_concerner,
            id_affaire_concerner : concernerFormItems.id_affaire_concerner
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO concerner SET ?";

        if(connection){

            connection.query(queryStatement, concerner, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    transmettreAffaire : function(affaireTransItem){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            transmission : true,
            date_transmission : new Date(),
            id_affaire: affaireTransItem.id
        };
        var queryStatement = "UPDATE affaire SET transmission=?, date_transmission=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.transmission, affaire.date_transmission, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                //onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    annulerTransmettreAffaire : function(affaireTransItem){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            transmission : false,
            date_transmission : new Date(),
            id_affaire: affaireTransItem.id
        };
        var queryStatement = "UPDATE affaire SET transmission=?, date_transmission=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.transmission, affaire.date_transmission, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                //onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    reglementAffaire: function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire_id = affaireId;
        var queryStatement = "SELECT * FROM reglement " +
            "INNER JOIN affaire ON (reglement.id_affaire_reglement = affaire.id_affaire) " +
            "WHERE reglement.id_affaire_reglement = ?";

        if(connection){

            connection.query(queryStatement, affaire_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },


    listeIndividus : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire)";

        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupCoursAffaire : function(affaireId, callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var id = affaireId;
        var queryStatement = "SELECT * FROM cours " +
            "INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience)" +
            "WHERE affaire.id_affaire = ?";

        if(connection){

            connection.query(queryStatement, id, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffaireDate : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT DISTINCT date_saisie_affaire, id_user_affaire FROM affaire";

        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupPartie : function(individuId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "WHERE id_individu = ?";

        if(connection){

            connection.query(queryStatement, individuId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupReglement : function(reglementId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM reglement " +
            "INNER JOIN individu ON (reglement.id_individu_reglement = individu.id_individu) " +
            "WHERE id_reglement = ?";

        if(connection){

            connection.query(queryStatement, reglementId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifIndividu: function(parties, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var partie = {
            id_individu : parties.id_individu,
            nom_individu : parties.nom_individu,
            prenom_individu : parties.prenom_individu,
            age : parties.age
        }
        var queryStatement = "UPDATE individu SET nom_individu=?, prenom_individu=?, age=? WHERE id_individu = ?";
        if(connection){

            connection.query(queryStatement, [partie.nom_individu, partie.prenom_individu, partie.age, parties.id_individu], function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    },

    modifReglement: function(reglements, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var reglement = {
            id_individu_reglement : reglements.id_individu_reglement,
            id_reglement : reglements.id_reglement,
            montant : reglements.montant
        }
        var queryStatement = "UPDATE reglement SET montant=?, id_individu_reglement=? WHERE id_reglement = ?";
        if(connection){

            connection.query(queryStatement, [reglement.montant, reglement.id_individu_reglement, reglement.id_reglement], function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    },

    supprimerIndividuAffaire : function(idIndividu){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var individu_id = idIndividu;
        var queryStatement = "DELETE FROM individu WHERE id_individu = ?";

        if(connection){

            connection.query(queryStatement, individu_id, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    }


    //vUniqueAffaire : function(modelValue, callback) {
    //
    //    var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
    //    //var value2 = viewValue;
    //    var queryStatement = "SELECT numero_ordre FROM affaire WHERE numero_ordre = ?";
    //
    //    if(connection){
    //
    //        connection.query(queryStatement, modelValue, function(err, rows, fields){
    //
    //            if(err){ throw err; }
    //
    //            console.log(rows);
    //
    //            callback(rows);
    //
    //        });
    //
    //        connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
    //
    //    }
    //}


};

module.exports.affaireDao = affaireDao;