$(document).ready(function(){
setTimeout(function(){

	//Всплывающее меню для кнопки доступные сервисы
	// $('#rmenu-popover-btn').popover();

	//Switcher кнопочки
//	$('input#switch-modal').bootstrapSwitch('state', true, true);
    window.a();

}, 5000);
});


window.a = function(text){
console.log(1)	
  if (!("Notification" in window)) {
console.log(2)	
    alert("This browser does not support system notifications");
  }

  else if (Notification.permission === "granted") {
console.log(3)	
    var notification = new Notification("Новое сообщение", {
        body: 'Пользователь Аристарх написал вам ...',
        icon: __dirname + '/../opios.png'
    });
    console.log(notification);
  }

  else if (Notification.permission !== 'denied') {
console.log(4)	
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
          var notification = new Notification("Новое сообщение", {
              body: 'Пользователь Аристарх написал вам...',
              icon: __dirname + '/../opios.png'
          });
      }
    });
  }
console.log(5)	
};