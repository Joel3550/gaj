var connectionProvider = require("../../mysqlConnectionStringProvider.js");

var jugementDao = {

    listeJugements : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, ADDDATE(date_enregistrement, INTERVAL 30 DAY) AS fin_appel FROM jugement " +
            "INNER JOIN affaire ON (jugement.id_affaire_jugement = affaire.id_affaire)" +
            "INNER JOIN caractere ON (jugement.id_caractere_jugement = caractere.id_caractere)";

        //var queryStatement = "SELECT *, DATE_FORMAT(date_saisie_affaire, '%d/%m/%Y') AS date_saisie_affaire, " +
        //    "DATE_FORMAT(date_audience, '%d/%m/%Y') FROM individu INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
        //    "INNER JOIN reglement ON (affaire.id_affaire = reglement.id_affaire_reglement) " +
        //    "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
        //    "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
        //    "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre)";

        if(connection){

            connection.query(queryStatement, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterJugement : function(jugementFormItems, onSuccessfulCallback){

        var jugement = {
            //numero_jugement : jugementFormItems.numero_jugement,
            date_saisie_jugement : jugementFormItems.date_saisie_jugement,
            president : jugementFormItems.president,
            assesseurs : jugementFormItems.assesseurs,
            substitut : jugementFormItems.substitut,
            greffier : jugementFormItems.greffier,
            //date_jugement : jugementFormItems.date_jugement,
            heure_audience : jugementFormItems.heure_audience,
            salle_audience : jugementFormItems.salle_audience,
            observation : jugementFormItems.observation
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "INSERT INTO audience SET ?";

        if(connection){

            connection.query(queryStatement, jugement, function(err, result){

                if(err){throw err;}
                onSuccessfulCallback({status : 'sucessfull'});
                console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    modifierAffaire : function(jugementModifItem, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire: jugementModifItem.id,
            numero_ordre : jugementModifItem.numero_ordre,
            date_saisie_affaire : jugementModifItem.date_saisie_affaire,
            date_audience : jugementModifItem.date_audience
        };
        var queryStatement = "UPDATE audience SET numero_ordre=?, date_saisie_affaire=?, demandeur=?, " +
            "defendeur=?, date_audience=?, objet_affaire=?, observation=?, montant=?, id_nature_affaire=?," +
            "id_chambre_affaire=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.numero_ordre, affaire.date_saisie_affaire,
                affaire.date_audience, affaire.objet_affaire, affaire.observation, affaire.montant,
                affaire.id_nature_affaire, affaire.id_chambre_affaire, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    supprimerAffaire : function(id){

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

    detailsAffaire: function(id, callback){

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

    recupJugement : function(jugementId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM audience WHERE id_audience = ?";

        if(connection){

            connection.query(queryStatement, jugementId, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffairesJugementJr : function(callback) {

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var statut = true;
        //var queryStatement = "SELECT * FROM affaire WHERE date_saisie_affaire = DATE(NOW()) AND affaire.transJugement = ?";
        var queryStatement = "SELECT * FROM affaire INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) WHERE " +
            "affaire.date_saisie_affaire = DATE(NOW()) AND affaire.transJugement = ?";

        if(connection){

            connection.query(queryStatement, statut, function(err, rows, fields){

                if(err){ throw err; }

                console.log(rows);

                callback(rows);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    ajouterAffaireJugement : function(affaireJugementItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var jugement = {
            id_audience_affaire: affaireJugementItems.id,
            auJugement : affaireJugementItems.auJugement,
            id_affaire : affaireJugementItems.id_affaire
        };
        var queryStatement = "UPDATE affaire SET auJugement=?, id_audience_affaire=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [jugement.auJugement, jugement.id_audience_affaire, jugement.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    publieAffaireJugement : function(affairePublieItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var jugement = {
            id_audience: affairePublieItems.id,
            etat_publication : affairePublieItems.etat_publication
        };
        var queryStatement = "UPDATE audience SET etat_publication=? WHERE id_audience=?";

        if(connection){

            connection.query(queryStatement, [jugement.etat_publication, jugement.id_audience], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffairesPlumitif : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM cours INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience)" +
            "WHERE cours.traite = true";

        if(connection){

            connection.query(queryStatement, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffairesJuge : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM affaire " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN individu ON (affaire.id_affaire = individu.id_affaire_individu) " +
            "WHERE affaire.juge = true AND (affaire.edit_qualite = false OR affaire.edit_factum = false) GROUP BY affaire.id_affaire";

        if(connection){

            connection.query(queryStatement, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffairesExpedition : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM affaire " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN individu ON (affaire.id_affaire = individu.id_affaire_individu) " +
            "WHERE affaire.juge = true AND affaire.edit_qualite = true AND affaire.edit_factum = true GROUP BY affaire.id_affaire";

        if(connection){

            connection.query(queryStatement, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    listeDemandeurAffairesPublication : function(jugementId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var data = {
            id : jugementId,
            id_typeIndiv : 1
        };
        //var queryStatement = "SELECT * FROM affaire, individu WHERE affaire.id_audience_affaire = ? AND " +
        //    "individu.id_typeIndividu_individu = ? AND individu.id_affaire_individu = affaire.id_affaire";
        var queryStatement = "SELECT * FROM affaire INNER JOIN individu ON (affaire.id_affaire = individu.id_affaire_individu) WHERE " +
            "affaire.id_audience_affaire = ? AND individu.id_typeIndividu_individu = ? AND affaire.id_affaire = individu.id_affaire_individu";
        if(connection){

            connection.query(queryStatement, [data.id, data.id_typeIndiv], function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    listeDefendeurAffairesPublication : function(jugementId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var data = {
            id : jugementId,
            id_typeIndiv : 2
        };
        var queryStatement = "SELECT * FROM individu INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
            "INNER JOIN audience ON (affaire.id_audience_affaire = audience.id_audience) WHERE " +
            "individu.id_affaire_individu = affaire.id_affaire AND affaire.id_audience_affaire = ? AND " +
            "individu.id_typeIndividu_individu = ?";
        if(connection){

            connection.query(queryStatement, [data.id, data.id_typeIndiv], function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    nbreAffaireAjoutes : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        //var data = {
        //    id : jugementId,
        //    id_typeIndiv : 2
        //};
        var queryStatement = "SELECT * FROM affaire INNER JOIN audience ON (affaire.id_audience_affaire = audience.id_audience) " +
            "WHERE affaire.date_saisie_affaire = audience.date_saisie_jugement AND affaire.auJugement = 1";
        if(connection){

            connection.query(queryStatement, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    listeAffaireAJuger : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var data = {
            i : 1
        };
        var queryStatement = "SELECT *, DATE_FORMAT(affaire.date_audience, '%d/%m/%Y') AS date_audience FROM affaire " +
            "INNER JOIN audience ON (affaire.id_audience_affaire = audience.id_audience) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            //"INNER JOIN individu ON (affaire.id_affaire = individu.id_affaire_individu) " +
            //"INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "WHERE audience.etat_publication = ?";
        if(connection){

            connection.query(queryStatement, [data.i], function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    individusAJuger : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) ";
        if(connection){

            connection.query(queryStatement, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    listeReportJugementAffaire : function(affaireId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var id = affaireId;
        var queryStatement = "SELECT * FROM affaire INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN audience ON (affaire.id_audience_affaire = audience.id_audience) WHERE " +
            "affaire.date_saisie_affaire = audience.date_saisie_jugement AND " +
            "affaire.id_affaire = ?";
        if(connection){

            connection.query(queryStatement, id, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffaireAJuger : function(idAffaire, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var id = idAffaire;
        var queryStatement = "SELECT *, DATE_FORMAT(date_audience, '%d/%m/%Y') AS date_audience, " +
            "DATE_FORMAT(date_report, '%d/%m/%Y') AS date_report FROM affaire " +
            "INNER JOIN audience ON (affaire.id_audience_affaire = audience.id_audience) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) WHERE " +
            "affaire.id_audience_affaire = audience.id_audience AND affaire.id_affaire = ?";

        if(connection){

            connection.query(queryStatement, id, function (err, rows, field) {

                if(err){throw err;}
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    reportJugementAffaire : function(reportItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            auJugement : reportItems.auJugement,
            transJugement : reportItems.transJugement,
            date_report : reportItems.date_report,
            reporte : true,
            id_affaire: reportItems.id_affaire
        };
        var queryStatement = "UPDATE affaire SET auJugement=?, transJugement=?, date_report=?, reporte=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.auJugement, affaire.transJugement, affaire.date_report, affaire.reporte, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupAffaireATraiter : function(idAffaire, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT DISTINCT * FROM cours " +
            "INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience) " +
            "WHERE affaire.id_affaire = ? AND affaire.date_audience = DATE(NOW()) AND affaire.publie = true";

        if(connection){

            connection.query(queryStatement, idAffaire, function (err, rows) {

                if(err){throw err;}
                callback(rows)
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupDetailAffairesJuge : function(idAffaire, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM affaire INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN individu ON (affaire.id_affaire = individu.id_affaire_individu) " +
            "INNER JOIN cours ON (affaire.id_affaire = cours.id_affaire_cours) " +
            //"INNER JOIN jugement ON (affaire.id_affaire = jugement.id_affaire_jugement) " +
            //"INNER JOIN caractere ON (jugement.id_caractere_jugement = caractere.id_caractere)" +
            "WHERE affaire.id_affaire = ? ";

        if(connection){

            connection.query(queryStatement, idAffaire, function (err, rows) {

                if(err){throw err;}
                callback(rows)
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupDetailAffairesJugeSup : function(idAffaire, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM affaire INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature)" +
            "INNER JOIN jugement ON (affaire.id_affaire = jugement.id_affaire_jugement) " +
            "INNER JOIN caractere ON (jugement.id_caractere_jugement = caractere.id_caractere) " +
            "WHERE affaire.id_affaire = ? ";

        if(connection){

            connection.query(queryStatement, idAffaire, function (err, rows) {

                if(err){throw err;}
                callback(rows)
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupPartiesAffairesJuge : function(idAffaire, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM individu INNER JOIN affaire ON (individu.id_affaire_individu = affaire.id_affaire) " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "WHERE affaire.id_affaire = ?";

        if(connection){

            connection.query(queryStatement, idAffaire, function (err, rows) {

                if(err){throw err;}
                callback(rows)
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    listeAffaireAEnregisitrer : function(idAffaire, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT DISTINCT * FROM cours " +
            "INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience) " +
            "WHERE affaire.id_affaire = ? AND affaire.date_audience = DATE(NOW()) AND affaire.publie = true";

        if(connection){

            connection.query(queryStatement, idAffaire, function (err, rows) {

                if(err){throw err;}
                callback(rows)
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupNumeroAffaireJson : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT DISTINCT * FROM cours " +
            "INNER JOIN affaire ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience) " +
            "WHERE affaire.date_audience = DATE(NOW()) AND affaire.publie = true";

        if(connection){

            connection.query(queryStatement, function (err, rows) {

                if(err){throw err;}
                callback(rows)
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    traiterAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var cours = {
            id_cours : jugementFormItems.id_cours,
            id_affaire_cours : jugementFormItems.id_affaire_cours,
            president : jugementFormItems.president,
            assesseurs : jugementFormItems.assesseurs,
            substitut : jugementFormItems.substitut,
            greffier: jugementFormItems.greffier,
            id_salleAudience_cours: jugementFormItems.id_salleAudience_cours,
            date_intervention_plumitif: new Date(),
            date_modification_cours: new Date(),
            observation_plumitif: jugementFormItems.observation_plumitif,
            type_affaire : jugementFormItems.type_affaire,
            traite : true
        };
        var queryStatement = "UPDATE cours SET id_affaire_cours=?, president=?, assesseurs=?, substitut=?, greffier=?, " +
            "id_salleAudience_cours=?, observation_plumitif=?, date_intervention_plumitif=?, date_modification_cours=?, " +
            "traite=?, type_affaire=? WHERE id_cours=?";

        if(connection){

            connection.query(queryStatement, [cours.id_affaire_cours, cours.president, cours.assesseurs, cours.substitut, cours.greffier, cours.id_salleAudience_cours
            , cours.observation_plumitif, cours.date_intervention_plumitif, cours.date_modification_cours,
                cours.traite, cours.type_affaire, cours.id_cours], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    repporterAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            date_audience : jugementFormItems.date_report,
            date_report : jugementFormItems.date_audience,
            reporte : true,
            publie : false
        };
        var queryStatement = "UPDATE affaire SET date_audience=?, date_report=?, reporte=?, publie=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.date_audience, affaire.date_report, affaire.reporte, affaire.publie, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    modif_typeAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var cours = {
            type_affaire : "Ancienne",
            id_affaire_cours : jugementFormItems.id_affaire_cours
        };
        var queryStatement = "UPDATE cours SET type_affaire=? WHERE id_affaire_cours=?";

        if(connection){

            connection.query(queryStatement, [cours.type_affaire, cours.id_affaire_cours], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    jugerAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            juge : true
        };
        var queryStatement = "UPDATE affaire SET juge=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.juge, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    annulerJugerAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            juge : false
        };
        var queryStatement = "UPDATE affaire SET juge=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.juge, affaire.id_affaire], function (err, result) {

                if(err){throw err;}
                console.log(result);

                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    recupListeCaracteres : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT DISTINCT * FROM caractere";

        if(connection){

            connection.query(queryStatement, function (err, rows) {

                if(err){throw err;}
                callback(rows)
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    fondeAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            fonde : true
        }
        var queryStatement = "UPDATE affaire SET fonde=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.fonde, affaire.id_affaire], function (err) {

                if(err){throw err;}
                onSuccessfulCallback({status : "successful"})
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    annulerFondeAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            fonde : false
        }
        var queryStatement = "UPDATE affaire SET fonde=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.fonde, affaire.id_affaire], function (err) {

                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    malFondeAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            mal_fonde : true
        }
        var queryStatement = "UPDATE affaire SET mal_fonde=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.mal_fonde, affaire.id_affaire], function (err) {

                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    annulerMalFondeAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            mal_fonde : false
        }
        var queryStatement = "UPDATE affaire SET mal_fonde=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.mal_fonde, affaire.id_affaire], function (err) {

                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    partiellementFondeAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            partiellement_fonde : true
        }
        var queryStatement = "UPDATE affaire SET partiellement_fonde=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.partiellement_fonde, affaire.id_affaire], function (err) {

                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    annulerPartiellementFondeAffaire : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            id_affaire : jugementFormItems.id_affaire,
            partiellement_fonde : false
        }
        var queryStatement = "UPDATE affaire SET partiellement_fonde=? WHERE id_affaire=?";

        if(connection){

            connection.query(queryStatement, [affaire.partiellement_fonde, affaire.id_affaire], function (err) {

                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },

    enregistrerAuJugement : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var jugement = {
            id_affaire_jugement : jugementFormItems.id_affaire,
            id_caractere_jugement : jugementFormItems.id_caractere,
            numero_jugement : jugementFormItems.numero_jugement,
            observation_jugement : jugementFormItems.observation,
            date_enregistrement : new Date(),
            signature_greffier : jugementFormItems.signature_greffier,
            signature_president : jugementFormItems.signature_president
        }
        var queryStatement = "INSERT INTO jugement SET ?";

        if(connection){

            connection.query(queryStatement, jugement, function (err) {

                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });

            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);

        }
    },
    activeQualite : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            edit_qualite : true,
            id_affaire : jugementFormItems.id_affaire
        }
        var queryStatement = "UPDATE affaire SET edit_qualite=? WHERE id_affaire=? ";
        if(connection){
            connection.query(queryStatement, [affaire.edit_qualite, affaire.id_affaire], function (err) {
                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    closeQualite : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            edit_qualite : false,
            id_affaire : jugementFormItems.id_affaire
        }
        var queryStatement = "UPDATE affaire SET edit_qualite=? WHERE id_affaire=? ";
        if(connection){
            connection.query(queryStatement, [affaire.edit_qualite, affaire.id_affaire], function (err) {
                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    activeFactum : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            edit_factum : true,
            id_affaire : jugementFormItems.id_affaire
        }
        var queryStatement = "UPDATE affaire SET edit_factum=? WHERE id_affaire=? ";
        if(connection){
            connection.query(queryStatement, [affaire.edit_factum, affaire.id_affaire], function (err) {
                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    closeFactum : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            edit_factum : false,
            id_affaire : jugementFormItems.id_affaire
        }
        var queryStatement = "UPDATE affaire SET edit_factum=? WHERE id_affaire=? ";
        if(connection){
            connection.query(queryStatement, [affaire.edit_factum, affaire.id_affaire], function (err) {
                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    activeExpedition : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            edit_expedition : true,
            id_affaire : jugementFormItems.id_affaire
        }
        var queryStatement = "UPDATE affaire SET edit_expedition=? WHERE id_affaire=? ";
        if(connection){
            connection.query(queryStatement, [affaire.edit_expedition, affaire.id_affaire], function (err) {
                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    closeExpedition : function(jugementFormItems, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var affaire = {
            edit_expedition : false,
            id_affaire : jugementFormItems.id_affaire
        }
        var queryStatement = "UPDATE affaire SET edit_expedition=? WHERE id_affaire=? ";
        if(connection){
            connection.query(queryStatement, [affaire.edit_expedition, affaire.id_affaire], function (err) {
                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupDetailsAffaireAuJugement : function(id, callBack){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT *, ADDDATE(date_enregistrement, INTERVAL 30 DAY) AS fin_appel, " +
            "DATEDIFF(ADDDATE(date_enregistrement, INTERVAL 30 DAY), DATE(NOW())) AS nbr_jour_restant FROM jugement " +
            "INNER JOIN affaire ON (jugement.id_affaire_jugement = affaire.id_affaire) " +
            "INNER JOIN caractere ON (jugement.id_caractere_jugement = caractere.id_caractere) " +
            "INNER JOIN chambre ON (affaire.id_chambre_affaire = chambre.id_chambre) " +
            "INNER JOIN nature ON (affaire.id_nature_affaire = nature.id_nature) " +
            "INNER JOIN cours ON (cours.id_affaire_cours = affaire.id_affaire) " +
            "INNER JOIN individu ON (affaire.id_affaire = individu.id_affaire_individu) " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "INNER JOIN salle_audience ON (cours.id_salleAudience_cours = salle_audience.id_salleAudience) " +
            "WHERE jugement.id_jugement = ?";
        if(connection){
            connection.query(queryStatement, id, function (err, result) {
                if(err){throw err;}
                callBack(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupIndividusAuJugement : function(id_jugement, callBack){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM jugement " +
            "INNER JOIN affaire ON (jugement.id_affaire_jugement = affaire.id_affaire) " +
            "INNER JOIN individu ON (affaire.id_affaire = individu.id_affaire_individu) " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu)" +
            "WHERE jugement.id_jugement = ?";
        if(connection){
            connection.query(queryStatement, id_jugement, function (err, result) {
                if(err){throw err;}
                callBack(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    faireAppel : function(listeIndividusAuJugement, onSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var appel = {
            date_appel : new Date(),
            //appel_effectue : true,
            id_jugement_appel : listeIndividusAuJugement.id_jugement,
            id_individu_appel : listeIndividusAuJugement.id_individu
        }
        var queryStatement = "INSERT INTO appel SET ? ";
        if(connection){
            connection.query(queryStatement, appel, function (err) {
                if(err){throw err;}
                onSuccessfulCallback({status : "successful"});
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    effectueAppel : function(listeIndividusAuJugement){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var jugement = {
            appel_effectue : true,
            id_jugement_appel : listeIndividusAuJugement.id_jugement
        }
        var queryStatement = "UPDATE jugement SET appel_effectue = ? WHERE id_jugement = ?";
        if(connection){
            connection.query(queryStatement, [jugement.appel_effectue, jugement.id_jugement_appel], function (err) {
                if(err){throw err;}
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    },

    recupAppelInfo : function(jugementId, callBack){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "SELECT * FROM appel " +
            "INNER JOIN jugement ON (appel.id_jugement_appel = jugement.id_jugement) " +
            "INNER JOIN individu ON (appel.id_individu_appel = individu.id_individu) " +
            "INNER JOIN type_individu ON (individu.id_typeIndividu_individu = type_individu.id_typeIndividu) " +
            "WHERE jugement.id_jugement = ?";
        if(connection){
            connection.query(queryStatement, jugementId, function (err, result) {
                if(err){throw err;}
                callBack(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(connection);
        }
    }
};

module.exports.jugementDao = jugementDao;