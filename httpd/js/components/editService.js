var EditService = React.createClass({

	onChangeHandler: function(event){


	},

	componentDidMount: function(){

		//Popover верхнего меню вкл/выкл сервисов
		var switcherFlag = false;
		$("[data-toggle=popover]").popover({
			html: true, 
			container: 'body',
			content: function() {

				//Поскольку bootstrapSwitch() не работает если элемент скрыт
				//выполняем bootstrapSwitch() после открытия popover
				if(!switcherFlag){
					switcherFlag = true;
					setTimeout(function(){
						$('input#popover-switch-service').bootstrapSwitch('state', true, true);
					}, 101);

				}
	        	return $('#popover-content').html();
	        }
		});
	},

	render: function(){

		return (
			<div>
		        <span className="glyphicon service-icon-small" aria-hidden="true">
		            <img src="services/vk.svg" />
		        </span>
		        spendlively@mail.ru
		        <span className="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>
		        <span className="glyphicon glyphicon-refresh pull-right" aria-hidden="true"></span>
		        <div className="top-popover-switcher pull-right">
		            <input onChange={this.onChangeHandler} className="switch-button" id="popover-switch-service" type="checkbox" checked data-size="mini" />
		        </div>			
			</div>
		);
	}
});

ReactDOM.render(
	<EditService />,
	document.getElementById('popover-content')
);
