
"use strict";

let Takeoff = require('./Takeoff.js')
let AddCrazyflie = require('./AddCrazyflie.js')
let GoTo = require('./GoTo.js')
let SetGroupMask = require('./SetGroupMask.js')
let UploadTrajectory = require('./UploadTrajectory.js')
let NotifySetpointsStop = require('./NotifySetpointsStop.js')
let Land = require('./Land.js')
let sendPacket = require('./sendPacket.js')
let StartTrajectory = require('./StartTrajectory.js')
let Stop = require('./Stop.js')
let RemoveCrazyflie = require('./RemoveCrazyflie.js')
let UpdateParams = require('./UpdateParams.js')

module.exports = {
  Takeoff: Takeoff,
  AddCrazyflie: AddCrazyflie,
  GoTo: GoTo,
  SetGroupMask: SetGroupMask,
  UploadTrajectory: UploadTrajectory,
  NotifySetpointsStop: NotifySetpointsStop,
  Land: Land,
  sendPacket: sendPacket,
  StartTrajectory: StartTrajectory,
  Stop: Stop,
  RemoveCrazyflie: RemoveCrazyflie,
  UpdateParams: UpdateParams,
};
