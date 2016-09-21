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
        $("#tabs-container").append(
            '<div role="tabpanel" class="tab-pane webview" id="'+id+'">' +
                '<webview id="wv-'+id+'" src="'+service.url+'" style="display:inline-flex; width:100%; height:780px"></webview>' +
            '</div>'
        );

		//Создать таб-вкладку
        $("#navbar-left ul.top-main-menu-left").append(
            '<li id="tab-'+id+'" role="presentation">' +
                '<a class="navbar-brand ptr" href="#'+id+'" aria-controls="'+service.title+'" role="tab" data-toggle="tab">' +
                    '<div>' +
                        '<span class="glyphicon service-icon-small" aria-hidden="true">' +
                            '<img src="'+service.img+'">' +
                        '</span>'+service.title+'' +
                    '</div>' +
                '</a>' +
            '</li>'
        );

        //Создать edit-панель
        $(
            '<div class="margin10" id="edit-item-'+id+'">'+
                '<span class="glyphicon service-icon-small" aria-hidden="true">'+
                    '<img src="'+service.img+'" />'+
                '</span>'+
                    service.title+
                '<span class="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>'+
            '</div>'
        ).appendTo("#edit-services-list").click(function(el){

                var l12n = app.localization,
                    editServiceModal = app.componentsObserver.getComponent('editServiceModal');
                editServiceModal.setState(service);
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