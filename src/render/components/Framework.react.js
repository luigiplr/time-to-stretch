/**
 * @desc Framework component, handles page, keeps track of timer data
 * @return {void}
 */

class Framework extends Component {

  state = {
    page: 'timer',
    timerData: {}
  }

  /* init logging util */
  log = new log({
    level: 'debug',
    dir: path.join(remote.app.getPath('appData'), remote.app.getName(), 'logs')
  })

  componentDidMount() {
    ipcRenderer.on('changePage', ::this.changePage)
  }

  /**
   * @desc Proxy function passed to components, changes the page of the app.
   * @param {string} page - name of new page to transition to
   * @return {void}
   */
  changePage = page => this.setState({ page })

  //Basic router
  getPageContents() {
    const { page, timerData } = this.state

    switch (page) {
      case 'timer':
        return <Timer log={this.log} changePage={::this.changePage} timerData={timerData} />
      case 'settings':
        return <Settings log={this.log} changePage={::this.changePage} />
      default:
        return null
    }
  }

  // render dom
  render = () => (
    <div className='app-framework'>
      {::this.getPageContents()}
    </div>
  )
}
