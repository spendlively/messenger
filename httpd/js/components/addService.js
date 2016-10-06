var AddService = React.createClass({

	getInitialState: function(){

		var l12n = app.localization,
			data = l12n.getData('addService');

    	return data;
	},

	componentDidMount: function() {
  		
    app.componentsObserver.registerComponent('addService', this);
	},

  clickHandler: function(id){

    var me = this,
        config = app.config,
        data = me.getData(),
        addServiceModal = app.componentsObserver.getComponent('addServiceModal');

    addServiceModal.beforeOpen.call(addServiceModal);

    if(id && data.length){
      for(var d in data){
        if(id == data[d].id){
          config.updateService(data[d]);
          break;
        }
      }
    }
  },

	render: function(){

    var me = this;

    var services = me.getData().map(function(s){

      return (
          <div onClick={function(){me.clickHandler(s.id)}} key={s.id} className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div data-name={s.title} className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
              <img height="60%" src={s.img} />
              <h5>{s.title}</h5>
          </div></div>
      );
    });

		return (
      <div>
        <h2 id="content-add-services">{this.state.title}</h2>
        <div className="row">
          {services}
        </div>            
      </div>
		);
	},

  getData: function(){

    return app.services.getAll();
  }
});

ReactDOM.render(
	<AddService />,
	document.getElementById('add-service-target')
);
