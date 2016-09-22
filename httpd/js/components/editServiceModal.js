var EditServiceModal = React.createClass({

	getInitialState: function(){

		var l12n = app.localization,
			data = l12n.getData('editServiceModal');

        data.img = '';
        data.title = '';
        data.id = '';

		data.showNoticesField = false;
		data.disableSoundsField = false;
		data.nameField = '';        
		data.enabled = '';

    	return data;
	},

  	componentDidMount: function() {
  		
  		app.componentsObserver.registerComponent('editServiceModal', this);
  	},

    closeWindow: function(){
        $('#modal-edit-service').modal('hide');
    },

    removeService: function(){
        app.services.removeService(this.state.id);
        $('#modal-edit-service').modal('hide');
    },

	disableSoundsHandler: function(event){

		this.setState({disableSoundsField: event.target.value});
	},

	showNoticesHandler: function(event){

		this.setState({showNoticesField: event.target.value});
	},

	enableHandler: function(){

	},

	nameHandler: function(event){

		this.setState({nameField: event.target.value});
	},

    saveService: function(){

        app.services.saveService(this.state);
        $('#modal-edit-service').modal('hide');
    },

	render: function(){

		// data.showNoticesField = false;
		// data.disableSoundsField = false;
		// data.nameField = '';        
		// data.enabled = '';

		return (
			<div className="modal fade modal-service" id="modal-edit-service" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
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
		                        {this.state.edit} {this.state.title}
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
		                            <label htmlFor="switch-modal" className="col-sm-3 control-label">{this.state.enableService}</label>
		                            <div className="col-sm-9">
		                                <input 
		                                	className="switch-button" 
		                                	id="switch-modal" 
		                                	type="checkbox" 
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
		                    <button onClick={this.removeService} type="button" className="btn btn-danger pull-left">{this.state.removeBtn}</button>
		                    <button onClick={this.saveService} type="button" className="btn btn-default pull-right">{this.state.saveBtn}</button>
		                    <button onClick={this.closeWindow} type="button" className="btn btn-primary pull-right">{this.state.closeBtn}</button>
		                </div>
		            </div>
		        </div>
	        </div>
		);
	}
});

ReactDOM.render(
	<EditServiceModal />,
	document.getElementById('editServiceModalTarget')
);
