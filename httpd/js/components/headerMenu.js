var HeaderMenu = React.createClass({

	notifBtnCounter: 0,

	clickOnNotificator: function(){

		var l12n = app.localization,
			data = l12n.getData('notice');

		var text = data['enabled'];
		if(++this.notifBtnCounter%2){
			text = data['disabled'];
		}

		$('.top-right').notify({
	    	message: { text: text },
	    	type: 'info',
	  	}).show();
	},

	componentDidMount: function(){

	},

	render: function(){

		return (
			<div>
                <ul className="nav navbar-nav navbar-left nav-tabs top-main-menu-left">
                    <li role="presentation" className="active"><a className="navbar-brand ptr" href="#home" aria-controls="home" role="tab" data-toggle="tab">
                        <span className="glyphicon glyphicon-home" aria-hidden="true"></span>
                    </a></li>
                </ul>

                <ul className="nav navbar-nav navbar-right top-main-menu-right">
                    <li>
                        <a data-placement="bottom" data-toggle="popover" data-container="body"  type="button" data-html="true" href="#">
                            <span className="glyphicon glyphicon-menu-hamburger"></span>
                        </a>
                    </li>
                    <li><a onClick={this.clickOnNotificator} className="ptr" id="header-top-notification-btn" href="#" id="rmenu-alert-btn" data-dismiss="alert" aria-label="Close">
                        <span className="glyphicon glyphicon-bell" aria-hidden="true"></span>
                    </a></li>
                    <li><a href="#" className="ptr" data-toggle="modal" data-target="#modal-like">
                        <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                    </a></li>
                </ul>
            </div>
		);
	}
});

ReactDOM.render(
	<HeaderMenu />,
	document.getElementById('navbar-left')
);
