var config = {

	save: function(name, value){

		var me = this, 
			config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;     

	    if(typeof config.config[name] !== 'undefined'){
    		config.config[name] = value;
    		ipcRenderer.send('save-config');
			console.log("Saving", name, value);
	    }
	},

	saveService: function(id){

		var me = this, 
			config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;     

	    var ss = [];
	    if(config.services.length){
	    	for(var s in config.services){
	    		ss.push(config.services[s]);
	    	}
	    }

	    if(ss.indexOf(id === -1)){
			ss.push(id);
			config.services = ss;
	    }

		ipcRenderer.send('save-config');
		console.log("Saving service", id);
	},

    removeService: function(id){

        var me = this,
            config = require('electron').remote.getGlobal('config'),
            ipcRenderer = require('electron').ipcRenderer;

        var ss = [];
        if(config.services.length){
            for(var s in config.services){
                ss.push(config.services[s]);
            }
        }

        var ind = ss.indexOf(id);
        if(ind !== -1){
            delete ss[ind];
            config.services = ss;
        }

        ipcRenderer.send('save-config');
        console.log("Saving service", id);
    },

	get: function(name){

		var config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;     

	    if(typeof config.config[name] !== 'undefined'){
    		return config.config[name];
	    }
	    return null;
	},

	getAddedServices: function(){

		var config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;     

	    return config.services;
	},	

	getLanguages: function(){

		var config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;  

	    return config.languages;
	},

	service: {},
	setService: function(service){
		this.service = service;
	},

	updateService: function(data){
		this.service.setState(data);
	}
};

// window.config = config;
module.exports = config;
