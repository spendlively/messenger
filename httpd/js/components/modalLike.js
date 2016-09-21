var ModalLike = React.createClass({

	getInitialState: function(){

		var l12n = app.localization,
			data = l12n.getData('modalLike');

    	return data;
	},

  	componentDidMount: function() {
  		
  		app.componentsObserver.registerComponent('modalLike', this);
  	},

	render: function(){

		return (
	        <div className="modal-dialog" role="document">
	            <div className="modal-content">
	                <div className="modal-header">
	                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                        <span aria-hidden="true">&times;</span>
	                    </button>
	                    <h2>{this.state.title}</h2>
	                    <p>{this.state.description}</p>
	                </div>
	                <div className="modal-body"></div>
	            </div>
	        </div>
		);
	}
});

ReactDOM.render(
	<ModalLike />,
	document.getElementById('modal-like')
);
