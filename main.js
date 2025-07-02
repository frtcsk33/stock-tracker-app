const {app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width:1000,
        height:800,
        webPreferences: {
            nodeIntegration: true,
        },


    });

    
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
};

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {

    if(process.platform !== 'darwin') app.quit();
});