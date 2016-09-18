var SettingsSubscriptionCb = window.SettingsSubscriptionCb,
	SettingsPersonalUse = window.SettingsPersonalUse;
	SettingsCommercialUse = window.SettingsCommercialUse;
	SettingsLeaveRunning = window.SettingsLeaveRunning;
	SettingsLaunchOnStart = window.SettingsLaunchOnStart;
	SettingsLanguage = window.SettingsLanguage;

var SettingsBlock = React.createClass({

  	getInitialState: function() {

    	return {email: window.config.get('email')};
  	},

	handleChange: function(proxy){
		var value = proxy._targetInst._hostNode.value;
		this.setState({email: value});
		window.config.save('email', value);
	},

	render: function(){
		return (
			<div>
				<h2 id="content-settings">Настройки</h2>
			    <h3>Account</h3>
			    <div className="form-group">
			        <label htmlFor="exampleInputEmail1">Email</label>
			        <input value={this.state.email} onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
			    </div>
	            <SettingsSubscriptionCb />
			    <p>I use Franz for</p>
	            <SettingsPersonalUse />
	            <SettingsCommercialUse />
	            <SettingsNonProfitUse />
			    <h3>App</h3>
			    <p>General</p>
	            <SettingsLeaveRunning />
	            <SettingsLaunchOnStart />
	            <SettingsLanguage />
			    <h3>Cache</h3>
			    <button type="button" className="btn btn-default">Clear the Franz cache</button>
		    </div>
		);
	}
});

ReactDOM.render(
  <SettingsBlock />,
  document.getElementById('settings-block')
);

