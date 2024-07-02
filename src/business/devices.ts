import { Client } from 'tplink-smarthome-api'

const client = new Client();

client.startDiscovery();

export const getAllDevices = async () => {
    var devices: any[] = []
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
    const device: any = client.devices.get(id)
    return await device.togglePowerState();
}

client.stopDiscovery();