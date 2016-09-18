//SettingsLaunchOnStart
window.SettingsLaunchOnStart = React.createClass({

  	getInitialState: function() {
    	return {checked: window.config.get('launchOnStart')};
  	},
  	handleChange: function(event) {
  		var checked = event.target.checked
    	this.setState({checked: checked});
    	window.config.save('launchOnStart', checked);
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
        			Launch Franz on start
        		</label>
		    </div>
		);
	}
});
