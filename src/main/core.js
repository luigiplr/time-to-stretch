import { BrowserWindow, app, screen } from 'electron'
import windowStateKeeper from 'electron-window-state'
import minimist from 'minimist'
import path from 'path'
import Tray from './tray'


process.env.NODE_ENV = minimist(process.argv.slice(2)).dev ? 'development' : 'production'

/* CHROME FLAGS */
app.commandLine.appendSwitch('allow-file-access-from-files', true)
app.commandLine.appendSwitch('js-flags', '--es_staging')

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
  const { workAreaSize } = require('screen').getPrimaryDisplay()

  /*  default size 50% of width & height */
  const mainWindowState = windowStateKeeper({
    defaultWidth: workAreaSize.width * 0.5,
    defaultHeight: workAreaSize.height * 0.5
  })

  /* init the main window */
  const mainWindow = new BrowserWindow({
    center: true,
    skipTaskbar: true,
    frame: true,
    autoHideMenuBar: true,
    resizable: true,
    show: false,
    ...mainWindowState // apply width & height parms from mainWindowState object
  })

  /* Remember position and size of window */
  mainWindowState.manage(mainWindow)

  /* Load app HTML file */
  mainWindow.loadURL(`file://${path.join(__dirname, '..', 'app.html')}`)

  /* Once main window loads show window to prevent white flash */
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  /* if in development mode attach to electron-connect for hot reloading */
  if (process.env.NODE_ENV === 'development') {
    const { client } = require('electron-connect')
    client.create(mainWindow)
    mainWindow.toggleDevTools()
    mainWindow.focus()
  }

  /* init tray */
  const tray = new Tray(mainWindow, path.join(__dirname, '..', 'images', 'tray.png'))
})
