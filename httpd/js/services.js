var sanitizer = require('sanitizer');

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
                nameField: state.nameField || state.title,
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
                // nameField: me.escapeString(state.nameField),
                nameField: me.escapeString(me.unescapeString(state.nameField)),
                enabled: state.enabled
            };        


        app.config.saveService(serviceData);

        $('li#tab-'+serviceData.id+' span.service-tab-name').html(serviceData.nameField);
        $('div#edit-item-'+serviceData.id+' span.edit-btn-name').html(serviceData.nameField);
    },

	_addService: function(serviceData){

		var me = this,
            text = serviceData.nameField || serviceData.title;

        text = me.escapeString(me.unescapeString(text));

		//Создать webview
        $('<div role="tabpanel" class="tab-pane webview" id="'+serviceData.id+'">' +
            '<webview partition="persist:'+serviceData.id+'" id="wv-'+serviceData.id+'" src="'+serviceData.url+'" autosize="on" minwidth="576" minheight="432" style="display:inline-flex; width:100%; height:780px"></webview>' +
        '</div>').appendTo("#tabs-container");

		//Создать таб-вкладку
        var disabled = serviceData.enabled ? '' : 'disabled',
            toggle = serviceData.enabled ? 'data-toggle="tab"' : '',
            style = serviceData.enabled ? 'style="opacity:1; cursor:pointer"' : 'style="opacity:0.3; cursor:default"';

        $('<li id="tab-'+serviceData.id+'" role="presentation">' +
            '<a class="navbar-brand ptr '+disabled+'" href="#'+serviceData.id+'" aria-controls="'+serviceData.title+'" role="tab" '+toggle+'">' +
                '<div>' +
                    '<span class="glyphicon service-icon-small" aria-hidden="true">' +
                        '<img src="'+serviceData.img+'" '+style+'>' +
                    '</span>'+
                    '<span class="service-tab-name">'+text+'</span>' +
                    '<span class="badge badge-active"></span>'+
                '</div>' +
            '</a>' +
        '</li>').appendTo("#navbar-left ul.top-main-menu-left").mousedown(function(){
            //Перед раскрытием webview удаляется класс unvisible, нужный для предхагрузки,
            //чтобы показать содержимое webview
            $('.tab-pane.webview').removeClass('unvisible');
        });

        //Создать edit-панель
        $('<div class="margin10" id="edit-item-'+serviceData.id+'" data-toggle="modal" data-target="#modal-edit-service">'+
            '<span class="glyphicon service-icon-small" aria-hidden="true">'+
                '<img src="'+serviceData.img+'" />'+
            '</span>'+
            '<span class="edit-btn-name">'+text+'</span>'+
            '<span class="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>'+
        '</div>').appendTo("#edit-services-list").click(function(el){

            var l12n = app.localization,
                editServiceModal = app.componentsObserver.getComponent('editServiceModal'),
                data = app.config.getServiceById(serviceData.id);

            editServiceModal.beforeOpen.call(editServiceModal);

            if(data){
                data.nameField = me.unescapeString(data.nameField);
                editServiceModal.setState(data);
            }

            editServiceModal.afterOpen.call(editServiceModal);
        });

        //Отображение badges c количеством новых уведомлений
        var wv = document.getElementById('wv-'+serviceData.id);
        wv.addEventListener('page-title-updated', function(event){
            var count = me.findNewMessagesInTitle(event.title);

            me.updateBudges(serviceData.id, count);
        });

        //Открытие ссылки в браузере по умолчанию
        wv.addEventListener('new-window', function(e){
            e.preventDefault();
            require('electron').shell.openExternal(e.url);
        });

	},

    updateBudges: function(id, count){

        var me = this,
            tab = document.getElementById('tab-'+id);

        $('#tab-'+id+' a div span.badge.badge-active').html(count);
    },

    findNewMessagesInTitle: function(title){

        var re = /\(([\d]+)\)/ui;
        var results = re.exec(title) || [];

        if(results[1]){
            return results[1];
        }

        return null;
    },

    escapeString: function(str){
        return sanitizer.escape(str);
    },

    unescapeString: function(str){
        return sanitizer.unescapeEntities(str);
    },

	restoreServices: function(id){

		var me = this;

		me.services = services.getAddedServices();

		if(me.services.length){
			for(var s in me.services){
				me._addService(me.services[s]);
            }
        }

        //Предзагрузка сервисов (рендеринг webview) в контейнере 1px
        $('.tab-pane.webview').addClass('unvisible').addClass('active');
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