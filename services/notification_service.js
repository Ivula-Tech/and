import { logDate } from "./../globals/globals.js"
import { notification } from "../models/notifyModel.js"
class notifyService {
    constructor() {
        console.log(`${logDate} | Server Logs |Notifications Service | status : Initiated | Notifications Service initiated`)
    }

    async postMessage(data) {
        const { message, clientID, contID } = data

        const postSMS = new notification({
            message: message,
            clientID: clientID,
            contID: contID
        })

        try {
            const saveSMS = (await postSMS.save()).toObject()
            return saveSMS

        } catch (err) {
    console.log(`${logDate} | Notifications Service | Saving Messages | Messages could not be saved | Error :  ${err}`)
            

        }

    }
    async getMessage(data) {
        const {clientID,contID}=data
        try {
            const getSMS = await notification.find({clientID:data.clientID, contID:data.contID})
            let room = {roomID: clientID + "_" + contID, messages:getSMS}
            return room
        } catch (error) {
    console.log(`${logDate} | Notifications Service | Saving Retrieval | Messages could not be retrieved | Error :  ${err}`)

        }
    }

}

export default notifyService

