/**
 * @desc Timer component
 * @param {func} changePage - proxy function passed from Framework to change the page
 */

class Timer extends Component {

  static propTypes = {
    changePage: PropTypes.func.isRequired
  }

  state = {
    time: 0
  }

  render = () => (
    <div className='timer-page'>
      <div className="timer">
        <CircleProgress percent="10" strokeWidth="4" strokeColor="#D3D3D3" />
      </div>
    </div>
  )
}
