var conf = require('./conf');

var local = {

	getCurrentLang: function(){

// conf.test();

		// return 'ru-RU';
		// return window.config.get('language');
		return conf.get('language');
		// return app.conf.get('language');
	},

	data: {},

	components: {},

	registerComponent: function(name, cls){

		var me = this;

		if(cls){
			me.components[name] = cls;
		}

		// setTimeout(function(){
		// 	me.loadLang('en-EN');
		// }, 3000);
	},

	getData: function(name){

		if(name){
			return this.data[name];
		}

		return this.data;
	},

	getLanguages: function(){

		var config = require('electron').remote.getGlobal('config'),
		    ipcRenderer = require('electron').ipcRenderer;  

	    return config.languages;
	},

	loadLang: function(lang){

		var me = this,
			lang = lang || me.getCurrentLang();

		$.ajax({
		  	url: 'localization/' + lang + '.json',
		  	success: function(data){
		  		var obj = null;
				if(obj = JSON.parse(data)){
					me.data = obj;
					me.updateStates(obj);
				}
		  	},
		  	error: function(xhr, status, err){

		  	}
		});
	},

	updateStates: function(data){

		var me = this,
			cmp = null;

		for(var i in me.components){
			cmp = me.components[i];
			cmp.setState(data[i]);
		}
	},

	test: function(){
		alert('localization');
	}
};

$.ajax({
  	url: 'localization/' + local.getCurrentLang() + '.json',
  	success: function(data){
		local.data = JSON.parse(data) || {};
  	},
  	error: function(xhr, status, err){
		console.log("Ошибка загрузки файла локализации");
  	}
});

// window.local = local;
module.exports = local;
