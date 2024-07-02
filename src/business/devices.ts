import { AnyDeviceDiscovery, Client } from 'tplink-smarthome-api'
import { HomeDevice } from '../models/devices';

const client = new Client();

client.startDiscovery();

export const getAllDevices = async () => {
    var devices: HomeDevice[] = []
    await Promise.all(Array.from(client.devices, async ([name, value]) => {
        devices.push({
            type: value.deviceType,
            name: value.alias,
            id: value.deviceId,
            power: await value.getPowerState()
        })
    }))
    return devices
}


export const toggleDevice = async (id: string) => {
    const device: unknown = client.devices.get(id)
    if(isDevice(device))
        return await device.togglePowerState();
}

const isDevice = (object: unknown): object is AnyDeviceDiscovery => {
    if(object !== null && typeof object == "object")
        return "deviceId" !in object
    return false
}

client.stopDiscovery();