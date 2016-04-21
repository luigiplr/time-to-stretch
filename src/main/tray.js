import { Menu, Tray, app } from 'electron'

/**
 * @desc initializes app tray
 * @param {object} BrowserWindow - spawned BrowserWindow object
 * @param {string} icon - tray icon
 * @return {object} Tray - tray instance
 */

export default class extends Tray {
  constructor(BrowserWindow, icon) {
    super(icon)

    this._BrowserWindow = BrowserWindow

    this.setToolTip('Time to Stretch')
    this.setContextMenu(::this._menuTemplate())

    this.on('click', ::this._toggle)
  }

  _menuTemplate = () => Menu.buildFromTemplate([{
    label: 'Toggle',
    click: ::this._toggle
  }, {
    label: 'Settings',
    click: ::this._openSettings
  }, {
    label: 'Exit',
    click: app.quit
  }])

  _openSettings() {
    if (!this._BrowserWindow.isVisible())
      this._BrowserWindow.show()
    this._BrowserWindow.webContents.send('changePage', 'settings')
  }

  _toggle = () => this._BrowserWindow.isVisible() ? this._BrowserWindow.hide() : this._BrowserWindow.show()
}
