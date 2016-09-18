window.SettingsLeaveRunning = React.createClass({

  	getInitialState: function() {
    	return {checked: window.config.get('leaveRunning')};
  	},
  	handleChange: function(event) {
  		var checked = event.target.checked
    	this.setState({checked: checked});
		window.config.save('leaveRunning', checked);
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
        			Leave Franz running in the noification area when window is closed
        		</label>
		    </div>
		);
	}
});
