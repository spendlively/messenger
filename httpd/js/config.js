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

	addService: function(serviceData){

		var me = this, 
			config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;     

	    var ss = [];
	    if(config.services.length){
	    	for(var s in config.services){
	    		ss.push(config.services[s]);
	    	}
	    }

		ss.push(serviceData);
		config.services = ss;

		ipcRenderer.send('save-config');
		console.log("Saving service", serviceData.id);
	},

	saveService: function(serviceData){

		var me = this, 
			config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;     

	    var ss = [];
	    if(config.services.length){
	    	for(var s in config.services){
// console.log(serviceData)	    		
// console.log(config.services[s].id)	    		
// console.log(serviceData.id)	    		
// console.log(11111111111111111111111111)	    		
	    		if(config.services[s].id === serviceData.id){
					ss.push(serviceData);
	    		}
	    		else{
	    			ss.push(config.services[s]);
	    		}
	    	}
	    }

		config.services = ss;

		ipcRenderer.send('save-config');
		console.log("Saving service", serviceData.id);
	},

    removeService: function(id){

        var me = this,
            config = require('electron').remote.getGlobal('config'),
            ipcRenderer = require('electron').ipcRenderer;

        var ss = [];
        if(config.services.length){
            for(var s in config.services){
            	if(config.services[s].id !== id){
                	ss.push(config.services[s]);
            	}
            }
        }

        config.services = ss;

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

		data.showNoticesField = false;
		data.disableSoundsField = false;
		data.nameField = '';

		this.service.setState(data);
	}
};

// window.config = config;
module.exports = config;
