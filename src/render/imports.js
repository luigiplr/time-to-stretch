/**
 * Import all render thread dependencies
 */

/* Electron */
import { shell, remote } from 'electron'

/* General */
import minimist from 'minimist'
import { Circle as CircleProgress } from 'rc-progress'
import { Logger, transports } from 'winston'
import moment from 'moment'
import path from 'path'
import { sync as mkdirp } from 'mkdirp'

/* React */
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
