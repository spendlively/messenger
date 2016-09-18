window.SettingsNonProfitUse = React.createClass({

  	getInitialState: function() {
    	return {checked: window.config.get('nonProfitUse')};
  	},
  	handleChange: function(event) {
  		var checked = event.target.checked
    	this.setState({checked: checked});
		window.config.save('nonProfitUse', checked);
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
        			Non profit/NGO use
        		</label>
		    </div>
		);
	}
});
