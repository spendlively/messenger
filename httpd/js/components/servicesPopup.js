var ServicesPopup = React.createClass({

	onChangeHandler: function(event){

	},

	componentDidMount: function(){

		var me = this,
			items = me.getItems();

		app.componentsObserver.registerComponent('servicesPopup', this);

		//Popover верхнего меню вкл/выкл сервисов
		var switcherFlag = false;
		$("[data-toggle=popover]").popover({
			html: true, 
			container: 'body',
			content: function() {

				var html = '';
					
				if(items.length){
					for(var i in items){

						var item = items[i],
							text = me.escapeString(me.unescapeString(item.nameField));

						html += 
							'<div>'+
								'<span class="glyphicon service-icon-small" aria-hidden="true">'+
					            	'<img src="'+item.img+'" >'+
					        	'</span>'+
					        	text+
					        	'<span onclick="app.services.showProps(\''+item.id+'\');" id="top-menu-props-'+item.id+'" class="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>'+
					        	'<span onclick="app.services.refresh(\''+item.id+'\');" id="top-menu-refresh-'+item.id+'" class="glyphicon glyphicon-refresh pull-right" aria-hidden="true"></span>'+
					        	// '<div class="top-popover-switcher pull-right">'+
					            	// '<input class="switch-button" type="checkbox" checked data-size="mini" />'+
					        	// '</div>'+
					        '</div>';
				    }
				}

// return $(html).html();

				return html;
	        }
		});
	},

    escapeString: function(str){
        return app.services.escapeString(str);
    },

    unescapeString: function(str){
        return app.services.unescapeString(str);
    },

	getItems: function(){

		var me = this,
			addedServices = app.config.getAddedServices();

		return addedServices;
	},

	openPopoverWindow: function(){

		var me = this,
			items = me.getItems(),
			container = $('#opios-top-popover-block');

		if(items.length){
			for(var i in items){
				var item = items[i];
				container.append('<p>'+item.title+'</p>');
			}
		}

		console.log('openPopoverWindow')
	},

	closePopoverWindow: function(){

		$('#opios-top-popover-block').empty();
	},

	render: function(){

			// <div>
		 //        <span className="glyphicon service-icon-small" aria-hidden="true">
		 //            <img src="services/vk.svg" />
		 //        </span>
		 //        spendlively@mail.ru
		 //        <span className="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>
		 //        <span className="glyphicon glyphicon-refresh pull-right" aria-hidden="true"></span>
		 //        <div className="top-popover-switcher pull-right">
		 //            <input onChange={this.onChangeHandler} className="switch-button" id="popover-switch-service" type="checkbox" checked data-size="mini" />
		 //        </div>			
			// </div>
		return (
			<div id="opios-top-popover-block">
			</div>
		);
	}
});

ReactDOM.render(
	<ServicesPopup />,
	document.getElementById('popover-content')
);
