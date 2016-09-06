var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var chambreDao = {

    listeChambre : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM chambre";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterChambre : function(chambreFormItems, onSuccessfulCallback){

        var chambre = {
            libelle_chambre : chambreFormItems.libelle_chambre
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO chambre SET ?";

        if(connection){

            connection.query(queryStatement, chambre, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupChmabreModif : function(idChambre, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM chambre WHERE id_chambre = ?";

        if(connection){

            connection.query(queryStatement, idChambre, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifierChambre : function(chambreModif, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var chambre = {
            id_chambre: chambreModif.id_chambre,
            libelle_chambre : chambreModif.libelle_chambre
        };
        var queryStatement = "UPDATE chambre SET libelle_chambre=? WHERE id_chambre=?";

        if(connection){

            connection.query(queryStatement, [chambre.libelle_chambre, chambre.id_chambre], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerChambre : function(idChambre){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "DELETE FROM chambre WHERE id_chambre = ?";

        if(connection){

            connection.query(queryStatement, idChambre, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsChambre: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var chambre_id = id;
        var queryStatement = "SELECT * FROM chambre WHERE id_chambre = ?";

        if(connection){

            connection.query(queryStatement, chambre_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

};

module.exports.chambreDao = chambreDao;