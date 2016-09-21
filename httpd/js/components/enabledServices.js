var EnabledServices = React.createClass({

	getInitialState: function(){

		var l12n = app.localization,
			data = l12n.getData('enabledServices');

    	return data;
	},

  	componentDidMount: function() {
  		
  		app.componentsObserver.registerComponent('enabledServices', this);

      //Восстановление сервисов
      app.services.restoreServices();
  	},

	render: function(){

    return (
            <div>
                <h2 id="content-available-services">{this.state.title}</h2>
                <div id="edit-services-list" className="available-services-block ptr" data-toggle="modal" data-target="#modal-edit-service"></div>
            </div>
    );
	}
});

ReactDOM.render(
	<EnabledServices />,
	document.getElementById('enabled-services-target')
);
