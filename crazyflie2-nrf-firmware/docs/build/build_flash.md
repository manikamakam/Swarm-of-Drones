---
title: Building and Flashing
page_id: build_flash
---


To compile arm-none-eabi- tools from https://launchpad.net/gcc-arm-embedded
should be in the path.
On Ubuntu, you can install the tools:

```
sudo apt-get install gcc-arm-none-eabi gdb-arm-none-eabi binutils-arm-none-eabi
```

Compilation options can be saved in config.mk. Main targets:

```
make                 # Make with BLE support
make BLE=0           # Make without BLE support
make BLE=0 S110=0    # Make without BLE and without Softdevice in flash (see bellow)

make flash           # Flash firmware with jtag
make factory_reset   # Erase device and flash softdevice, bootloaders, and firmware
```

Architecture
------------

When running without softdevice (S110=0) the firmware is loaded at the
beginning of the flash and is running alone in the CPU.

When running with Softdevive (S110=1) independent of if BLE is activated
or not, the flash is filled as follow:
```
+--------------+ 256k
|     MBS      |    Write protected
+--------------+ 252k
|  Bootloader  |
+--------------+ 232k
|              |
|              |
|              |
|              |
|              |
|  Firmware    |
+--------------+ 88K
|              |
|              |
|              |
|              |
|              |
|              |
|  Softdevice  |
+--------------+ 4K
|     MBR      |    Write protected
+--------------+ 0
```

 - **MBR** Softdevice Master Boot Record.
 - **SoftDevice** S110 Bluetooth stack
 - **Firmware** This firmware
 - **Bootloader** Bluetooth/Shockburst bootloader
 - **MBS** Master Boot Switch

Boot sequence:
```
 MBR ----> MBS ----> Bootloader ----> Firmware
```

The MBR is part of the Softdevice. It boots the CPU and jump to MBS.
The MBR contains methods to start the Softdevice and can flash softdevice
and bootloader.

The MBS handles the ON/OFF button and communicate the duration of the press to
the bootloader so that the bootloader knows what to boot. The reason for the
MBS is to allow updating the bootloader over the air while still having a
write-protected piece of software that can start the STM32 in USB DFU mode
for recovery (the STM32 has access to the NRF51 SWD programming port). The boot
switch is as follow:

| Press time      | Blue LED state | Program booted                               |
| --------------- | -------------- | -------------------------------------------- |
| Short           | Still          | Firmware                                     |
| Long (>3s)      | Slow blink     | Bootloader                                   |
| Very long (>5s) | Fast blink     | Stays in MBS and power STM32 in USB DFU mode |

The bootloader, if selected, starts the STM32 in bootloader mode and initialize
both BLE and Shockburst (ESB) radio. It can flash everything but MBR and MBS.
It also acts as a bridge to the STM32 bootloader.

If not selected, the bootloader jumps to the firmware.
