window.SettingsCommercialUse = React.createClass({

  	getInitialState: function() {
    	return {checked: window.config.get('commercialUse')};
  	},
  	handleChange: function(event) {
  		var checked = event.target.checked
    	this.setState({checked: checked});
    	window.config.save('commercialUse', checked);
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
        			Commercial use
        		</label>
		    </div>
		);
	}
});
