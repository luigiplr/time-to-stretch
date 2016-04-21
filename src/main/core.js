import { BrowserWindow, app, screen } from 'electron'
import windowStateKeeper from 'electron-window-state'
import minimist from 'minimist'
import path from 'path'

process.env.NODE_ENV = minimist(process.argv.slice(2)).dev ? 'development' : 'production'
  /* BEGIN CHROME FLAGS */

app.commandLine.appendSwitch('allow-file-access-from-files', true)
app.commandLine.appendSwitch('js-flags', '--es_staging')

/* END CHROME FLAGS */

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
  const { workAreaSize } = require('screen').getPrimaryDisplay()

  const mainWindowState = windowStateKeeper({
    defaultWidth: workAreaSize.width * 0.5,
    defaultHeight: workAreaSize.height * 0.5
  })

  const mainWindow = new BrowserWindow({
    center: true,
    frame: true,
    'auto-hide-menu-bar': true,
    resizable: true,
    show: false,
    backgroundColor: '#212121',
    ...mainWindowState
  })

  /* Remember position and size of window */
  mainWindowState.manage(mainWindow)

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
})
