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

	get: function(name){

		var config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;     

	    if(typeof config.config[name] !== 'undefined'){
    		return config.config[name];
	    }
	    return null;
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

window.config = config;




// var config = require('electron').remote.getGlobal('config'),
//     ipcRenderer = require('electron').ipcRenderer;     

// console.log(config);

// config.config.language = "ru-EN";

// ipcRenderer.send('save-config');