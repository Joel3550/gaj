var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var individuDao = {

    listeIndividu: function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, DATE_FORMAT(date_creation, '%d/%m/%Y') as date_creation FROM individu " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu)";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterIndividu : function(individuFormItems, onSuccessfulCallback){

        var individu = {
            nom_individu : individuFormItems.nom_individu,
            prenom_individu : individuFormItems.prenom_individu,
            age : individuFormItems.age,
            date_creation : individuFormItems.date_creation,
            id_typeIndividu_individu : individuFormItems.id_typeIndividu_individu,
            id_affaire_individu : individuFormItems.id_affaire_individu
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO individu SET ?";

        if(connection){

            connection.query(queryStatement, individu, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupIndividu : function(individuId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu i, typeIndividu t " +
            "WHERE id_individu = ? AND id_typeIndividu_individu = id_typeIndividu";

        if(connection){

            connection.query(queryStatement, individuId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerIndividu : function(id){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var individu_id = id;
        var queryStatement = "DELETE FROM individu WHERE id_individu = ?";

        if(connection){

            connection.query(queryStatement, individu_id, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsIndividu : function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var individu_id = id;
        var queryStatement = "SELECT * FROM individu WHERE id_individu = ?";

        if(connection){

            connection.query(queryStatement, individu_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffaireIndividu: function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var affaireIndividu_id = 0;
        var queryStatement = "SELECT * FROM affaire";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    },

    individuLieAffaireDao: function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu " +
            "INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) WHERE " +
            "individu.id_affaire_individu = affaire.id_affaire";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    },

    recupIndividuAffaire : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, DATE_FORMAT(date_saisie_affaire, '%d/%m/%Y') AS date_saisie_affaire," +
            "DATE_FORMAT(date_audience, '%d/%m/%Y') AS date_audience FROM individu " +
            "INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "WHERE individu.id_affaire_individu = ?";

        if(connection){

            connection.query(queryStatement, affaireId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupNumeroAffaire : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM affaire WHERE id_affaire = ?";

        if(connection){

            connection.query(queryStatement, affaireId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    verifReglementAffaireDao: function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var affaire = {id : reglementFormItems.id_affaire};
        var queryStatement = "SELECT * FROM reglement INNER JOIN affaire ON (reglement.id_affaire_reglement = affaire.id_affaire)";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }

    }

};

module.exports.individuDao = individuDao;