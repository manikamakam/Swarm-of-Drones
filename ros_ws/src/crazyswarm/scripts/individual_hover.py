#!/usr/bin/env python

from __future__ import print_function

from pycrazyswarm import *

def main():
    swarm = Crazyswarm()
    timeHelper = swarm.timeHelper
    allcfs = swarm.allcfs

    for cf in allcfs.crazyflies:
        print(cf.id)
        cf.takeoff(1.0, 2.5)
        print("press button to continue")
        swarm.input.waitUntilButtonPressed()
        cf.land(0.04, 2.5)

    # swarm = Crazyswarm()
    # print(swarm.allcfs)
    # swarm.allcfs.takeoff(targetHeight=0.5, duration=2.0)
    # swarm.timeHelper.sleep(3.0)
    # swarm.allcfs.land(targetHeight=0.0, duration=2.0)


if __name__ == "__main__":
    main()
