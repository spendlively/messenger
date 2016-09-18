window.SettingsPersonalUse = React.createClass({

  	getInitialState: function() {
    	return {checked: window.config.get('personalUse')};
  	},
  	handleChange: function(event) {
  		var checked = event.target.checked
    	this.setState({checked: checked});
		window.config.save('personalUse', checked);
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
        			Personal use
        		</label>
		    </div>
		);
	}
});
