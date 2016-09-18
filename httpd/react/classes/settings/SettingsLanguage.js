window.SettingsLanguage = React.createClass({

  	// getInitialState: function() {
   //  	return {checked: window.config.get('language')};
  	// },
  	handleChange: function(event) {
  		var value = event.target.value
    	// this.setState({checked: checked});
		window.config.save('language', value);
  	},
	render: function(){

		var selectedLang = window.config.get('language') || 1;
		var langs = window.config.getLanguages().map(function(opt){

			return (
				<option key={opt.id} value={opt.id}>{opt.value}</option>
			);
		});

		return (
			<div>
			    <p>Language</p>
			    <select value={selectedLang} className="form-control" onChange={this.handleChange}>
			      {langs}
			    </select>
		    </div>
		);
	}
});
