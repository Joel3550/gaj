var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var salleAudienceDao = {

    listeSalleAudiences : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM salle_audience";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterSalleAudience : function(salleAudienceFormItems, onSuccessfulCallback){

        var salleAudience = {
            libelle_salleAudience : salleAudienceFormItems.libelle_salleAudience
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO salle_audience SET ?";

        if(connection){

            connection.query(queryStatement, salleAudience, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupSalleAudienceModif : function(idSalleAudience, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM salle_audience WHERE id_salleAudience = ?";

        if(connection){

            connection.query(queryStatement, idSalleAudience, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifSalleAudience : function(salleAudienceModifItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var salleAudience = {
            id_salleAudience : salleAudienceModifItems.id_salleAudience,
            libelle_salleAudience : salleAudienceModifItems.libelle_salleAudience
        }
        var queryStatement = "UPDATE salle_audience SET libelle_salleAudience = ? WHERE id_salleAudience = ?";

        if(connection){

            connection.query(queryStatement, [salleAudience.libelle_salleAudience, salleAudience.id_salleAudience], function (err, result) {

                if(err){throw err;}
                console.log(result);
                onSuccessfulCallback({status : 'sucessfull'});
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    suppressionSalleAudience : function(idSalleAudience){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "DELETE FROM salle_audience WHERE id_salleAudience = ?";

        if(connection){

            connection.query(queryStatement, idSalleAudience, function (err) {

                if(err){throw err;}
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    }

};

module.exports.salleAudienceDao = salleAudienceDao;