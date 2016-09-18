var AddServiceModal = React.createClass({

	getInitialState: function(){

		var l12n = window.localization,
			data = l12n.getData('addServiceModal');

		data.img = '';
		data.title = '';

    	return data;
	},

  	componentDidMount: function() {
  		
  		var l12n = window.localization,
  			config = window.config;

  		l12n.registerComponent('addServiceModal', this);
  		config.setService(this);
  	},


	render: function(){

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

		                    <div className="alert alert-info" role="alert">{this.state.notice} VK.</div>

		                </div>

		                <div className="modal-footer">
		                    <button type="button" className="btn btn-default">{this.state.closeBtn}</button>
		                    <button type="button" className="btn btn-primary">{this.state.addBtn} VK</button>
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
