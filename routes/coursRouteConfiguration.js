function coursRouteConfiguration(app){

    this.app = app;
    this.routeTable = [];
    this.init();

}

coursRouteConfiguration.prototype.init = function() {

    var self = this;

    self.addRoutes();
    self.processRoutes();

}

coursRouteConfiguration.prototype.processRoutes = function() {

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

coursRouteConfiguration.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeCours',
        callbackFunction: function (request, response) {
            response.render('contents/agent/listeAgents', {
                title: "Agent",
                label: "Liste des agents"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/listeAgents_url',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/agent/agentDao.js');
            dao.agentDao.listeAgents(function(result){
                response.json({agentsJson : result})
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/ajouterAgent_url',
        callbackFunction: function (request, response, next) {
            var dao = require('../serveur/dao/agent/agentDao.js');
            dao.agentDao.ajouterAgent(
                request.body, 
                function(status) {
                    response.json(status);
                    console.log(status);
                }
            );
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/formModifAgent_url/:id',
        callbackFunction: function(request, response){
            response.render('contents/agent/formModifAgent', {
                title: "Agent",
                label: "Modifier un agent"
            })
        }
    });

    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/modifierAgent_url',
        callbackFunction: function(request, response){
            var dao = require('../serveur/dao/agent/agentDao.js');
            dao.agentDao.modifierAgent(request.body, function(status) {
                response.json(status);
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/supprimerAgent_url/:id',
        callbackFunction: function (request, response) {

            var dao = require('../serveur/dao/agent/agentDao.js');
            dao.agentDao.supprimerIndividu(request.params.id);
            response.redirect('contents/agent/listeAgents');
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsAgent/:id',
        callbackFunction: function (request, response) {
            response.render('contents/agent/detailsAgent', {
                title: "Detail",
                label: "Information Agent"
            })
        }

    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/detailsAgent_url/:id',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/agent/agentDao.js');
            dao.agentDao.detailsAgent(request.params.id, function(result){
                response.json({agentJson : result});
            });
        }
    });

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/recupAgent_url/:agentId',
        callbackFunction: function (request, response) {
            var dao = require('../serveur/dao/agent/agentDao.js');
            dao.agentDao.recupAgent(request.params.agentId, function(result){
                response.json({agentCourantJson : result});
            });
        }
    });

}

module.exports = coursRouteConfiguration;