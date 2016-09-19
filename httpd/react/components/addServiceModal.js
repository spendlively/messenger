var AddServiceModal = React.createClass({

	getInitialState: function(){

		// var l12n = window.localization,
		var l12n = app.local,
			data = l12n.getData('addServiceModal');

		data.img = '';
		data.title = '';
		data.id = '';

    	return data;
	},

  	componentDidMount: function() {
  		
  		// var l12n = window.localization,
  		var l12n = app.local,
  			// config = window.config;
  			config = app.conf;

  		l12n.registerComponent('addServiceModal', this);
  		config.setService(this);
  	},

    addService: function(state){

        var title = state.title,
            img = state.img,
            id = state.id,
            url = state.url;
// console.log(img, id, url)
        $('#modal-add-service').modal('hide');

//        $("#tabs-container .tab-pane.webview").remove();

        $("#tabs-container").append('<div role="tabpanel" class="tab-pane webview" id="'+id+'"><webview id="wv-'+id+'" src="'+url+'" style="display:inline-flex; width:100%; height:780px"></webview></div>');
        $("#navbar-left ul.top-main-menu-left").append('<li role="presentation"><a class="navbar-brand ptr" href="#'+id+'" aria-controls="'+title+'" role="tab" data-toggle="tab"><div><span class="glyphicon service-icon-small" aria-hidden="true"><img src="'+img+'"></span>'+title+'</div></a></li>');

    },

    closeWindow: function(){
        $('#modal-add-service').modal('hide');
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
		                                <input type="email" className="form-control" id="inputEmail3" placeholder="" value="" />
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

		                    <div className="alert alert-info" role="alert">{this.state.notice} {this.state.title}.</div>

		                </div>

		                <div className="modal-footer">
		                    <button onClick={this.closeWindow} type="button" className="btn btn-default">{this.state.closeBtn}</button>
		                    <button onClick={function(){me.addService(me.state)}} type="button" className="btn btn-primary">{this.state.addBtn} {this.state.title}</button>
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
