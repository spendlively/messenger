var EditServiceModal = React.createClass({

	getInitialState: function(){

		var l12n = app.localization,
			data = l12n.getData('editServiceModal');

        data.img = '';
        data.title = '';
        data.id = '';

    	return data;
	},

  	componentDidMount: function() {
  		
  		app.componentsObserver.registerComponent('editServiceModal', this);
  	},

  	handleChange: function(event){

  		// var target = event.target,
  			// value = target.value;

		// this.setState({emailValue: value});
		// app.config.save("email", value);
  	},

    closeWindow: function(){
        $('#modal-edit-service').modal('hide');
    },

    removeService: function(){
        app.services.removeService(this.state.id);
        $('#modal-edit-service').modal('hide');
    },

	render: function(){

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
		                                <input onChange={this.handleChange} type="email" className="form-control" id="inputEmail3" placeholder="" value="spendlively@mail.ru" />
		                            </div>
		                        </div>

		                        <div className="form-group">
		                            <label htmlFor="switch-modal" className="col-sm-3 control-label">{this.state.enableService}</label>
		                            <div className="col-sm-9">
		                                <input onChange={this.handleChange} className="switch-button" id="switch-modal" type="checkbox" checked />
		                            </div>
		                        </div>
		                        
		                        <div className="form-group">
		                            <div className="col-sm-offset-3 col-sm-9">
		                                <div className="checkbox">
		                                    <label>
		                                        <input type="checkbox" />{this.state.showNotices}
		                                    </label>
		                                </div>
		                            </div>
		                        </div>
		                        <div className="form-group">
		                            <div className="col-sm-offset-3 col-sm-9">
		                                <div className="checkbox">
		                                    <label>
		                                        <input type="checkbox" />{this.state.disableSounds}
		                                    </label>
		                                </div>
		                            </div>
		                        </div>
		                    </form>                

		                    <div className="alert alert-info" role="alert">{this.state.notice} VK.</div>

		                </div>

		                <div className="modal-footer">
		                    <button onClick={this.removeService} type="button" className="btn btn-danger pull-left">{this.state.removeBtn}</button>
		                    <button onClick={this.closeWindow} type="button" className="btn btn-default pull-right">{this.state.saveBtn}</button>
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
