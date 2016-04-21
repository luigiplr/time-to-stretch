class Framework extends Component {

  state = {
    page: 'timer'
  }

  changePage = page => this.setState({ page })

  getPageContents() {
    switch (this.state.page) {
      case 'timer':
        return <Timer />
      case 'settings':
        return <Settings />
      default:
        return null
    }
  }

  render = () => (
    <div className='app-framework'>
      {::this.getPageContents()}
    </div>
  )
}
