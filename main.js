const electron = require('electron');
const app = electron.app;  // Модуль контролирующей жизненный цикл нашего приложения.
const BrowserWindow = electron.BrowserWindow;  // Модуль создающий браузерное окно.
const fs = require('fs');
const ipcMain = require('electron').ipcMain;
const pathToConfig = __dirname + '/httpd/data/config.json';
const {Menu} = require('electron');
var sanitizer = require('sanitizer');

const {Tray} = require('electron');
let tray = null
app.on('ready', function(){

    tray = new Tray(__dirname + '/opios16.png');
    // tray = new Tray(__dirname + '/icons/alert.png');
    // const contextMenu = Menu.buildFromTemplate([
    //     {
    //         label: 'Выйти', 
    //         type: 'radio',
    //         click (item, focusedWindow) {
    //             // if (focusedWindow) focusedWindow.reload();
    //             app.quit();
    //         }
    //     }
    // ]);

    // tray.setToolTip('This is my application.');
    // tray.setContextMenu(contextMenu);

    // setTimeout(function(){
    //     app.dock.setBadge("1")
    // }, 5000);
    // setTimeout(function(){
    //     app.setBadgeCount(2);
    // }, 9000);
    // setTimeout(function(){
    //     app.dock.setIcon(__dirname + '/icons/alert1.png');
    // }, 13000);
});


var messages = {count: 0},
    currentCount = 0;
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

// const notifier = require('node-notifier');
// // notifier.notify('Message');
// setTimeout(function(){
//     notifier.notify({
//       'title': 'My notification',
//       'message': 'Hello, there!'
//     });
// }, 3000);

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

// Опционально возможность отправки отчета о ошибках на сервер проекта Electron.
//electron.crashReporter.start();
electron.crashReporter.start({
    productName: 'Opios',
    companyName: 'Opios',
    submitURL: '',
    autoSubmit: true
})

// Определение глобальной ссылки , если мы не определим, окно
// окно будет закрыто автоматически когда JavaScript объект будет очищен сборщиком мусора.
var mainWindow = null;

// Проверяем что все окна закрыты и закрываем приложение.
app.on('window-all-closed', function() {
    // В OS X обычное поведение приложений и их menu bar
    //  оставаться активными до тех пор пока пользователь закроет их явно комбинацией клавиш Cmd + Q
    // if (process.platform != 'darwin') {
        app.quit();
    // }
});

// Этот метод будет вызван когда Electron закончит инициализацию 
// и будет готов к созданию браузерных окон.
app.on('ready', function() {
    // Создаем окно браузера.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 580,
        minWidth: 600,
        minHeight: 480,
        icon: __dirname + '/opios.png'
//        skipTaskbar: true

        // 'min-width': 300,
        // 'min-height': 300,
    });

    // mainWindow.setOverlayIcon(__dirname + '/tray.png', 'Имеется 1 уведомление!')

    // и загружаем файл index.html нашего веб приложения.
   mainWindow.loadURL('file://' + __dirname + '/httpd/index.html');
//   mainWindow.loadURL('file://' + __dirname + '/index.html');
    // mainWindow.loadURL('http://127.0.0.1:8888/index.html');

    // Открываем DevTools.
  // mainWindow.webContents.openDevTools();

    // Этот метод будет выполнен когда генерируется событие закрытия окна.
    mainWindow.on('closed', function() {
        // Удаляем ссылку на окно, если ваше приложение будет поддерживать несколько
        // окон вы будете хранить их в массиве, это время 
        // когда нужно удалить соответствующий элемент.
        mainWindow = null;
    });

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
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
//    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
