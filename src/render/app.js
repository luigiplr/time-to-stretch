/**
 * Render thread entree point
 */

//wait untill all code has been loaded
document.addEventListener('DOMContentLoaded', () => {
  // set NODE_ENV for react production optimizations
  process.env.NODE_ENV = minimist(process.argv.slice(2)).dev ? 'development' : 'production'
    // render our UI
  render(<Framework />, document.getElementById('root'))
})
