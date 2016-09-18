window.SettingsSubscriptionCb = React.createClass({

  	getInitialState: function() {

    	return {checked: window.config.get('subscription')};
  	},
  	handleChange: function(event) {
  		var checked = event.target.checked
    	this.setState({checked: checked});
		window.config.save('subscription', checked);
  	},
	render: function(){
		return (
	        <div className="checkbox">
	            <label>
					<input 
						defaultChecked={this.state.checked}
						onChange={this.handleChange} 
						type="checkbox" 
					/>
					Please subscribe me the Franz newslater
	            </label>
	        </div>			
		);
	}
});