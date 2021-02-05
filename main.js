const path = require('path')
const fs = require('fs')
const { app, BrowserWindow } = require('electron')

const isProd = process.env.NODE_ENV === 'production'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    
    webPreferences: {
      nodeIntegration: true,
    },
    icon: isProd ? 'dist/favicon.ico' : 'http://localhost:3000/favicon.ico',
  })
  win.removeMenu()
  

  if (isProd) {
    if (!fs.existsSync(path.resolve(__dirname, 'dist/index.html'))) {
      throw new Error('资源不存在')
    }
    win.loadFile('dist/index.html')
  } else {
    win.loadURL('http://localhost:3000')
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
