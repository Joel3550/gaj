var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var agentDao = {

    listeAgents: function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, DATE_FORMAT(date_saisie_agent, '%d/%m/%Y') as date_saisie_agent FROM agent";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterAgent : function(agentFormItems, onSuccessfulCallback){

        var agent = {
            nom_agent : agentFormItems.nom_agent,
            prenom_agent : agentFormItems.prenom_agent,
            date_saisie_agent : agentFormItems.date_saisie_agent
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO agent SET ?";

        if(connection){

            connection.query(queryStatement, agent, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    modifierAgent : function(agentModifItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var agent = {
            nom_agent : agentModifItem.nom_agent,
            prenom_agent: agentModifItem.prenom_agent,
            date_modification: new Date(),
            id_agent: agentModifItem.id_agent
        };
        var queryStatement = "UPDATE agent SET nom_agent=?, prenom_agent=?, date_modification=? WHERE id_agent=?";

        if(connection){

            connection.query(queryStatement, [agent.nom_agent, agent.prenom_agent, agent.date_modification,
                agent.id_agent], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerAgent : function(id_agent){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "DELETE FROM agent WHERE id_agent = ?";

        if(connection){

            connection.query(queryStatement, id_agent, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsAgent : function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var agent_id = id;
        var queryStatement = "SELECT * FROM agent WHERE id_agent = ?";

        if(connection){

            connection.query(queryStatement, agent_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAgent : function(agentId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var agent_id = agentId;
        var queryStatement = "SELECT * FROM agent WHERE id_agent = ?";

        if(connection){

            connection.query(queryStatement, agent_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    }

};

module.exports.agentDao = agentDao;