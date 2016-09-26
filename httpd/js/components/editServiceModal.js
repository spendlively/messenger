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
  		
  		var me = this;

  		app.componentsObserver.registerComponent('editServiceModal', this);

// bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-id-switch-modal bootstrap-switch-animate bootstrap-switch-on
		// setTimeout(function(){

  		// $('.bootstrap-switch-id-switch-modal').click(function(el){
  		// 	alert("qwerty-asdfgh-zxcvbn");
  		// });

  		// $('input#switch-modal').click(function(){
  		// });


// $('.bootstrap-switch-id-switch-modal').hide();
  // 		$("input#switch-modal").change(function() {
  // 			alert("qwerty")
		//     if(this.checked) {
		//         //Do stuff
		//     }
		// });
		// }, 2000);

 	// 	$('#modal-edit-service').on('hidden.bs.modal', function () {
  //  			console.log(me.state.nameField)
  //  			console.log(app.services.escapeString(me.state.nameField))
  //  			me.setState({
  //  				// "nameField": app.services.escapeString(me.state.nameField)
  //  				// nameField: app.services.escapeString(me.state.nameField)
  //  			});
		// })
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

	keyPressHandler: function(event){

         if(event.keyCode == 13){
         	event.stopPropagation();
         	event.preventDefault();
         	this.saveService();
         }		
	},

    componentDidUpdate: function(){

        setTimeout(function(){
	        var el = document.getElementById('inputEditNameField');
	        if(el){
	        	el.focus();
	        }
        }, 500);
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
		                            <label htmlFor="inputEditNameField" className="col-sm-3 control-label">{this.state.name}</label>
		                            <div className="col-sm-9">
		                                <input 
		                                	onChange={this.nameHandler} 
		                                	onKeyDown={this.keyPressHandler}
		                                	className="form-control" 
		                                	id="inputEditNameField" 
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
		                    <button onClick={this.saveService} type="button" className="btn btn-primary pull-right">{this.state.saveBtn}</button>
		                    <button onClick={this.closeWindow} type="button" className="btn btn-default pull-right">{this.state.closeBtn}</button>
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
