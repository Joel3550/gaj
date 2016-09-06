var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var reglementDao = {

    listeReglement : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var affaire = {
        //    id_affaire : id
        //};
        var queryStatement = "SELECT * FROM reglement";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterReglement : function(reglementFormItems, onSuccessfulCallback){

        var reglement = {
            montant : reglementFormItems.montant,
            id_affaire_reglement : reglementFormItems.id_affaire_reglement,
            id_individu_reglement : reglementFormItems.id_individu_reglement,
            date_reglement : reglementFormItems.date_reglement
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO reglement SET ?";

        if(connection){

            connection.query(queryStatement, reglement, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupReglement : function(reglementId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM reglement WHERE id_reglement = ?";

        if(connection){

            connection.query(queryStatement, reglementId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifierReglement : function(reglementModifItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var reglement = {
            id_reglement: reglementModifItem.id,
            montant : reglementModifItem.montant,
            id_affaire_reglement : reglementModifItem.id_affaire_reglement
        };
        var queryStatement = "UPDATE reglement SET montant=?, id_affaire_reglement=? WHERE id_reglement=?";

        if(connection){

            connection.query(queryStatement, [reglement.montant, reglement.id_affaire_reglement, reglement.id_reglement], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerReglement : function(id){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var reglement_id = id;
        var queryStatement = "DELETE FROM reglement WHERE id_reglement = ?";

        if(connection){

            connection.query(queryStatement, reglement_id, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsReglement: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var reglement_id = id;
        var queryStatement = "SELECT * FROM reglement WHERE id_reglement = ?";

        if(connection){

            connection.query(queryStatement, reglement_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffaireReglement: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaireReglement_id = id;
        var queryStatement = "SELECT * FROM affaire INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) WHERE affaire.id_affaire = ?";
        //var queryStatement = "SELECT *, DATE_FORMAT(date_saisie_affaire, '%d/%m/%Y') AS date_saisie_affaire," +
        //    "DATE_FORMAT(date_audience, '%d/%m/%Y') AS date_audience FROM individu " +
        //    "INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
        //    "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
        //    "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
        //    "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
        //    //"INNER JOIN reglement ON (affaire.id_affaire = reglement.id_affaire_reglement)" +
        //    "WHERE individu.id_affaire_individu = ? AND individu.id_typeIndividu_individu = 1"
            ;
        if(connection){

            connection.query(queryStatement, affaireReglement_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    },

    recupReglementAffaire: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaireReglement_id = id;
        var queryStatement = "SELECT * FROM reglement " +
            "INNER JOIN affaire ON (reglement.id_affaire_reglement = affaire.id_affaire) " +
            "INNER JOIN individu ON (reglement.id_individu_reglement = individu.id_individu)" +
            "WHERE reglement.id_affaire_reglement = ?";
        if(connection){

            connection.query(queryStatement, affaireReglement_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    },

    affaireCouranteDao: function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var affaire = {id : reglementFormItems.id_affaire};
        var queryStatement = "SELECT * FROM affaire " +
            "INNER JOIN individu ON (affaire.id_affaire = individu.id_affaire_individu)";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    },

    reglementsItemForPrint: function(idReglement, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var affaire = {id : reglementFormItems.id_affaire};
        var queryStatement = "SELECT * FROM reglement WHERE id_reglement = ?";
        if(connection){

            connection.query(queryStatement, idReglement, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    }
};

module.exports.reglementDao = reglementDao;