$(document).ready(function(){

	//Всплывающее меню для кнопки доступные сервисы
	$('#rmenu-popover-btn').popover();

	//Обработка клика по кнопке левого бокового меню
	$('ul.lmenu>li').click(function(){
// debugger;
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

	var notifBtnCounter = 0;
	$('#header-top-notification-btn').click(function(){

		var text = 'Уведомления включены!';
		if(++notifBtnCounter%2){
			text = 'Уведомления отлючены!';
		}

		$('.top-right').notify({
	    	message: { text: text },
	    	type: 'info',
	  	}).show();
	});


	//Switcher кнопочки
	$('input#switch-modal').bootstrapSwitch('state', true, true);

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

});
