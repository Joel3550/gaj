//var connectionProvider = require("../../mysqlConnectionStringProvider.js");
//
//var affaireDao = {
//
//    listeAffaire : function(callback) {
//
//        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
//        var queryStatement = "SELECT * FROM affaire";
//        if(connection){
//
//            connection.query(queryStatement, function(err, rows, fields){
//
//                if(err){ throw err; }
//
//                console.log(rows);
//
//                callback(rows);
//
//            });
//
//            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
//
//        }
//    },
//
//    ajouterAffaire : function(affaireFormItems, onSuccessfulCallback){
//
//        var affaire = {
//            numero_ordre : affaireFormItems.numero_ordre,
//            date_saisie_affaire : affaireFormItems.numero_ordre,
//            demandeur : affaireFormItems.demandeur,
//            defendeur : affaireFormItems.defendeur,
//            date_audience : affaireFormItems.date_audience,
//            objet_affaire : affaireFormItems.objet_affaire,
//            observation : affaireFormItems.observation,
//            id_nature_affaire : affaireFormItems.id_nature_affaire,
//            id_chambre_affaire : affaireFormItems.id_chambre_affaire
//        };
//
//        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
//        var queryStatement = "INSERT INTO affaire SET ?";
//
//        if(connection){
//
//            connection.query(queryStatement, affaire, function(err, result){
//
//                if(err){throw err;}
//                onSuccessfulCallback({status : 'sucessfull'});
//                console.log(result);
//            });
//
//            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
//        }
//    },
//
//    recupAffaire : function(affaireId, callback){
//
//        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
//        var queryStatement = "SELECT * FROM affaire";
//
//        if(connection){
//
//            connection.query(queryStatement, affaireId, function (err, rows, field) {
//
//                if(err){throw err;}
//                callback(rows);
//            });
//            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
//
//        }
//    },
//
//    modifierAffaire : function(affaireModifItem, onSuccessfulCallback){
//
//        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
//        var affaire = {
//            id_affaire: affaireModifItem.id,
//            numero_ordre : affaireFormItems.numero_ordre,
//            date_saisie_affaire : affaireFormItems.date_saisie_affaire,
//            demandeur : affaireFormItems.demandeur,
//            defendeur : affaireFormItems.defendeur,
//            date_audience : affaireFormItems.date_audience,
//            objet_affaire : affaireFormItems.objet_affaire,
//            observation : affaireFormItems.observation,
//            id_nature_affaire : affaireFormItems.id_nature_affaire,
//            id_chambre_affaire : affaireFormItems.id_chambre_affaire
//        };
//        var queryStatement = "UPDATE affaire SET numero_ordre=?, date_saisie_affaire=?, demandeur=?, " +
//            "defendeur=?, date_audience=?, objet_affaire=?, observation=?, id_nature_affaire=?," +
//            "id_chambre_affaire=? WHERE id_affaire=?";
//
//        if(connection){
//
//            connection.query(queryStatement, [affaire.numero_ordre, affaire.date_saisie_affaire, affaire.demandeur,
//                affaire.defendeur, affaire.date_audience, affaire.objet_affaire, affaire.observation,
//                affaire.id_nature_affaire, affaire.id_chambre_affaire, affaire.id_affaire], function (err, result) {
//
//                if(err){throw err;}
//                console.log(result);
//
//                onSuccessfulCallback({status : "successful"})
//            });
//
//            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
//
//        }
//    },
//
//    supprimerAffaire : function(id){
//
//        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
//        var affaire_id = id;
//        var queryStatement = "DELETE FROM affaire WHERE id_affaire = ?";
//
//        if(connection){
//
//            connection.query(queryStatement, affaire_id, function(err){
//
//                if(err){throw err;}
//
//            });
//            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
//        }
//    },
//
//    detailsAffaire: function(id, callback){
//
//        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
//        var affaire_id = id;
//        var queryStatement = "SELECT * FROM affaire WHERE id_affaire = ?";
//
//        if(connection){
//
//            connection.query(queryStatement, affaire_id, function(err, rows, fields){
//
//                if(err){ throw err; }
//
//                callback(rows);
//
//            });
//
//            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
//
//        }
//    }
//
//};
//
//module.exports.affaireDao = affaireDao;