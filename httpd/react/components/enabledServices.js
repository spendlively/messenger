var EnabledServices = React.createClass({

	getInitialState: function(){

    // var l12n = window.localization,
		var l12n = app.local,
			data = l12n.getData('enabledServices');

    	return data;
	},

  	componentDidMount: function() {
  		
      // var l12n = window.localization;
  		var l12n = app.local;

  		l12n.registerComponent('enabledServices', this);
  	},

	render: function(){

		return (
            <div>
                <h2 id="content-available-services">{this.state.title}</h2>
                <div className="available-services-block ptr" data-toggle="modal" data-target="#modal-edit-service">
                    <span className="glyphicon service-icon-small" aria-hidden="true">
                        <img src="services/vk.svg" />
                    </span>
                        spendlively@mail.ru
                    <span className="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>
                </div>            
            </div>
		);
	}
});

ReactDOM.render(
	<EnabledServices />,
	document.getElementById('enabled-services-target')
);
