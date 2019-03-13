const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow } = electron;

//import { app, BrowserWindow, screen } from 'electron';
//import * as path from 'path';
//import * as url from 'url';

let mainWindow;
console.log('main process working');

function createWindow() {
	const size = electron.screen.getPrimaryDisplay().workAreaSize;
	
    // Create the browser window.
    mainWindow = new BrowserWindow({
       	x: 0,
        y: 0,
        //width: 800, height: 600, 
    	width: size.width,
    	height: size.height,
        backgroundColor: 'lightgray', 
        show: false,
        webPreferences: {
            nodeIntegration: true,
            defaultEncoding: 'UTF-8'
        }
     });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.once("ready-to-show", () => {
        mainWindow.setMenu(null)
        mainWindow.show()
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
