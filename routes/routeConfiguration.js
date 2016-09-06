function routeConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

routeConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

routeConfiguration.prototype.processRoutes = function() {

    var self = this;
    self.routeTable.forEach(function(route){

        if(route.requestType == 'get'){
            console.log(route);
            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if(route.requestType == 'post'){
            console.log(route);
            self.app.post(route.requestUrl, route.callbackFunction);
        }

    });

}

routeConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/',
        callbackFunction: function (request, response) {
            response.render('security/login');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/uploadFile',
        callbackFunction: function (request, response) {
            response.render('contents/roleGeneral/uploadFichier');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/ouvrirSession_url',
        callbackFunction: function (request, response) {
            var sessionUser = sessionStorage.getItem("username");

                response.render('accueil', {
                    title: 'Bienvenu',
                    label: "Administration",
                    sessionUser : sessionUser
                })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/error',
        callbackFunction: function (request, response) {
            response.render('error', {
                title: 'Error',
                label: "Message d'erreur"
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/register',
        callbackFunction: function (request, response) {
            response.render('security/register');
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/creerCompte_url',
        callbackFunction: function (request, response) {

            var identite = request.body.identite,
                username = request.body.username,
                password = request.body.password,
                confirmPassword = request.body.confirmPassword,
                juridiction = request.body.juridiction,
                email = request.body.email;

            request.checkBody('identite', 'Nom et prenom requis').notEmpty();
            request.checkBody('username', 'Nom utilisateur requis').notEmpty();
            request.checkBody('password', 'Mot de passe requis').notEmpty();
            //request.checkBody('confirmPassword', 'Confirmation du mot de passe requis').notEmpty();
            request.checkBody('juridiction', 'Juridiction requis').notEmpty();
            request.checkBody('email', 'Email requis').isEmail();

            var errors = request.validationErrors();
            if (errors) {
                response.send({errorsJson: errors});
            } else {
                var dao = require('../serveur/dao/security/securityDao.js');
                dao.securityDao.getUserUsername(request.body, function (rows) {
                    if (rows.length) {
                        response.send({message: 'Nom utilisateur déjà utilisé'});
                    }
                    if (!rows.length) {
                        //if(request.body.password == request.body.confirmPassword){
                        dao.securityDao.creerCompte(request.body, function (status) {
                            response.json(status)
                        });
                        request.flash('success_msg', 'Votre compte a bien été créer et pouvez vous connecter');
                        //}else{
                        //    request.flash('error_msg', 'Confirmation du mot de passe incorrecte');
                        //}
                    }

                });
            }
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/connexion_url',
        callbackFunction: function (request, response) {

            var username = request.body.username,
                password = request.body.password;

            request.checkBody('username', 'Nom utilisateur requis').notEmpty();
            request.checkBody('password', 'Mot de passe requis').notEmpty();

            var errors = request.validationErrors();
            if (errors) {
                response.send({errorsJson: errors});
            } else {
                var dao = require('../serveur/dao/security/securityDao.js');
                dao.securityDao.getUserByUsername(request.body, function (rows) {
                    response.json({userJson: rows});
                });
                //passport.authenticate('local', {successRedirect:'/ouvrirSession_url', failureRedirect:'/login', failureFlash:true});

            }
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/index',
        callbackFunction: function (request, response) {
            response.render('index', {title:'Fichier', label:'Telechargement de fichiers'});
        }

    });

    self.routeTable.push({

        requestType:'get',
        requestUrl:'/listeJuridictions_url',
        callbackFunction: function(request, response){
            var dao = require("../serveur/dao/security/securityDao.js");
            dao.securityDao.recupJuridictions(function(result){
                response.json({listeJuridictionJson : result});
            })
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/deconnexion_url',
        callbackFunction: function (request, response) {
            var dao = require("../serveur/dao/security/securityDao");
            dao.securityDao.deconnexion(function(status){
                response.json(status);
            });
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAffairesSave_url/:id_user',
        callbackFunction: function (request, response) {
            var dao = require("../serveur/dao/security/securityDao");
            dao.securityDao.listeAffairesSave(request.param.id_user, function(rows){
                response.json({listeAffairesSaveJson : rows});
            });
        }

    });
}

module.exports = routeConfiguration;