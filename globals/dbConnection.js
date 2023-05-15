import mongoose from "mongoose";
import dotenv from 'dotenv'
import { logDate } from "./globals.js";
dotenv.config()


const connectDB = async () => {

    const action = () => {
        return new Promise(async (res, rej) => {
            try {
                const connect = await mongoose.connect(process.env.DB_URL)
                res(`${logDate} | Server Logs | DataBase Connections | Connection to DB was successful | Connected`)

            } catch (err) {
                rej(`${logDate} | Server Logs | DataBase Connections | Could not connect to DB | ${err}`)
            }
        })
    }
    const tryOnce = () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                action().then(res).catch(rej)
            }, 7000);
        })

    }

    var trying = true
    do {

        await action().then((res) => {
            console.log(res)
            trying =false

        }).catch(async (err) => {
            await tryOnce().then((res) => {
                console.log(res) 
                trying = false

            }).catch((rej) => {
                console.log(rej)
                trying = true
            })
        })
    } while (trying)


}

export default connectDB