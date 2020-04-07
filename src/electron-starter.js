

// // const electron = require('electron')
// // const { app, BrowserWindow } = electron
// // const path = require('path')

// // app.on('window-all-closed', () => {
// //     if (process.platform != 'darwin') {
// //         app.quit();
// //     }
// // });
// // let mainWindow = new BrowserWindow({
// //     width: 100,
// //     height: 800,
// //     'min-width': 500,
// //     'min-height': 300,
// //     'auto-hide-menu-bar': true
// // });
// // // mainWindow.loadUrl('file://' + __dirname + '/build/index.html');
// // // mainWindow(`file://${path.join(__dirname, "/index.html")}`);
// // // mainWindow.loadFile('index.html')
// // mainWindow.loadURL('http://localhost:3000/')
// // mainWindow.openDevTools();
// // mainWindow.on('closed', function () {
// //     mainWindow = null;
// // });
// // app.on('ready', mainWindow);
// const { app, BrowserWindow } = require('electron')
// const path = require('path')

// function createWindow() {
//     // Create the browser window.
//     const mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         // webPreferences: {
//         //     preload: path.join(__dirname, 'preload.js')
//         // }
//     })

//     // and load the index.html of the app.
//     mainWindow.loadFile(path.join(__dirname, '/build/'))
//     // mainWindow.loadURL('http://localhost:3000/')

//     // Open the DevTools.
//     // mainWindow.webContents.openDevTools()
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)

// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//     // On macOS it is common for applications and their menu bar
//     // to stay active until the user quits explicitly with Cmd + Q
//     if (process.platform !== 'darwin') app.quit()
// })

// app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })



const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL('http://localhost:3000');
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});