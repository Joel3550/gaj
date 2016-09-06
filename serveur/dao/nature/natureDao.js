var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var natureDao = {

    listeNature : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM nature";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterNature : function(natureFormItems, onSuccessfulCallback){

        var nature = {
            libelle_nature : natureFormItems.libelle_nature
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO nature SET ?";

        if(connection){

            connection.query(queryStatement, nature, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupNature : function(idNature, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM nature WHERE id_nature = ?";

        if(connection){

            connection.query(queryStatement, idNature, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifierNature : function(modifFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var nature = {
            id_nature: modifFormItems.id_nature,
            libelle_nature : modifFormItems.libelle_nature
        };
        var queryStatement = "UPDATE nature SET libelle_nature=? WHERE id_nature=?";

        if(connection){

            connection.query(queryStatement, [nature.libelle_nature, nature.id_nature], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerNature : function(idNature){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "DELETE FROM nature WHERE id_nature = ?";

        if(connection){

            connection.query(queryStatement, idNature, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsNature: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var nature_id = id;
        var queryStatement = "SELECT * FROM nature WHERE id_nature = ?";

        if(connection){

            connection.query(queryStatement, nature_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    }

};

module.exports.natureDao = natureDao;