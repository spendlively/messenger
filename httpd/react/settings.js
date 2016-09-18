var SettingsBlock = React.createClass({

	// handleChange: function(proxy){
	// 	var value = proxy._targetInst._hostNode.value;
	// 	this.setState({email: value});
	// 	window.config.save('email', value);
	// },
  	getInitialState: function() {

		var l12n = window.localization,
			settings = l12n.getData('settings');

    	return settings;
  	},

  	componentDidMount: function() {
  		
		var l12n = window.localization;

		l12n.registerClass('settings', this);
		// this.setState({title: 'qwerty'});
  	},

  	getOptions: function(){

		var options = this.state.languages.map(function(opt){

			return (<option key={opt.id} value={opt.id}>{opt.value}</option>)
		});

  		return (
         	<select className="form-control">
         		{options}
            </select>
		);
  	},

	render: function(){
		return (
			<div>
                <h2 id="content-settings">{this.state.title}</h2>
                <div className="settings-block">
                    <h3>{this.state.account}</h3>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">{this.state.email}</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder={this.state.email} />
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" />{this.state.subscribeText}
                        </label>
                    </div>
                    <p>{this.state.useText}</p>
                    <div className="checkbox">
                        <label><input type="checkbox" />{this.state.personalText}</label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" />{this.state.commercialText}</label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" />{this.state.nonProfitText}</label>
                    </div>
                    <h3>{this.state.app}</h3>
                    <p>{this.state.general}</p>
                    <div className="checkbox">
                        <label><input type="checkbox" />{this.state.leaveRunningText}</label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" />{this.state.launchText}</label>
                    </div>
                    <p>{this.state.language}</p>
						{this.getOptions()}
                    <h3>{this.state.cache}</h3>
                    <button type="button" className="btn btn-default">{this.state.clearCache}</button>
                </div> 
		    </div>
		);
	}
});

ReactDOM.render(
  <SettingsBlock />,
  document.getElementById('settings-block')
);
