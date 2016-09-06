var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var roleAudienceDao = {

    listeAudience : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM affaire " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) WHERE affaire.date_audience >= DATE(NOW()) ORDER BY affaire.id_affaire DESC";

        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupParties : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
        "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
        "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
        "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre)";

        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupDefendeur : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre)";

        if(connection){

            connection.query(queryStatement, affaireId, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAudience : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, DATE_FORMAT(date_saisie_affaire, '%d/%m/%Y') AS date_saisie_affaire," +
            "DATE_FORMAT(date_audience, '%d/%m/%Y') AS date_audience FROM affaire INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) WHERE affaire.id_affaire = ?";

        if(connection){

            connection.query(queryStatement, affaireId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupValidationAudience : function(audienceId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();

        var queryStatement = "SELECT DISTINCT * FROM affaire " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "WHERE affaire.id_affaire = ?";

        if(connection){

            connection.query(queryStatement, audienceId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modifierAudience : function(audienceModifItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var audience = {
            id_affaire: audienceModifItem.id,
            numero_ordre : audienceModifItem.numero_ordre,
            date_saisie_affaire : audienceModifItem.date_saisie_affaire,
            date_audience : audienceModifItem.date_audience,
            objet_affaire : audienceModifItem.objet_affaire,
            observation : audienceModifItem.observation,
            id_nature_affaire : audienceModifItem.id_nature_affaire,
            id_chambre_affaire : audienceModifItem.id_chambre_affaire
        };
        var queryStatement = "UPDATE affaire SET numero_ordre=?, date_saisie_affaire=?, demandeur=?, " +
            "defendeur=?, date_audience=?, objet_affaire=?, observation=?, id_nature_affaire=?," +
            "id_chambre_affaire=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [audience.numero_ordre, audience.date_saisie_affaire, audience.demandeur,
                audience.defendeur, audience.date_audience, audience.objet_affaire, audience.observation,
                audience.id_nature_affaire, audience.id_chambre_affaire, audience.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    transmettreAudience : function(audienceModifItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var audience = {
            id_affaire: audienceModifItem.id,
            transJugement : audienceModifItem.transJugement
        };
        var queryStatement = "UPDATE affaire SET transJugement=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [audience.transJugement, audience.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerAudience : function(id){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire_id = id;
        var queryStatement = "DELETE FROM affaire WHERE id_affaire = ?";

        if(connection){

            connection.query(queryStatement, affaire_id, function(err){

                if(err){throw err;}

            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    detailsAudience: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire_id = id;
        var queryStatement = "SELECT * FROM affaire WHERE id_affaire = ?";

        if(connection){

            connection.query(queryStatement, affaire_id, function(err, rows, fields){

                if(err){ throw err; }

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterConcerner: function(concernerFormItems, onSuccessfulCallback){

        var concerner = {
            id_individu_concerner : concernerFormItems.id_individu_concerner,
            id_affaire_concerner : concernerFormItems.id_affaire_concerner
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

    validationAudience : function(audienceId){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var audience = {
            valide : true,
            transJugement : true,
            date_validation : new Date(),
            id_affaire: audienceId
        };
        var queryStatement = "UPDATE affaire SET valide=?, transJugement=?, date_validation=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [audience.valide, audience.transJugement, audience.date_validation, audience.id_affaire], function (err) {

                if(err){throw err;}

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    retourAffaire : function(coursFormItems){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            //valide : false,
            motif_retour : coursFormItems.motif_retour,
            transmission : false,
            id_affaire: coursFormItems.id_affaire
        };
        var queryStatement = "UPDATE affaire SET transmission=?, motif_retour=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.transmission, affaire.motif_retour, affaire.id_affaire], function (err) {

                if(err){throw err;}

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    publierAffaire : function(audienceId){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var audience = {
            //valide : false,
            publie : true,
            date_publication : new Date(),
            //report : false,
            id_affaire: audienceId
        };
        var queryStatement = "UPDATE affaire SET publie=?, date_publication=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [audience.publie, audience.date_publication, audience.id_affaire], function (err) {

                if(err){throw err;}

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    annulerPublierAffaire : function(audienceId){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var audience = {
            //report : true,
            publie : false,
            date_publication : '0000-00-00',
            id_affaire: audienceId
        };
        var queryStatement = "UPDATE affaire SET publie=?, date_publication=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [audience.publie, audience.date_publication, audience.id_affaire], function (err) {

                if(err){throw err;}

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajusterDateAffaire : function(ajusterAffaireItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            date_saisie_affaire : ajusterAffaireItem.date_saisie_affaire,
            id_affaire: ajusterAffaireItem.id
        };
        var queryStatement = "UPDATE affaire SET date_saisie_affaire=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.date_saisie_affaire, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffaireItems : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, DATE_FORMAT(date_saisie_affaire, '%d/%m/%Y') AS date_saisie_affaire," +
            "DATE_FORMAT(date_audience, '%d/%m/%Y') AS date_audience FROM affaire " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "WHERE affaire.id_affaire = ?";

        if(connection){

            connection.query(queryStatement, affaireId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAgentsCours : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM cours " +
            //"INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire)" +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience)";
            //" WHERE affaire.id_affaire = ?";

        if(connection){

            connection.query(queryStatement, affaireId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterCours: function(coursFormItems, onSuccessfulCallback){

        var cours = {
            president : coursFormItems.president,
            greffier : coursFormItems.greffier,
            assesseurs : coursFormItems.assesseurs,
            substitut : coursFormItems.substitut,
            id_affaire_cours : coursFormItems.id_affaire_cours,
            id_salleAudience_cours : coursFormItems.id_salleAudience_cours,
            id_chambre_cours : coursFormItems.id_chambre_cours,
            type_affaire : coursFormItems.type_affaire
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO cours SET ?";

        if(connection){

            connection.query(queryStatement, cours, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupChambreAffaires : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, DATE_FORMAT(date_audience, '%d/%m/%Y') AS date_audience, DATE_FORMAT(date_saisie_affaire, '%d/%m/%Y') " +
            "AS date_saisie_affaire, DATE_FORMAT(date_validation, '%d/%m/%Y') AS date_validation FROM affaire " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) WHERE affaire.date_audience >= DATE(NOW()) ORDER BY affaire.id_affaire DESC";

        if(connection){

            connection.query(queryStatement, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupCompositionCours : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var chambre = {id : chambreItems.id_chambre};
        var queryStatement = "SELECT * FROM cours INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience) " +
            "WHERE cours.id_affaire_cours = affaire.id_affaire";

        if(connection){

            connection.query(queryStatement, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recuplisteChambre : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var etat = {
            etatPublie : 0,
            etatValide : 1
        };
        var queryStatement = "SELECT DISTINCT chambre.id_chambre, chambre.libelle_chambre, chambre.commentaire, " +
            "affaire.id_user_affaire FROM affaire INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "WHERE affaire.publie = ? AND affaire.valide = ? AND affaire.date_audience >= DATE(NOW())";
        if(connection){

            connection.query(queryStatement, [etat.etatPublie, etat.etatValide], function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupCoursForChambre : function(coursFormItems, callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var chambre = {id : coursFormItems.id_chambre}
        var queryStatement = "SELECT DISTINCT chambre.id_chambre FROM cours INNER JOIN chambre ON (cours.id_chambre_cours = chambre.id_chambre)" +
            "WHERE cours.id_chambre_cours = ?";
        if(connection){

            connection.query(queryStatement, [chambre.id], function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupListeDateAffaire : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var statut = 1;
        //var queryStatement = "SELECT DISTINCT affaire.date_saisie_affaire FROM affaire WHERE affaire.valide = 1";
        var queryStatement = "SELECT DISTINCT affaire.date_transmission, affaire.transmission, affaire.id_user_affaire FROM affaire";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    listeCoursAffaire : function(affaireId, callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM cours WHERE cours.id_affaire_cours = ?";
        if(connection){

            connection.query(queryStatement, affaireId, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    listeCoursAffaireBis : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM cours INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire)";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupCours : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM cours";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupSalles : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT DISTINCT salle_audience.libelle_salleAudience, salle_audience.id_salleAudience " +
            "FROM cours INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience) " +
            "INNER JOIN chambre ON (cours.id_chambre_cours = chambre.id_chambre)";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffaireForCours : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var etatPublie = 0;
        var queryStatement = "SELECT * FROM cours INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "WHERE affaire.publie = ? AND affaire.date_audience >= DATE(NOW()) ORDER BY affaire.id_affaire DESC";
        if(connection){

            connection.query(queryStatement, etatPublie, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupPresidents : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var etatPublie = 0;
        var queryStatement = "SELECT DISTINCT cours.id_chambre_cours, cours.id_salleAudience_cours, cours.president, " +
            "affaire.id_user_affaire FROM cours " +
            "INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "WHERE affaire.publie = ? AND affaire.date_audience >= DATE(NOW())";
        if(connection){

            connection.query(queryStatement, etatPublie, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupGreffiers : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var etatPublie = 0;
        var queryStatement = "SELECT DISTINCT cours.id_chambre_cours, cours.id_salleAudience_cours, cours.greffier, cours.president, " +
            "affaire.date_audience, affaire.id_user_affaire FROM cours " +
            "INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "WHERE affaire.publie = ? AND affaire.date_audience >= DATE(NOW())";
        if(connection){

            connection.query(queryStatement, etatPublie, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupDateAudience : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var etat = {
            etatValide : 1,
            etatPublie : 0
        }
        var queryStatement = "SELECT DISTINCT affaire.date_audience, affaire.id_chambre_affaire, cours.president, cours.greffier, " +
            "affaire.id_user_affaire FROM cours INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "WHERE affaire.publie=? AND affaire.valide=? AND affaire.date_audience >= DATE(NOW())";
        if(connection){

            connection.query(queryStatement, [etat.etatPublie, etat.etatValide], function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffaireRetourItems : function(idAffaire, callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM affaire WHERE id_affaire=?";
        if(connection){

            connection.query(queryStatement, idAffaire, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffairePublie : function(dateAudience, callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var etatPublie = 1;
        var queryStatement = "SELECT DISTINCT * FROM affaire INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN cours ON (affaire.id_affaire = cours.id_affaire_cours) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature)" +
            "WHERE affaire.date_audience = ? AND affaire.publie = true AND cours.traite = false AND affaire.date_publication = DATE(NOW())";
        if(connection){

            connection.query(queryStatement, dateAudience, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupListeIdAffaire : function(affaireFormItems, callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT DISTINCT numero_ordre * FROM affaire";
        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    }

};

module.exports.roleAudienceDao = roleAudienceDao;