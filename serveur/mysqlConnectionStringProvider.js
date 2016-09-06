var mysql = require('mysql');

var mysqlConnectionString = require('./mysqlConnectionString.js');

var mysqlConnectionStringProvider = {

    getMysqlConnection : function () {

        var connection = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connection.dev);

        connection.connect(function (err) {
            if(err) { throw err; }

            console.log('************************** Connection reussie *******************');
        });
        return connection;
    },

    closeMysqlConnection : function (currentConnection) {

        if(currentConnection) {

            currentConnection.end(function (err) {

                if(err) { throw err; }

                console.log("********************** Connection fermee avec succes ***********************");
            });
        }
    }
};

module.exports.mysqlConnectionStringProvider = mysqlConnectionStringProvider;