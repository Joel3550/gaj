var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var securityDao = {

    creerCompte : function(registerFormItems, onSuccessfulCallback){

        var user = {
            identite : registerFormItems.identite,
            username : registerFormItems.username,
            email : registerFormItems.email,
            telephone : registerFormItems.telephone,
            password : registerFormItems.password,
            id_juridiction_user : registerFormItems.juridiction
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO users SET ?";

        if(connection){

            connection.query(queryStatement, user, function(err){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    getUserByUsername : function(registerFormItems, callback){

        var query = {
            username : registerFormItems.username,
            password : registerFormItems.password
        };
        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM users WHERE username = ? AND password = ?";

        if(connection){

            connection.query(queryStatement, [query.username, query.password], function(err, rows){

                if(err){throw err;}
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },
    //
    //getUserByUsername : function(username, callback){
    //
    //    var query = {
    //        username : username
    //    };
    //    var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
    //    var queryStatement = "SELECT * FROM users WHERE username = ? AND password = ?";
    //
    //    if(connection){
    //
    //        connection.query(queryStatement, [query.username], function(err, rows){
    //
    //            if(err){throw err;}
    //            callback(rows);
    //        });
    //
    //        connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
    //    }
    //},

    getUserUsername : function(registerFormItems, callback){

        var query = {
            username : registerFormItems.username
        };
        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM users WHERE username = ?";

        if(connection){

            connection.query(queryStatement, [query.username], function(err, rows){

                if(err){throw err;}
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    comparePassword : function(registerFormItems, callback){

        var query = {
            password : registerFormItems.password
        };
        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM users WHERE password = ?";

        if(connection){

            connection.query(queryStatement, [query.password], function(err, rows){

                if(err){throw err;}
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    getUserById : function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM users WHERE userid = ?";

        if(connection){

            connection.query(queryStatement, id, function(err, rows){

                if(err){throw err;}
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupJuridictions : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM juridiction";

        if(connection){

            connection.query(queryStatement, function(err, result){

                if(err){throw err;}
                callback(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    deconnexion : function(callback){
        var date = new Date();
        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "UPDATE users SET date_last_conx =?";

        if(connection){

            connection.query(queryStatement, date, function(err, rows){

                if(err){throw err;}
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    listeAffairesSave : function(id_user, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT SUM(id_affaire) FROM affaire WHERE id_user_affaire = ?";

        if(connection){

            connection.query(queryStatement, id_user, function(err, rows){

                if(err){throw err;}
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    }

};

module.exports.securityDao = securityDao;