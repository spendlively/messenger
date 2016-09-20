var LeftMenu = React.createClass({

	getInitialState: function(){

		var l12n = app.localization,
			data = l12n.getData('leftMenu');

    	return data;
	},

  	componentDidMount: function() {
  		
  		var l12n = app.localization;

  		l12n.registerComponent('leftMenu', this);
  	},

	render: function(){

		return (
            <div className="col-xs-4 col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar lmenu">
                    <li className="active" data-element-scroll-to="content-available-services">
                        <a className="ptr">{this.state.enabledServices}
                            <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li data-element-scroll-to="content-add-services">
                        <a className="ptr">
                            {this.state.addService}
                        </a>
                    </li>
                    <li data-element-scroll-to="content-settings">
                        <a className="ptr">
                            {this.state.settings}
                        </a>
                    </li>
                </ul>
            </div>
		);
	}
});

ReactDOM.render(
	<LeftMenu />,
	document.getElementById('left-menu-target')
);
