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
	var componentsObserver = __webpack_require__(5);

	module.exports.config = config;
	module.exports.localization = localization;
	module.exports.services = services;
	module.exports.componentsObserver = componentsObserver;

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

		addService: function(serviceData){

			var me = this, 
				config = __webpack_require__(2).remote.getGlobal('config'),
			    ipcRenderer = __webpack_require__(2).ipcRenderer;     

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
				config = __webpack_require__(2).remote.getGlobal('config'),
			    ipcRenderer = __webpack_require__(2).ipcRenderer;     

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
	            config = __webpack_require__(2).remote.getGlobal('config'),
	            ipcRenderer = __webpack_require__(2).ipcRenderer;

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

			data.showNoticesField = false;
			data.disableSoundsField = false;
			data.nameField = '';

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

		// registerComponent: function(name, cls){

		// 	var me = this;

		// 	if(cls){
		// 		me.components[name] = cls;
		// 	}
		// },

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
				cmp = null,
				components = app.componentsObserver.getComponents();

			for(var c in components){
				cmp = components[c];
				if(typeof data[c] !== 'undefined'){
					cmp.setState(data[c]);
				}
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

	    increment: new Date().getTime(),

	    getNextId: function(){

	        return 'service-' + this.increment++;
	    },

		addService: function(state){

			var me = this,
	            id = me.getNextId(),
	            serviceData = {
	                title: state.title,
	                img: state.img,
	                id: me.getNextId(),
	                url: state.url,
	                showNoticesField: state.showNoticesField,
	                disableSoundsField: state.disableSoundsField,
	                nameField: state.nameField,
	                enabled: true
	            };


			//Закрыть модальное окно
	        $('#modal-add-service').modal('hide');

	        if(me.services.indexOf(id) !== -1){
	        	return;
	        }

			me._addService(serviceData);

	        app.config.addService(serviceData);

	        me.services = me.getAddedServices();
		},

	    saveService: function(state){

	        var me = this,
	            serviceData = {
	                title: state.title,
	                img: state.img,
	                id: state.id,
	                url: state.url,
	                showNoticesField: state.showNoticesField,
	                disableSoundsField: state.disableSoundsField,
	                nameField: state.nameField,
	                enabled: true
	            };        

	        app.config.saveService(serviceData);

	        $('li#tab-'+serviceData.id+' span.service-tab-name').html(serviceData.nameField);
	        $('div#edit-item-'+serviceData.id+' span.edit-btn-name').html(serviceData.nameField);
	    },

		_addService: function(serviceData){

			var me = this;

			//Создать webview
	        $("#tabs-container").append(
	            '<div role="tabpanel" class="tab-pane webview" id="'+serviceData.id+'">' +
	                '<webview id="wv-'+serviceData.id+'" src="'+serviceData.url+'" style="display:inline-flex; width:100%; height:780px"></webview>' +
	            '</div>'
	        );

			//Создать таб-вкладку
	        $("#navbar-left ul.top-main-menu-left").append(
	            '<li id="tab-'+serviceData.id+'" role="presentation">' +
	                '<a class="navbar-brand ptr" href="#'+serviceData.id+'" aria-controls="'+serviceData.title+'" role="tab" data-toggle="tab">' +
	                    '<div>' +
	                        '<span class="glyphicon service-icon-small" aria-hidden="true">' +
	                            '<img src="'+serviceData.img+'">' +
	                        '</span><span class="service-tab-name">'+serviceData.nameField+'</span>' +
	                    '</div>' +
	                '</a>' +
	            '</li>'
	        );

	        //Создать edit-панель
	        $(
	            '<div class="margin10" id="edit-item-'+serviceData.id+'">'+
	                '<span class="glyphicon service-icon-small" aria-hidden="true">'+
	                    '<img src="'+serviceData.img+'" />'+
	                '</span>'+
	                '<span class="edit-btn-name">'+serviceData.nameField+'</span>'+
	                '<span class="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>'+
	            '</div>'
	        ).appendTo("#edit-services-list").click(function(el){

	                var l12n = app.localization,
	                    editServiceModal = app.componentsObserver.getComponent('editServiceModal');
	                editServiceModal.setState(serviceData);
	        });
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

	        this._removeService(id);
	        app.config.removeService(id);
		},

	    _removeService: function(id){

	        $('#tab-'+id).remove();
	        $('#'+id).remove();
	        $("#edit-item-"+id).remove();
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	var componentsObserver = {

		components: {},

		registerComponent(name, cmp){

			if(typeof this.components[name] === 'undefined'){

				this.components[name] = cmp;
			}
		},

		getComponent: function(name){
			
			if(typeof this.components[name] !== 'undefined'){

				return this.components[name];
			}

			return null;
		},

		getComponents: function(){

			return this.components;
		}
	}

	module.exports = componentsObserver;


/***/ }
/******/ ]);