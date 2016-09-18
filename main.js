const electron = require('electron');
const app = electron.app;  // Модуль контролирующей жизненный цикл нашего приложения.
const BrowserWindow = electron.BrowserWindow;  // Модуль создающий браузерное окно.
const fs = require('fs');
const ipcMain = require('electron').ipcMain;

//Чтение конфига
var configEncoded = fs.readFileSync('data/config.json', 'utf8');
var configText = decodeURIComponent(configEncoded);
var config = JSON.parse(configText);
// console.log(config);

//Расшариваю конфиг
global.config = config;

//Сохранение конфига
ipcMain.on('save-config', function(event) {
    config = global.config;
    configText = JSON.stringify(config);
    fs.writeFileSync('data/config.json', configText);
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
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// Этот метод будет вызван когда Electron закончит инициализацию 
// и будет готов к созданию браузерных окон.
app.on('ready', function() {
    // Создаем окно браузера.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 580,
        minWidth: 600,
        minHeight: 480
        // 'min-width': 300,
        // 'min-height': 300,
    });

    // и загружаем файл index.html нашего веб приложения.
   mainWindow.loadURL('file://' + __dirname + '/httpd/index.html');
    // mainWindow.loadURL('http://127.0.0.1:8888/index.html');

    // Открываем DevTools.
   mainWindow.webContents.openDevTools();

    // Этот метод будет выполнен когда генерируется событие закрытия окна.
    mainWindow.on('closed', function() {
        // Удаляем ссылку на окно, если ваше приложение будет поддерживать несколько
        // окон вы будете хранить их в массиве, это время 
        // когда нужно удалить соответствующий элемент.
        mainWindow = null;
    });
});
