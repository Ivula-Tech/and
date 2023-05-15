import { postUser } from "../models/userModel.js"
import { logDate } from "./../globals/globals.js"
import { messages } from "../models/messageModel.js"
class chatService {
    constructor() {
        console.log(`${logDate} | Server Logs |Chat Service | status : Initiated | Chat Service initiated`)
    }

    async postMessage(data) {
        const { message, clientID, contID } = data

        const postSMS = new messages({
            message: message,
            clientID: clientID,
            contID: contID
        })

        try {
            const saveSMS = (await postSMS.save()).toObject()
            return saveSMS

        } catch (err) {
    console.log(`${logDate} | Chat Service | Saving Messages | Messages could not be saved | Error :  ${err}`)
            

        }

    }
    async getMessage(data) {
        const {clientID,contID}=data
        try {
            const getSMS = await messages.find({clientID:data.clientID, contID:data.contID})
            let room = {roomID: clientID + "_" + contID, messages:getSMS}
            return room
        } catch (error) {
    console.log(`${logDate} | Chat Service | Saving Retrieval | Messages could not be retrieved | Error :  ${err}`)

        }
    }

}

export default chatService

