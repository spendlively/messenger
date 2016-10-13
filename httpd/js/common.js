$(document).ready(function(){
setTimeout(function(){

	//Всплывающее меню для кнопки доступные сервисы
	// $('#rmenu-popover-btn').popover();

	//Switcher кнопочки
//	$('input#switch-modal').bootstrapSwitch('state', true, true);

//    window.a();

}, 5000);



});


window.a = function(text){
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  else if (Notification.permission === "granted") {
    var notification = new Notification("Новое сообщение", {
        body: 'Пользователь Аристарх написал вам ...',
        icon: __dirname + '/../icons/opios.png'
    });
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
          var notification = new Notification("Новое сообщение", {
              body: 'Пользователь Аристарх написал вам...',
              icon: __dirname + '/../icons/opios.png'
          });
      }
    });
  }
};