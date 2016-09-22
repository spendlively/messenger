var AddServiceModal = React.createClass({

	getInitialState: function(){

		var l12n = app.localization,
			data = l12n.getData('addServiceModal');

		data.img = '';
		data.title = '';
		data.id = '';

		data.showNoticesField = false;
		data.disableSoundsField = false;
		data.nameField = '';

    	return data;
	},

  	componentDidMount: function() {
  		
  		var config = app.config;

  		app.componentsObserver.registerComponent('addServiceModal', this);
  		config.setService(this);
  	},

    addService: function(){

        app.services.addService(this.state);
    },

    closeWindow: function(){
    	$('#modal-add-service').modal('hide');
    },

	disableSoundsHandler: function(event){

		this.setState({disableSoundsField: event.target.value});
	},

	showNoticesHandler: function(event){

		this.setState({showNoticesField: event.target.value});
	},

	nameHandler: function(event){

		this.setState({nameField: event.target.value});
	},

	render: function(){

        var me = this;

		return (
			<div className="modal fade modal-service" id="modal-add-service" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
	        	<div className="modal-dialog" role="document">
		            <div className="modal-content">
		                <div className="modal-header">
		                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		                        <span aria-hidden="true">&times;</span>
		                    </button>
		                    <h2>
		                        <span className="glyphicon service-icon-small" aria-hidden="true">
		                            <img src={this.state.img} />
		                        </span>
		                        {this.state.add} {this.state.title}
		                    </h2>
		                </div>

		                <div className="modal-body">
		                    <form className="form-horizontal">

		                        <div className="form-group">
		                            <label htmlFor="inputEmail3" className="col-sm-3 control-label">{this.state.name}</label>
		                            <div className="col-sm-9">
		                                <input 
		                                	onChange={this.nameHandler} 
		                                	className="form-control" 
		                                	id="inputEmail3" 
		                                	placeholder="" 
		                                	value={this.state.nameField} 
	                                	/>
		                            </div>
		                        </div>

		                        <div className="form-group">
		                            <div className="col-sm-offset-3 col-sm-9">
		                                <div className="checkbox">
		                                    <label>
		                                        <input 
		                                        	onChange={this.showNoticesHandler} 
		                                        	type="checkbox" 
	                                        		checked={this.state.showNoticesField} 
                                        		/>
	                                        		{this.state.showNotices}
		                                    </label>
		                                </div>
		                            </div>
		                        </div>
		                        <div className="form-group">
		                            <div className="col-sm-offset-3 col-sm-9">
		                                <div className="checkbox">
		                                    <label>
		                                        <input 
		                                        	onChange={this.disableSoundsHandler} 
		                                        	type="checkbox" 
	                                        		checked={this.state.disableSoundsField} 
	                                        	/>
	                                        	{this.state.disableSounds}
		                                    </label>
		                                </div>
		                            </div>
		                        </div>
		                    </form>                

		                    <div className="alert alert-info" role="alert">{this.state.notice} {this.state.title}.</div>

		                </div>

		                <div className="modal-footer">
		                    <button onClick={this.closeWindow} type="button" className="btn btn-default">{this.state.closeBtn}</button>
		                    <button onClick={me.addService} type="button" className="btn btn-primary">{this.state.addBtn} {this.state.title}</button>
		                </div>
		            </div>
		        </div>
	        </div>
		);
	}
});

ReactDOM.render(
	<AddServiceModal />,
	document.getElementById('addServiceModalTarget')
);
