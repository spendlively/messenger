var localization = {

	getCurrentLang: function(){

		// return 'ru-RU';
		return window.config.get('language');
	},

	data: {},

	clses: {},

	registerClass: function(name, cls){

		var me = this;

		if(cls){
			me.clses[name] = cls;
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
					me.updateStates(obj);
				}
		  	},
		  	error: function(xhr, status, err){

		  	}
		});
	},

	updateStates: function(data){

		var me = this,
			cls = null;

		for(var i in me.clses){
			cls = me.clses[i];
			// console.log(i)
			// console.log(cls)
			cls.setState(data[i]);
		}
	}
};

$.ajax({
  	url: 'localization/' + localization.getCurrentLang() + '.json',
  	success: function(data){
		localization.data = JSON.parse(data) || {};
  	},
  	error: function(xhr, status, err){
		console.log("Ошибка загрузки файла локализации");
  	}
});

window.localization = localization;
