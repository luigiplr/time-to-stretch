/**
 * @desc
 initializes a winston instance w/ user options from config and creates instance logging directory
 * @param {object} config - config object
 * @param {string} config.logLevel - log level passed to winston, can be any of: error, warn, info, verbose, debug, silly
 * @param {string} config.logDir - directory to store logs
 * @return {object} instance - winston instance
 * @author Luigi Poole
 */

class log extends Logger {
  constructor({ level, dir }) {
    //route logs to console for the one or two nano seconds it takes the code below to run
    super({ level, transports: [new(transports.Console)()] })

    //define the log path for the instance, uses config parm alongside the exsact time stamp of exsecution
    const logPath = path.resolve(path.join(dir, moment().format('YYYY-MM-DD_HH-MM-SS-MS')))

    // create the logging path. (do this synchronously)
    mkdirp(logPath)

    //route uncaught errors within the app to winston for logging
    process.on('uncaughtException', this.error)

    //now that the logging path has been created finnish configuring winston
    this.configure({
      level,
      transports: [
        new(transports.Console)(),
        new(transports.File)({
          name: 'info-file',
          filename: path.join(logPath, 'info.log'),
          level: 'info'
        }),
        new(transports.File)({
          name: 'error-file',
          filename: path.join(logPath, 'error.log'),
          level: 'error'
        })
      ]
    })
  }
}
