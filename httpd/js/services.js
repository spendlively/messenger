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