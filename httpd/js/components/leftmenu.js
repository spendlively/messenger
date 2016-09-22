var LeftMenu = React.createClass({

	getInitialState: function(){

		var l12n = app.localization,
			data = l12n.getData('leftMenu');

    	return data;
	},

  	componentDidMount: function() {
  		
  		app.componentsObserver.registerComponent('leftMenu', this);

        //Обработка клика по кнопке левого бокового меню
        $('ul.lmenu>li').click(function(){
            var targetId = $(this).attr('data-element-scroll-to'),
                marginTop = parseInt($('#' + targetId).css('margin-top')),
                topOffset = document.getElementById('top-navbar').getBoundingClientRect().bottom,
                offset = $('#' + targetId).offset().top - topOffset - marginTop -20,
                activeClsName = 'active';

                $('ul.lmenu>li.' + activeClsName).removeClass(activeClsName);
                $(this).addClass(activeClsName);

            //Скролл на элемент
            $('html, body').animate({
                scrollTop: offset +  'px'
            }, 'fast');
        });        
  	},

	render: function(){

		return (
            <div className="col-xs-4 col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar lmenu">
                    <li className="active" data-element-scroll-to="content-available-services">
                        <a className="ptr">{this.state.enabledServices}
                            <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li data-element-scroll-to="content-add-services">
                        <a className="ptr">
                            {this.state.addService}
                        </a>
                    </li>
                    <li data-element-scroll-to="content-settings">
                        <a className="ptr">
                            {this.state.settings}
                        </a>
                    </li>
                </ul>
            </div>
		);
	}
});

ReactDOM.render(
	<LeftMenu />,
	document.getElementById('left-menu-target')
);
