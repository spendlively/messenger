var electron = require('electron');
var app = electron.app;  // Модуль контролирующей жизненный цикл нашего приложения.
var BrowserWindow = electron.BrowserWindow;  // Модуль создающий браузерное окно.
var fs = require('fs');
var ipcMain = require('electron').ipcMain;
var pathToConfig = __dirname + '/httpd/data/config.json';
var {Menu} = require('electron');
var sanitizer = require('sanitizer');
var {Tray} = require('electron');
var tray = null;
var mainWindow = null;
var messages = {count: 0};
var currentCount = 0;

var qwe = {asd: 'zxc'};
module.exports.qwe = qwe;

//Обновление badges
global.messages = messages;
ipcMain.on('update-tray', function(event) {

    var count = parseInt(messages.count),
        head = __dirname + '/icons/alert',
        tail = '.png';

    if(count === currentCount) return;

    if(count > 0 && count < 10){
        tray.setImage(head + count + tail); 
        if(app.dock) app.dock.setBadge(count + "");
    }
    else if(count >= 10){
        tray.setImage(head + 10 + tail); 
        if(app.dock) app.dock.setBadge("10+");
    }
    else{
        tray.setImage(__dirname + '/opios16.png'); 
        if(app.dock) app.dock.setBadge("");
    }

    if(app.dock){
        var id = app.dock.bounce('critical');
        setTimeout(function(){
            app.dock.cancelBounce(id);
        }, 5000);
    }

    currentCount = count;
});

//Чтение конфига
var configEncoded = fs.readFileSync(pathToConfig, 'utf8');
var configText = decodeURIComponent(configEncoded);
var config = JSON.parse(configText);

//Расшариваю конфиг
global.config = config;

//Сохранение конфига
ipcMain.on('save-config', function(event) {
    config = global.config;
    configText = JSON.stringify(config);
    fs.chmodSync(pathToConfig, 0777);
    fs.writeFileSync(pathToConfig, configText);
});

//Отправки отчета о ошибках на сервер Electron
//Нужно для сборки
electron.crashReporter.start({
    productName: 'Opios',
    companyName: 'Opios',
    submitURL: '',
    autoSubmit: true
})

// Проверяем что все окна закрыты и закрываем приложение.
app.on('window-all-closed', function() {
    // В OS X обычное поведение приложений и их menu bar
    //  оставаться активными до тех пор пока пользователь закроет их явно комбинацией клавиш Cmd + Q
    // if (process.platform != 'darwin') {
        // app.quit();
    // }
});


function initWindow(){

   // Создаем окно браузера.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 580,
        minWidth: 600,
        minHeight: 480,
        icon: __dirname + '/opios.png'
    });

    //Badges для винды
    // mainWindow.setOverlayIcon(__dirname + '/tray.png', 'Имеется 1 уведомление!')

    //index.html
    mainWindow.loadURL('file://' + __dirname + '/httpd/index.html');

    //DevTools
    // mainWindow.webContents.openDevTools();

    // Этот метод будет выполнен когда генерируется событие закрытия окна.
    mainWindow.on('closed', function() {
        if (process.platform != 'darwin') {
            mainWindow = null;
        }
    });
}

// Этот метод будет вызван когда Electron закончит инициализацию 
// и будет готов к созданию браузерных окон.
app.on('ready', function() {

    //Инициализация окна
    initWindow();

    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    //Менюшка в трее
    tray = new Tray(__dirname + '/opios16.png');
    var contextMenu = Menu.buildFromTemplate([{
        label: 'Выйти', 
        click (item, focusedWindow) {
            app.quit();
        }
    },{
        label: 'Показать Opios', 
        click (item, focusedWindow) {
            if(mainWindow === null){
                initWindow();
            }
            else{
                mainWindow.focus();
            }
        }
    }]);

    // tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
});
