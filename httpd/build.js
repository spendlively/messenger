var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(1);
	var localization = __webpack_require__(3);
	var services = __webpack_require__(4);

	module.exports.config = config;
	module.exports.localization = localization;
	module.exports.services = services;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var config = {

		save: function(name, value){

			var me = this, 
				config = __webpack_require__(2).remote.getGlobal('config'),
			    ipcRenderer = __webpack_require__(2).ipcRenderer;     

		    if(typeof config.config[name] !== 'undefined'){
	    		config.config[name] = value;
	    		ipcRenderer.send('save-config');
				console.log("Saving", name, value);
		    }
		},

		saveService: function(id){

			var me = this, 
				config = __webpack_require__(2).remote.getGlobal('config'),
			    ipcRenderer = __webpack_require__(2).ipcRenderer;     

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

		get: function(name){

			var config = __webpack_require__(2).remote.getGlobal('config'),
			    ipcRenderer = __webpack_require__(2).ipcRenderer;     

		    if(typeof config.config[name] !== 'undefined'){
	    		return config.config[name];
		    }
		    return null;
		},

		getAddedServices: function(){

			var config = __webpack_require__(2).remote.getGlobal('config'),
			    ipcRenderer = __webpack_require__(2).ipcRenderer;     

		    return config.services;
		},	

		getLanguages: function(){

			var config = __webpack_require__(2).remote.getGlobal('config'),
			    ipcRenderer = __webpack_require__(2).ipcRenderer;  

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(1);

	var localization = {

		getCurrentLang: function(){

			// return 'ru-RU';
			return config.get('language');
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

			var config = __webpack_require__(2).remote.getGlobal('config'),
			    ipcRenderer = __webpack_require__(2).ipcRenderer;  

		    return config.languages;
		},

		loadLang: function(lang){

			var me = this,
				lang = lang || me.getCurrentLang();

			$.ajax({
			  	url: 'data/localization/' + lang + '.json',
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
		}
	};

	$.ajax({
	  	url: 'data/localization/' + localization.getCurrentLang() + '.json',
	  	success: function(data){
			localization.data = JSON.parse(data) || {};
	  	},
	  	error: function(xhr, status, err){
			console.log("Ошибка загрузки файла локализации");
	  	}
	});

	// window.localization = localization;
	module.exports = localization;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var services = {

		allServices: [],

		services: [],

		addService: function(id){

			var me = this;

			//Закрыть модальное окно
	        $('#modal-add-service').modal('hide');

	        if(me.services.indexOf(id) !== -1){
	        	return;
	        }

			me._addService(id);

	        app.config.saveService(id);
	        me.services = me.getAddedServices();
		},

		_addService: function(id){

			var me = this,
				service = me.getServiceById(id);

			//Создать webview
	        $("#tabs-container").append('<div role="tabpanel" class="tab-pane webview" id="'+id+'"><webview id="wv-'+id+'" src="'+service.url+'" style="display:inline-flex; width:100%; height:780px"></webview></div>');

			//Создать таб-вкладку
	        $("#navbar-left ul.top-main-menu-left").append('<li id="tab-'+id+'" role="presentation"><a class="navbar-brand ptr" href="#'+id+'" aria-controls="'+service.title+'" role="tab" data-toggle="tab"><div><span class="glyphicon service-icon-small" aria-hidden="true"><img src="'+service.img+'"></span>'+service.title+'</div></a></li>');

	        //Создать edit-панель
	        $("#edit-services-list").append(
	    			'<div class="margin10">'+
	                    '<span class="glyphicon service-icon-small" aria-hidden="true">'+
	                        '<img src="'+service.img+'" />'+
	                    '</span>'+
	                        service.title+
	                    '<span class="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>'+
	                '</div>'
	    	);
		},	

		restoreServices: function(id){

			var me = this;

			me.services = services.getAddedServices();

			if(me.services.length){
				for(var s in me.services){
					me._addService(me.services[s]);
				}
			}
		},

		removeService: function(id){

			$('#tab-'+id).remove();
			$('#'+id).remove();
		},

		getAddedServices: function(){

			return app.config.getAddedServices();
		},

		getAll: function(){

			return this.allServices;
		},

		getServiceById: function(id){

			var me = this;

			if(me.allServices.length){

				for(var s in me.allServices){
					if(me.allServices[s].id == id){
						return me.allServices[s];
					}
				}
			}

			return null;
		}
	}
	$.ajax({
	  	url: 'data/services.json',
	  	success: function(data){
			services.allServices = JSON.parse(data) || {};
	  	},
	  	error: function(xhr, status, err){
			console.log("Ошибка загрузки списка сервисов");
	  	}
	});

	module.exports = services;

/***/ }
/******/ ]);