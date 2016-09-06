var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var typeIndividuDao = {

    listeTypeIndividu : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM type_individu";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterTypeIndividu : function(typeIndividuFormItems, onSuccessfulCallback){

        var typeIndividu = {
            libelle_typeIndividu : typeIndividuFormItems.libelle_typeIndividu
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO type_individu SET ?";

        if(connection){

            connection.query(queryStatement, typeIndividu, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupTypeIndividu : function(typeIndividuId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM type_individu WHERE id_typeIndividu = ?";

        if(connection){

            connection.query(queryStatement, typeIndividuId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifierTypeIndividu : function(typeIndividuModifItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var typeIndividu = {
            id_typeIndividu: typeIndividuModifItem.id,
            libelle_typeIndividu : typeIndividuModifItem.libelle_typeIndividu
        };
        var queryStatement = "UPDATE type_individu SET libelle_typeIndividu=? WHERE id_typeIndividu=?";

        if(connection){

            connection.query(queryStatement, [typeIndividu.libelle_typeIndividu, typeIndividu.id_typeIndividu], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerTypeIndividu : function(id){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var typeIndividu_id = id;
        var queryStatement = "DELETE FROM type_individu WHERE id_typeIndividu = ?";

        if(connection){

            connection.query(queryStatement, typeIndividu_id, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsTypeIndividu: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var typeIndividu_id = id;
        var queryStatement = "SELECT * FROM type_individu WHERE id_typeIndividu = ?";

        if(connection){

            connection.query(queryStatement, typeIndividu_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    }

};

module.exports.typeIndividuDao = typeIndividuDao;