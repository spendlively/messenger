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
    	return data;
	},

  	componentDidMount: function() {
  		
  		var me = this;

  		app.componentsObserver.registerComponent('editServiceModal', this);

        $("[name='my-checkbox']").bootstrapSwitch({
            onSwitchChange: function(ths, value){
                me.setState({enabled: value});
            }
        });
  	},

    closeWindow: function(){
        $('#modal-edit-service').modal('hide');
    },

    removeService: function(){
        app.services.removeService(this.state.id);
        $('#modal-edit-service').modal('hide');
    },

	disableSoundsHandler: function(event){

		this.setState({disableSoundsField: event.target.checked});
	},

	showNoticesHandler: function(event){

		this.setState({showNoticesField: event.target.checked});
	},

	nameHandler: function(event){

        if(event.target.value.length > 30) return;

		this.setState({nameField: event.target.value});
	},

	teamHandler: function(event){

        if(event.target.value.length > 30) return;

		this.setState({teamField: event.target.value});
	},	

    saveService: function(){

    	var me = this;

    	//Задизейбливание сервиса
		if(this.state.enabled){
            $('li#tab-'+me.state.id+' a').removeClass('disabled').attr('data-toggle', 'tab');
            $('li#tab-'+me.state.id+' a img').css({opacity:'1',cursor:'pointer'});
        }
        else{
            $('li#tab-'+me.state.id+' a').addClass('disabled').removeAttr('data-toggle');
            $('li#tab-'+me.state.id+' a img').css({opacity:'0.3',cursor:'default'});
        }

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

        var me = this;
    },

    switchEnabled: function(event){
        this.setState({enabled: event.target.checked});
    },

    beforeOpen: function(){

    	var me = this;
    },

    afterOpen: function(){

    	var me = this;

    	//Установка переключателя при открытии окна
 		$("[name='my-checkbox']").bootstrapSwitch('state', me.state.enabled, true);

 		//Установка фокуса при открытии окна
        setTimeout(function(){
	        var el = document.getElementById('inputEditNameField');
	        if(el){
	        	el.focus();
	        }
        }, 500);
    },

	render: function(){

        var me = this,
        	team = '',
        	serviceTemplate = app.services.getServiceTemplateByName(this.state.name),
        	hasTeam = serviceTemplate && serviceTemplate['hasTeam'] ? serviceTemplate['hasTeam'] : false;

        if (hasTeam) {
			team = <div className="form-group">
   	              	<label htmlFor="teamInputEditTeamField" className="col-sm-3 control-label">{this.state.teamLabel} {this.state.title}</label>
                    <div className="col-sm-9">
                        <input 
                        	onChange={this.teamHandler} 
                        	onKeyDown={this.keyPressHandler}
                        	className="form-control" 
                        	id="teamInputEditTeamField" 
                        	placeholder="" 
                        	value={this.state.teamField} 
                    	/>
                    </div>
                </div>
        }

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
		                            <label htmlFor="inputEditNameField" className="col-sm-3 control-label">{this.state.nameLabel}</label>
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

	                        	{team}

		                        <div className="form-group">
		                            <label htmlFor="switch-modal" className="col-sm-3 control-label">{this.state.enableService}</label>
		                            <div className="col-sm-9">

                                        <input type="checkbox" name="my-checkbox" defaultChecked={this.state.enabled} onChange={this.switchEnabled} />
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
