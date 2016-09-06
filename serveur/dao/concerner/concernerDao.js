var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var concernerDao = {

    listeConcerner : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM concerner";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterConcerner : function(concernerFormItems, onSuccessfulCallback){

        var concerner = {
            id_individu_concerner : concernerFormItems.id_individu_concerner,
            id_affaire_concerner : concernerFormItems.id_affaire_concerner,
            montant : concernerFormItems.montant,
            date_saisie : concernerFormItems.date_saisie
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

    recupConcerner : function(concernerId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM concerner WHERE id_concerner = ?";

        if(connection){

            connection.query(queryStatement, concernerId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifierConcerner : function(concernerModifItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var concerner = {
            id_concerner: concernerModifItem.id,
            id_individu_concerner : concernerModifItem.id_individu_concerner,
            id_affaire_concerner : concernerModifItem.id_affaire_concerner
        };
        var queryStatement = "UPDATE concerner SET id_individu_concerner=?, id_affaire_concerner=?, montant=? WHERE id_concerner=?";

        if(connection){

            connection.query(queryStatement, [concerner.id_individu_concerner, concerner.id_affaire_concerner, concerner.montant, concerner.id_concerner], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerConcerner : function(id){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var concerner_id = id;
        var queryStatement = "DELETE FROM concerner WHERE id_concerner = ?";

        if(connection){

            connection.query(queryStatement, concerner_id, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsConcerner: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var concerner_id = id;
        var queryStatement = "SELECT * FROM concerner WHERE id_concerner = ?";

        if(connection){

            connection.query(queryStatement, concerner_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    //recupAffaireConcerner: function(id, callback){
    //
    //    var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
    //    var affaireConcerner_id = id;
    //    var queryStatement = "SELECT * FROM affaire WHERE id_affaire = ?";
    //    if(connection){
    //
    //        connection.query(queryStatement, affaireConcerner_id, function(err, rows, fields){
    //
    //            if(err){ throw err; }
    //
    //            callback(rows);
    //
    //        });
    //
    //        connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
    //
    //    }
    //
    //}

};

module.exports.concernerDao = concernerDao;