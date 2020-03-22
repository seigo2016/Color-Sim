// const {PythonShell} = require('python-shell');
const electron = require('electron');
const app = electron.app;
const req = require('request-promise');
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
// let pyshell;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    // pyshell = PythonShell.run('./Itokake.py', null, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    // });
    let subpy = require('child_process').execFile('.\\py_app\\Itokake.exe',[]);
    const mainAddr = 'http://localhost:5000';

    const openWindow = function() {
        mainWindow = new BrowserWindow({width: 720, height: 480 });
        mainWindow.loadURL(mainAddr);

        mainWindow.on('closed', function() {
            console.log(subpy.pid)
            subpy.kill();
            electron.session.defaultSession.clearCache(() => {})
            mainWindow = null;
        });
    };

    const appStart = function() {
        req(mainAddr)
            .then(function(htmlString) {
                console.log('server started');
                openWindow();
            })
            .catch(function(err) {
                appStart();
            });
    };

    appStart();
});